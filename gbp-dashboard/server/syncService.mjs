import { detectBrand } from '../src/shared/brands.ts';
import { calculateDashboardSummary, calculateDeltaPercent, getBlockingReason } from '../src/shared/metrics.ts';
import { createCacheStore } from './cacheStore.mjs';
import { createGbpClient } from './gbpClient.mjs';
import { readToken } from './googleAuth.mjs';
import { mockBranches } from './mockData.mjs';

let syncState = {
  status: 'idle',
  stage: 'not-started',
  error: null,
  startedAt: null,
  finishedAt: null
};

const starRatingValues = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

export function getSyncState() {
  return syncState;
}

export function extractReviewStats(reviewResponse) {
  if (typeof reviewResponse.averageRating === 'number' && typeof reviewResponse.totalReviewCount === 'number') {
    return { averageRating: reviewResponse.averageRating, totalReviews: reviewResponse.totalReviewCount };
  }

  const reviews = reviewResponse.reviews || [];
  if (reviews.length === 0) return { averageRating: null, totalReviews: 0 };
  const totalStars = reviews.reduce((sum, review) => sum + (starRatingValues[review.starRating] || 0), 0);
  return { averageRating: Math.round((totalStars / reviews.length) * 100) / 100, totalReviews: reviews.length };
}

export function sumDailyMetric(performanceResponse, metricName) {
  const groups = performanceResponse.multiDailyMetricTimeSeries || [];
  let total = 0;
  for (const group of groups) {
    for (const series of group.dailyMetricTimeSeries || []) {
      if (series.dailyMetric !== metricName) continue;
      for (const point of series.timeSeries?.datedValues || []) {
        total += Number(point.value || 0);
      }
    }
  }
  return total;
}

export function normalizeLocation(input) {
  const title = input.location.title || input.location.name;
  const detected = detectBrand(title);
  const duplicate = Boolean(input.location.metadata?.duplicateLocation);
  const openStatus = input.location.openInfo?.status;
  const hasStoreCode = Boolean(input.location.storeCode);
  const profileStatus = duplicate
    ? 'duplicate'
    : !hasStoreCode
      ? 'missing-store-code'
      : openStatus === 'CLOSED_PERMANENTLY'
        ? 'permanently-closed'
        : openStatus === 'CLOSED_TEMPORARILY'
          ? 'temporarily-closed'
          : 'verified';
  const verified = profileStatus === 'verified';
  const blockingReason = getBlockingReason({ verified, averageRating: input.rating, totalReviews: input.totalReviews, brandId: detected.brandId });

  return {
    id: input.location.name,
    accountName: input.accountName,
    locationName: input.location.name,
    title,
    brandId: detected.brandId,
    brandConfidence: detected.confidence,
    storeCode: input.location.storeCode || null,
    address: input.location.storefrontAddress?.locality || null,
    profileStatus,
    verified,
    averageRating: input.rating,
    totalReviews: input.totalReviews,
    completionStatus: blockingReason === 'complete' ? 'complete' : 'not-complete',
    blockingReason,
    websiteClicks: input.websiteClicks,
    callClicks: input.callClicks,
    directionRequests: input.directionRequests,
    lastSyncedAt: input.syncedAt
  };
}

export async function readDashboardPayload() {
  const store = createCacheStore();
  const cached = await store.readLatest();
  if (cached) return { ...cached, source: cached.source || 'cache' };

  return {
    source: 'mock',
    syncedAt: '2026-05-25T02:00:00.000Z',
    summary: calculateDashboardSummary(mockBranches),
    branches: mockBranches
  };
}

function mockPayload(syncedAt) {
  const branches = mockBranches.map((branch) => ({ ...branch, lastSyncedAt: syncedAt }));
  return {
    source: 'mock-sync',
    syncedAt,
    summary: calculateDashboardSummary(branches),
    branches
  };
}

export async function runManualSync() {
  syncState = {
    status: 'running',
    stage: 'starting',
    error: null,
    startedAt: new Date().toISOString(),
    finishedAt: null
  };

  try {
    const token = await readToken();
    if (!token) {
      syncState = { ...syncState, stage: 'writing-mock-cache' };
      const payload = mockPayload(new Date().toISOString());
      await createCacheStore().writeCache(payload);
      syncState = { status: 'success', stage: 'cache-saved', error: null, startedAt: syncState.startedAt, finishedAt: new Date().toISOString() };
      return payload;
    }

    const client = createGbpClient(token);
    syncState = { ...syncState, stage: 'locations' };
    const accounts = await client.listAccounts();
    const syncedAt = new Date().toISOString();
    const branches = [];

    for (const account of accounts) {
      const locations = await client.listLocations(account.name);
      for (const location of locations) {
        const reviewResponse = await client.listReviews(account.name, location.name).catch(() => ({ reviews: [] }));
        const reviewStats = extractReviewStats(reviewResponse);
        const currentPerformance = await client.fetchPerformance(location.name, { year: 2026, month: 4, day: 28 }, { year: 2026, month: 5, day: 25 }).catch(() => ({}));
        const previousPerformance = await client.fetchPerformance(location.name, { year: 2026, month: 3, day: 31 }, { year: 2026, month: 4, day: 27 }).catch(() => ({}));
        const websiteCurrent = sumDailyMetric(currentPerformance, 'WEBSITE_CLICKS');
        const websitePrevious = sumDailyMetric(previousPerformance, 'WEBSITE_CLICKS');
        const callCurrent = sumDailyMetric(currentPerformance, 'CALL_CLICKS');
        const callPrevious = sumDailyMetric(previousPerformance, 'CALL_CLICKS');
        const directionsCurrent = sumDailyMetric(currentPerformance, 'BUSINESS_DIRECTION_REQUESTS');
        const directionsPrevious = sumDailyMetric(previousPerformance, 'BUSINESS_DIRECTION_REQUESTS');

        branches.push(normalizeLocation({
          accountName: account.name,
          location,
          rating: reviewStats.averageRating,
          totalReviews: reviewStats.totalReviews,
          websiteClicks: { current: websiteCurrent, previous: websitePrevious, deltaPercent: calculateDeltaPercent(websiteCurrent, websitePrevious) },
          callClicks: { current: callCurrent, previous: callPrevious, deltaPercent: calculateDeltaPercent(callCurrent, callPrevious) },
          directionRequests: { current: directionsCurrent, previous: directionsPrevious, deltaPercent: calculateDeltaPercent(directionsCurrent, directionsPrevious) },
          syncedAt
        }));
      }
    }

    const payload = { source: 'google-api', syncedAt, summary: calculateDashboardSummary(branches), branches };
    await createCacheStore().writeCache(payload);
    syncState = { status: 'success', stage: 'cache-saved', error: null, startedAt: syncState.startedAt, finishedAt: new Date().toISOString() };
    return payload;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sync failed';
    syncState = { status: 'error', stage: 'failed', error: message, startedAt: syncState.startedAt, finishedAt: new Date().toISOString() };
    throw error;
  }
}
