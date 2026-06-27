import { Image, ListChecks } from 'lucide-react';
import { leftChoiceBranchNames, leftChoiceContentIssues } from '../shared/leftchoiceData';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui';

function severityVariant(severity: 'critical' | 'warning' | 'info') {
  return severity === 'critical' ? 'danger' : severity === 'warning' ? 'warning' : 'info';
}

export function ContentPanel() {
  return (
    <Card>
      <CardHeader className="section-header">
        <div>
          <CardTitle>Content Updates</CardTitle>
          <CardDescription>Profile content hygiene queue for photos, descriptions, service entries, categories, and brand assets.</CardDescription>
        </div>
        <Badge variant="info"><Image size={13} aria-hidden="true" /> Demo content audit</Badge>
      </CardHeader>
      <CardContent className="issue-list">
        {leftChoiceContentIssues.map((issue) => (
          <article className="issue-row" key={issue.id}>
            <div className="issue-icon"><ListChecks size={18} aria-hidden="true" /></div>
            <div>
              <strong>{issue.title}</strong>
              <span>{leftChoiceBranchNames[issue.branchId] ?? issue.branchId}</span>
              <p>{issue.recommendation}</p>
            </div>
            <div className="issue-side">
              <Badge variant={severityVariant(issue.severity)}>{issue.severity}</Badge>
              <Badge variant="secondary">{issue.type}</Badge>
              <small>{issue.owner}</small>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
