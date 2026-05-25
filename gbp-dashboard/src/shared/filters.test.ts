import { describe, expect, it } from 'vitest';
import type { BranchProfile } from './types';
import { filterBranches, sortBranches } from './filters';

function branch(overrides: Partial<BranchProfile>): BranchProfile {
  return {
    id: overrides.id ?? 'id',
    accountName: 'accounts/1',
    locationName: 'locations/1',
    title: overrides.title ?? 'Branch',
    brandId: overrides.brandId ?? 'brainacademy',
    brandConfidence: overrides.brandConfidence ?? 'high',
    storeCode: null,
    address: null,
    profileStatus: overrides.profileStatus ?? 'verified',
    verified: overrides.verified ?? true,
    averageRating: overrides.averageRating ?? 4.8,
    totalReviews: overrides.totalReviews ?? 20,
    completionStatus: overrides.completionStatus ?? 'complete',
    blockingReason: overrides.blockingReason ?? 'complete',
    websiteClicks: overrides.websiteClicks ?? { current: 10, previous: 5, deltaPercent: 100 },
    callClicks: overrides.callClicks ?? { current: 2, previous: 1, deltaPercent: 100 },
    directionRequests: overrides.directionRequests ?? { current: 3, previous: 3, deltaPercent: 0 },
    lastSyncedAt: '2026-05-25T02:00:00.000Z'
  };
}

describe('filterBranches', () => {
  it('filters by brand, rating, reviews, website, call, and blocking reason', () => {
    const branches = [
      branch({ id: 'a', brandId: 'brainacademy', averageRating: 4.3, totalReviews: 42, websiteClicks: { current: 120, previous: 100, deltaPercent: 20 }, callClicks: { current: 31, previous: 20, deltaPercent: 55 }, blockingReason: 'rating', completionStatus: 'not-complete' }),
      branch({ id: 'b', brandId: 'englishacademy', averageRating: 4.8, totalReviews: 7, websiteClicks: { current: 84, previous: 80, deltaPercent: 5 }, callClicks: { current: 22, previous: 20, deltaPercent: 10 }, blockingReason: 'reviews', completionStatus: 'not-complete' })
    ];

    expect(filterBranches(branches, { brandId: 'brainacademy', ratingMax: 4.5, reviewsMin: 10, websiteMin: 100, callMin: 30, blockingReason: 'rating' }).map((item) => item.id)).toEqual(['a']);
  });
});

describe('sortBranches', () => {
  it('sorts one active numeric column ascending and descending', () => {
    const branches = [branch({ id: 'low', averageRating: 4.2 }), branch({ id: 'high', averageRating: 4.9 })];
    expect(sortBranches(branches, { column: 'averageRating', direction: 'desc' }).map((item) => item.id)).toEqual(['high', 'low']);
    expect(sortBranches(branches, { column: 'averageRating', direction: 'asc' }).map((item) => item.id)).toEqual(['low', 'high']);
  });
});
