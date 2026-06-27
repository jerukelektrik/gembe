import { AlertTriangle, CheckCircle2, MessageSquareReply, ShieldAlert, Star, TrendingDown } from 'lucide-react';
import { Badge, Card } from './ui';
import type { DashboardSummary } from '../shared/types';

interface ScorecardsProps {
  summary: DashboardSummary;
  selectedListings?: number;
  completionScore?: number;
  profileStrength?: number;
  suspensionRisk?: 'Low' | 'Medium' | 'High';
  reviewResponseRate?: number;
  rankingDrops?: number;
}

export function Scorecards({ summary, selectedListings, completionScore, profileStrength, suspensionRisk, reviewResponseRate, rankingDrops }: ScorecardsProps) {
  const cards = [
    { label: 'Selected Listings', value: String(selectedListings ?? summary.totalProfiles), detail: `${summary.verifiedProfiles} verified profiles under current view`, tag: 'Portfolio', tone: 'info', progress: summary.registerRate, Icon: CheckCircle2 },
    { label: 'Completion Score', value: `${completionScore ?? summary.completionRate}%`, detail: `${summary.completedProfiles} complete / ${summary.totalProfiles} profiles`, tag: 'Audit', tone: 'warning', progress: completionScore ?? summary.completionRate, Icon: Star },
    { label: 'Profile Strength', value: `${profileStrength ?? summary.registerRate}%`, detail: 'Weighted profile quality from dummy audit signals', tag: 'Health', tone: 'success', progress: profileStrength ?? summary.registerRate, Icon: ShieldAlert },
    { label: 'Suspension Risk', value: suspensionRisk ?? 'Low', detail: 'Based on active critical and warning alerts', tag: 'Risk', tone: suspensionRisk === 'High' ? 'danger' : suspensionRisk === 'Medium' ? 'warning' : 'success', progress: suspensionRisk === 'High' ? 88 : suspensionRisk === 'Medium' ? 54 : 18, Icon: AlertTriangle },
    { label: 'Review Response', value: `${reviewResponseRate ?? 0}%`, detail: 'Approved or replied reviews in demo inbox', tag: 'Reviews', tone: 'info', progress: reviewResponseRate ?? 0, Icon: MessageSquareReply },
    { label: 'Ranking Drops', value: String(rankingDrops ?? 0), detail: 'Tracked keywords where local rank worsened', tag: 'SEO', tone: (rankingDrops ?? 0) > 0 ? 'danger' : 'success', progress: (rankingDrops ?? 0) > 0 ? 68 : 8, Icon: TrendingDown }
  ];

  return (
    <section className="scorecard-grid" aria-label="KPI scorecards">
      {cards.map(({ Icon, ...card }) => (
        <Card className={`scorecard scorecard-${card.tone}`} key={card.label}>
          <div className="scorecard-title">
            <span className="scorecard-icon"><Icon size={18} aria-hidden="true" /></span>
            <p>{card.label}</p>
            <Badge variant={card.tone as 'success' | 'warning' | 'danger' | 'info'}>{card.tag}</Badge>
          </div>
          <strong>{card.value}</strong>
          <span>{card.detail}</span>
          {card.progress !== null && <div className="scorecard-progress" aria-hidden="true"><i style={{ width: `${Math.min(100, Math.max(0, card.progress))}%` }} /></div>}
        </Card>
      ))}
    </section>
  );
}
