import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { getBrandLabel } from '../shared/brands';
import { leftChoiceBranchNames, leftChoiceRankings } from '../shared/leftchoiceData';
import { Badge, Card, CardDescription, CardHeader, CardTitle } from './ui';

function trend(rank: { currentRank: number; previousRank: number }) {
  if (rank.currentRank < rank.previousRank) return { label: 'Improved', variant: 'success' as const, Icon: ArrowUpRight };
  if (rank.currentRank > rank.previousRank) return { label: 'Dropped', variant: 'danger' as const, Icon: ArrowDownRight };
  return { label: 'Stable', variant: 'secondary' as const, Icon: Minus };
}

export function RankTrackerPanel() {
  return (
    <Card className="table-card">
      <CardHeader className="table-card-header">
        <div>
          <CardTitle>Keyword Position</CardTitle>
          <CardDescription>Dummy local SEO rank tracker for priority keywords by branch and city.</CardDescription>
        </div>
        <Badge variant="info">AI Rank Tracker</Badge>
      </CardHeader>
      <div className="branch-table compact-table">
        <table>
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Branch</th>
              <th>Brand</th>
              <th>City</th>
              <th>Current</th>
              <th>Previous</th>
              <th>Trend</th>
              <th>Top Competitor</th>
            </tr>
          </thead>
          <tbody>
            {leftChoiceRankings.map((ranking) => {
              const currentTrend = trend(ranking);
              return (
                <tr key={ranking.id}>
                  <td><strong>{ranking.keyword}</strong></td>
                  <td>{leftChoiceBranchNames[ranking.branchId] ?? ranking.branchId}</td>
                  <td><Badge variant="secondary">{getBrandLabel(ranking.brandId)}</Badge></td>
                  <td>{ranking.city}</td>
                  <td><span className="metric-value">#{ranking.currentRank}</span></td>
                  <td>#{ranking.previousRank}</td>
                  <td><Badge variant={currentTrend.variant}><currentTrend.Icon size={12} aria-hidden="true" /> {currentTrend.label}</Badge></td>
                  <td>{ranking.topCompetitor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
