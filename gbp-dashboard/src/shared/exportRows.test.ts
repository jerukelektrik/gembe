import { describe, expect, it } from 'vitest';
import type { BranchProfile } from './types';
import { buildExportRows, toCsv } from './exportRows';

const branch: BranchProfile = {
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
  averageRating: 4.3,
  totalReviews: 42,
  completionStatus: 'not-complete',
  blockingReason: 'rating',
  websiteClicks: { current: 120, previous: 100, deltaPercent: 20 },
  callClicks: { current: 31, previous: 20, deltaPercent: 55 },
  directionRequests: { current: 44, previous: 40, deltaPercent: 10 },
  lastSyncedAt: '2026-05-25T02:00:00.000Z'
};

describe('buildExportRows', () => {
  it('builds branch metric rows for export', () => {
    expect(buildExportRows([branch], { activeStart: '2026-04-28', activeEnd: '2026-05-25', compareStart: '2026-03-31', compareEnd: '2026-04-27' })).toEqual([
      {
        brand: 'Brain Academy',
        branch: 'Brain Academy Bandung',
        storeCode: 'BA-BDG',
        profileStatus: 'verified',
        verifiedStatus: 'verified',
        completionStatus: 'not-complete',
        blockingReason: 'rating',
        averageRating: 4.3,
        totalReviews: 42,
        websiteClicks: 120,
        websiteClicksDeltaPercent: 20,
        callClicks: 31,
        callClicksDeltaPercent: 55,
        directionRequests: 44,
        directionRequestsDeltaPercent: 10,
        activePeriodStart: '2026-04-28',
        activePeriodEnd: '2026-05-25',
        comparisonPeriodStart: '2026-03-31',
        comparisonPeriodEnd: '2026-04-27',
        lastSyncedAt: '2026-05-25T02:00:00.000Z'
      }
    ]);
  });

  it('creates csv with headers', () => {
    expect(toCsv([{ brand: 'Brain Academy', branch: 'Brain Academy Bandung' }])).toBe('brand,branch\nBrain Academy,Brain Academy Bandung');
  });
});
