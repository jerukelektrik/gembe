import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { BarChart3, Bell, Building2, CalendarDays, Clock3, Database, FileText, LayoutDashboard, LogOut, MapPinned, MessageSquareText, RefreshCcw, Settings, Table2, Trophy } from 'lucide-react';
import { BranchTable } from './components/BranchTable';
import { CompetitorsPanel } from './components/CompetitorsPanel';
import { ContentPanel } from './components/ContentPanel';
import { FilterBar, type GlobalFilters } from './components/FilterBar';
import { GeoGridPanel } from './components/GeoGridPanel';
import { NeedsReview } from './components/NeedsReview';
import { PostSchedulingPanel } from './components/PostSchedulingPanel';
import { RankTrackerPanel } from './components/RankTrackerPanel';
import { ReportsAlertsPanel } from './components/ReportsAlertsPanel';
import { ReviewsPanel } from './components/ReviewsPanel';
import { Scorecards } from './components/Scorecards';
import { SettingsSync } from './components/SettingsSync';
import { Alert, Badge, Button, Skeleton, TabsList, TabsTrigger } from './components/ui';
import { filterBranches } from './shared/filters';
import { leftChoiceAlerts, leftChoiceBranchMeta, leftChoiceRankings, leftChoiceReviews } from './shared/leftchoiceData';
import { getCompletionScore, getPriorityBranches, getProfileStrength, getRankingDrops, getReviewResponseRate, getSuspensionRisk } from './shared/leftchoiceMetrics';
import { calculateDashboardSummary } from './shared/metrics';
import type { BranchProfile, DashboardSummary } from './shared/types';

interface DashboardPayload {
  source: string;
  syncedAt: string;
  summary: DashboardSummary;
  branches: BranchProfile[];
}

const initialFilters: GlobalFilters = { dateRange: 'last-28-days', brandId: 'all', search: '' };
type Tab = 'overview' | 'listings' | 'reviews' | 'content' | 'posts' | 'rank-tracker' | 'geo-grid' | 'competitors' | 'reports' | 'settings';

const tabs: Array<{ id: Tab; label: string; description: string; Icon: typeof LayoutDashboard }> = [
  { id: 'overview', label: 'Overview', description: 'Executive health', Icon: LayoutDashboard },
  { id: 'listings', label: 'Listings', description: 'Cabang & issues', Icon: Table2 },
  { id: 'reviews', label: 'Reviews', description: 'Inbox & replies', Icon: MessageSquareText },
  { id: 'content', label: 'Content', description: 'Profile updates', Icon: FileText },
  { id: 'posts', label: 'Post Scheduling', description: 'Campaign calendar', Icon: CalendarDays },
  { id: 'rank-tracker', label: 'Rank Tracker', description: 'Keyword position', Icon: BarChart3 },
  { id: 'geo-grid', label: 'Geo Grid', description: 'Local visibility', Icon: MapPinned },
  { id: 'competitors', label: 'Competitors', description: 'Benchmarking', Icon: Trophy },
  { id: 'reports', label: 'Reports & Alerts', description: 'Exception queue', Icon: Bell },
  { id: 'settings', label: 'Settings', description: 'Sync & maintenance', Icon: Settings }
];

function sourceMeta(source: string): { label: string; variant: 'success' | 'warning' | 'secondary' } {
  const normalized = source.toLowerCase();
  if (normalized.includes('google')) return { label: 'Google API', variant: 'success' };
  if (normalized.includes('mock')) return { label: 'Demo data', variant: 'warning' };
  return { label: source, variant: 'secondary' };
}

function sumCurrentActions(branches: BranchProfile[]) {
  return branches.reduce((total, branch) => {
    return total + (branch.websiteClicks.current ?? 0) + (branch.callClicks.current ?? 0) + (branch.directionRequests.current ?? 0);
  }, 0);
}

function LoadingDashboard() {
  return (
    <main className="dashboard-shell loading-shell" aria-label="Loading dashboard">
      <aside className="sidebar-shell">
        <Skeleton className="skeleton-logo" />
        <Skeleton className="skeleton-nav" />
        <Skeleton className="skeleton-nav" />
        <Skeleton className="skeleton-nav" />
      </aside>
      <section className="dashboard-content">
        <Skeleton className="skeleton-hero" />
        <div className="scorecard-grid">
          {Array.from({ length: 4 }, (_, index) => <Skeleton className="skeleton-card" key={index} />)}
        </div>
        <Skeleton className="skeleton-table" />
      </section>
    </main>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('seo@ruangguru.com');
  const [password, setPassword] = useState('leftchoice123');
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== 'seo@ruangguru.com') {
      setError('Gunakan demo account seo@ruangguru.com untuk masuk.');
      return;
    }
    if (password.trim().length === 0) {
      setError('Password demo tidak boleh kosong.');
      return;
    }
    setError('');
    onLogin();
  }

  return (
    <main className="login-shell">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-brand">
          <div className="brand-mark" aria-hidden="true"><Building2 size={24} /></div>
          <div>
            <strong>LeftChoice</strong>
            <span>Ruangguru GBP platform</span>
          </div>
        </div>
        <div>
          <p className="eyebrow">Internal access</p>
          <h1 id="login-title">Manage every branch profile from one dashboard.</h1>
          <p className="page-subtitle">Sign in to review listings, ratings, posts, local rankings, competitors, and alerts across Ruangguru brands.</p>
        </div>
        <form className="login-form" onSubmit={submit}>
          <Button type="button" variant="outline" disabled>Login dengan Google</Button>
          <div className="login-divider"><span>atau gunakan demo account</span></div>
          <label className="ui-field">
            <span>Email</span>
            <input className="ui-input" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
          </label>
          <label className="ui-field">
            <span>Password</span>
            <input className="ui-input" value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" />
          </label>
          {error && <Alert variant="warning" role="alert">{error}</Alert>}
          <Button type="submit">Sign In</Button>
        </form>
      </section>
      <section className="login-preview" aria-label="LeftChoice preview">
        <div className="preview-card">
          <span>Selected Listings</span>
          <strong>1,000+</strong>
          <p>Ruangguru Privat, Brain Academy, English Academy, MatChamps, Alta Global School, Wonderlab, and more.</p>
        </div>
        <div className="preview-card">
          <span>Daily Ops</span>
          <strong>Reviews, Posts, Rank</strong>
          <p>Review escalation, content hygiene, local keyword visibility, competitor benchmarking, and weekly alerts.</p>
        </div>
      </section>
    </main>
  );
}

function DashboardApp({ onLogout }: { onLogout: () => void }) {
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

  useEffect(() => {
    loadDashboard();
  }, []);

  const filteredBranches = useMemo(() => {
    if (!payload) return [];
    return filterBranches(payload.branches, { brandId: filters.brandId === 'all' ? undefined : filters.brandId, search: filters.search });
  }, [payload, filters]);

  const summary = useMemo(() => calculateDashboardSummary(filteredBranches), [filteredBranches]);
  const totalActions = useMemo(() => sumCurrentActions(filteredBranches), [filteredBranches]);
  const profileStrength = useMemo(() => getProfileStrength(filteredBranches, leftChoiceBranchMeta), [filteredBranches]);
  const completionScore = useMemo(() => getCompletionScore(filteredBranches, leftChoiceBranchMeta), [filteredBranches]);
  const reviewResponseRate = useMemo(() => getReviewResponseRate(leftChoiceReviews), []);
  const rankingDrops = useMemo(() => getRankingDrops(leftChoiceRankings), []);
  const suspensionRisk = useMemo(() => getSuspensionRisk(leftChoiceAlerts), []);
  const priorityBranches = useMemo(() => getPriorityBranches(filteredBranches, leftChoiceBranchMeta, leftChoiceAlerts), [filteredBranches]);

  if (loadError) {
    return (
      <main className="standalone-state">
        <Alert variant="danger" role="alert">
          <strong>Dashboard belum bisa dimuat.</strong>
          <span>{loadError}</span>
          <Button type="button" variant="outline" onClick={loadDashboard}>Coba lagi</Button>
        </Alert>
      </main>
    );
  }

  if (!payload) {
    return <LoadingDashboard />;
  }

  const source = sourceMeta(payload.source);
  const formattedSync = new Date(payload.syncedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <main className="dashboard-shell">
      <aside className="sidebar-shell" aria-label="Dashboard navigation">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><Building2 size={22} /></div>
          <div>
            <strong>LeftChoice</strong>
            <span>Ruangguru GBP platform</span>
          </div>
        </div>

        <TabsList className="dashboard-tabs" aria-label="Dashboard pages">
          {tabs.map(({ Icon, ...item }) => (
            <TabsTrigger type="button" active={tab === item.id} onClick={() => setTab(item.id)} key={item.id}>
              <Icon aria-hidden="true" size={18} />
              <span>{item.label}</span>
              <small>{item.description}</small>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="sidebar-footnote">
          <Database size={16} aria-hidden="true" />
          <span>Demo data aktif. Google API sync tetap tersedia untuk fase live integration.</span>
          <Button type="button" variant="ghost" size="sm" onClick={onLogout}><LogOut size={14} aria-hidden="true" />Log out</Button>
        </div>
      </aside>

      <section className="dashboard-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">Google Business Profile Management</p>
            <h1>LeftChoice Dashboard</h1>
            <p className="page-subtitle">Manage listing health, reviews, content, local rankings, competitors, and alerts across Ruangguru brands.</p>
          </div>
          <div className="header-actions" aria-label="Dashboard metadata">
            <Badge variant={source.variant}>{source.label}</Badge>
            <div className="sync-pill"><Clock3 size={16} aria-hidden="true" />{formattedSync}</div>
            <Button type="button" variant="outline" onClick={loadDashboard}><RefreshCcw size={16} aria-hidden="true" />Refresh</Button>
          </div>
        </header>

        <section className="metric-strip" aria-label="Filtered summary">
          <div><span>Filtered Profiles</span><strong>{filteredBranches.length.toLocaleString('id-ID')}</strong></div>
          <div><span>Total Actions</span><strong>{totalActions.toLocaleString('id-ID')}</strong></div>
          <div><span>Profile Strength</span><strong>{profileStrength}%</strong></div>
          <div><span>Suspension Risk</span><strong>{suspensionRisk}</strong></div>
        </section>

        <FilterBar filters={filters} onChange={setFilters} />

        <div className="content-stack">
          {tab === 'overview' && (
            <>
              <Scorecards
                summary={summary}
                selectedListings={filteredBranches.length}
                completionScore={completionScore}
                profileStrength={profileStrength}
                suspensionRisk={suspensionRisk}
                reviewResponseRate={reviewResponseRate}
                rankingDrops={rankingDrops}
              />
              <section className="overview-grid">
                <Alert variant={suspensionRisk === 'High' ? 'danger' : suspensionRisk === 'Medium' ? 'warning' : 'success'}>
                  <strong>{suspensionRisk} suspension risk across active alerts.</strong>
                  <span>{leftChoiceAlerts.length} open alerts, {leftChoiceAlerts.filter((alert) => alert.severity === 'critical').length} critical issue, and {rankingDrops} keyword drops need follow-up.</span>
                </Alert>
                <NeedsReview branches={payload.branches} />
              </section>
              <BranchTable branches={priorityBranches.length > 0 ? priorityBranches : filteredBranches} title="Priority listings" description="Highest-risk branches by completion score and active alerts." />
            </>
          )}
          {tab === 'listings' && <BranchTable branches={filteredBranches} title="Listings Management" description="All filtered branches, profile issues, local actions, and export." />}
          {tab === 'reviews' && <ReviewsPanel />}
          {tab === 'content' && <ContentPanel />}
          {tab === 'posts' && <PostSchedulingPanel />}
          {tab === 'rank-tracker' && <RankTrackerPanel />}
          {tab === 'geo-grid' && <GeoGridPanel />}
          {tab === 'competitors' && <CompetitorsPanel />}
          {tab === 'reports' && <ReportsAlertsPanel />}
          {tab === 'settings' && <SettingsSync onSynced={loadDashboard} />}
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('leftchoice-auth') === 'true');

  function handleLogin() {
    localStorage.setItem('leftchoice-auth', 'true');
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem('leftchoice-auth');
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <DashboardApp onLogout={handleLogout} />;
}
