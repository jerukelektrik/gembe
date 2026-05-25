import type { BlockingReason, BranchProfile, BrandId, ProfileStatus } from './types';

export interface BranchFilters {
  brandId?: BrandId;
  profileStatus?: ProfileStatus;
  completionStatus?: 'complete' | 'not-complete';
  blockingReason?: BlockingReason;
  search?: string;
  ratingMin?: number;
  ratingMax?: number;
  reviewsMin?: number;
  reviewsMax?: number;
  websiteMin?: number;
  websiteMax?: number;
  callMin?: number;
  callMax?: number;
}

export type SortColumn = 'title' | 'brandId' | 'profileStatus' | 'averageRating' | 'totalReviews' | 'websiteClicks' | 'callClicks' | 'blockingReason';

export interface BranchSort {
  column: SortColumn;
  direction: 'asc' | 'desc';
}

function inRange(value: number | null, min?: number, max?: number): boolean {
  if (value === null) return min === undefined && max === undefined;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}

export function filterBranches(branches: BranchProfile[], filters: BranchFilters): BranchProfile[] {
  const search = filters.search?.trim().toLowerCase();

  return branches.filter((branch) => {
    if (filters.brandId && branch.brandId !== filters.brandId) return false;
    if (filters.profileStatus && branch.profileStatus !== filters.profileStatus) return false;
    if (filters.completionStatus && branch.completionStatus !== filters.completionStatus) return false;
    if (filters.blockingReason && branch.blockingReason !== filters.blockingReason) return false;
    if (search && !`${branch.title} ${branch.storeCode ?? ''} ${branch.address ?? ''}`.toLowerCase().includes(search)) return false;
    if (!inRange(branch.averageRating, filters.ratingMin, filters.ratingMax)) return false;
    if (!inRange(branch.totalReviews, filters.reviewsMin, filters.reviewsMax)) return false;
    if (!inRange(branch.websiteClicks.current, filters.websiteMin, filters.websiteMax)) return false;
    if (!inRange(branch.callClicks.current, filters.callMin, filters.callMax)) return false;
    return true;
  });
}

function sortValue(branch: BranchProfile, column: SortColumn): string | number | null {
  if (column === 'websiteClicks') return branch.websiteClicks.current;
  if (column === 'callClicks') return branch.callClicks.current;
  return branch[column];
}

export function sortBranches(branches: BranchProfile[], sort: BranchSort): BranchProfile[] {
  return [...branches].sort((a, b) => {
    const aValue = sortValue(a, sort.column);
    const bValue = sortValue(b, sort.column);
    if (aValue === bValue) return a.title.localeCompare(b.title);
    if (aValue === null) return 1;
    if (bValue === null) return -1;
    const direction = sort.direction === 'asc' ? 1 : -1;
    if (typeof aValue === 'number' && typeof bValue === 'number') return (aValue - bValue) * direction;
    return String(aValue).localeCompare(String(bValue)) * direction;
  });
}
