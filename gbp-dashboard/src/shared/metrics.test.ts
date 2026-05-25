import { describe, expect, it } from 'vitest';
import type { BranchProfile } from './types';
import { calculateDashboardSummary, calculateDeltaPercent, getBlockingReason } from './metrics';

const baseBranch: BranchProfile = {
  id: '1',
  accountName: 'accounts/1',
  locationName: 'locations/1',
  title: 'Brain Academy Bandung',
  brandId: 'brainacademy',
  brandConfidence: 'high',
  storeCode: 'BA-BDG',
  address: 'Bandung',
  profileStatus: 'verified',
  verified: true,
  averageRating: 4.5,
  totalReviews: 10,
  completionStatus: 'complete',
  blockingReason: 'complete',
  websiteClicks: { current: 10, previous: 5, deltaPercent: 100 },
  callClicks: { current: 2, previous: 1, deltaPercent: 100 },
  directionRequests: { current: 3, previous: 3, deltaPercent: 0 },
  lastSyncedAt: '2026-05-25T02:00:00.000Z'
};

describe('calculateDeltaPercent', () => {
  it('returns percentage change when previous value is positive', () => {
    expect(calculateDeltaPercent(120, 100)).toBe(20);
  });

  it('returns null when previous value is zero', () => {
    expect(calculateDeltaPercent(12, 0)).toBeNull();
  });
});

describe('getBlockingReason', () => {
  it('treats rating 4.5 and reviews 10 as complete when verified', () => {
    expect(getBlockingReason({ verified: true, averageRating: 4.5, totalReviews: 10, brandId: 'brainacademy' })).toBe('complete');
  });

  it('identifies each blocking reason', () => {
    expect(getBlockingReason({ verified: false, averageRating: 5, totalReviews: 20, brandId: 'brainacademy' })).toBe('not-registered');
    expect(getBlockingReason({ verified: true, averageRating: 4.4, totalReviews: 20, brandId: 'brainacademy' })).toBe('rating');
    expect(getBlockingReason({ verified: true, averageRating: 4.8, totalReviews: 9, brandId: 'brainacademy' })).toBe('reviews');
    expect(getBlockingReason({ verified: true, averageRating: 4.3, totalReviews: 9, brandId: 'brainacademy' })).toBe('rating-and-reviews');
    expect(getBlockingReason({ verified: true, averageRating: 5, totalReviews: 20, brandId: 'needs-review' })).toBe('needs-review');
  });
});

describe('calculateDashboardSummary', () => {
  it('calculates overall rates against all profiles', () => {
    const branches = [
      baseBranch,
      { ...baseBranch, id: '2', verified: true, completionStatus: 'not-complete' as const, blockingReason: 'rating' as const, averageRating: 4.2 },
      { ...baseBranch, id: '3', verified: false, completionStatus: 'not-complete' as const, blockingReason: 'not-registered' as const, profileStatus: 'unverified' as const }
    ];

    expect(calculateDashboardSummary(branches)).toEqual({
      totalProfiles: 3,
      verifiedProfiles: 2,
      completedProfiles: 1,
      registerRate: 66.67,
      completionRate: 33.33,
      notCompleteProfiles: 2
    });
  });
});
