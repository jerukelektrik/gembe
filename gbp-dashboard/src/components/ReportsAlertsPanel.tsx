import { AlertTriangle, FileText } from 'lucide-react';
import { getBrandLabel } from '../shared/brands';
import { leftChoiceAlerts, leftChoiceBranchNames, leftChoiceReports } from '../shared/leftchoiceData';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui';

function severityVariant(severity: 'critical' | 'warning' | 'info') {
  return severity === 'critical' ? 'danger' : severity === 'warning' ? 'warning' : 'info';
}

export function ReportsAlertsPanel() {
  return (
    <div className="content-stack">
      <Card>
        <CardHeader className="section-header">
          <div>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Exception queue for negative reviews, suspended listings, profile drops, ranking drops, and sync warnings.</CardDescription>
          </div>
          <Badge variant="danger"><AlertTriangle size={13} aria-hidden="true" /> {leftChoiceAlerts.filter((alert) => alert.severity === 'critical').length} critical</Badge>
        </CardHeader>
        <CardContent className="issue-list">
          {leftChoiceAlerts.map((alert) => (
            <article className="issue-row" key={alert.id}>
              <div className="issue-icon"><AlertTriangle size={18} aria-hidden="true" /></div>
              <div>
                <strong>{alert.title}</strong>
                <span>{leftChoiceBranchNames[alert.branchId] ?? alert.branchId}</span>
                <p>{alert.detail}</p>
              </div>
              <div className="issue-side">
                <Badge variant={severityVariant(alert.severity)}>{alert.severity}</Badge>
                <Badge variant="secondary">{alert.type}</Badge>
                <small>{new Date(alert.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</small>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="section-header">
          <div>
            <CardTitle>Weekly Brand Reports</CardTitle>
            <CardDescription>Brand-level snapshot for manager reporting and weekly local SEO review.</CardDescription>
          </div>
          <Badge variant="info"><FileText size={13} aria-hidden="true" /> Weekly summary</Badge>
        </CardHeader>
        <CardContent className="report-grid">
          {leftChoiceReports.map((report) => (
            <article className="report-card" key={report.brandId}>
              <strong>{getBrandLabel(report.brandId)}</strong>
              <div><span>Profile Strength</span><b>{report.profileStrength}%</b></div>
              <div><span>Review Response</span><b>{report.reviewResponseRate}%</b></div>
              <div><span>Ranking Drops</span><b>{report.rankingDrops}</b></div>
              <div><span>Open Alerts</span><b>{report.openAlerts}</b></div>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
