import { mockBranches } from '../server/mockData.mjs';

function roundRate(value) {
  return Math.round(value * 100) / 100;
}

function calculateDashboardSummary(branches) {
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

export default function handler(_request, response) {
  const syncedAt = '2026-06-27T04:00:00.000Z';
  response.status(200).json({
    source: 'vercel-demo',
    syncedAt,
    summary: calculateDashboardSummary(mockBranches),
    branches: mockBranches.map((branch) => ({ ...branch, lastSyncedAt: syncedAt }))
  });
}
