import { useEffect, useMemo, useState } from 'react';
import { BranchTable } from './components/BranchTable';
import { FilterBar, type GlobalFilters } from './components/FilterBar';
import { NeedsReview } from './components/NeedsReview';
import { ProfileHealth } from './components/ProfileHealth';
import { Scorecards } from './components/Scorecards';
import { SettingsSync } from './components/SettingsSync';
import { filterBranches } from './shared/filters';
import { calculateDashboardSummary } from './shared/metrics';
import type { BranchProfile, DashboardSummary } from './shared/types';

interface DashboardPayload {
  source: string;
  syncedAt: string;
  summary: DashboardSummary;
  branches: BranchProfile[];
}

const initialFilters: GlobalFilters = { dateRange: 'last-28-days', brandId: 'all', search: '' };
type Tab = 'overview' | 'branches' | 'profile-health' | 'needs-review' | 'settings';

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'branches', label: 'Branches' },
  { id: 'profile-health', label: 'Profile Health' },
  { id: 'needs-review', label: 'Needs Review' },
  { id: 'settings', label: 'Settings & Sync' }
];

export default function App() {
  const [payload, setPayload] = useState<DashboardPayload | null>(null);
  const [filters, setFilters] = useState(initialFilters);
  const [tab, setTab] = useState<Tab>('overview');
  const [loadError, setLoadError] = useState('');

  function loadDashboard() {
    setLoadError('');
    fetch('/api/dashboard')
      .then((response) => {
        if (!response.ok) throw new Error('Dashboard API failed');
        return response.json();
      })
      .then(setPayload)
      .catch((error) => setLoadError(error instanceof Error ? error.message : 'Unable to load dashboard'));
  }

  useEffect(() => { loadDashboard(); }, []);

  const filteredBranches = useMemo(() => {
    if (!payload) return [];
    return filterBranches(payload.branches, { brandId: filters.brandId === 'all' ? undefined : filters.brandId, search: filters.search });
  }, [payload, filters]);

  const summary = useMemo(() => calculateDashboardSummary(filteredBranches), [filteredBranches]);

  if (loadError) {
    return <main className="app-shell"><p className="error-text">{loadError}</p></main>;
  }

  if (!payload) {
    return <main className="app-shell"><p>Loading dashboard data...</p></main>;
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Google Business Profile</p>
          <h1>Performance Dashboard</h1>
          <p>Last sync: {new Date(payload.syncedAt).toLocaleString('id-ID')} · Source: {payload.source}</p>
        </div>
      </header>

      <nav className="tabs" aria-label="Dashboard pages">
        {tabs.map((item) => (
          <button type="button" className={tab === item.id ? 'active-tab' : ''} onClick={() => setTab(item.id)} key={item.id}>{item.label}</button>
        ))}
      </nav>

      <FilterBar filters={filters} onChange={setFilters} />

      {tab === 'overview' && <><Scorecards summary={summary} /><ProfileHealth branches={filteredBranches} compact /><BranchTable branches={filteredBranches} /></>}
      {tab === 'branches' && <BranchTable branches={filteredBranches} />}
      {tab === 'profile-health' && <ProfileHealth branches={filteredBranches} />}
      {tab === 'needs-review' && <NeedsReview branches={payload.branches} />}
      {tab === 'settings' && <SettingsSync onSynced={loadDashboard} />}
    </main>
  );
}
