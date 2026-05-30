# GBP Branch Analytics Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing `gbp-dashboard` prototype into the PRD-defined local Google Business Profile Branch Analytics Dashboard with SQLite storage, manual sync, photo checklist workflows, branch operations tables, and the UI/UX command-center design.

**Architecture:** Keep the existing Vite React frontend and local Express backend. Replace JSON cache/mapping persistence with a local SQLite layer, keep Google API calls inside the backend, expose normalized dashboard data through local API routes, and make the frontend table-first and desktop-first.

**Tech Stack:** React 19, Vite, TypeScript, Node.js 24, Express, built-in `node:sqlite`, Vitest, Testing Library, lucide-react, local Google OAuth, Google Business Profile APIs.

---

## Source Documents

- Spec: `docs/superpowers/specs/2026-05-30-gbp-branch-analytics-dashboard-design.md`
- Existing prototype: `gbp-dashboard/`
- Existing setup docs: `gbp-dashboard/README.md`

## Scope Check

The PRD covers one coherent local dashboard MVP. It has backend persistence, sync, import/export, and frontend UI work, but all pieces support the same deliverable and should remain in one implementation plan.

Do not implement:

- Hosted deployment.
- Internal login or role management.
- Scheduled sync.
- Review replies.
- AI photo verification.
- Google Sheets as primary storage.

## File Structure

Create:

- `gbp-dashboard/server/sqliteStore.mjs`: SQLite schema, migrations, profile/metric/checklist/mapping/sync/import persistence.
- `gbp-dashboard/server/sqliteStore.test.mjs`: SQLite persistence tests using temp database files.
- `gbp-dashboard/server/photoChecklistImport.mjs`: CSV import parsing and validation for photo checklist rows.
- `gbp-dashboard/server/photoChecklistImport.test.mjs`: CSV import unit tests.
- `gbp-dashboard/src/components/PhotoChecklist.tsx`: photo checklist worksheet, CSV upload, import summary.
- `gbp-dashboard/src/components/PhotoChecklist.test.tsx`: photo checklist UI tests.
- `gbp-dashboard/src/components/Overview.tsx`: KPI strip, brand health table, issue summary.
- `gbp-dashboard/src/components/Overview.test.tsx`: overview rendering tests.

Modify:

- `gbp-dashboard/package.json`: set Node 24 engine and scripts if needed.
- `gbp-dashboard/.env.example`: add `GBP_SQLITE_FILE`.
- `gbp-dashboard/README.md`: update setup, API access checklist, SQLite, run/test instructions.
- `gbp-dashboard/server/index.mjs`: add SQLite-backed API routes.
- `gbp-dashboard/server/syncService.mjs`: write sync results to SQLite and preserve manual data.
- `gbp-dashboard/server/gbpClient.mjs`: add Voice of Merchant state and remove direction requests from MVP path.
- `gbp-dashboard/server/mockData.mjs`: align mock data with new brands/status/checklist model.
- `gbp-dashboard/src/shared/types.ts`: align frontend/backend data contracts with PRD.
- `gbp-dashboard/src/shared/brands.ts`: update eight canonical brands and alias detection.
- `gbp-dashboard/src/shared/metrics.ts`: support photo checklist completion and multiple blocking reasons.
- `gbp-dashboard/src/shared/filters.ts`: add checklist/status filters and date range compatibility.
- `gbp-dashboard/src/shared/exportRows.ts`: export PRD columns only.
- `gbp-dashboard/src/App.tsx`: add Overview and Photo Checklist pages, wire new payload shape.
- `gbp-dashboard/src/components/BranchTable.tsx`: command-center table with checklist, status, completion, blocking reasons.
- `gbp-dashboard/src/components/ProfileHealth.tsx`: rename behavior visually to Profile Status while keeping file if preferred.
- `gbp-dashboard/src/components/NeedsReview.tsx`: save manual mappings through SQLite API.
- `gbp-dashboard/src/components/SettingsSync.tsx`: API readiness checklist and sync progress.
- `gbp-dashboard/src/components/Scorecards.tsx`: compact KPI strip or fold into Overview.
- `gbp-dashboard/src/styles.css`: UI/UX guide styling, sticky filters, dense tables, responsive behavior.

Remove or stop using:

- `gbp-dashboard/server/cacheStore.mjs`: JSON cache should no longer be the app source of truth.
- `gbp-dashboard/server/brandMappingStore.mjs`: JSON mapping persistence should be replaced by SQLite.

---

## Task 1: Update Shared Data Contracts And Brand Rules

**Files:**
- Modify: `gbp-dashboard/src/shared/types.ts`
- Modify: `gbp-dashboard/src/shared/brands.ts`
- Modify: `gbp-dashboard/src/shared/brands.test.ts`

- [ ] **Step 1: Update brand type and profile contracts**

Replace the brand/status/checklist-related exports in `gbp-dashboard/src/shared/types.ts` with contracts that match the PRD:

```ts
export type BrandId =
  | 'les-privat'
  | 'brainacademy'
  | 'englishacademy'
  | 'mathchamps'
  | 'ruangguru-coding'
  | 'workabroad-academy'
  | 'wonderlab'
  | 'altaglobalschool'
  | 'needs-review';

export type BrandMappingStatus = 'auto' | 'manual' | 'needs-review';
export type BrandConfidence = 'high' | 'low';

export type ProfileStatus =
  | 'verified'
  | 'need_verification'
  | 'on_progress'
  | 'duplicate'
  | 'rejected'
  | 'permanently_closed'
  | 'temporarily_closed'
  | 'unknown';

export type CompletionStatus = 'complete' | 'not-complete';

export type BlockingReason =
  | 'need_verification'
  | 'on_progress'
  | 'duplicate'
  | 'rejected'
  | 'closed'
  | 'rating_below_4_5'
  | 'reviews_below_10'
  | 'missing_interior_photo'
  | 'missing_building_photo'
  | 'missing_learning_activity_photo'
  | 'brand_needs_review'
  | 'metric_unavailable';

export interface PhotoChecklist {
  hasInteriorPhoto: boolean;
  hasBuildingPhoto: boolean;
  hasLearningActivityPhoto: boolean;
  note: string | null;
  updatedAt: string | null;
}

export interface BranchProfile {
  id: string;
  accountId: string;
  locationId: string;
  locationName: string;
  profileName: string;
  brandId: BrandId;
  brandMappingStatus: BrandMappingStatus;
  brandConfidence: BrandConfidence;
  storeCode: string | null;
  address: string | null;
  city: string | null;
  profileStatus: ProfileStatus;
  rawStatusReason: string | null;
  rating: number | null;
  totalReviews: number | null;
  websiteClicks: number | null;
  phoneCallClicks: number | null;
  photoChecklist: PhotoChecklist;
  completionStatus: CompletionStatus;
  blockingReasons: BlockingReason[];
  lastSyncedAt: string | null;
}

export interface BrandSummary {
  brandId: BrandId;
  totalProfiles: number;
  verifiedProfiles: number;
  completeProfiles: number;
  needVerificationProfiles: number;
  onProgressProfiles: number;
  duplicateProfiles: number;
  rejectedProfiles: number;
  missingChecklistProfiles: number;
  verifiedRate: number;
  completionRate: number;
}

export interface DashboardSummary {
  totalProfiles: number;
  verifiedProfiles: number;
  completedProfiles: number;
  verifiedRate: number;
  completionRate: number;
  averageRating: number | null;
  totalReviews: number;
  websiteClicks: number;
  phoneCallClicks: number;
  issueCounts: Record<BlockingReason | ProfileStatus, number>;
  brandSummaries: BrandSummary[];
}
```

- [ ] **Step 2: Write brand detection tests**

Update `gbp-dashboard/src/shared/brands.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { detectBrand, getBrandLabel } from './brands';

describe('detectBrand', () => {
  it.each([
    ['Les Privat Ruangguru Tebet', 'les-privat'],
    ['Brain Academy Center Bandung', 'brainacademy'],
    ['Brainacademy Surabaya', 'brainacademy'],
    ['English Academy Bekasi', 'englishacademy'],
    ['Englishacademy Online Center', 'englishacademy'],
    ['Math Champs Kelapa Gading', 'mathchamps'],
    ['Mathchamps BSD', 'mathchamps'],
    ['Ruangguru Coding Depok', 'ruangguru-coding'],
    ['Kalananti Coding Center', 'ruangguru-coding'],
    ['Work Abroad Academy Jakarta', 'workabroad-academy'],
    ['Workabroad Academy Medan', 'workabroad-academy'],
    ['Wonderlab Kemang', 'wonderlab'],
    ['Alta Global School Semarang', 'altaglobalschool'],
    ['Altaglobalschool Makassar', 'altaglobalschool']
  ])('detects %s as %s', (profileName, brandId) => {
    expect(detectBrand(profileName)).toEqual({ brandId, confidence: 'high', mappingStatus: 'auto' });
  });

  it('sends unknown profiles to needs review', () => {
    expect(detectBrand('Unknown Learning Center')).toEqual({
      brandId: 'needs-review',
      confidence: 'low',
      mappingStatus: 'needs-review'
    });
  });

  it('returns canonical labels', () => {
    expect(getBrandLabel('les-privat')).toBe('Les Privat');
    expect(getBrandLabel('altaglobalschool')).toBe('Altaglobalschool');
    expect(getBrandLabel('needs-review')).toBe('Needs Review');
  });
});
```

- [ ] **Step 3: Run the brand tests to verify failure**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/brands.test.ts
```

Expected: tests fail because `detectBrand` does not return `mappingStatus` and current brand IDs do not match the PRD.

- [ ] **Step 4: Implement brand rules**

Update `gbp-dashboard/src/shared/brands.ts`:

```ts
import type { BrandConfidence, BrandId, BrandMappingStatus } from './types';

export interface BrandDefinition {
  id: Exclude<BrandId, 'needs-review'>;
  label: string;
  patterns: RegExp[];
}

export interface BrandDetectionResult {
  brandId: BrandId;
  confidence: BrandConfidence;
  mappingStatus: BrandMappingStatus;
}

export const BRANDS: BrandDefinition[] = [
  { id: 'les-privat', label: 'Les Privat', patterns: [/les\s*privat/i, /ruangguru\s*privat/i] },
  { id: 'brainacademy', label: 'Brainacademy', patterns: [/brain\s*academy/i, /brainacademy/i] },
  { id: 'englishacademy', label: 'Englishacademy', patterns: [/english\s*academy/i, /englishacademy/i] },
  { id: 'mathchamps', label: 'Mathchamps', patterns: [/math\s*champs/i, /mathchamps/i] },
  { id: 'ruangguru-coding', label: 'Ruangguru Coding', patterns: [/ruangguru\s*coding/i, /kalananti/i] },
  { id: 'workabroad-academy', label: 'Workabroad Academy', patterns: [/work\s*abroad\s*academy/i, /workabroad\s*academy/i] },
  { id: 'wonderlab', label: 'Wonderlab', patterns: [/wonder\s*lab/i, /wonderlab/i] },
  { id: 'altaglobalschool', label: 'Altaglobalschool', patterns: [/alta\s*global\s*school/i, /altaglobal\s*school/i, /altaglobalschool/i] }
];

export function detectBrand(profileName: string): BrandDetectionResult {
  const normalized = profileName.trim();
  const matches = BRANDS.filter((brand) => brand.patterns.some((pattern) => pattern.test(normalized)));
  if (matches.length !== 1) {
    return { brandId: 'needs-review', confidence: 'low', mappingStatus: 'needs-review' };
  }

  return { brandId: matches[0].id, confidence: 'high', mappingStatus: 'auto' };
}

export function getBrandLabel(brandId: BrandId): string {
  if (brandId === 'needs-review') return 'Needs Review';
  return BRANDS.find((brand) => brand.id === brandId)?.label ?? 'Needs Review';
}
```

- [ ] **Step 5: Run tests**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/brands.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add gbp-dashboard/src/shared/types.ts gbp-dashboard/src/shared/brands.ts gbp-dashboard/src/shared/brands.test.ts
git commit -m "feat: align gbp brand contracts"
```

---

## Task 2: Implement Completion Metrics And Dashboard Summary

**Files:**
- Modify: `gbp-dashboard/src/shared/metrics.ts`
- Modify: `gbp-dashboard/src/shared/metrics.test.ts`

- [ ] **Step 1: Write completion rule tests**

Replace or extend `gbp-dashboard/src/shared/metrics.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { calculateDashboardSummary, getBlockingReasons, isCompleteBranch } from './metrics';
import type { BranchProfile } from './types';

const completeChecklist = {
  hasInteriorPhoto: true,
  hasBuildingPhoto: true,
  hasLearningActivityPhoto: true,
  note: null,
  updatedAt: '2026-05-30T00:00:00.000Z'
};

function branch(overrides: Partial<BranchProfile> = {}): BranchProfile {
  return {
    id: 'locations/1',
    accountId: 'accounts/1',
    locationId: '1',
    locationName: 'locations/1',
    profileName: 'Brainacademy Tebet',
    brandId: 'brainacademy',
    brandMappingStatus: 'auto',
    brandConfidence: 'high',
    storeCode: 'BA-TBT',
    address: 'Jl. Tebet',
    city: 'Jakarta',
    profileStatus: 'verified',
    rawStatusReason: null,
    rating: 4.6,
    totalReviews: 12,
    websiteClicks: 10,
    phoneCallClicks: 5,
    photoChecklist: completeChecklist,
    completionStatus: 'complete',
    blockingReasons: [],
    lastSyncedAt: '2026-05-30T00:00:00.000Z',
    ...overrides
  };
}

describe('completion metrics', () => {
  it('marks a branch complete only when verification, rating, reviews, and all photo checks pass', () => {
    expect(isCompleteBranch(branch())).toBe(true);
  });

  it('returns all blocking reasons for incomplete branches', () => {
    expect(getBlockingReasons(branch({
      profileStatus: 'need_verification',
      rating: 4.2,
      totalReviews: 3,
      photoChecklist: {
        hasInteriorPhoto: false,
        hasBuildingPhoto: false,
        hasLearningActivityPhoto: false,
        note: null,
        updatedAt: null
      }
    }))).toEqual([
      'need_verification',
      'rating_below_4_5',
      'reviews_below_10',
      'missing_interior_photo',
      'missing_building_photo',
      'missing_learning_activity_photo'
    ]);
  });

  it('summarizes verified rate, completion rate, and totals', () => {
    const summary = calculateDashboardSummary([
      branch(),
      branch({ id: 'locations/2', locationId: '2', profileStatus: 'need_verification', completionStatus: 'not-complete', blockingReasons: ['need_verification'] })
    ]);

    expect(summary.totalProfiles).toBe(2);
    expect(summary.verifiedProfiles).toBe(1);
    expect(summary.completedProfiles).toBe(1);
    expect(summary.verifiedRate).toBe(50);
    expect(summary.completionRate).toBe(50);
    expect(summary.websiteClicks).toBe(20);
    expect(summary.phoneCallClicks).toBe(10);
  });

  it('treats on progress and duplicate statuses as blockers', () => {
    expect(getBlockingReasons(branch({ profileStatus: 'on_progress' }))).toContain('on_progress');
    expect(getBlockingReasons(branch({ profileStatus: 'duplicate' }))).toContain('duplicate');
  });
});
```

- [ ] **Step 2: Run the metrics tests to verify failure**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/metrics.test.ts
```

Expected: FAIL because `isCompleteBranch` and `getBlockingReasons` are not implemented.

- [ ] **Step 3: Implement metric helpers**

Update `gbp-dashboard/src/shared/metrics.ts`:

```ts
import { BRANDS } from './brands';
import type { BlockingReason, BranchProfile, BrandId, BrandSummary, DashboardSummary } from './types';

export function roundRate(value: number): number {
  return Math.round(value * 100) / 100;
}

export function getBlockingReasons(branch: Pick<BranchProfile, 'profileStatus' | 'rating' | 'totalReviews' | 'brandId' | 'photoChecklist'>): BlockingReason[] {
  const reasons: BlockingReason[] = [];
  if (branch.brandId === 'needs-review') reasons.push('brand_needs_review');
  if (branch.profileStatus === 'need_verification') reasons.push('need_verification');
  if (branch.profileStatus === 'on_progress') reasons.push('on_progress');
  if (branch.profileStatus === 'duplicate') reasons.push('duplicate');
  if (branch.profileStatus === 'rejected') reasons.push('rejected');
  if (branch.profileStatus === 'permanently_closed' || branch.profileStatus === 'temporarily_closed') reasons.push('closed');
  if (branch.rating === null) reasons.push('metric_unavailable');
  if (branch.rating !== null && branch.rating < 4.5) reasons.push('rating_below_4_5');
  if (branch.totalReviews === null) reasons.push('metric_unavailable');
  if (branch.totalReviews !== null && branch.totalReviews < 10) reasons.push('reviews_below_10');
  if (!branch.photoChecklist.hasInteriorPhoto) reasons.push('missing_interior_photo');
  if (!branch.photoChecklist.hasBuildingPhoto) reasons.push('missing_building_photo');
  if (!branch.photoChecklist.hasLearningActivityPhoto) reasons.push('missing_learning_activity_photo');
  return [...new Set(reasons)];
}

export function isCompleteBranch(branch: Pick<BranchProfile, 'profileStatus' | 'rating' | 'totalReviews' | 'brandId' | 'photoChecklist'>): boolean {
  return getBlockingReasons(branch).length === 0 && branch.profileStatus === 'verified';
}

function rate(part: number, total: number): number {
  return total === 0 ? 0 : roundRate((part / total) * 100);
}

function brandSummary(brandId: BrandId, branches: BranchProfile[]): BrandSummary {
  const brandBranches = branches.filter((branch) => branch.brandId === brandId);
  const totalProfiles = brandBranches.length;
  const verifiedProfiles = brandBranches.filter((branch) => branch.profileStatus === 'verified').length;
  const completeProfiles = brandBranches.filter((branch) => branch.completionStatus === 'complete').length;
  const needVerificationProfiles = brandBranches.filter((branch) => branch.profileStatus === 'need_verification').length;
  const onProgressProfiles = brandBranches.filter((branch) => branch.profileStatus === 'on_progress').length;
  const duplicateProfiles = brandBranches.filter((branch) => branch.profileStatus === 'duplicate').length;
  const rejectedProfiles = brandBranches.filter((branch) => branch.profileStatus === 'rejected').length;
  const missingChecklistProfiles = brandBranches.filter((branch) => branch.blockingReasons.some((reason) => reason.startsWith('missing_'))).length;
  return {
    brandId,
    totalProfiles,
    verifiedProfiles,
    completeProfiles,
    needVerificationProfiles,
    onProgressProfiles,
    duplicateProfiles,
    rejectedProfiles,
    missingChecklistProfiles,
    verifiedRate: rate(verifiedProfiles, totalProfiles),
    completionRate: rate(completeProfiles, totalProfiles)
  };
}

export function calculateDashboardSummary(branches: BranchProfile[]): DashboardSummary {
  const totalProfiles = branches.length;
  const verifiedProfiles = branches.filter((branch) => branch.profileStatus === 'verified').length;
  const completedProfiles = branches.filter((branch) => branch.completionStatus === 'complete').length;
  const ratings = branches.map((branch) => branch.rating).filter((rating): rating is number => rating !== null);
  const issueCounts = {} as DashboardSummary['issueCounts'];
  for (const branch of branches) {
    issueCounts[branch.profileStatus] = (issueCounts[branch.profileStatus] ?? 0) + 1;
    for (const reason of branch.blockingReasons) {
      issueCounts[reason] = (issueCounts[reason] ?? 0) + 1;
    }
  }

  return {
    totalProfiles,
    verifiedProfiles,
    completedProfiles,
    verifiedRate: rate(verifiedProfiles, totalProfiles),
    completionRate: rate(completedProfiles, totalProfiles),
    averageRating: ratings.length === 0 ? null : roundRate(ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length),
    totalReviews: branches.reduce((sum, branch) => sum + (branch.totalReviews ?? 0), 0),
    websiteClicks: branches.reduce((sum, branch) => sum + (branch.websiteClicks ?? 0), 0),
    phoneCallClicks: branches.reduce((sum, branch) => sum + (branch.phoneCallClicks ?? 0), 0),
    issueCounts,
    brandSummaries: [...BRANDS.map((brand) => brand.id), 'needs-review' as const].map((brandId) => brandSummary(brandId, branches))
  };
}
```

- [ ] **Step 4: Run tests**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/metrics.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add gbp-dashboard/src/shared/metrics.ts gbp-dashboard/src/shared/metrics.test.ts
git commit -m "feat: add gbp completion metrics"
```

---

## Task 3: Add SQLite Persistence

**Files:**
- Create: `gbp-dashboard/server/sqliteStore.mjs`
- Create: `gbp-dashboard/server/sqliteStore.test.mjs`
- Modify: `gbp-dashboard/.env.example`
- Modify: `gbp-dashboard/package.json`

- [ ] **Step 1: Add environment and Node requirement**

In `gbp-dashboard/package.json`, add:

```json
"engines": {
  "node": ">=24"
}
```

In `gbp-dashboard/.env.example`, replace cache/mapping file settings with:

```bash
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REDIRECT_URI="http://127.0.0.1:4174/auth/google/callback"
GBP_SQLITE_FILE="./data/gbp-dashboard.sqlite"
GBP_TOKEN_FILE="./data/google-token.json"
```

- [ ] **Step 2: Write SQLite store tests**

Create `gbp-dashboard/server/sqliteStore.test.mjs`:

```js
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createSqliteStore } from './sqliteStore.mjs';

let dir;
let store;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), 'gbp-sqlite-'));
  store = createSqliteStore(join(dir, 'test.sqlite'));
  store.migrate();
});

afterEach(async () => {
  store.close();
  await rm(dir, { recursive: true, force: true });
});

describe('createSqliteStore', () => {
  it('upserts profiles, metrics, checklists, and manual brand mappings', () => {
    store.upsertProfile({
      locationId: '100',
      accountId: 'accounts/1',
      locationName: 'locations/100',
      profileName: 'Brainacademy Tebet',
      storeCode: 'BA-TBT',
      address: 'Jl. Tebet',
      city: 'Jakarta',
      brandId: 'brainacademy',
      brandMappingStatus: 'auto',
      brandConfidence: 'high',
      profileStatus: 'verified',
      rawStatusReason: null,
      lastSyncedAt: '2026-05-30T00:00:00.000Z'
    });
    store.saveBrandMapping('100', 'englishacademy');
    store.upsertPhotoChecklist('100', {
      hasInteriorPhoto: true,
      hasBuildingPhoto: false,
      hasLearningActivityPhoto: true,
      note: 'Gedung belum dicek',
      updatedAt: '2026-05-30T01:00:00.000Z'
    });
    store.upsertMetric({
      locationId: '100',
      periodStart: '2026-05-01',
      periodEnd: '2026-05-28',
      websiteClicks: 12,
      phoneCallClicks: 7,
      rating: 4.8,
      totalReviews: 20,
      metricSyncStatus: 'success',
      partialError: null,
      syncedAt: '2026-05-30T02:00:00.000Z'
    });

    const rows = store.listBranches({ periodStart: '2026-05-01', periodEnd: '2026-05-28' });
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      locationId: '100',
      brandId: 'englishacademy',
      brandMappingStatus: 'manual',
      profileStatus: 'verified',
      rating: 4.8,
      totalReviews: 20,
      websiteClicks: 12,
      phoneCallClicks: 7,
      completionStatus: 'not-complete'
    });
    expect(rows[0].blockingReasons).toContain('missing_building_photo');
  });

  it('records sync run lifecycle', () => {
    const id = store.startSyncRun();
    store.finishSyncRun(id, {
      status: 'partial_success',
      profilesSeen: 10,
      profilesSuccess: 9,
      profilesFailed: 1,
      errorSummary: '1 profile failed'
    });

    expect(store.getLatestSyncRun()).toMatchObject({
      syncRunId: id,
      status: 'partial_success',
      profilesSeen: 10,
      profilesSuccess: 9,
      profilesFailed: 1,
      errorSummary: '1 profile failed'
    });
  });
});
```

- [ ] **Step 3: Run the SQLite tests to verify failure**

Run:

```bash
cd gbp-dashboard
npm test -- server/sqliteStore.test.mjs
```

Expected: FAIL because `server/sqliteStore.mjs` does not exist.

- [ ] **Step 4: Implement `sqliteStore.mjs`**

Create `gbp-dashboard/server/sqliteStore.mjs` with these exports and behavior:

```js
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { calculateDashboardSummary, getBlockingReasons, isCompleteBranch } from '../src/shared/metrics.ts';

function bool(value) {
  return value ? 1 : 0;
}

function parseBool(value) {
  return value === 1;
}

function nowIso() {
  return new Date().toISOString();
}

export function createSqliteStore(file = process.env.GBP_SQLITE_FILE || './data/gbp-dashboard.sqlite') {
  mkdirSync(dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec('PRAGMA foreign_keys = ON');

  function migrate() {
    db.exec(`
      CREATE TABLE IF NOT EXISTS profiles (
        location_id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL,
        location_name TEXT NOT NULL,
        profile_name TEXT NOT NULL,
        store_code TEXT,
        address TEXT,
        city TEXT,
        auto_brand_id TEXT NOT NULL,
        brand_mapping_status TEXT NOT NULL,
        brand_confidence TEXT NOT NULL,
        profile_status TEXT NOT NULL,
        raw_status_reason TEXT,
        last_synced_at TEXT
      );

      CREATE TABLE IF NOT EXISTS brand_mappings (
        location_id TEXT PRIMARY KEY,
        brand_id TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS photo_checklists (
        location_id TEXT PRIMARY KEY,
        has_interior_photo INTEGER NOT NULL DEFAULT 0,
        has_building_photo INTEGER NOT NULL DEFAULT 0,
        has_learning_activity_photo INTEGER NOT NULL DEFAULT 0,
        note TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS profile_metrics (
        location_id TEXT NOT NULL,
        period_start TEXT NOT NULL,
        period_end TEXT NOT NULL,
        website_clicks INTEGER,
        phone_call_clicks INTEGER,
        rating REAL,
        total_reviews INTEGER,
        metric_sync_status TEXT NOT NULL,
        partial_error TEXT,
        synced_at TEXT NOT NULL,
        PRIMARY KEY (location_id, period_start, period_end)
      );

      CREATE TABLE IF NOT EXISTS sync_runs (
        sync_run_id INTEGER PRIMARY KEY AUTOINCREMENT,
        status TEXT NOT NULL,
        started_at TEXT NOT NULL,
        finished_at TEXT,
        profiles_seen INTEGER NOT NULL DEFAULT 0,
        profiles_success INTEGER NOT NULL DEFAULT 0,
        profiles_failed INTEGER NOT NULL DEFAULT 0,
        error_summary TEXT
      );

      CREATE TABLE IF NOT EXISTS import_runs (
        import_run_id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_name TEXT NOT NULL,
        status TEXT NOT NULL,
        total_rows INTEGER NOT NULL,
        success_rows INTEGER NOT NULL,
        failed_rows INTEGER NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
  }

  function upsertProfile(profile) {
    db.prepare(`
      INSERT INTO profiles (
        location_id, account_id, location_name, profile_name, store_code, address, city,
        auto_brand_id, brand_mapping_status, brand_confidence, profile_status, raw_status_reason, last_synced_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(location_id) DO UPDATE SET
        account_id = excluded.account_id,
        location_name = excluded.location_name,
        profile_name = excluded.profile_name,
        store_code = excluded.store_code,
        address = excluded.address,
        city = excluded.city,
        auto_brand_id = excluded.auto_brand_id,
        brand_mapping_status = CASE
          WHEN EXISTS (SELECT 1 FROM brand_mappings WHERE location_id = excluded.location_id) THEN profiles.brand_mapping_status
          ELSE excluded.brand_mapping_status
        END,
        brand_confidence = excluded.brand_confidence,
        profile_status = excluded.profile_status,
        raw_status_reason = excluded.raw_status_reason,
        last_synced_at = excluded.last_synced_at
    `).run(
      profile.locationId,
      profile.accountId,
      profile.locationName,
      profile.profileName,
      profile.storeCode,
      profile.address,
      profile.city,
      profile.brandId,
      profile.brandMappingStatus,
      profile.brandConfidence,
      profile.profileStatus,
      profile.rawStatusReason,
      profile.lastSyncedAt
    );
  }

  function saveBrandMapping(locationId, brandId) {
    db.prepare('INSERT INTO brand_mappings (location_id, brand_id, updated_at) VALUES (?, ?, ?) ON CONFLICT(location_id) DO UPDATE SET brand_id = excluded.brand_id, updated_at = excluded.updated_at').run(locationId, brandId, nowIso());
    db.prepare('UPDATE profiles SET brand_mapping_status = ? WHERE location_id = ?').run('manual', locationId);
  }

  function upsertPhotoChecklist(locationId, checklist) {
    db.prepare(`
      INSERT INTO photo_checklists (location_id, has_interior_photo, has_building_photo, has_learning_activity_photo, note, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(location_id) DO UPDATE SET
        has_interior_photo = excluded.has_interior_photo,
        has_building_photo = excluded.has_building_photo,
        has_learning_activity_photo = excluded.has_learning_activity_photo,
        note = excluded.note,
        updated_at = excluded.updated_at
    `).run(locationId, bool(checklist.hasInteriorPhoto), bool(checklist.hasBuildingPhoto), bool(checklist.hasLearningActivityPhoto), checklist.note, checklist.updatedAt || nowIso());
  }

  function upsertMetric(metric) {
    db.prepare(`
      INSERT INTO profile_metrics (location_id, period_start, period_end, website_clicks, phone_call_clicks, rating, total_reviews, metric_sync_status, partial_error, synced_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(location_id, period_start, period_end) DO UPDATE SET
        website_clicks = excluded.website_clicks,
        phone_call_clicks = excluded.phone_call_clicks,
        rating = excluded.rating,
        total_reviews = excluded.total_reviews,
        metric_sync_status = excluded.metric_sync_status,
        partial_error = excluded.partial_error,
        synced_at = excluded.synced_at
    `).run(metric.locationId, metric.periodStart, metric.periodEnd, metric.websiteClicks, metric.phoneCallClicks, metric.rating, metric.totalReviews, metric.metricSyncStatus, metric.partialError, metric.syncedAt);
  }

  function rowToBranch(row) {
    const photoChecklist = {
      hasInteriorPhoto: parseBool(row.has_interior_photo),
      hasBuildingPhoto: parseBool(row.has_building_photo),
      hasLearningActivityPhoto: parseBool(row.has_learning_activity_photo),
      note: row.note,
      updatedAt: row.checklist_updated_at
    };
    const branchBase = {
      id: row.location_id,
      accountId: row.account_id,
      locationId: row.location_id,
      locationName: row.location_name,
      profileName: row.profile_name,
      brandId: row.manual_brand_id || row.auto_brand_id,
      brandMappingStatus: row.manual_brand_id ? 'manual' : row.brand_mapping_status,
      brandConfidence: row.brand_confidence,
      storeCode: row.store_code,
      address: row.address,
      city: row.city,
      profileStatus: row.profile_status,
      rawStatusReason: row.raw_status_reason,
      rating: row.rating,
      totalReviews: row.total_reviews,
      websiteClicks: row.website_clicks,
      phoneCallClicks: row.phone_call_clicks,
      photoChecklist,
      lastSyncedAt: row.last_synced_at
    };
    const blockingReasons = getBlockingReasons(branchBase);
    return {
      ...branchBase,
      completionStatus: isCompleteBranch(branchBase) ? 'complete' : 'not-complete',
      blockingReasons
    };
  }

  function listBranches({ periodStart, periodEnd }) {
    const rows = db.prepare(`
      SELECT
        p.*,
        bm.brand_id AS manual_brand_id,
        pc.has_interior_photo,
        pc.has_building_photo,
        pc.has_learning_activity_photo,
        pc.note,
        pc.updated_at AS checklist_updated_at,
        pm.website_clicks,
        pm.phone_call_clicks,
        pm.rating,
        pm.total_reviews
      FROM profiles p
      LEFT JOIN brand_mappings bm ON bm.location_id = p.location_id
      LEFT JOIN photo_checklists pc ON pc.location_id = p.location_id
      LEFT JOIN profile_metrics pm ON pm.location_id = p.location_id AND pm.period_start = ? AND pm.period_end = ?
      ORDER BY p.profile_name ASC
    `).all(periodStart, periodEnd);
    return rows.map((row) => rowToBranch({
      ...row,
      has_interior_photo: row.has_interior_photo ?? 0,
      has_building_photo: row.has_building_photo ?? 0,
      has_learning_activity_photo: row.has_learning_activity_photo ?? 0
    }));
  }

  function readDashboardPayload(period) {
    const branches = listBranches(period);
    return {
      source: branches.length > 0 ? 'sqlite' : 'empty',
      syncedAt: getLatestSyncRun()?.finishedAt ?? null,
      summary: calculateDashboardSummary(branches),
      branches
    };
  }

  function startSyncRun() {
    const result = db.prepare('INSERT INTO sync_runs (status, started_at) VALUES (?, ?)').run('running', nowIso());
    return Number(result.lastInsertRowid);
  }

  function finishSyncRun(syncRunId, result) {
    db.prepare(`
      UPDATE sync_runs
      SET status = ?, finished_at = ?, profiles_seen = ?, profiles_success = ?, profiles_failed = ?, error_summary = ?
      WHERE sync_run_id = ?
    `).run(result.status, nowIso(), result.profilesSeen, result.profilesSuccess, result.profilesFailed, result.errorSummary, syncRunId);
  }

  function getLatestSyncRun() {
    const row = db.prepare('SELECT * FROM sync_runs ORDER BY sync_run_id DESC LIMIT 1').get();
    if (!row) return null;
    return {
      syncRunId: row.sync_run_id,
      status: row.status,
      startedAt: row.started_at,
      finishedAt: row.finished_at,
      profilesSeen: row.profiles_seen,
      profilesSuccess: row.profiles_success,
      profilesFailed: row.profiles_failed,
      errorSummary: row.error_summary
    };
  }

  function close() {
    db.close();
  }

  return {
    migrate,
    upsertProfile,
    saveBrandMapping,
    upsertPhotoChecklist,
    upsertMetric,
    listBranches,
    readDashboardPayload,
    startSyncRun,
    finishSyncRun,
    getLatestSyncRun,
    close
  };
}
```

- [ ] **Step 5: Run SQLite tests**

Run:

```bash
cd gbp-dashboard
npm test -- server/sqliteStore.test.mjs
```

Expected: PASS on Node 24.

- [ ] **Step 6: Commit**

```bash
git add gbp-dashboard/package.json gbp-dashboard/.env.example gbp-dashboard/server/sqliteStore.mjs gbp-dashboard/server/sqliteStore.test.mjs
git commit -m "feat: add sqlite store for gbp dashboard"
```

---

## Task 4: Add Photo Checklist CSV Import

**Files:**
- Create: `gbp-dashboard/server/photoChecklistImport.mjs`
- Create: `gbp-dashboard/server/photoChecklistImport.test.mjs`
- Modify: `gbp-dashboard/server/sqliteStore.mjs`

- [ ] **Step 1: Write CSV import tests**

Create `gbp-dashboard/server/photoChecklistImport.test.mjs`:

```js
import { describe, expect, it } from 'vitest';
import { parsePhotoChecklistCsv } from './photoChecklistImport.mjs';

describe('parsePhotoChecklistCsv', () => {
  it('parses valid checklist rows', () => {
    const result = parsePhotoChecklistCsv(`location_id,profile_name,interior_photo,building_photo,learning_activity_photo,note
100,Brainacademy Tebet,yes,no,true,Gedung belum dicek`);

    expect(result.validRows).toEqual([{
      locationId: '100',
      profileName: 'Brainacademy Tebet',
      checklist: {
        hasInteriorPhoto: true,
        hasBuildingPhoto: false,
        hasLearningActivityPhoto: true,
        note: 'Gedung belum dicek',
        updatedAt: expect.any(String)
      }
    }]);
    expect(result.rejectedRows).toEqual([]);
  });

  it('rejects rows with missing location_id and invalid booleans', () => {
    const result = parsePhotoChecklistCsv(`location_id,profile_name,interior_photo,building_photo,learning_activity_photo,note
,No ID,maybe,no,true,Invalid`);

    expect(result.validRows).toEqual([]);
    expect(result.rejectedRows[0]).toMatchObject({
      rowNumber: 2,
      reason: 'location_id is required; interior_photo must be yes/no/true/false/1/0'
    });
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:

```bash
cd gbp-dashboard
npm test -- server/photoChecklistImport.test.mjs
```

Expected: FAIL because parser file does not exist.

- [ ] **Step 3: Implement CSV parser**

Create `gbp-dashboard/server/photoChecklistImport.mjs`:

```js
function splitCsvLine(line) {
  const cells = [];
  let current = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      cells.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

function parseBoolean(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (['yes', 'true', '1', 'y'].includes(normalized)) return true;
  if (['no', 'false', '0', 'n'].includes(normalized)) return false;
  return null;
}

export function parsePhotoChecklistCsv(csvText, now = new Date().toISOString()) {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const headers = splitCsvLine(lines[0] || '').map((header) => header.trim());
  const validRows = [];
  const rejectedRows = [];

  for (let index = 1; index < lines.length; index += 1) {
    const rowNumber = index + 1;
    const cells = splitCsvLine(lines[index]);
    const row = Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex] ?? '']));
    const errors = [];
    const interior = parseBoolean(row.interior_photo);
    const building = parseBoolean(row.building_photo);
    const learning = parseBoolean(row.learning_activity_photo);

    if (!row.location_id) errors.push('location_id is required');
    if (interior === null) errors.push('interior_photo must be yes/no/true/false/1/0');
    if (building === null) errors.push('building_photo must be yes/no/true/false/1/0');
    if (learning === null) errors.push('learning_activity_photo must be yes/no/true/false/1/0');

    if (errors.length > 0) {
      rejectedRows.push({ rowNumber, reason: errors.join('; '), row });
      continue;
    }

    validRows.push({
      locationId: row.location_id,
      profileName: row.profile_name || null,
      checklist: {
        hasInteriorPhoto: interior,
        hasBuildingPhoto: building,
        hasLearningActivityPhoto: learning,
        note: row.note || null,
        updatedAt: now
      }
    });
  }

  return { validRows, rejectedRows };
}
```

- [ ] **Step 4: Add import run persistence to SQLite store**

In `gbp-dashboard/server/sqliteStore.mjs`, add this method to the returned object:

```js
function recordImportRun({ fileName, status, totalRows, successRows, failedRows }) {
  const result = db.prepare(`
    INSERT INTO import_runs (file_name, status, total_rows, success_rows, failed_rows, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(fileName, status, totalRows, successRows, failedRows, nowIso());
  return Number(result.lastInsertRowid);
}
```

Add `recordImportRun` to the returned object.

- [ ] **Step 5: Run parser and store tests**

Run:

```bash
cd gbp-dashboard
npm test -- server/photoChecklistImport.test.mjs server/sqliteStore.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add gbp-dashboard/server/photoChecklistImport.mjs gbp-dashboard/server/photoChecklistImport.test.mjs gbp-dashboard/server/sqliteStore.mjs
git commit -m "feat: add photo checklist csv import"
```

---

## Task 5: Convert Backend API To SQLite

**Files:**
- Modify: `gbp-dashboard/server/index.mjs`
- Modify: `gbp-dashboard/server/syncService.mjs`
- Modify: `gbp-dashboard/server/gbpClient.mjs`
- Modify: `gbp-dashboard/server/mockData.mjs`
- Modify: `gbp-dashboard/server/syncService.test.mjs`
- Modify: `gbp-dashboard/server/gbpClient.test.mjs`

- [ ] **Step 1: Update Google client tests**

In `gbp-dashboard/server/gbpClient.test.mjs`, assert these methods exist on `createGbpClient(token)`:

```js
expect(client.listAccounts).toEqual(expect.any(Function));
expect(client.listLocations).toEqual(expect.any(Function));
expect(client.fetchPerformance).toEqual(expect.any(Function));
expect(client.listReviews).toEqual(expect.any(Function));
expect(client.getVoiceOfMerchantState).toEqual(expect.any(Function));
```

Also update performance metric tests so the request includes only:

```js
['WEBSITE_CLICKS', 'CALL_CLICKS']
```

- [ ] **Step 2: Implement Google client additions**

Modify `gbp-dashboard/server/gbpClient.mjs`:

```js
async getVoiceOfMerchantState(locationName) {
  const locationId = locationName.split('/').at(-1);
  return googleFetch(`https://mybusinessverifications.googleapis.com/v1/locations/${locationId}:getVoiceOfMerchantState`);
}
```

Change `fetchPerformance` metrics to:

```js
const metrics = ['WEBSITE_CLICKS', 'CALL_CLICKS'];
```

- [ ] **Step 3: Refactor sync service around injected dependencies**

Change `runManualSync` in `gbp-dashboard/server/syncService.mjs` to accept optional dependencies:

```js
export async function runManualSync({
  store = createSqliteStore(),
  clientFactory = createGbpClient,
  tokenProvider = getValidToken,
  period = defaultPeriod()
} = {}) {
  store.migrate();
  const syncRunId = store.startSyncRun();
  // existing sync state updates continue here
}
```

Use this shape so tests can pass fake clients and temp SQLite stores.

- [ ] **Step 4: Normalize Google location data**

Add these pure helpers to `syncService.mjs` and test them directly:

```js
export function googleDate(value) {
  return {
    year: Number(value.slice(0, 4)),
    month: Number(value.slice(5, 7)),
    day: Number(value.slice(8, 10))
  };
}

export function defaultPeriod(today = new Date()) {
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27);
  return {
    periodStart: start.toISOString().slice(0, 10),
    periodEnd: end.toISOString().slice(0, 10)
  };
}

export function mapProfileStatus({ location, voiceState }) {
  const openStatus = location.openInfo?.status;
  if (location.metadata?.duplicateLocation) return { profileStatus: 'duplicate', rawStatusReason: JSON.stringify(location.metadata.duplicateLocation) };
  if (openStatus === 'CLOSED_PERMANENTLY') return { profileStatus: 'permanently_closed', rawStatusReason: openStatus };
  if (openStatus === 'CLOSED_TEMPORARILY') return { profileStatus: 'temporarily_closed', rawStatusReason: openStatus };
  const hasVoice = Boolean(voiceState?.hasVoiceOfMerchant);
  const rawVoiceState = JSON.stringify(voiceState || {});
  const isProcessing = Boolean(voiceState?.waitForVoiceOfMerchant) || /progress|process|pending/i.test(rawVoiceState);
  const hasProblem = Boolean(voiceState?.hasBusinessAuthority);
  if (hasVoice) return { profileStatus: 'verified', rawStatusReason: 'hasVoiceOfMerchant' };
  if (isProcessing) return { profileStatus: 'on_progress', rawStatusReason: rawVoiceState };
  if (hasProblem) return { profileStatus: 'need_verification', rawStatusReason: JSON.stringify(voiceState) };
  if (rawVoiceState.toLowerCase().includes('reject')) return { profileStatus: 'rejected', rawStatusReason: rawVoiceState };
  return { profileStatus: 'unknown', rawStatusReason: voiceState ? JSON.stringify(voiceState) : null };
}
```

- [ ] **Step 5: Persist sync output**

Inside `runManualSync`, for each location:

```js
const detection = detectBrand(location.title || location.name);
const locationId = location.name.split('/').at(-1);
store.upsertProfile({
  locationId,
  accountId: account.name.split('/').at(-1),
  locationName: location.name,
  profileName: location.title || location.name,
  storeCode: location.storeCode || null,
  address: location.storefrontAddress?.addressLines?.join(', ') || null,
  city: location.storefrontAddress?.locality || null,
  brandId: detection.brandId,
  brandMappingStatus: detection.mappingStatus,
  brandConfidence: detection.confidence,
  profileStatus,
  rawStatusReason,
  lastSyncedAt: syncedAt
});
store.upsertMetric({
  locationId,
  periodStart: period.periodStart,
  periodEnd: period.periodEnd,
  websiteClicks,
  phoneCallClicks,
  rating: reviewStats.averageRating,
  totalReviews: reviewStats.totalReviews,
  metricSyncStatus,
  partialError,
  syncedAt
});
```

Use `partial_success` when one or more profiles fail but at least one profile succeeds.

- [ ] **Step 6: Update Express routes**

Modify `gbp-dashboard/server/index.mjs`:

```js
import { parsePhotoChecklistCsv } from './photoChecklistImport.mjs';
import { createSqliteStore } from './sqliteStore.mjs';
```

Initialize and migrate:

```js
const store = createSqliteStore();
store.migrate();
```

Use routes:

```js
app.get('/api/dashboard', (request, response) => {
  const periodStart = String(request.query.periodStart || '2026-05-03');
  const periodEnd = String(request.query.periodEnd || '2026-05-30');
  response.json(store.readDashboardPayload({ periodStart, periodEnd }));
});

app.post('/api/brand-mappings', (request, response) => {
  const { locationId, brandId } = request.body;
  if (!locationId || !brandId) {
    response.status(400).json({ ok: false, error: 'locationId and brandId are required' });
    return;
  }
  store.saveBrandMapping(locationId, brandId);
  response.json({ ok: true });
});

app.post('/api/photo-checklists', (request, response) => {
  const { locationId, checklist } = request.body;
  if (!locationId || !checklist) {
    response.status(400).json({ ok: false, error: 'locationId and checklist are required' });
    return;
  }
  store.upsertPhotoChecklist(locationId, checklist);
  response.json({ ok: true });
});

app.post('/api/photo-checklists/import', (request, response) => {
  const { fileName = 'photo-checklist.csv', csvText } = request.body;
  if (!csvText) {
    response.status(400).json({ ok: false, error: 'csvText is required' });
    return;
  }
  const parsed = parsePhotoChecklistCsv(csvText);
  for (const row of parsed.validRows) {
    store.upsertPhotoChecklist(row.locationId, row.checklist);
  }
  store.recordImportRun({
    fileName,
    status: parsed.rejectedRows.length === 0 ? 'success' : 'partial_success',
    totalRows: parsed.validRows.length + parsed.rejectedRows.length,
    successRows: parsed.validRows.length,
    failedRows: parsed.rejectedRows.length
  });
  response.json({ ok: true, ...parsed });
});
```

- [ ] **Step 7: Run backend tests**

Run:

```bash
cd gbp-dashboard
npm test -- server/gbpClient.test.mjs server/syncService.test.mjs server/sqliteStore.test.mjs server/photoChecklistImport.test.mjs
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add gbp-dashboard/server/index.mjs gbp-dashboard/server/syncService.mjs gbp-dashboard/server/gbpClient.mjs gbp-dashboard/server/mockData.mjs gbp-dashboard/server/syncService.test.mjs gbp-dashboard/server/gbpClient.test.mjs
git commit -m "feat: sync gbp data into sqlite"
```

---

## Task 6: Update Filtering And Export

**Files:**
- Modify: `gbp-dashboard/src/shared/filters.ts`
- Modify: `gbp-dashboard/src/shared/filters.test.ts`
- Modify: `gbp-dashboard/src/shared/exportRows.ts`
- Modify: `gbp-dashboard/src/shared/exportRows.test.ts`

- [ ] **Step 1: Write filter/export tests**

Update tests to assert:

```ts
expect(filterBranches(branches, { profileStatus: 'rejected' })).toHaveLength(1);
expect(filterBranches(branches, { profileStatus: 'duplicate' })).toHaveLength(1);
expect(filterBranches(branches, { profileStatus: 'on_progress' })).toHaveLength(1);
expect(filterBranches(branches, { completionStatus: 'not-complete' })).toHaveLength(2);
expect(filterBranches(branches, { missingChecklist: 'building' })).toHaveLength(1);
expect(sortBranches(branches, { column: 'phoneCallClicks', direction: 'desc' })[0].phoneCallClicks).toBe(20);
```

For export rows:

```ts
expect(buildExportRows([branch], { activeStart: '2026-05-03', activeEnd: '2026-05-30' })[0]).toEqual({
  brand: 'Brainacademy',
  profileName: 'Brainacademy Tebet',
  storeCode: 'BA-TBT',
  cityAddress: 'Jakarta / Jl. Tebet',
  profileStatus: 'verified',
  rating: 4.6,
  totalReviews: 12,
  websiteClicks: 10,
  phoneCallClicks: 5,
  interiorPhotoChecklist: 'yes',
  buildingPhotoChecklist: 'yes',
  learningActivityPhotoChecklist: 'yes',
  completionStatus: 'complete',
  blockingReason: '',
  periodStart: '2026-05-03',
  periodEnd: '2026-05-30',
  lastSyncedAt: '2026-05-30T00:00:00.000Z'
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/filters.test.ts src/shared/exportRows.test.ts
```

Expected: FAIL because old fields use `averageRating`, delta metrics, and direction requests.

- [ ] **Step 3: Implement filters and export rows**

Update `filters.ts` to filter on:

- `brandId`
- `profileStatus`
- `completionStatus`
- `search`
- `ratingMin`
- `ratingMax`
- `reviewsMin`
- `reviewsMax`
- `websiteMin`
- `phoneMin`
- `missingChecklist: 'interior' | 'building' | 'learning_activity'`

Update `exportRows.ts` to output only the PRD columns and remove direction requests and comparison deltas from MVP export.

- [ ] **Step 4: Run tests**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/filters.test.ts src/shared/exportRows.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add gbp-dashboard/src/shared/filters.ts gbp-dashboard/src/shared/filters.test.ts gbp-dashboard/src/shared/exportRows.ts gbp-dashboard/src/shared/exportRows.test.ts
git commit -m "feat: update gbp filters and export"
```

---

## Task 7: Build Command-Center Frontend Pages

**Files:**
- Create: `gbp-dashboard/src/components/Overview.tsx`
- Create: `gbp-dashboard/src/components/Overview.test.tsx`
- Create: `gbp-dashboard/src/components/PhotoChecklist.tsx`
- Create: `gbp-dashboard/src/components/PhotoChecklist.test.tsx`
- Modify: `gbp-dashboard/src/App.tsx`
- Modify: `gbp-dashboard/src/components/BranchTable.tsx`
- Modify: `gbp-dashboard/src/components/ProfileHealth.tsx`
- Modify: `gbp-dashboard/src/components/NeedsReview.tsx`
- Modify: `gbp-dashboard/src/components/SettingsSync.tsx`
- Modify: `gbp-dashboard/src/components/Scorecards.tsx`

- [ ] **Step 1: Write Overview render test**

Create `gbp-dashboard/src/components/Overview.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Overview } from './Overview';
import type { BranchProfile, DashboardSummary } from '../shared/types';

const summary: DashboardSummary = {
  totalProfiles: 2,
  verifiedProfiles: 1,
  completedProfiles: 1,
  verifiedRate: 50,
  completionRate: 50,
  averageRating: 4.6,
  totalReviews: 20,
  websiteClicks: 12,
  phoneCallClicks: 7,
  issueCounts: { need_verification: 1 } as DashboardSummary['issueCounts'],
  brandSummaries: [{
    brandId: 'brainacademy',
    totalProfiles: 2,
    verifiedProfiles: 1,
    completeProfiles: 1,
    needVerificationProfiles: 1,
    onProgressProfiles: 0,
    duplicateProfiles: 0,
    rejectedProfiles: 0,
    missingChecklistProfiles: 1,
    verifiedRate: 50,
    completionRate: 50
  }]
};

describe('Overview', () => {
  it('renders command-center KPI and brand health content', () => {
    render(<Overview summary={summary} branches={[] as BranchProfile[]} />);
    expect(screen.getByText('Total profiles')).toBeInTheDocument();
    expect(screen.getByText('Verified rate')).toBeInTheDocument();
    expect(screen.getByText('Completion rate')).toBeInTheDocument();
    expect(screen.getByText('Brainacademy')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write PhotoChecklist render/import test**

Create `gbp-dashboard/src/components/PhotoChecklist.test.tsx`:

```tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PhotoChecklist } from './PhotoChecklist';
import type { BranchProfile } from '../shared/types';

const branch = {
  id: '100',
  locationId: '100',
  profileName: 'Brainacademy Tebet',
  brandId: 'brainacademy',
  profileStatus: 'verified',
  photoChecklist: {
    hasInteriorPhoto: false,
    hasBuildingPhoto: false,
    hasLearningActivityPhoto: false,
    note: null,
    updatedAt: null
  }
} as BranchProfile;

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true, validRows: [], rejectedRows: [] })
  }));
});

describe('PhotoChecklist', () => {
  it('renders three checklist columns and saves checkbox changes', async () => {
    render(<PhotoChecklist branches={[branch]} onUpdated={() => undefined} />);
    fireEvent.click(screen.getByLabelText('Interior photo for Brainacademy Tebet'));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/api/photo-checklists', expect.objectContaining({ method: 'POST' })));
    expect(screen.getByText('Interior')).toBeInTheDocument();
    expect(screen.getByText('Gedung')).toBeInTheDocument();
    expect(screen.getByText('Aktivitas belajar')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run UI tests to verify failure**

Run:

```bash
cd gbp-dashboard
npm test -- src/components/Overview.test.tsx src/components/PhotoChecklist.test.tsx
```

Expected: FAIL because components do not exist.

- [ ] **Step 4: Implement Overview**

Create `gbp-dashboard/src/components/Overview.tsx`:

```tsx
import { AlertTriangle, CheckCircle2, MousePointerClick, PhoneCall, Star, Store } from 'lucide-react';
import { getBrandLabel } from '../shared/brands';
import type { BranchProfile, DashboardSummary } from '../shared/types';
import { Badge, Card, CardDescription, CardHeader, CardTitle } from './ui';

export function Overview({ summary, branches }: { summary: DashboardSummary; branches: BranchProfile[] }) {
  const attentionBranches = branches.filter((branch) => branch.blockingReasons.length > 0).slice(0, 8);
  const kpis = [
    { label: 'Total profiles', value: summary.totalProfiles.toLocaleString('id-ID'), Icon: Store },
    { label: 'Verified rate', value: `${summary.verifiedRate}%`, Icon: CheckCircle2 },
    { label: 'Completion rate', value: `${summary.completionRate}%`, Icon: CheckCircle2 },
    { label: 'Average rating', value: summary.averageRating === null ? 'N/A' : String(summary.averageRating), Icon: Star },
    { label: 'Total reviews', value: summary.totalReviews.toLocaleString('id-ID'), Icon: Star },
    { label: 'Website clicks', value: summary.websiteClicks.toLocaleString('id-ID'), Icon: MousePointerClick },
    { label: 'Phone call clicks', value: summary.phoneCallClicks.toLocaleString('id-ID'), Icon: PhoneCall }
  ];

  return (
    <div className="overview-grid">
      <section className="kpi-strip" aria-label="Overview KPIs">
        {kpis.map(({ Icon, label, value }) => (
          <div className="kpi-item" key={label}>
            <Icon size={16} aria-hidden="true" />
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <Card className="brand-health-panel">
        <CardHeader>
          <CardTitle>Brand health</CardTitle>
          <CardDescription>Verified and completion rate by brand.</CardDescription>
        </CardHeader>
        <div className="brand-health-table">
          {summary.brandSummaries.filter((brand) => brand.totalProfiles > 0).map((brand) => (
            <div className="brand-health-row" key={brand.brandId}>
              <strong>{getBrandLabel(brand.brandId)}</strong>
              <span>{brand.totalProfiles} profiles</span>
              <Badge variant="success">{brand.verifiedRate}% verified</Badge>
              <Badge variant={brand.completionRate >= 80 ? 'success' : 'warning'}>{brand.completionRate}% complete</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="issue-panel">
        <CardHeader>
          <CardTitle>Issue summary</CardTitle>
          <CardDescription>Most important blockers across active filters.</CardDescription>
        </CardHeader>
        <div className="issue-list">
          {Object.entries(summary.issueCounts).filter(([, count]) => count > 0).map(([key, count]) => (
            <div className="issue-row" key={key}>
              <AlertTriangle size={16} aria-hidden="true" />
              <span>{key.replaceAll('_', ' ')}</span>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
      </Card>

      <Card className="attention-panel">
        <CardHeader>
          <CardTitle>Needs attention</CardTitle>
          <CardDescription>Branches with blocking reasons.</CardDescription>
        </CardHeader>
        <div className="attention-list">
          {attentionBranches.length === 0 ? <p className="empty-state">No branches need attention in the active filters.</p> : attentionBranches.map((branch) => (
            <div className="attention-row" key={branch.locationId}>
              <strong>{branch.profileName}</strong>
              <span>{branch.blockingReasons.join(', ').replaceAll('_', ' ')}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
```

- [ ] **Step 5: Implement PhotoChecklist**

Create `gbp-dashboard/src/components/PhotoChecklist.tsx` with:

- Props: `{ branches: BranchProfile[]; onUpdated: () => void }`
- Three checkbox columns with labels from the test.
- POST `/api/photo-checklists` on checkbox changes.
- File input that reads CSV text and POSTs `/api/photo-checklists/import`.
- Import summary displaying success and rejected row counts.

- [ ] **Step 6: Update App navigation**

Modify `gbp-dashboard/src/App.tsx`:

- Add `photo-checklist` tab.
- Render `<Overview summary={summary} branches={filteredBranches} />`.
- Render `<PhotoChecklist branches={filteredBranches} onUpdated={loadDashboard} />`.
- Pass new `BranchProfile` fields to existing pages.

- [ ] **Step 7: Update BranchTable**

Modify `gbp-dashboard/src/components/BranchTable.tsx`:

- Use `profileName` instead of `title`.
- Use `rating` instead of `averageRating`.
- Use `phoneCallClicks` instead of `callClicks.current`.
- Remove direction requests.
- Add photo checklist column.
- Show `blockingReasons` as labels.
- Keep `aria-sort` on sortable columns.

- [ ] **Step 8: Update SettingsSync**

Modify `gbp-dashboard/src/components/SettingsSync.tsx` to show the PRD readiness checklist:

- Google Cloud Project.
- OAuth consent screen.
- OAuth Web Client.
- Redirect URI.
- Scope `business.manage`.
- GBP Basic API Access.
- GBP quota not `0`.
- Owner/manager Google account.

Keep Connect Google disabled when OAuth config is missing.

- [ ] **Step 9: Run UI tests**

Run:

```bash
cd gbp-dashboard
npm test -- src/components/Overview.test.tsx src/components/PhotoChecklist.test.tsx src/components/BranchTable.test.tsx src/components/Scorecards.test.tsx
```

Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add gbp-dashboard/src/App.tsx gbp-dashboard/src/components/Overview.tsx gbp-dashboard/src/components/Overview.test.tsx gbp-dashboard/src/components/PhotoChecklist.tsx gbp-dashboard/src/components/PhotoChecklist.test.tsx gbp-dashboard/src/components/BranchTable.tsx gbp-dashboard/src/components/ProfileHealth.tsx gbp-dashboard/src/components/NeedsReview.tsx gbp-dashboard/src/components/SettingsSync.tsx gbp-dashboard/src/components/Scorecards.tsx
git commit -m "feat: add gbp command center pages"
```

---

## Task 8: Apply UI/UX Guide Styling

**Files:**
- Modify: `gbp-dashboard/src/styles.css`
- Modify: `gbp-dashboard/src/components/ui.tsx`

- [ ] **Step 1: Add semantic CSS tokens**

In `gbp-dashboard/src/styles.css`, define tokens for:

```css
:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #0f172a;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
  --color-primary: #0f766e;
  --color-success: #15803d;
  --color-warning: #b45309;
  --color-danger: #be123c;
  --radius-sm: 6px;
  --radius-md: 8px;
  --shadow-soft: 0 1px 2px rgba(15, 23, 42, 0.08);
}
```

- [ ] **Step 2: Style app shell and dense table**

Add styles for:

- `.dashboard-shell`
- `.sidebar-shell`
- `.dashboard-content`
- `.page-header`
- `.filter-bar`
- `.kpi-strip`
- `.branch-table`
- `.branch-table th`
- `.branch-table td`
- `.status-chip`
- `.completion-chip`
- `.photo-checklist-grid`
- `.sync-stage-list`

Requirements:

- Desktop sidebar persistent.
- Sticky filter bar inside content.
- Sticky table header.
- Numeric columns use `font-variant-numeric: tabular-nums`.
- No horizontal page scroll; table scroll is contained inside `.branch-table`.
- Focus states are visible.

- [ ] **Step 3: Update UI primitives**

Modify `gbp-dashboard/src/components/ui.tsx` so:

- Buttons have visible focus style.
- Icon-only buttons require `aria-label` at call sites.
- Badges have success/warning/danger/secondary variants with contrast.
- Inputs/selects have labels at call sites and consistent height.

- [ ] **Step 4: Run build**

Run:

```bash
cd gbp-dashboard
npm run build
```

Expected: TypeScript and Vite build succeed.

- [ ] **Step 5: Run tests**

Run:

```bash
cd gbp-dashboard
npm test
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add gbp-dashboard/src/styles.css gbp-dashboard/src/components/ui.tsx
git commit -m "style: apply gbp command center design"
```

---

## Task 9: Update Documentation And Final Verification

**Files:**
- Modify: `gbp-dashboard/README.md`
- Modify: `.gitignore`

- [ ] **Step 1: Update README setup instructions**

Update `gbp-dashboard/README.md` with sections:

- Local setup.
- Required Node version: Node 24+.
- `.env` values.
- Google Cloud/API readiness checklist.
- How to run mock/empty state.
- How to connect Google.
- How to sync manually.
- How to import photo checklist CSV.
- How to export CSV/XLSX.
- Troubleshooting quota `0`.

- [ ] **Step 2: Update `.gitignore`**

Ensure `.gitignore` contains:

```gitignore
gbp-dashboard/data/
gbp-dashboard/.env
gbp-dashboard/dist/
gbp-dashboard/node_modules/
```

- [ ] **Step 3: Run full validation**

Run:

```bash
cd gbp-dashboard
npm test
npm run build
```

Expected: both commands exit with code 0.

- [ ] **Step 4: Start local app for browser verification**

Run:

```bash
cd gbp-dashboard
npm run dev:all
```

Expected:

- API listens on `http://127.0.0.1:4174`.
- Vite serves frontend on `http://127.0.0.1:5174`.

- [ ] **Step 5: Browser verify core flows**

Open `http://127.0.0.1:5174` and verify:

- Overview loads without blank screen.
- Settings shows API readiness checklist.
- Branches table has status, rating, reviews, website clicks, phone call clicks, photo checklist, completion, blocking reason.
- Photo Checklist page can render and shows CSV import control.
- Needs Review page renders.
- Export CSV and XLSX buttons download files.
- No console errors during page load.

- [ ] **Step 6: Stop dev server**

Stop the `npm run dev:all` process before ending the implementation session.

- [ ] **Step 7: Commit**

```bash
git add gbp-dashboard/README.md .gitignore
git commit -m "docs: update gbp dashboard setup"
```

---

## Self-Review Checklist

- Spec coverage:
  - Infrastructure prerequisites: Task 9 README and Task 7 Settings.
  - SQLite storage: Task 3.
  - Manual sync: Task 5.
  - Brand detection: Task 1.
  - Completion formula with photo checklist: Task 2 and Task 4.
  - Dashboard pages: Task 7.
  - Filter/export: Task 6.
  - UI/UX guide: Task 8.
  - Error and loading states: Task 5, Task 7, Task 8.

- Completeness scan:
  - The plan uses concrete file paths, commands, expected outcomes, and code blocks for the riskiest backend and shared-data work.

- Type consistency:
  - The plan standardizes on `profileName`, `rating`, `phoneCallClicks`, `photoChecklist`, `blockingReasons`, and `verifiedRate`.
  - Backend SQLite rows map to the same frontend `BranchProfile` contract.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-30-gbp-branch-analytics-dashboard.md`. Two execution options:

1. **Subagent-Driven (recommended)** - dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
