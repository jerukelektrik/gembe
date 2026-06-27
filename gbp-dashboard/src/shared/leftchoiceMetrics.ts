import type { BranchProfile, LeftChoiceAlert, LeftChoiceBranchMeta, LeftChoiceRanking, LeftChoiceReview } from './types';

export function getBranchMeta(branchId: string, metas: LeftChoiceBranchMeta[]): LeftChoiceBranchMeta | undefined {
  return metas.find((meta) => meta.branchId === branchId);
}

export function getProfileStrength(branches: BranchProfile[], metas: LeftChoiceBranchMeta[]): number {
  if (branches.length === 0) return 0;
  const total = branches.reduce((sum, branch) => {
    const meta = getBranchMeta(branch.id, metas);
    return sum + (meta?.profileStrength ?? (branch.verified ? 82 : 38));
  }, 0);
  return Math.round(total / branches.length);
}

export function getCompletionScore(branches: BranchProfile[], metas: LeftChoiceBranchMeta[]): number {
  if (branches.length === 0) return 0;
  const total = branches.reduce((sum, branch) => {
    const meta = getBranchMeta(branch.id, metas);
    return sum + (meta?.completionScore ?? (branch.completionStatus === 'complete' ? 90 : 45));
  }, 0);
  return Math.round(total / branches.length);
}

export function getSuspensionRisk(alerts: LeftChoiceAlert[]): 'Low' | 'Medium' | 'High' {
  const critical = alerts.filter((alert) => alert.severity === 'critical').length;
  const warning = alerts.filter((alert) => alert.severity === 'warning').length;
  if (critical >= 2 || warning >= 4) return 'High';
  if (critical >= 1 || warning >= 2) return 'Medium';
  return 'Low';
}

export function getReviewResponseRate(reviews: LeftChoiceReview[]): number {
  if (reviews.length === 0) return 0;
  const handled = reviews.filter((review) => review.status === 'approved' || review.status === 'replied').length;
  return Math.round((handled / reviews.length) * 100);
}

export function getRankingDrops(rankings: LeftChoiceRanking[]): number {
  return rankings.filter((ranking) => ranking.currentRank > ranking.previousRank).length;
}

export function getPriorityBranches(branches: BranchProfile[], metas: LeftChoiceBranchMeta[], alerts: LeftChoiceAlert[]): BranchProfile[] {
  const alertScore = new Map<string, number>();
  for (const alert of alerts) {
    const score = alert.severity === 'critical' ? 30 : alert.severity === 'warning' ? 15 : 5;
    alertScore.set(alert.branchId, (alertScore.get(alert.branchId) ?? 0) + score);
  }

  return [...branches]
    .sort((a, b) => {
      const aMeta = getBranchMeta(a.id, metas);
      const bMeta = getBranchMeta(b.id, metas);
      const aScore = (100 - (aMeta?.completionScore ?? 50)) + (alertScore.get(a.id) ?? 0);
      const bScore = (100 - (bMeta?.completionScore ?? 50)) + (alertScore.get(b.id) ?? 0);
      return bScore - aScore;
    })
    .slice(0, 5);
}
