import { MapPinned } from 'lucide-react';
import { leftChoiceBranchNames, leftChoiceGeoCells } from '../shared/leftchoiceData';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui';

function rankClass(rank: number) {
  if (rank <= 3) return 'rank-strong';
  if (rank <= 10) return 'rank-medium';
  return 'rank-weak';
}

export function GeoGridPanel() {
  const averageRank = Math.round(leftChoiceGeoCells.reduce((sum, cell) => sum + cell.rank, 0) / leftChoiceGeoCells.length);
  const weakZones = leftChoiceGeoCells.filter((cell) => cell.rank > 10).length;
  const branchId = leftChoiceGeoCells[0]?.branchId ?? '';
  const keyword = leftChoiceGeoCells[0]?.keyword ?? '';

  return (
    <Card>
      <CardHeader className="section-header">
        <div>
          <CardTitle>Geo Grid Ranker</CardTitle>
          <CardDescription>Visual approximation of local rank coverage around one branch. This is dummy data, not a live map API.</CardDescription>
        </div>
        <div className="row-actions">
          <Badge variant="secondary"><MapPinned size={13} aria-hidden="true" /> {leftChoiceBranchNames[branchId] ?? branchId}</Badge>
          <Badge variant="info">{keyword}</Badge>
        </div>
      </CardHeader>
      <CardContent className="geo-layout">
        <div className="geo-grid" aria-label="Geo grid ranking cells">
          {leftChoiceGeoCells.map((cell) => (
            <div className={`geo-cell ${rankClass(cell.rank)}`} key={cell.id}>
              <span>#{cell.rank}</span>
            </div>
          ))}
        </div>
        <div className="geo-summary">
          <div><span>Average Rank</span><strong>#{averageRank}</strong></div>
          <div><span>Weak Zones</span><strong>{weakZones}</strong></div>
          <div><span>Grid Size</span><strong>5 x 5</strong></div>
        </div>
      </CardContent>
    </Card>
  );
}
