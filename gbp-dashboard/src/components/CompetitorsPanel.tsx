import { Trophy } from 'lucide-react';
import { leftChoiceBranchNames, leftChoiceCompetitors } from '../shared/leftchoiceData';
import { Badge, Card, CardDescription, CardHeader, CardTitle } from './ui';

export function CompetitorsPanel() {
  return (
    <Card className="table-card">
      <CardHeader className="table-card-header">
        <div>
          <CardTitle>Competitors</CardTitle>
          <CardDescription>Benchmark local competitors by rating, reviews, ranking, completeness, and action gap.</CardDescription>
        </div>
        <Badge variant="warning"><Trophy size={13} aria-hidden="true" /> Benchmark</Badge>
      </CardHeader>
      <div className="branch-table compact-table">
        <table>
          <thead>
            <tr>
              <th>Competitor</th>
              <th>Compared Branch</th>
              <th>City</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>Keyword Rank</th>
              <th>Completeness</th>
              <th>Gap</th>
            </tr>
          </thead>
          <tbody>
            {leftChoiceCompetitors.map((competitor) => (
              <tr key={competitor.id}>
                <td><strong>{competitor.name}</strong><small>{competitor.category}</small></td>
                <td>{leftChoiceBranchNames[competitor.branchId] ?? competitor.branchId}</td>
                <td>{competitor.city}</td>
                <td>{competitor.rating}</td>
                <td>{competitor.reviews}</td>
                <td><Badge variant={competitor.keywordRank <= 3 ? 'danger' : 'warning'}>#{competitor.keywordRank}</Badge></td>
                <td>{competitor.completeness}%</td>
                <td>{competitor.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
