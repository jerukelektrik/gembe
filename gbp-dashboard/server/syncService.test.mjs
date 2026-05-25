import { describe, expect, it } from 'vitest';
import { normalizeLocation } from './syncService.mjs';

describe('normalizeLocation', () => {
  it('maps Google location fields into a branch profile', () => {
    const branch = normalizeLocation({
      accountName: 'accounts/1',
      location: {
        name: 'locations/123',
        title: 'Brain Academy Bandung',
        storeCode: 'BA-BDG',
        metadata: { hasGoogleUpdated: false, duplicateLocation: null },
        openInfo: { status: 'OPEN' },
        storefrontAddress: { locality: 'Bandung' }
      },
      rating: 4.6,
      totalReviews: 11,
      websiteClicks: { current: 20, previous: 10, deltaPercent: 100 },
      callClicks: { current: 5, previous: 5, deltaPercent: 0 },
      directionRequests: { current: 8, previous: 4, deltaPercent: 100 },
      syncedAt: '2026-05-25T02:00:00.000Z'
    });

    expect(branch).toMatchObject({
      id: 'locations/123',
      brandId: 'brainacademy',
      profileStatus: 'verified',
      verified: true,
      completionStatus: 'complete',
      blockingReason: 'complete'
    });
  });
});
