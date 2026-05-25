import { describe, expect, it } from 'vitest';
import { extractReviewStats, sumDailyMetric } from './syncService.mjs';

describe('extractReviewStats', () => {
  it('uses API aggregate fields when available', () => {
    expect(extractReviewStats({ averageRating: 4.7, totalReviewCount: 12, reviews: [] })).toEqual({ averageRating: 4.7, totalReviews: 12 });
  });

  it('falls back to review list when aggregate fields are absent', () => {
    expect(extractReviewStats({ reviews: [{ starRating: 'FIVE' }, { starRating: 'FOUR' }] })).toEqual({ averageRating: 4.5, totalReviews: 2 });
  });
});

describe('sumDailyMetric', () => {
  it('sums metric values from performance time series', () => {
    const response = {
      multiDailyMetricTimeSeries: [{
        dailyMetricTimeSeries: [{
          dailyMetric: 'WEBSITE_CLICKS',
          timeSeries: { datedValues: [{ value: '3' }, { value: '4' }] }
        }]
      }]
    };

    expect(sumDailyMetric(response, 'WEBSITE_CLICKS')).toBe(7);
  });
});
