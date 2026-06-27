import { CalendarClock, Send } from 'lucide-react';
import { getBrandLabel } from '../shared/brands';
import { leftChoiceBranchNames, leftChoicePosts } from '../shared/leftchoiceData';
import { Badge, Card, CardDescription, CardHeader, CardTitle } from './ui';

function statusVariant(status: string) {
  if (status === 'published') return 'success';
  if (status === 'failed') return 'danger';
  if (status === 'scheduled') return 'info';
  return 'warning';
}

export function PostSchedulingPanel() {
  return (
    <Card className="table-card">
      <CardHeader className="table-card-header">
        <div>
          <CardTitle>Post Scheduling</CardTitle>
          <CardDescription>Campaign calendar simulation for Google Business Profile posts. Actions are demo-only until Google publish integration is enabled.</CardDescription>
        </div>
        <Badge variant="warning"><Send size={13} aria-hidden="true" /> Draft workflow only</Badge>
      </CardHeader>
      <div className="branch-table compact-table">
        <table>
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Target</th>
              <th>Type</th>
              <th>Schedule</th>
              <th>Status</th>
              <th>UTM Label</th>
            </tr>
          </thead>
          <tbody>
            {leftChoicePosts.map((post) => (
              <tr key={post.id}>
                <td><strong>{post.campaign}</strong><small>{getBrandLabel(post.brandId)}</small></td>
                <td>{leftChoiceBranchNames[post.branchId] ?? post.branchId}</td>
                <td><Badge variant="secondary">{post.type}</Badge></td>
                <td><CalendarClock size={14} aria-hidden="true" /> {new Date(post.scheduledFor).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td><Badge variant={statusVariant(post.status)}>{post.status}</Badge></td>
                <td><code>{post.utmLabel}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
