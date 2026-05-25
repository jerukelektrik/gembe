import { getBrandLabel } from './brands';
import type { BranchProfile } from './types';

export interface ExportPeriodContext {
  activeStart: string;
  activeEnd: string;
  compareStart: string;
  compareEnd: string;
}

export type ExportRow = Record<string, string | number | null>;

export function buildExportRows(branches: BranchProfile[], period: ExportPeriodContext): ExportRow[] {
  return branches.map((branch) => ({
    brand: getBrandLabel(branch.brandId),
    branch: branch.title,
    storeCode: branch.storeCode,
    profileStatus: branch.profileStatus,
    verifiedStatus: branch.verified ? 'verified' : 'unverified',
    completionStatus: branch.completionStatus,
    blockingReason: branch.blockingReason,
    averageRating: branch.averageRating,
    totalReviews: branch.totalReviews,
    websiteClicks: branch.websiteClicks.current,
    websiteClicksDeltaPercent: branch.websiteClicks.deltaPercent,
    callClicks: branch.callClicks.current,
    callClicksDeltaPercent: branch.callClicks.deltaPercent,
    directionRequests: branch.directionRequests.current,
    directionRequestsDeltaPercent: branch.directionRequests.deltaPercent,
    activePeriodStart: period.activeStart,
    activePeriodEnd: period.activeEnd,
    comparisonPeriodStart: period.compareStart,
    comparisonPeriodEnd: period.compareEnd,
    lastSyncedAt: branch.lastSyncedAt
  }));
}

function escapeCsv(value: string | number | null): string {
  if (value === null) return '';
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toCsv(rows: ExportRow[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(','));
  return [headers.join(','), ...lines].join('\n');
}
