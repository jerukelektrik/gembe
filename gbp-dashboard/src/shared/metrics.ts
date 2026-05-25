import type { BlockingReason, BranchProfile, BrandId, DashboardSummary } from './types';

export function roundRate(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateDeltaPercent(current: number | null, previous: number | null): number | null {
  if (current === null || previous === null || previous === 0) return null;
  return roundRate(((current - previous) / previous) * 100);
}

export function getBlockingReason(input: {
  verified: boolean;
  averageRating: number | null;
  totalReviews: number | null;
  brandId: BrandId;
}): BlockingReason {
  if (input.brandId === 'needs-review') return 'needs-review';
  if (!input.verified) return 'not-registered';

  const ratingBlocked = input.averageRating === null || input.averageRating < 4.5;
  const reviewBlocked = input.totalReviews === null || input.totalReviews < 10;

  if (ratingBlocked && reviewBlocked) return 'rating-and-reviews';
  if (ratingBlocked) return 'rating';
  if (reviewBlocked) return 'reviews';
  return 'complete';
}

export function calculateDashboardSummary(branches: BranchProfile[]): DashboardSummary {
  const totalProfiles = branches.length;
  const verifiedProfiles = branches.filter((branch) => branch.verified).length;
  const completedProfiles = branches.filter((branch) => branch.completionStatus === 'complete').length;

  return {
    totalProfiles,
    verifiedProfiles,
    completedProfiles,
    registerRate: totalProfiles === 0 ? 0 : roundRate((verifiedProfiles / totalProfiles) * 100),
    completionRate: totalProfiles === 0 ? 0 : roundRate((completedProfiles / totalProfiles) * 100),
    notCompleteProfiles: totalProfiles - completedProfiles
  };
}
