import { CheckCircle2, MousePointerClick, ShieldAlert, Star } from 'lucide-react';
import type { DashboardSummary } from '../shared/types';

interface ScorecardsProps {
  summary: DashboardSummary;
}

export function Scorecards({ summary }: ScorecardsProps) {
  const cards = [
    { label: 'Register Rate', value: `${summary.registerRate}%`, detail: `${summary.verifiedProfiles} verified / ${summary.totalProfiles} profiles`, tone: 'success', Icon: CheckCircle2 },
    { label: 'Completion Rate', value: `${summary.completionRate}%`, detail: `${summary.completedProfiles} complete / ${summary.totalProfiles} profiles`, tone: 'warning', Icon: Star },
    { label: 'Action Clicks', value: 'Compare on', detail: 'Website, call, and directions vs previous period', tone: 'info', Icon: MousePointerClick },
    { label: 'Blocking Branches', value: String(summary.notCompleteProfiles), detail: 'Profiles not complete under current filters', tone: 'danger', Icon: ShieldAlert }
  ];

  return (
    <section className="scorecard-grid" aria-label="KPI scorecards">
      {cards.map(({ Icon, ...card }) => (
        <article className={`scorecard scorecard-${card.tone}`} key={card.label}>
          <div className="scorecard-title"><Icon size={18} /><p>{card.label}</p></div>
          <strong>{card.value}</strong>
          <span>{card.detail}</span>
        </article>
      ))}
    </section>
  );
}
