export type BrandId =
  | 'ruangguru'
  | 'brainacademy'
  | 'mathchamps'
  | 'englishacademy'
  | 'kalananti-ruangguru-coding'
  | 'workabroad-academy'
  | 'ruangguru-privat'
  | 'altaglobal-school'
  | 'wonderlab'
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

export interface LeftChoiceBranchMeta {
  branchId: string;
  city: string;
  province: string;
  owner: string;
  profileStrength: number;
  completionScore: number;
  suspensionRisk: 'low' | 'medium' | 'high';
  issues: string[];
}

export interface LeftChoiceReview {
  id: string;
  branchId: string;
  reviewer: string;
  rating: 1 | 2 | 3 | 4 | 5;
  sentiment: 'positive' | 'neutral' | 'negative';
  status: 'pending' | 'drafted' | 'approved' | 'replied';
  text: string;
  suggestedReply: string;
  createdAt: string;
}

export interface LeftChoiceContentIssue {
  id: string;
  branchId: string;
  type: 'photo' | 'service' | 'category' | 'description' | 'brand-asset';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  recommendation: string;
  owner: string;
}

export interface LeftChoicePost {
  id: string;
  branchId: string;
  brandId: BrandId;
  campaign: string;
  type: 'offer' | 'event' | 'update' | 'trial-class' | 'open-house';
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledFor: string;
  utmLabel: string;
}

export interface LeftChoiceRanking {
  id: string;
  branchId: string;
  brandId: BrandId;
  city: string;
  keyword: string;
  currentRank: number;
  previousRank: number;
  topCompetitor: string;
}

export interface LeftChoiceGeoCell {
  id: string;
  branchId: string;
  keyword: string;
  x: number;
  y: number;
  rank: number;
}

export interface LeftChoiceCompetitor {
  id: string;
  branchId: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviews: number;
  keywordRank: number;
  completeness: number;
  gap: string;
}

export interface LeftChoiceAlert {
  id: string;
  branchId: string;
  severity: 'critical' | 'warning' | 'info';
  type: 'negative-review' | 'suspended-listing' | 'ranking-drop' | 'sync-warning' | 'profile-drop';
  title: string;
  detail: string;
  createdAt: string;
}

export interface LeftChoiceReportSummary {
  brandId: BrandId;
  profileStrength: number;
  reviewResponseRate: number;
  rankingDrops: number;
  openAlerts: number;
}
