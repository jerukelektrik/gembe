# LeftChoice Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build LeftChoice, a RightChoice-like dummy-data Google Business Profile management platform for Ruangguru's multi-brand branch portfolio.

**Architecture:** Extend the existing `gbp-dashboard` React/Vite app instead of creating a new application. Keep the current local Express backend and Google sync affordances, but add a structured frontend dummy domain layer for reviews, posts, rankings, competitors, alerts, and maintenance guidance.

**Tech Stack:** React 19, TypeScript, Vite, Express, Vitest, Testing Library, lucide-react, CSS modules via existing `src/styles.css`.

---

## Timeline

### Day 1: Foundation and Product Rebrand

Outcome: the existing app is renamed and reshaped as LeftChoice, with dummy domain data ready for every major module.

- Rename visible product labels from GBP Control / Performance Dashboard to LeftChoice.
- Add a focused dummy data module for brands, branches, reviews, posts, rankings, geo-grid cells, competitors, alerts, and reports.
- Add shared selectors/summary helpers so screens do not recalculate business logic inline.
- Keep existing mock Google sync behavior intact.

### Day 2: Overview and Listings

Outcome: manager-ready first screen and operations-ready branch table.

- Build an executive overview inspired by RightChoice: selected listings, completion score, profile strength, suspension risk, policy/data issues, review health, total actions, critical alerts.
- Upgrade Listings into the main filtered branch table.
- Add status/risk sorting and CSV export for filtered listing rows.
- Verify the current filters still work across brands and search.

### Day 3: Reviews, Content, and Post Scheduling

Outcome: the daily SEO/local ops workflow becomes visible.

- Add Reviews inbox with rating/sentiment/reply status filters and dummy suggested replies.
- Add Content hygiene screen for missing photos, stale content, category issues, and brand asset status.
- Add Post Scheduling screen for campaign posts, branch targeting, publish status, and UTM labels.
- Clearly label publish/reply actions as demo-only.

### Day 4: Rank Tracker, Geo Grid, Competitors, Reports

Outcome: RightChoice-style analytics and benchmarking modules are represented.

- Add Rank Tracker with keyword rank, previous rank, trend, and competitor context.
- Add Geo Grid visual approximation using colored ranking cells.
- Add Competitors comparison table.
- Add Reports & Alerts screen with negative reviews, suspended listings, ranking drops, sync warnings, and weekly brand summary.

### Day 5: Maintenance Docs, Tests, QA, Demo Flow

Outcome: the prototype is easy to run, explain, and maintain.

- Add maintenance guide with local run commands, dummy data editing instructions, future Google API notes, and demo flow.
- Add or update tests for selectors, filters, and CSV export helpers.
- Run `npm test`.
- Run `npm run build`.
- Launch local dev server and inspect the app in browser.
- Capture final screenshot for handoff.

## File Structure

### Existing Files to Modify

- `gbp-dashboard/src/App.tsx`  
  Owns top-level layout, navigation, filters, and selected screen rendering.

- `gbp-dashboard/src/styles.css`  
  Owns dashboard layout, cards, tables, status pills, review inbox, geo grid, and responsive polish.

- `gbp-dashboard/src/components/BranchTable.tsx`  
  Upgrade to support LeftChoice listing fields, issue tags, risk sorting, and export affordances.

- `gbp-dashboard/src/components/FilterBar.tsx`  
  Keep existing brand/search filters and extend with status/risk controls if needed.

- `gbp-dashboard/src/components/Scorecards.tsx`  
  Reframe KPI cards around LeftChoice overview metrics.

- `gbp-dashboard/src/components/ProfileHealth.tsx`  
  Reuse or extend for profile strength, completion, and suspension risk.

- `gbp-dashboard/src/components/SettingsSync.tsx`  
  Reframe copy as Settings & Maintenance while preserving future Google API sync.

- `gbp-dashboard/src/shared/types.ts`  
  Add typed dummy domain records for reviews, posts, rankings, geo grid, competitors, alerts, and reports.

- `gbp-dashboard/src/shared/filters.ts`  
  Add typed selectors for listing status/risk filtering if the existing functions are not enough.

- `gbp-dashboard/src/shared/exportRows.ts`  
  Add or extend CSV row export for LeftChoice listings.

- `gbp-dashboard/README.md`  
  Add LeftChoice run, usage, demo, and maintenance instructions.

### New Files to Create

- `gbp-dashboard/src/shared/leftchoiceData.ts`  
  Contains deterministic dummy data for brands, branch records, reviews, content issues, scheduled posts, keyword ranks, geo grids, competitors, alerts, and report summaries.

- `gbp-dashboard/src/shared/leftchoiceMetrics.ts`  
  Contains pure helper functions for overview summaries, priority branch selection, review health, rank trend summary, and alert counts.

- `gbp-dashboard/src/shared/leftchoiceMetrics.test.ts`  
  Tests overview summary and priority selection from deterministic dummy data.

- `gbp-dashboard/src/components/ReviewsPanel.tsx`  
  Renders review inbox, filters, status, sentiment, suggested reply, and escalation markers.

- `gbp-dashboard/src/components/ContentPanel.tsx`  
  Renders content hygiene issues and recommended updates.

- `gbp-dashboard/src/components/PostSchedulingPanel.tsx`  
  Renders campaign post schedule and status table.

- `gbp-dashboard/src/components/RankTrackerPanel.tsx`  
  Renders keyword ranking table and trend indicators.

- `gbp-dashboard/src/components/GeoGridPanel.tsx`  
  Renders colored ranking grid with branch/keyword summary.

- `gbp-dashboard/src/components/CompetitorsPanel.tsx`  
  Renders competitor benchmark table.

- `gbp-dashboard/src/components/ReportsAlertsPanel.tsx`  
  Renders alerts and weekly brand reports.

- `gbp-dashboard/docs/maintenance-leftchoice.md`  
  Practical maintenance guide for non-engineers and internal ops.

## Task List

### Task 1: Rebrand Shell to LeftChoice

**Files:**

- Modify: `gbp-dashboard/src/App.tsx`
- Modify: `gbp-dashboard/src/styles.css`
- Modify: `gbp-dashboard/README.md`

- [ ] **Step 1: Update visible app naming**

  In `gbp-dashboard/src/App.tsx`, replace the sidebar brand label with:

  ```tsx
  <strong>LeftChoice</strong>
  <span>Ruangguru GBP platform</span>
  ```

  Replace the page header copy with:

  ```tsx
  <p className="eyebrow">Google Business Profile Management</p>
  <h1>LeftChoice Dashboard</h1>
  <p className="page-subtitle">Manage listing health, reviews, content, local rankings, competitors, and alerts across Ruangguru brands.</p>
  ```

- [ ] **Step 2: Update navigation labels**

  In `gbp-dashboard/src/App.tsx`, replace the `Tab` union with:

  ```ts
  type Tab = 'overview' | 'listings' | 'reviews' | 'content' | 'posts' | 'rank-tracker' | 'geo-grid' | 'competitors' | 'reports' | 'settings';
  ```

  Replace the `tabs` array with Overview, Listings, Reviews, Content, Post Scheduling, Rank Tracker, Geo Grid, Competitors, Reports & Alerts, and Settings & Maintenance.

- [ ] **Step 3: Run build check**

  Run:

  ```bash
  cd gbp-dashboard
  npm run build
  ```

  Expected: TypeScript reports missing screen components until later tasks add them, or passes if temporary placeholders are used.

- [ ] **Step 4: Commit**

  ```bash
  git add gbp-dashboard/src/App.tsx gbp-dashboard/src/styles.css gbp-dashboard/README.md
  git commit -m "Rebrand dashboard shell to LeftChoice"
  ```

### Task 2: Add LeftChoice Dummy Data and Metrics

**Files:**

- Modify: `gbp-dashboard/src/shared/types.ts`
- Create: `gbp-dashboard/src/shared/leftchoiceData.ts`
- Create: `gbp-dashboard/src/shared/leftchoiceMetrics.ts`
- Create: `gbp-dashboard/src/shared/leftchoiceMetrics.test.ts`

- [ ] **Step 1: Add shared types**

  In `gbp-dashboard/src/shared/types.ts`, add interfaces for:

  ```ts
  export interface LeftChoiceReview {
    id: string;
    branchId: string;
    reviewer: string;
    rating: 1 | 2 | 3 | 4 | 5;
    sentiment: 'positive' | 'neutral' | 'negative';
    status: 'pending' | 'drafted' | 'approved' | 'replied';
    text: string;
    suggestedReply: string;
    createdAt: string;
  }

  export interface LeftChoicePost {
    id: string;
    branchId: string;
    brandId: string;
    campaign: string;
    type: 'offer' | 'event' | 'update' | 'trial-class' | 'open-house';
    status: 'draft' | 'scheduled' | 'published' | 'failed';
    scheduledFor: string;
    utmLabel: string;
  }

  export interface LeftChoiceRanking {
    id: string;
    branchId: string;
    brandId: string;
    city: string;
    keyword: string;
    currentRank: number;
    previousRank: number;
    topCompetitor: string;
  }

  export interface LeftChoiceGeoCell {
    id: string;
    branchId: string;
    keyword: string;
    x: number;
    y: number;
    rank: number;
  }

  export interface LeftChoiceCompetitor {
    id: string;
    branchId: string;
    name: string;
    category: string;
    city: string;
    rating: number;
    reviews: number;
    keywordRank: number;
    completeness: number;
    gap: string;
  }

  export interface LeftChoiceAlert {
    id: string;
    branchId: string;
    severity: 'critical' | 'warning' | 'info';
    type: 'negative-review' | 'suspended-listing' | 'ranking-drop' | 'sync-warning' | 'profile-drop';
    title: string;
    detail: string;
    createdAt: string;
  }
  ```

- [ ] **Step 2: Create deterministic dummy data**

  Create `gbp-dashboard/src/shared/leftchoiceData.ts` exporting arrays named:

  ```ts
  export const leftChoiceReviews: LeftChoiceReview[] = [];
  export const leftChoicePosts: LeftChoicePost[] = [];
  export const leftChoiceRankings: LeftChoiceRanking[] = [];
  export const leftChoiceGeoCells: LeftChoiceGeoCell[] = [];
  export const leftChoiceCompetitors: LeftChoiceCompetitor[] = [];
  export const leftChoiceAlerts: LeftChoiceAlert[] = [];
  ```

  Fill each array with realistic dummy records using existing branch IDs from mock data or deterministic IDs that can be joined by branch name if needed.

- [ ] **Step 3: Add metrics helpers**

  Create `gbp-dashboard/src/shared/leftchoiceMetrics.ts` with pure functions:

  ```ts
  import type { BranchProfile, LeftChoiceAlert, LeftChoiceRanking, LeftChoiceReview } from './types';

  export function getProfileStrength(branches: BranchProfile[]): number {
    if (branches.length === 0) return 0;
    const total = branches.reduce((sum, branch) => sum + (branch.verified ? 100 : 45), 0);
    return Math.round(total / branches.length);
  }

  export function getSuspensionRisk(alerts: LeftChoiceAlert[]): 'Low' | 'Medium' | 'High' {
    const critical = alerts.filter((alert) => alert.severity === 'critical').length;
    if (critical >= 3) return 'High';
    if (critical >= 1) return 'Medium';
    return 'Low';
  }

  export function getReviewResponseRate(reviews: LeftChoiceReview[]): number {
    if (reviews.length === 0) return 0;
    const handled = reviews.filter((review) => review.status === 'approved' || review.status === 'replied').length;
    return Math.round((handled / reviews.length) * 100);
  }

  export function getRankingDrops(rankings: LeftChoiceRanking[]): number {
    return rankings.filter((ranking) => ranking.currentRank > ranking.previousRank).length;
  }
  ```

- [ ] **Step 4: Add unit tests**

  Create `gbp-dashboard/src/shared/leftchoiceMetrics.test.ts` with tests for empty state, suspension risk, review response rate, and ranking drops.

- [ ] **Step 5: Run tests**

  ```bash
  cd gbp-dashboard
  npm test -- src/shared/leftchoiceMetrics.test.ts
  ```

  Expected: all new metrics tests pass.

- [ ] **Step 6: Commit**

  ```bash
  git add gbp-dashboard/src/shared/types.ts gbp-dashboard/src/shared/leftchoiceData.ts gbp-dashboard/src/shared/leftchoiceMetrics.ts gbp-dashboard/src/shared/leftchoiceMetrics.test.ts
  git commit -m "Add LeftChoice dummy data and metrics"
  ```

### Task 3: Build Overview and Listings Experience

**Files:**

- Modify: `gbp-dashboard/src/App.tsx`
- Modify: `gbp-dashboard/src/components/Scorecards.tsx`
- Modify: `gbp-dashboard/src/components/BranchTable.tsx`
- Modify: `gbp-dashboard/src/shared/exportRows.ts`
- Modify: `gbp-dashboard/src/styles.css`

- [ ] **Step 1: Render LeftChoice overview metrics**

  Use `getProfileStrength`, `getSuspensionRisk`, `getReviewResponseRate`, and `getRankingDrops` in `App.tsx` to calculate dashboard-level values from filtered branches and dummy arrays.

- [ ] **Step 2: Upgrade scorecards**

  Update `Scorecards.tsx` so the top cards show:

  - Selected listings.
  - Completion score.
  - Profile strength.
  - Suspension risk.
  - Review response rate.
  - Ranking drops.

- [ ] **Step 3: Upgrade branch table**

  Update `BranchTable.tsx` to show branch name, brand, city/status if available, rating, reviews, actions, issue tags, completion status, and last synced timestamp.

- [ ] **Step 4: Add filtered CSV export**

  Extend `exportRows.ts` so filtered rows can export LeftChoice columns:

  ```ts
  export function downloadCsv(filename: string, rows: Record<string, string | number>[]): void {
    const headers = Object.keys(rows[0] ?? {});
    const csv = [headers.join(','), ...rows.map((row) => headers.map((header) => JSON.stringify(row[header] ?? '')).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  ```

- [ ] **Step 5: Run build**

  ```bash
  cd gbp-dashboard
  npm run build
  ```

  Expected: build passes.

- [ ] **Step 6: Commit**

  ```bash
  git add gbp-dashboard/src/App.tsx gbp-dashboard/src/components/Scorecards.tsx gbp-dashboard/src/components/BranchTable.tsx gbp-dashboard/src/shared/exportRows.ts gbp-dashboard/src/styles.css
  git commit -m "Build LeftChoice overview and listings"
  ```

### Task 4: Add Reviews, Content, and Post Scheduling Screens

**Files:**

- Modify: `gbp-dashboard/src/App.tsx`
- Create: `gbp-dashboard/src/components/ReviewsPanel.tsx`
- Create: `gbp-dashboard/src/components/ContentPanel.tsx`
- Create: `gbp-dashboard/src/components/PostSchedulingPanel.tsx`
- Modify: `gbp-dashboard/src/styles.css`

- [ ] **Step 1: Create ReviewsPanel**

  Render review cards or table rows with reviewer, branch, rating, sentiment, reply status, text, suggested reply, and escalation marker for one- and two-star reviews.

- [ ] **Step 2: Create ContentPanel**

  Render dummy content hygiene rows: branch, issue type, severity, recommendation, and owner.

- [ ] **Step 3: Create PostSchedulingPanel**

  Render scheduled posts with campaign, type, brand/branch targeting, scheduled date, status, and UTM label.

- [ ] **Step 4: Wire screens into App**

  In `App.tsx`, import the three new panels and render them for `reviews`, `content`, and `posts` tabs.

- [ ] **Step 5: Run build**

  ```bash
  cd gbp-dashboard
  npm run build
  ```

  Expected: build passes.

- [ ] **Step 6: Commit**

  ```bash
  git add gbp-dashboard/src/App.tsx gbp-dashboard/src/components/ReviewsPanel.tsx gbp-dashboard/src/components/ContentPanel.tsx gbp-dashboard/src/components/PostSchedulingPanel.tsx gbp-dashboard/src/styles.css
  git commit -m "Add LeftChoice operations screens"
  ```

### Task 5: Add Rank Tracker, Geo Grid, Competitors, and Reports

**Files:**

- Modify: `gbp-dashboard/src/App.tsx`
- Create: `gbp-dashboard/src/components/RankTrackerPanel.tsx`
- Create: `gbp-dashboard/src/components/GeoGridPanel.tsx`
- Create: `gbp-dashboard/src/components/CompetitorsPanel.tsx`
- Create: `gbp-dashboard/src/components/ReportsAlertsPanel.tsx`
- Modify: `gbp-dashboard/src/styles.css`

- [ ] **Step 1: Create RankTrackerPanel**

  Render keyword, branch/city, current rank, previous rank, trend indicator, and top competitor.

- [ ] **Step 2: Create GeoGridPanel**

  Render a 5x5 grid from `leftChoiceGeoCells`, using color classes:

  - `rank-strong` for rank 1-3.
  - `rank-medium` for rank 4-10.
  - `rank-weak` for rank above 10.

- [ ] **Step 3: Create CompetitorsPanel**

  Render competitor name, category, city, rating, reviews, keyword rank, completeness, and gap.

- [ ] **Step 4: Create ReportsAlertsPanel**

  Render alert list grouped by severity plus weekly brand summary cards.

- [ ] **Step 5: Wire screens into App**

  In `App.tsx`, import the four new panels and render them for `rank-tracker`, `geo-grid`, `competitors`, and `reports` tabs.

- [ ] **Step 6: Run build**

  ```bash
  cd gbp-dashboard
  npm run build
  ```

  Expected: build passes.

- [ ] **Step 7: Commit**

  ```bash
  git add gbp-dashboard/src/App.tsx gbp-dashboard/src/components/RankTrackerPanel.tsx gbp-dashboard/src/components/GeoGridPanel.tsx gbp-dashboard/src/components/CompetitorsPanel.tsx gbp-dashboard/src/components/ReportsAlertsPanel.tsx gbp-dashboard/src/styles.css
  git commit -m "Add LeftChoice analytics and alerts screens"
  ```

### Task 6: Add Maintenance Documentation

**Files:**

- Modify: `gbp-dashboard/README.md`
- Create: `gbp-dashboard/docs/maintenance-leftchoice.md`
- Modify: `gbp-dashboard/src/components/SettingsSync.tsx`

- [ ] **Step 1: Update README**

  Add:

  ```md
  ## LeftChoice Demo Flow

  1. Open Overview for manager summary.
  2. Open Listings to show branch-level issue triage.
  3. Open Reviews to show reply workflow simulation.
  4. Open Post Scheduling to show campaign planning.
  5. Open Rank Tracker and Geo Grid to show local SEO visibility.
  6. Open Competitors and Reports & Alerts for benchmarking and risk monitoring.
  ```

- [ ] **Step 2: Create maintenance guide**

  Create `gbp-dashboard/docs/maintenance-leftchoice.md` with sections:

  - How to run locally.
  - How to edit dummy data in `src/shared/leftchoiceData.ts`.
  - How to add a new brand.
  - How to add a new branch scenario.
  - How to test.
  - How real Google API integration should replace dummy data gradually.

- [ ] **Step 3: Reframe SettingsSync copy**

  Update `SettingsSync.tsx` copy so it says demo data is active by default and Google API sync is a future/live integration path.

- [ ] **Step 4: Run build**

  ```bash
  cd gbp-dashboard
  npm run build
  ```

  Expected: build passes.

- [ ] **Step 5: Commit**

  ```bash
  git add gbp-dashboard/README.md gbp-dashboard/docs/maintenance-leftchoice.md gbp-dashboard/src/components/SettingsSync.tsx
  git commit -m "Document LeftChoice usage and maintenance"
  ```

### Task 7: Final QA and Demo Handoff

**Files:**

- Modify only if QA reveals defects in prior task files.

- [ ] **Step 1: Run test suite**

  ```bash
  cd gbp-dashboard
  npm test
  ```

  Expected: all tests pass.

- [ ] **Step 2: Run production build**

  ```bash
  cd gbp-dashboard
  npm run build
  ```

  Expected: TypeScript and Vite build pass.

- [ ] **Step 3: Start local server**

  ```bash
  cd gbp-dashboard
  npm run dev:all
  ```

  Expected: frontend available at `http://127.0.0.1:5174` and backend available on its configured local port.

- [ ] **Step 4: Browser QA**

  Check:

  - Overview loads without blank states.
  - Sidebar tabs switch correctly.
  - Listings filters work.
  - Reviews display suggested replies.
  - Post Scheduling, Rank Tracker, Geo Grid, Competitors, Reports, and Settings render.
  - No text overlaps at desktop width.

- [ ] **Step 5: Capture screenshot**

  Save a screenshot to:

  ```text
  screenshots/leftchoice-overview.png
  ```

- [ ] **Step 6: Commit QA fixes**

  ```bash
  git add gbp-dashboard screenshots/leftchoice-overview.png
  git commit -m "Polish LeftChoice prototype for demo"
  ```

## Risks and Mitigations

- Existing `gbp-dashboard` already has modified files in the worktree. Implementation must read each touched file before editing and avoid reverting unrelated changes.
- Some existing branch data may not include city/status fields. The dummy data layer can provide display-only branch context keyed by branch ID or branch name.
- Real Google API actions must remain clearly separated from dummy/demo actions.
- The prototype should prioritize believable workflows over deep persistence.

## Definition of Done

- LeftChoice name is visible throughout the app.
- All planned navigation modules render with dummy data.
- Overview and Listings support a credible manager and ops demo.
- Maintenance documentation explains how to run and update the prototype.
- `npm test` and `npm run build` pass, or any blocker is documented with the exact error.
- Local URL is provided for review.
