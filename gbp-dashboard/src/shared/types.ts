export type BrandId =
  | 'ruangguru'
  | 'brainacademy'
  | 'mathchamps'
  | 'englishacademy'
  | 'kalananti-ruangguru-coding'
  | 'workabroad-academy'
  | 'ruangguru-privat'
  | 'altaglobal-school'
  | 'needs-review';

export type BrandConfidence = 'high' | 'low';

export type ProfileStatus =
  | 'verified'
  | 'unverified'
  | 'google-update'
  | 'pending-review'
  | 'temporarily-closed'
  | 'permanently-closed'
  | 'disabled'
  | 'suspended'
  | 'duplicate'
  | 'missing-store-code'
  | 'unknown';

export type BlockingReason =
  | 'complete'
  | 'not-registered'
  | 'rating'
  | 'reviews'
  | 'rating-and-reviews'
  | 'needs-review';

export interface ActionMetricValue {
  current: number | null;
  previous: number | null;
  deltaPercent: number | null;
}

export interface BranchProfile {
  id: string;
  accountName: string;
  locationName: string;
  title: string;
  brandId: BrandId;
  brandConfidence: BrandConfidence;
  storeCode: string | null;
  address: string | null;
  profileStatus: ProfileStatus;
  verified: boolean;
  averageRating: number | null;
  totalReviews: number | null;
  completionStatus: 'complete' | 'not-complete';
  blockingReason: BlockingReason;
  websiteClicks: ActionMetricValue;
  callClicks: ActionMetricValue;
  directionRequests: ActionMetricValue;
  lastSyncedAt: string;
}

export interface DashboardSummary {
  totalProfiles: number;
  verifiedProfiles: number;
  completedProfiles: number;
  registerRate: number;
  completionRate: number;
  notCompleteProfiles: number;
}
