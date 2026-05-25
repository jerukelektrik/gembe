# GBP Performance Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local Google Business Profile performance dashboard for KPI scorecards, branch tables, profile health, manual sync, cache snapshots, filters, sorting, and filtered export.

**Architecture:** Create an isolated `gbp-dashboard/` Vite React app with a local Express backend. The backend owns Google OAuth, Google Business Profile API calls, sync orchestration, and JSON cache files; the frontend reads normalized dashboard data from backend endpoints and never calls Google APIs directly.

**Tech Stack:** React 19, Vite, TypeScript, Node.js, Express, tsx for the local backend runner, Vitest, Testing Library, xlsx, lucide-react, Google OAuth via raw REST calls with `fetch`.

---

## File Structure

- Create `gbp-dashboard/package.json`: scripts, runtime dependencies, and test dependencies.
- Create `gbp-dashboard/index.html`: Vite HTML entry.
- Create `gbp-dashboard/vite.config.ts`: Vite and Vitest configuration.
- Create `gbp-dashboard/tsconfig.json` and `gbp-dashboard/tsconfig.node.json`: TypeScript configuration.
- Create `gbp-dashboard/.env.example`: required local configuration names.
- Create `gbp-dashboard/server/index.mjs`: Express app and API routes.
- Create `gbp-dashboard/server/googleAuth.mjs`: OAuth URL, callback handling, token persistence.
- Create `gbp-dashboard/server/gbpClient.mjs`: Google Business Profile REST client.
- Create `gbp-dashboard/server/syncService.mjs`: sync orchestration and normalization.
- Create `gbp-dashboard/server/cacheStore.mjs`: latest cache and daily snapshot read/write.
- Create `gbp-dashboard/server/brandMappingStore.mjs`: manual brand mapping persistence for Needs Review profiles.
- Create `gbp-dashboard/server/mockData.mjs`: deterministic local seed data used before OAuth is connected.
- Create `gbp-dashboard/src/main.tsx`: React entry.
- Create `gbp-dashboard/src/App.tsx`: app shell, navigation, data loading.
- Create `gbp-dashboard/src/styles.css`: dashboard styling.
- Create `gbp-dashboard/src/shared/types.ts`: shared data contracts.
- Create `gbp-dashboard/src/shared/brands.ts`: brand definitions and detection rules.
- Create `gbp-dashboard/src/shared/metrics.ts`: KPI and period-delta calculations.
- Create `gbp-dashboard/src/shared/filters.ts`: filter, sort, and table helpers.
- Create `gbp-dashboard/src/shared/exportRows.ts`: CSV and XLSX export helpers.
- Create `gbp-dashboard/src/components/Scorecards.tsx`: KPI scorecards.
- Create `gbp-dashboard/src/components/FilterBar.tsx`: global filters.
- Create `gbp-dashboard/src/components/BranchTable.tsx`: all branch and brand table with column filters and sort icons.
- Create `gbp-dashboard/src/components/ProfileHealth.tsx`: profile health counts and issue table.
- Create `gbp-dashboard/src/components/NeedsReview.tsx`: ambiguous profile mapping UI.
- Create `gbp-dashboard/src/components/SettingsSync.tsx`: OAuth, sync button, progress, cache status.
- Create `gbp-dashboard/src/test/setup.ts`: Vitest DOM setup.
- Create test files beside shared modules and components.
- Modify `.gitignore`: add `.superpowers/`, `gbp-dashboard/node_modules/`, and local cache/token files.

## Task 1: Scaffold The Isolated App

**Files:**
- Create: `gbp-dashboard/package.json`
- Create: `gbp-dashboard/index.html`
- Create: `gbp-dashboard/vite.config.ts`
- Create: `gbp-dashboard/tsconfig.json`
- Create: `gbp-dashboard/tsconfig.node.json`
- Create: `gbp-dashboard/.env.example`
- Create: `gbp-dashboard/src/test/setup.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Add package and config files**

Create `gbp-dashboard/package.json` with this content:

```json
{
  "name": "gbp-performance-dashboard",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "server": "tsx server/index.mjs",
    "dev:all": "concurrently \"npm run server\" \"npm run dev\"",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^6.0.1",
    "concurrently": "^9.2.1",
    "express": "^5.2.1",
    "lucide-react": "^1.16.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@types/express": "^5.0.6",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "jsdom": "^27.2.0",
    "tsx": "^4.20.6",
    "typescript": "^5.9.3",
    "vite": "^8.0.12",
    "vitest": "^4.0.14"
  }
}
```

Create `gbp-dashboard/index.html`:

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0f766e" />
    <title>GBP Performance Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `gbp-dashboard/vite.config.ts`:

```ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://127.0.0.1:4174',
      '/auth': 'http://127.0.0.1:4174'
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true
  }
});
```

Create `gbp-dashboard/tsconfig.json`:

```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

Create `gbp-dashboard/tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "strict": true,
    "types": ["node"]
  },
  "include": ["vite.config.ts"]
}
```

Create `gbp-dashboard/.env.example`:

```bash
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REDIRECT_URI="http://127.0.0.1:4174/auth/google/callback"
GBP_CACHE_DIR="./data/cache"
GBP_TOKEN_FILE="./data/google-token.json"
GBP_MAPPING_FILE="./data/brand-mappings.json"
```

Create `gbp-dashboard/src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 2: Update ignore rules**

Append these lines to `.gitignore`:

```gitignore
.superpowers/
gbp-dashboard/node_modules/
gbp-dashboard/dist/
gbp-dashboard/data/
gbp-dashboard/.env
```

- [ ] **Step 3: Install dependencies**

Run:

```bash
cd gbp-dashboard
npm install
```

Expected: `package-lock.json` is created and npm exits with code 0.

- [ ] **Step 4: Verify empty project scripts are wired**

Run:

```bash
cd gbp-dashboard
npm test
```

Expected: Vitest runs with no test files and exits cleanly.

- [ ] **Step 5: Commit scaffold**

Run:

```bash
git add .gitignore gbp-dashboard/package.json gbp-dashboard/package-lock.json gbp-dashboard/index.html gbp-dashboard/vite.config.ts gbp-dashboard/tsconfig.json gbp-dashboard/tsconfig.node.json gbp-dashboard/.env.example gbp-dashboard/src/test/setup.ts
git commit -m "feat: scaffold gbp dashboard app"
```

## Task 2: Define Data Contracts And Brand Detection

**Files:**
- Create: `gbp-dashboard/src/shared/types.ts`
- Create: `gbp-dashboard/src/shared/brands.ts`
- Test: `gbp-dashboard/src/shared/brands.test.ts`

- [ ] **Step 1: Write brand detection tests**

Create `gbp-dashboard/src/shared/brands.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { detectBrand } from './brands';

describe('detectBrand', () => {
  it('detects the eight supported brands from profile names', () => {
    expect(detectBrand('Ruangguru Bandung Dago').brandId).toBe('ruangguru');
    expect(detectBrand('Brain Academy Center Bekasi').brandId).toBe('brainacademy');
    expect(detectBrand('Math Champs Surabaya Barat').brandId).toBe('mathchamps');
    expect(detectBrand('English Academy Jakarta Selatan').brandId).toBe('englishacademy');
    expect(detectBrand('Kalananti BSD').brandId).toBe('kalananti-ruangguru-coding');
    expect(detectBrand('Ruangguru Coding Depok').brandId).toBe('kalananti-ruangguru-coding');
    expect(detectBrand('Work Abroad Academy Jakarta').brandId).toBe('workabroad-academy');
    expect(detectBrand('Ruangguru Privat Malang').brandId).toBe('ruangguru-privat');
    expect(detectBrand('Alta Global School Bekasi').brandId).toBe('altaglobal-school');
  });

  it('marks unclear names as needs review', () => {
    expect(detectBrand('Cabang Pak Budi Depok')).toEqual({
      brandId: 'needs-review',
      confidence: 'low'
    });
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/brands.test.ts
```

Expected: FAIL because `./brands` does not exist.

- [ ] **Step 3: Add shared types**

Create `gbp-dashboard/src/shared/types.ts`:

```ts
export type BrandId =
  | 'ruangguru'
  | 'brainacademy'
  | 'mathchamps'
  | 'englishacademy'
  | 'kalananti-ruangguru-coding'
  | 'workabroad-academy'
  | 'ruangguru-privat'
  | 'altaglobal-school'
  | 'needs-review';

export type BrandConfidence = 'high' | 'low';

export type ProfileStatus =
  | 'verified'
  | 'unverified'
  | 'google-update'
  | 'pending-review'
  | 'temporarily-closed'
  | 'permanently-closed'
  | 'disabled'
  | 'suspended'
  | 'duplicate'
  | 'missing-store-code'
  | 'unknown';

export type BlockingReason =
  | 'complete'
  | 'not-registered'
  | 'rating'
  | 'reviews'
  | 'rating-and-reviews'
  | 'needs-review';

export interface ActionMetricValue {
  current: number | null;
  previous: number | null;
  deltaPercent: number | null;
}

export interface BranchProfile {
  id: string;
  accountName: string;
  locationName: string;
  title: string;
  brandId: BrandId;
  brandConfidence: BrandConfidence;
  storeCode: string | null;
  address: string | null;
  profileStatus: ProfileStatus;
  verified: boolean;
  averageRating: number | null;
  totalReviews: number | null;
  completionStatus: 'complete' | 'not-complete';
  blockingReason: BlockingReason;
  websiteClicks: ActionMetricValue;
  callClicks: ActionMetricValue;
  directionRequests: ActionMetricValue;
  lastSyncedAt: string;
}

export interface DashboardSummary {
  totalProfiles: number;
  verifiedProfiles: number;
  completedProfiles: number;
  registerRate: number;
  completionRate: number;
  notCompleteProfiles: number;
}
```

- [ ] **Step 4: Add brand definitions**

Create `gbp-dashboard/src/shared/brands.ts`:

```ts
import type { BrandConfidence, BrandId } from './types';

export interface BrandDefinition {
  id: Exclude<BrandId, 'needs-review'>;
  label: string;
  patterns: RegExp[];
}

export const BRANDS: BrandDefinition[] = [
  { id: 'ruangguru-privat', label: 'Ruangguru Privat', patterns: [/ruangguru\s+privat/i] },
  { id: 'kalananti-ruangguru-coding', label: 'Kalananti / Ruangguru Coding', patterns: [/kalananti/i, /ruangguru\s+coding/i] },
  { id: 'brainacademy', label: 'Brain Academy', patterns: [/brain\s*academy/i] },
  { id: 'mathchamps', label: 'Math Champs', patterns: [/math\s*champs/i] },
  { id: 'englishacademy', label: 'English Academy', patterns: [/english\s*academy/i] },
  { id: 'workabroad-academy', label: 'Work Abroad Academy', patterns: [/work\s*abroad\s*academy/i] },
  { id: 'altaglobal-school', label: 'Alta Global School', patterns: [/alta\s*global\s*school/i, /altaglobal\s*school/i] },
  { id: 'ruangguru', label: 'Ruangguru', patterns: [/ruangguru/i] }
];

export function detectBrand(profileName: string): { brandId: BrandId; confidence: BrandConfidence } {
  const match = BRANDS.find((brand) => brand.patterns.some((pattern) => pattern.test(profileName)));
  if (!match) {
    return { brandId: 'needs-review', confidence: 'low' };
  }

  return { brandId: match.id, confidence: 'high' };
}

export function getBrandLabel(brandId: BrandId): string {
  if (brandId === 'needs-review') return 'Needs Review';
  return BRANDS.find((brand) => brand.id === brandId)?.label ?? 'Needs Review';
}
```

- [ ] **Step 5: Run tests and commit**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/brands.test.ts
```

Expected: PASS.

Run:

```bash
git add gbp-dashboard/src/shared/types.ts gbp-dashboard/src/shared/brands.ts gbp-dashboard/src/shared/brands.test.ts
git commit -m "feat: add gbp brand detection"
```

## Task 3: Implement KPI And Delta Calculations

**Files:**
- Create: `gbp-dashboard/src/shared/metrics.ts`
- Test: `gbp-dashboard/src/shared/metrics.test.ts`

- [ ] **Step 1: Write metric tests**

Create `gbp-dashboard/src/shared/metrics.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import type { BranchProfile } from './types';
import { calculateDashboardSummary, calculateDeltaPercent, getBlockingReason } from './metrics';

const baseBranch: BranchProfile = {
  id: '1',
  accountName: 'accounts/1',
  locationName: 'locations/1',
  title: 'Brain Academy Bandung',
  brandId: 'brainacademy',
  brandConfidence: 'high',
  storeCode: 'BA-BDG',
  address: 'Bandung',
  profileStatus: 'verified',
  verified: true,
  averageRating: 4.5,
  totalReviews: 10,
  completionStatus: 'complete',
  blockingReason: 'complete',
  websiteClicks: { current: 10, previous: 5, deltaPercent: 100 },
  callClicks: { current: 2, previous: 1, deltaPercent: 100 },
  directionRequests: { current: 3, previous: 3, deltaPercent: 0 },
  lastSyncedAt: '2026-05-25T02:00:00.000Z'
};

describe('calculateDeltaPercent', () => {
  it('returns percentage change when previous value is positive', () => {
    expect(calculateDeltaPercent(120, 100)).toBe(20);
  });

  it('returns null when previous value is zero', () => {
    expect(calculateDeltaPercent(12, 0)).toBeNull();
  });
});

describe('getBlockingReason', () => {
  it('treats rating 4.5 and reviews 10 as complete when verified', () => {
    expect(getBlockingReason({ verified: true, averageRating: 4.5, totalReviews: 10, brandId: 'brainacademy' })).toBe('complete');
  });

  it('identifies each blocking reason', () => {
    expect(getBlockingReason({ verified: false, averageRating: 5, totalReviews: 20, brandId: 'brainacademy' })).toBe('not-registered');
    expect(getBlockingReason({ verified: true, averageRating: 4.4, totalReviews: 20, brandId: 'brainacademy' })).toBe('rating');
    expect(getBlockingReason({ verified: true, averageRating: 4.8, totalReviews: 9, brandId: 'brainacademy' })).toBe('reviews');
    expect(getBlockingReason({ verified: true, averageRating: 4.3, totalReviews: 9, brandId: 'brainacademy' })).toBe('rating-and-reviews');
    expect(getBlockingReason({ verified: true, averageRating: 5, totalReviews: 20, brandId: 'needs-review' })).toBe('needs-review');
  });
});

describe('calculateDashboardSummary', () => {
  it('calculates overall rates against all profiles', () => {
    const branches = [
      baseBranch,
      { ...baseBranch, id: '2', verified: true, completionStatus: 'not-complete', blockingReason: 'rating', averageRating: 4.2 },
      { ...baseBranch, id: '3', verified: false, completionStatus: 'not-complete', blockingReason: 'not-registered', profileStatus: 'unverified' }
    ];

    expect(calculateDashboardSummary(branches)).toEqual({
      totalProfiles: 3,
      verifiedProfiles: 2,
      completedProfiles: 1,
      registerRate: 66.67,
      completionRate: 33.33,
      notCompleteProfiles: 2
    });
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/metrics.test.ts
```

Expected: FAIL because `./metrics` does not exist.

- [ ] **Step 3: Add metrics implementation**

Create `gbp-dashboard/src/shared/metrics.ts`:

```ts
import type { BlockingReason, BranchProfile, BrandId, DashboardSummary } from './types';

export function roundRate(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateDeltaPercent(current: number | null, previous: number | null): number | null {
  if (current === null || previous === null || previous === 0) return null;
  return roundRate(((current - previous) / previous) * 100);
}

export function getBlockingReason(input: {
  verified: boolean;
  averageRating: number | null;
  totalReviews: number | null;
  brandId: BrandId;
}): BlockingReason {
  if (input.brandId === 'needs-review') return 'needs-review';
  if (!input.verified) return 'not-registered';

  const ratingBlocked = input.averageRating === null || input.averageRating < 4.5;
  const reviewBlocked = input.totalReviews === null || input.totalReviews < 10;

  if (ratingBlocked && reviewBlocked) return 'rating-and-reviews';
  if (ratingBlocked) return 'rating';
  if (reviewBlocked) return 'reviews';
  return 'complete';
}

export function calculateDashboardSummary(branches: BranchProfile[]): DashboardSummary {
  const totalProfiles = branches.length;
  const verifiedProfiles = branches.filter((branch) => branch.verified).length;
  const completedProfiles = branches.filter((branch) => branch.completionStatus === 'complete').length;

  return {
    totalProfiles,
    verifiedProfiles,
    completedProfiles,
    registerRate: totalProfiles === 0 ? 0 : roundRate((verifiedProfiles / totalProfiles) * 100),
    completionRate: totalProfiles === 0 ? 0 : roundRate((completedProfiles / totalProfiles) * 100),
    notCompleteProfiles: totalProfiles - completedProfiles
  };
}
```

- [ ] **Step 4: Run tests and commit**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/metrics.test.ts src/shared/brands.test.ts
```

Expected: PASS.

Run:

```bash
git add gbp-dashboard/src/shared/metrics.ts gbp-dashboard/src/shared/metrics.test.ts
git commit -m "feat: add gbp kpi calculations"
```

## Task 4: Add Filters, Sorting, And Export Helpers

**Files:**
- Create: `gbp-dashboard/src/shared/filters.ts`
- Create: `gbp-dashboard/src/shared/exportRows.ts`
- Test: `gbp-dashboard/src/shared/filters.test.ts`
- Test: `gbp-dashboard/src/shared/exportRows.test.ts`

- [ ] **Step 1: Write tests for filtering and sorting**

Create `gbp-dashboard/src/shared/filters.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import type { BranchProfile } from './types';
import { filterBranches, sortBranches } from './filters';

function branch(overrides: Partial<BranchProfile>): BranchProfile {
  return {
    id: overrides.id ?? 'id',
    accountName: 'accounts/1',
    locationName: 'locations/1',
    title: overrides.title ?? 'Branch',
    brandId: overrides.brandId ?? 'brainacademy',
    brandConfidence: overrides.brandConfidence ?? 'high',
    storeCode: null,
    address: null,
    profileStatus: overrides.profileStatus ?? 'verified',
    verified: overrides.verified ?? true,
    averageRating: overrides.averageRating ?? 4.8,
    totalReviews: overrides.totalReviews ?? 20,
    completionStatus: overrides.completionStatus ?? 'complete',
    blockingReason: overrides.blockingReason ?? 'complete',
    websiteClicks: overrides.websiteClicks ?? { current: 10, previous: 5, deltaPercent: 100 },
    callClicks: overrides.callClicks ?? { current: 2, previous: 1, deltaPercent: 100 },
    directionRequests: overrides.directionRequests ?? { current: 3, previous: 3, deltaPercent: 0 },
    lastSyncedAt: '2026-05-25T02:00:00.000Z'
  };
}

describe('filterBranches', () => {
  it('filters by brand, rating, reviews, website, call, and blocking reason', () => {
    const branches = [
      branch({ id: 'a', brandId: 'brainacademy', averageRating: 4.3, totalReviews: 42, websiteClicks: { current: 120, previous: 100, deltaPercent: 20 }, callClicks: { current: 31, previous: 20, deltaPercent: 55 }, blockingReason: 'rating', completionStatus: 'not-complete' }),
      branch({ id: 'b', brandId: 'englishacademy', averageRating: 4.8, totalReviews: 7, websiteClicks: { current: 84, previous: 80, deltaPercent: 5 }, callClicks: { current: 22, previous: 20, deltaPercent: 10 }, blockingReason: 'reviews', completionStatus: 'not-complete' })
    ];

    expect(filterBranches(branches, { brandId: 'brainacademy', ratingMax: 4.5, reviewsMin: 10, websiteMin: 100, callMin: 30, blockingReason: 'rating' }).map((item) => item.id)).toEqual(['a']);
  });
});

describe('sortBranches', () => {
  it('sorts one active numeric column ascending and descending', () => {
    const branches = [branch({ id: 'low', averageRating: 4.2 }), branch({ id: 'high', averageRating: 4.9 })];
    expect(sortBranches(branches, { column: 'averageRating', direction: 'desc' }).map((item) => item.id)).toEqual(['high', 'low']);
    expect(sortBranches(branches, { column: 'averageRating', direction: 'asc' }).map((item) => item.id)).toEqual(['low', 'high']);
  });
});
```

Create `gbp-dashboard/src/shared/exportRows.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import type { BranchProfile } from './types';
import { buildExportRows, toCsv } from './exportRows';

const branch: BranchProfile = {
  id: '1',
  accountName: 'accounts/1',
  locationName: 'locations/1',
  title: 'Brain Academy Bandung',
  brandId: 'brainacademy',
  brandConfidence: 'high',
  storeCode: 'BA-BDG',
  address: 'Bandung',
  profileStatus: 'verified',
  verified: true,
  averageRating: 4.3,
  totalReviews: 42,
  completionStatus: 'not-complete',
  blockingReason: 'rating',
  websiteClicks: { current: 120, previous: 100, deltaPercent: 20 },
  callClicks: { current: 31, previous: 20, deltaPercent: 55 },
  directionRequests: { current: 44, previous: 40, deltaPercent: 10 },
  lastSyncedAt: '2026-05-25T02:00:00.000Z'
};

describe('buildExportRows', () => {
  it('builds branch metric rows for export', () => {
    expect(buildExportRows([branch], { activeStart: '2026-04-28', activeEnd: '2026-05-25', compareStart: '2026-03-31', compareEnd: '2026-04-27' })).toEqual([
      {
        brand: 'Brain Academy',
        branch: 'Brain Academy Bandung',
        storeCode: 'BA-BDG',
        profileStatus: 'verified',
        verifiedStatus: 'verified',
        completionStatus: 'not-complete',
        blockingReason: 'rating',
        averageRating: 4.3,
        totalReviews: 42,
        websiteClicks: 120,
        websiteClicksDeltaPercent: 20,
        callClicks: 31,
        callClicksDeltaPercent: 55,
        directionRequests: 44,
        directionRequestsDeltaPercent: 10,
        activePeriodStart: '2026-04-28',
        activePeriodEnd: '2026-05-25',
        comparisonPeriodStart: '2026-03-31',
        comparisonPeriodEnd: '2026-04-27',
        lastSyncedAt: '2026-05-25T02:00:00.000Z'
      }
    ]);
  });

  it('creates csv with headers', () => {
    expect(toCsv([{ brand: 'Brain Academy', branch: 'Brain Academy Bandung' }])).toBe('brand,branch\nBrain Academy,Brain Academy Bandung');
  });
});
```

- [ ] **Step 2: Run tests and confirm they fail**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/filters.test.ts src/shared/exportRows.test.ts
```

Expected: FAIL because `filters.ts` and `exportRows.ts` do not exist.

- [ ] **Step 3: Implement filter and sort helpers**

Create `gbp-dashboard/src/shared/filters.ts`:

```ts
import type { BlockingReason, BranchProfile, BrandId, ProfileStatus } from './types';

export interface BranchFilters {
  brandId?: BrandId;
  profileStatus?: ProfileStatus;
  completionStatus?: 'complete' | 'not-complete';
  blockingReason?: BlockingReason;
  search?: string;
  ratingMin?: number;
  ratingMax?: number;
  reviewsMin?: number;
  reviewsMax?: number;
  websiteMin?: number;
  websiteMax?: number;
  callMin?: number;
  callMax?: number;
}

export type SortColumn = 'title' | 'brandId' | 'profileStatus' | 'averageRating' | 'totalReviews' | 'websiteClicks' | 'callClicks' | 'blockingReason';

export interface BranchSort {
  column: SortColumn;
  direction: 'asc' | 'desc';
}

function inRange(value: number | null, min?: number, max?: number): boolean {
  if (value === null) return min === undefined && max === undefined;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}

export function filterBranches(branches: BranchProfile[], filters: BranchFilters): BranchProfile[] {
  const search = filters.search?.trim().toLowerCase();

  return branches.filter((branch) => {
    if (filters.brandId && branch.brandId !== filters.brandId) return false;
    if (filters.profileStatus && branch.profileStatus !== filters.profileStatus) return false;
    if (filters.completionStatus && branch.completionStatus !== filters.completionStatus) return false;
    if (filters.blockingReason && branch.blockingReason !== filters.blockingReason) return false;
    if (search && !`${branch.title} ${branch.storeCode ?? ''} ${branch.address ?? ''}`.toLowerCase().includes(search)) return false;
    if (!inRange(branch.averageRating, filters.ratingMin, filters.ratingMax)) return false;
    if (!inRange(branch.totalReviews, filters.reviewsMin, filters.reviewsMax)) return false;
    if (!inRange(branch.websiteClicks.current, filters.websiteMin, filters.websiteMax)) return false;
    if (!inRange(branch.callClicks.current, filters.callMin, filters.callMax)) return false;
    return true;
  });
}

function sortValue(branch: BranchProfile, column: SortColumn): string | number | null {
  if (column === 'websiteClicks') return branch.websiteClicks.current;
  if (column === 'callClicks') return branch.callClicks.current;
  return branch[column];
}

export function sortBranches(branches: BranchProfile[], sort: BranchSort): BranchProfile[] {
  return [...branches].sort((a, b) => {
    const aValue = sortValue(a, sort.column);
    const bValue = sortValue(b, sort.column);
    if (aValue === bValue) return a.title.localeCompare(b.title);
    if (aValue === null) return 1;
    if (bValue === null) return -1;
    const direction = sort.direction === 'asc' ? 1 : -1;
    if (typeof aValue === 'number' && typeof bValue === 'number') return (aValue - bValue) * direction;
    return String(aValue).localeCompare(String(bValue)) * direction;
  });
}
```

- [ ] **Step 4: Implement export helpers**

Create `gbp-dashboard/src/shared/exportRows.ts`:

```ts
import { getBrandLabel } from './brands';
import type { BranchProfile } from './types';

export interface ExportPeriodContext {
  activeStart: string;
  activeEnd: string;
  compareStart: string;
  compareEnd: string;
}

export type ExportRow = Record<string, string | number | null>;

export function buildExportRows(branches: BranchProfile[], period: ExportPeriodContext): ExportRow[] {
  return branches.map((branch) => ({
    brand: getBrandLabel(branch.brandId),
    branch: branch.title,
    storeCode: branch.storeCode,
    profileStatus: branch.profileStatus,
    verifiedStatus: branch.verified ? 'verified' : 'unverified',
    completionStatus: branch.completionStatus,
    blockingReason: branch.blockingReason,
    averageRating: branch.averageRating,
    totalReviews: branch.totalReviews,
    websiteClicks: branch.websiteClicks.current,
    websiteClicksDeltaPercent: branch.websiteClicks.deltaPercent,
    callClicks: branch.callClicks.current,
    callClicksDeltaPercent: branch.callClicks.deltaPercent,
    directionRequests: branch.directionRequests.current,
    directionRequestsDeltaPercent: branch.directionRequests.deltaPercent,
    activePeriodStart: period.activeStart,
    activePeriodEnd: period.activeEnd,
    comparisonPeriodStart: period.compareStart,
    comparisonPeriodEnd: period.compareEnd,
    lastSyncedAt: branch.lastSyncedAt
  }));
}

function escapeCsv(value: string | number | null): string {
  if (value === null) return '';
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toCsv(rows: ExportRow[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(','));
  return [headers.join(','), ...lines].join('\n');
}
```

- [ ] **Step 5: Run tests and commit**

Run:

```bash
cd gbp-dashboard
npm test -- src/shared/filters.test.ts src/shared/exportRows.test.ts src/shared/metrics.test.ts
```

Expected: PASS.

Run:

```bash
git add gbp-dashboard/src/shared/filters.ts gbp-dashboard/src/shared/filters.test.ts gbp-dashboard/src/shared/exportRows.ts gbp-dashboard/src/shared/exportRows.test.ts
git commit -m "feat: add branch filter and export helpers"
```

## Task 5: Add Local Cache And Mock Dataset

**Files:**
- Create: `gbp-dashboard/server/cacheStore.mjs`
- Create: `gbp-dashboard/server/mockData.mjs`
- Test: `gbp-dashboard/server/cacheStore.test.mjs`

- [ ] **Step 1: Write cache tests**

Create `gbp-dashboard/server/cacheStore.test.mjs`:

```js
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { createCacheStore } from './cacheStore.mjs';

let tempDir;

afterEach(async () => {
  if (tempDir) await rm(tempDir, { recursive: true, force: true });
});

describe('createCacheStore', () => {
  it('writes latest cache and one daily snapshot', async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'gbp-cache-'));
    const store = createCacheStore(tempDir);
    const payload = { syncedAt: '2026-05-25T02:00:00.000Z', branches: [{ id: '1' }] };

    await store.writeCache(payload);

    await expect(store.readLatest()).resolves.toEqual(payload);
    await expect(readFile(join(tempDir, 'snapshots', '2026-05-25.json'), 'utf8')).resolves.toContain('"branches"');
  });

  it('returns null when latest cache does not exist', async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'gbp-cache-'));
    const store = createCacheStore(tempDir);
    await expect(store.readLatest()).resolves.toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
cd gbp-dashboard
npm test -- server/cacheStore.test.mjs
```

Expected: FAIL because `cacheStore.mjs` does not exist.

- [ ] **Step 3: Add cache store**

Create `gbp-dashboard/server/cacheStore.mjs`:

```js
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export function createCacheStore(cacheDir = process.env.GBP_CACHE_DIR || './data/cache') {
  const latestPath = join(cacheDir, 'latest.json');
  const snapshotDir = join(cacheDir, 'snapshots');

  return {
    async readLatest() {
      try {
        return JSON.parse(await readFile(latestPath, 'utf8'));
      } catch (error) {
        if (error.code === 'ENOENT') return null;
        throw error;
      }
    },

    async writeCache(payload) {
      await mkdir(cacheDir, { recursive: true });
      await mkdir(snapshotDir, { recursive: true });
      const json = JSON.stringify(payload, null, 2);
      await writeFile(latestPath, json);
      const snapshotDate = payload.syncedAt.slice(0, 10);
      await writeFile(join(snapshotDir, `${snapshotDate}.json`), json);
    }
  };
}
```

- [ ] **Step 4: Add mock dataset**

Create `gbp-dashboard/server/mockData.mjs`:

```js
export const mockBranches = [
  {
    id: 'mock-1',
    accountName: 'accounts/mock',
    locationName: 'locations/mock-1',
    title: 'Brain Academy Bandung',
    brandId: 'brainacademy',
    brandConfidence: 'high',
    storeCode: 'BA-BDG',
    address: 'Bandung',
    profileStatus: 'verified',
    verified: true,
    averageRating: 4.3,
    totalReviews: 42,
    completionStatus: 'not-complete',
    blockingReason: 'rating',
    websiteClicks: { current: 120, previous: 100, deltaPercent: 20 },
    callClicks: { current: 31, previous: 35, deltaPercent: -11.43 },
    directionRequests: { current: 44, previous: 40, deltaPercent: 10 },
    lastSyncedAt: '2026-05-25T02:00:00.000Z'
  },
  {
    id: 'mock-2',
    accountName: 'accounts/mock',
    locationName: 'locations/mock-2',
    title: 'English Academy Bekasi',
    brandId: 'englishacademy',
    brandConfidence: 'high',
    storeCode: 'EA-BKS',
    address: 'Bekasi',
    profileStatus: 'verified',
    verified: true,
    averageRating: 4.8,
    totalReviews: 7,
    completionStatus: 'not-complete',
    blockingReason: 'reviews',
    websiteClicks: { current: 84, previous: 80, deltaPercent: 5 },
    callClicks: { current: 22, previous: 20, deltaPercent: 10 },
    directionRequests: { current: 18, previous: 16, deltaPercent: 12.5 },
    lastSyncedAt: '2026-05-25T02:00:00.000Z'
  },
  {
    id: 'mock-3',
    accountName: 'accounts/mock',
    locationName: 'locations/mock-3',
    title: 'Ruangguru Privat Depok',
    brandId: 'ruangguru-privat',
    brandConfidence: 'high',
    storeCode: null,
    address: 'Depok',
    profileStatus: 'unverified',
    verified: false,
    averageRating: null,
    totalReviews: null,
    completionStatus: 'not-complete',
    blockingReason: 'not-registered',
    websiteClicks: { current: 0, previous: 0, deltaPercent: null },
    callClicks: { current: 0, previous: 0, deltaPercent: null },
    directionRequests: { current: 0, previous: 0, deltaPercent: null },
    lastSyncedAt: '2026-05-25T02:00:00.000Z'
  }
];
```

- [ ] **Step 5: Run tests and commit**

Run:

```bash
cd gbp-dashboard
npm test -- server/cacheStore.test.mjs
```

Expected: PASS.

Run:

```bash
git add gbp-dashboard/server/cacheStore.mjs gbp-dashboard/server/cacheStore.test.mjs gbp-dashboard/server/mockData.mjs
git commit -m "feat: add gbp cache store"
```

## Task 6: Add Backend API With Mock Sync

**Files:**
- Create: `gbp-dashboard/server/index.mjs`
- Create: `gbp-dashboard/server/syncService.mjs`

- [ ] **Step 1: Add sync service using mock data and cache**

Create `gbp-dashboard/server/syncService.mjs`:

```js
import { calculateDashboardSummary } from '../src/shared/metrics.ts';
import { createCacheStore } from './cacheStore.mjs';
import { mockBranches } from './mockData.mjs';

let syncState = {
  status: 'idle',
  stage: 'not-started',
  error: null,
  startedAt: null,
  finishedAt: null
};

export function getSyncState() {
  return syncState;
}

export async function readDashboardPayload() {
  const store = createCacheStore();
  const cached = await store.readLatest();
  if (cached) return { ...cached, source: 'cache' };

  return {
    source: 'mock',
    syncedAt: '2026-05-25T02:00:00.000Z',
    summary: calculateDashboardSummary(mockBranches),
    branches: mockBranches
  };
}

export async function runManualSync() {
  syncState = {
    status: 'running',
    stage: 'writing-cache',
    error: null,
    startedAt: new Date().toISOString(),
    finishedAt: null
  };

  const syncedAt = new Date().toISOString();
  const payload = {
    source: 'mock-sync',
    syncedAt,
    summary: calculateDashboardSummary(mockBranches),
    branches: mockBranches.map((branch) => ({ ...branch, lastSyncedAt: syncedAt }))
  };

  await createCacheStore().writeCache(payload);

  syncState = {
    status: 'success',
    stage: 'cache-saved',
    error: null,
    startedAt: syncState.startedAt,
    finishedAt: new Date().toISOString()
  };

  return payload;
}
```

- [ ] **Step 2: Add Express API**

Create `gbp-dashboard/server/index.mjs`:

```js
import express from 'express';
import { getSyncState, readDashboardPayload, runManualSync } from './syncService.mjs';

const app = express();
const port = Number(process.env.PORT || 4174);

app.use(express.json());

app.get('/api/dashboard', async (_request, response) => {
  response.json(await readDashboardPayload());
});

app.get('/api/sync/status', (_request, response) => {
  response.json(getSyncState());
});

app.post('/api/sync', async (_request, response) => {
  try {
    const payload = await runManualSync();
    response.json({ ok: true, syncedAt: payload.syncedAt });
  } catch (error) {
    response.status(500).json({ ok: false, error: error instanceof Error ? error.message : 'Sync failed' });
  }
});

app.listen(port, '127.0.0.1', () => {
  console.log(`GBP dashboard API listening on http://127.0.0.1:${port}`);
});
```

- [ ] **Step 3: Verify backend endpoints**

Run:

```bash
cd gbp-dashboard
npm run server
```

In a second terminal, run:

```bash
curl -s http://127.0.0.1:4174/api/dashboard
curl -s -X POST http://127.0.0.1:4174/api/sync
curl -s http://127.0.0.1:4174/api/sync/status
```

Expected: dashboard JSON includes `summary` and `branches`; sync returns `{"ok":true}`; status returns `success` after sync.

- [ ] **Step 4: Commit backend mock API**

Run:

```bash
git add gbp-dashboard/server/index.mjs gbp-dashboard/server/syncService.mjs
git commit -m "feat: add gbp dashboard api"
```

## Task 7: Build The Overview UI With Scorecards And Filters

**Files:**
- Create: `gbp-dashboard/src/main.tsx`
- Create: `gbp-dashboard/src/App.tsx`
- Create: `gbp-dashboard/src/styles.css`
- Create: `gbp-dashboard/src/components/Scorecards.tsx`
- Create: `gbp-dashboard/src/components/FilterBar.tsx`
- Test: `gbp-dashboard/src/components/Scorecards.test.tsx`

- [ ] **Step 1: Write scorecard test**

Create `gbp-dashboard/src/components/Scorecards.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Scorecards } from './Scorecards';

describe('Scorecards', () => {
  it('renders register and completion rates', () => {
    render(<Scorecards summary={{ totalProfiles: 1049, verifiedProfiles: 873, completedProfiles: 500, registerRate: 83.22, completionRate: 47.66, notCompleteProfiles: 549 }} />);
    expect(screen.getByText('Register Rate')).toBeInTheDocument();
    expect(screen.getByText('83.22%')).toBeInTheDocument();
    expect(screen.getByText('Completion Rate')).toBeInTheDocument();
    expect(screen.getByText('47.66%')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
cd gbp-dashboard
npm test -- src/components/Scorecards.test.tsx
```

Expected: FAIL because `Scorecards.tsx` does not exist.

- [ ] **Step 3: Add Scorecards component**

Create `gbp-dashboard/src/components/Scorecards.tsx`:

```tsx
import type { DashboardSummary } from '../shared/types';

interface ScorecardsProps {
  summary: DashboardSummary;
}

export function Scorecards({ summary }: ScorecardsProps) {
  const cards = [
    { label: 'Register Rate', value: `${summary.registerRate}%`, detail: `${summary.verifiedProfiles} verified / ${summary.totalProfiles} profiles`, tone: 'success' },
    { label: 'Completion Rate', value: `${summary.completionRate}%`, detail: `${summary.completedProfiles} complete / ${summary.totalProfiles} profiles`, tone: 'warning' },
    { label: 'Action Clicks', value: 'Compare on', detail: 'Website, call, and directions vs previous period', tone: 'info' },
    { label: 'Blocking Branches', value: String(summary.notCompleteProfiles), detail: 'Profiles not complete under current data', tone: 'danger' }
  ];

  return (
    <section className="scorecard-grid" aria-label="KPI scorecards">
      {cards.map((card) => (
        <article className={`scorecard scorecard-${card.tone}`} key={card.label}>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
          <span>{card.detail}</span>
        </article>
      ))}
    </section>
  );
}
```

- [ ] **Step 4: Add FilterBar component**

Create `gbp-dashboard/src/components/FilterBar.tsx`:

```tsx
import type { BrandId } from '../shared/types';
import { BRANDS } from '../shared/brands';

export interface GlobalFilters {
  dateRange: 'last-7-days' | 'last-28-days' | 'month-to-date' | 'custom';
  brandId: BrandId | 'all';
  search: string;
}

interface FilterBarProps {
  filters: GlobalFilters;
  onChange: (filters: GlobalFilters) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <section className="filter-bar" aria-label="Dashboard filters">
      <label>
        <span>Date</span>
        <select value={filters.dateRange} onChange={(event) => onChange({ ...filters, dateRange: event.target.value as GlobalFilters['dateRange'] })}>
          <option value="last-7-days">Last 7 days</option>
          <option value="last-28-days">Last 28 days</option>
          <option value="month-to-date">Month to date</option>
          <option value="custom">Custom</option>
        </select>
      </label>
      <label>
        <span>Compare</span>
        <select value="previous-period" disabled>
          <option value="previous-period">Previous period</option>
        </select>
      </label>
      <label>
        <span>Brand</span>
        <select value={filters.brandId} onChange={(event) => onChange({ ...filters, brandId: event.target.value as GlobalFilters['brandId'] })}>
          <option value="all">All brands</option>
          {BRANDS.map((brand) => (
            <option value={brand.id} key={brand.id}>{brand.label}</option>
          ))}
        </select>
      </label>
      <label className="search-filter">
        <span>Search branch</span>
        <input value={filters.search} onChange={(event) => onChange({ ...filters, search: event.target.value })} placeholder="Branch, city, store code" />
      </label>
      <button type="button" className="secondary-button">More filters</button>
    </section>
  );
}
```

- [ ] **Step 5: Add app shell and styles**

Create `gbp-dashboard/src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Create `gbp-dashboard/src/App.tsx`:

```tsx
import { useEffect, useMemo, useState } from 'react';
import { FilterBar, type GlobalFilters } from './components/FilterBar';
import { Scorecards } from './components/Scorecards';
import { filterBranches } from './shared/filters';
import { calculateDashboardSummary } from './shared/metrics';
import type { BranchProfile, DashboardSummary } from './shared/types';

interface DashboardPayload {
  source: string;
  syncedAt: string;
  summary: DashboardSummary;
  branches: BranchProfile[];
}

const initialFilters: GlobalFilters = {
  dateRange: 'last-28-days',
  brandId: 'all',
  search: ''
};

export default function App() {
  const [payload, setPayload] = useState<DashboardPayload | null>(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((response) => response.json())
      .then(setPayload)
      .catch(() => setPayload(null));
  }, []);

  const filteredBranches = useMemo(() => {
    if (!payload) return [];
    return filterBranches(payload.branches, {
      brandId: filters.brandId === 'all' ? undefined : filters.brandId,
      search: filters.search
    });
  }, [payload, filters]);

  const summary = useMemo(() => calculateDashboardSummary(filteredBranches), [filteredBranches]);

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
        <button type="button" className="primary-button">Sync Data</button>
      </header>
      <FilterBar filters={filters} onChange={setFilters} />
      <Scorecards summary={summary} />
    </main>
  );
}
```

Create `gbp-dashboard/src/styles.css`:

```css
:root {
  color: #172033;
  background: #f6f8fb;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; background: #f6f8fb; }
button, input, select { font: inherit; }

.app-shell { width: min(1440px, calc(100% - 32px)); margin: 0 auto; padding: 24px 0 48px; }
.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
.page-header h1 { margin: 0; font-size: 28px; letter-spacing: 0; }
.page-header p { margin: 4px 0 0; color: #64748b; }
.eyebrow { margin: 0 0 4px; color: #0f766e; font-size: 12px; font-weight: 800; text-transform: uppercase; }
.primary-button, .secondary-button { border: 1px solid #cbd5e1; border-radius: 8px; min-height: 40px; padding: 0 14px; font-weight: 800; background: #fff; }
.primary-button { color: #fff; background: #0f766e; border-color: #0f766e; }
.filter-bar { display: grid; grid-template-columns: 150px 190px 190px minmax(220px, 1fr) 130px; gap: 10px; align-items: end; margin-bottom: 14px; padding: 12px; border: 1px solid #dbe4ef; border-radius: 8px; background: #fff; }
.filter-bar label { display: grid; gap: 5px; }
.filter-bar span { color: #64748b; font-size: 11px; font-weight: 800; text-transform: uppercase; }
.filter-bar input, .filter-bar select { width: 100%; min-height: 38px; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0 10px; background: #fff; }
.scorecard-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-bottom: 14px; }
.scorecard { min-height: 118px; border: 1px solid #dbe4ef; border-radius: 8px; padding: 14px; background: #fff; }
.scorecard p { margin: 0; color: #64748b; font-size: 11px; font-weight: 850; text-transform: uppercase; }
.scorecard strong { display: block; margin-top: 8px; font-size: 30px; line-height: 1; }
.scorecard span { display: block; margin-top: 8px; color: #475569; font-size: 12px; }
.scorecard-success strong { color: #0f766e; }
.scorecard-warning strong { color: #b45309; }
.scorecard-info strong { color: #1d4ed8; }
.scorecard-danger strong { color: #b91c1c; }
@media (max-width: 900px) { .filter-bar, .scorecard-grid { grid-template-columns: 1fr; } .page-header { flex-direction: column; } }
```

- [ ] **Step 6: Run tests and commit**

Run:

```bash
cd gbp-dashboard
npm test -- src/components/Scorecards.test.tsx
npm run build
```

Expected: test PASS and build succeeds.

Run:

```bash
git add gbp-dashboard/src/main.tsx gbp-dashboard/src/App.tsx gbp-dashboard/src/styles.css gbp-dashboard/src/components/Scorecards.tsx gbp-dashboard/src/components/Scorecards.test.tsx gbp-dashboard/src/components/FilterBar.tsx
git commit -m "feat: add gbp dashboard overview shell"
```

## Task 8: Add Branch Table With Column Filters, Sort Icons, And Export

**Files:**
- Create: `gbp-dashboard/src/components/BranchTable.tsx`
- Test: `gbp-dashboard/src/components/BranchTable.test.tsx`
- Modify: `gbp-dashboard/src/App.tsx`
- Modify: `gbp-dashboard/src/styles.css`

- [ ] **Step 1: Write table interaction test**

Create `gbp-dashboard/src/components/BranchTable.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BranchTable } from './BranchTable';
import type { BranchProfile } from '../shared/types';

const branches: BranchProfile[] = [
  { id: 'a', accountName: 'accounts/1', locationName: 'locations/a', title: 'Brain Academy Bandung', brandId: 'brainacademy', brandConfidence: 'high', storeCode: 'BA-BDG', address: 'Bandung', profileStatus: 'verified', verified: true, averageRating: 4.3, totalReviews: 42, completionStatus: 'not-complete', blockingReason: 'rating', websiteClicks: { current: 120, previous: 100, deltaPercent: 20 }, callClicks: { current: 31, previous: 35, deltaPercent: -11.43 }, directionRequests: { current: 44, previous: 40, deltaPercent: 10 }, lastSyncedAt: '2026-05-25T02:00:00.000Z' },
  { id: 'b', accountName: 'accounts/1', locationName: 'locations/b', title: 'English Academy Bekasi', brandId: 'englishacademy', brandConfidence: 'high', storeCode: 'EA-BKS', address: 'Bekasi', profileStatus: 'verified', verified: true, averageRating: 4.8, totalReviews: 7, completionStatus: 'not-complete', blockingReason: 'reviews', websiteClicks: { current: 84, previous: 80, deltaPercent: 5 }, callClicks: { current: 22, previous: 20, deltaPercent: 10 }, directionRequests: { current: 18, previous: 16, deltaPercent: 12.5 }, lastSyncedAt: '2026-05-25T02:00:00.000Z' }
];

describe('BranchTable', () => {
  it('filters by blocking reason and sorts rating', () => {
    render(<BranchTable branches={branches} />);
    fireEvent.change(screen.getByLabelText('Blocking reason filter'), { target: { value: 'rating' } });
    expect(screen.getByText('Brain Academy Bandung')).toBeInTheDocument();
    expect(screen.queryByText('English Academy Bekasi')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Blocking reason filter'), { target: { value: '' } });
    fireEvent.click(screen.getByLabelText('Sort rating'));
    const rows = screen.getAllByTestId('branch-row');
    expect(rows[0]).toHaveTextContent('English Academy Bekasi');
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
cd gbp-dashboard
npm test -- src/components/BranchTable.test.tsx
```

Expected: FAIL because `BranchTable.tsx` does not exist.

- [ ] **Step 3: Add BranchTable component**

Create `gbp-dashboard/src/components/BranchTable.tsx`:

```tsx
import { ArrowDownUp, Download } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BRANDS, getBrandLabel } from '../shared/brands';
import { buildExportRows, toCsv } from '../shared/exportRows';
import { filterBranches, sortBranches, type BranchFilters, type BranchSort, type SortColumn } from '../shared/filters';
import type { BlockingReason, BranchProfile, BrandId } from '../shared/types';

function metricText(value: number | null, delta: number | null) {
  const base = value === null ? 'N/A' : String(value);
  if (delta === null) return base;
  return `${base} · ${delta > 0 ? '+' : ''}${delta}%`;
}

function nextSort(current: BranchSort, column: SortColumn): BranchSort {
  if (current.column !== column) return { column, direction: 'desc' };
  return { column, direction: current.direction === 'desc' ? 'asc' : 'desc' };
}

export function BranchTable({ branches }: { branches: BranchProfile[] }) {
  const [filters, setFilters] = useState<BranchFilters>({});
  const [sort, setSort] = useState<BranchSort>({ column: 'averageRating', direction: 'desc' });

  const rows = useMemo(() => sortBranches(filterBranches(branches, filters), sort), [branches, filters, sort]);

  function updateFilter(next: Partial<BranchFilters>) {
    setFilters((current) => ({ ...current, ...next }));
  }

  function downloadCsv() {
    const csv = toCsv(buildExportRows(rows, { activeStart: 'active-start', activeEnd: 'active-end', compareStart: 'compare-start', compareEnd: 'compare-end' }));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'gbp-branches-filtered.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function SortButton({ column, label }: { column: SortColumn; label: string }) {
    return (
      <button type="button" className="sort-button" aria-label={`Sort ${label}`} onClick={() => setSort((current) => nextSort(current, column))}>
        <ArrowDownUp size={14} />
      </button>
    );
  }

  return (
    <section className="table-card">
      <div className="table-card-header">
        <div>
          <h2>All branch and brand table</h2>
          <p>{rows.length} profiles shown from {branches.length} total</p>
        </div>
        <button type="button" className="secondary-button" onClick={downloadCsv}><Download size={16} /> Export filtered CSV</button>
      </div>
      <div className="branch-table" role="table">
        <div className="branch-table-head" role="row">
          <div>Branch <SortButton column="title" label="branch" /><input aria-label="Branch search" onChange={(event) => updateFilter({ search: event.target.value })} /></div>
          <div>Brand <SortButton column="brandId" label="brand" /><select aria-label="Brand filter" onChange={(event) => updateFilter({ brandId: event.target.value ? event.target.value as BrandId : undefined })}><option value="">All</option>{BRANDS.map((brand) => <option value={brand.id} key={brand.id}>{brand.label}</option>)}</select></div>
          <div>Status <SortButton column="profileStatus" label="status" /></div>
          <div>Rating <SortButton column="averageRating" label="rating" /><input aria-label="Rating max filter" type="number" step="0.1" onChange={(event) => updateFilter({ ratingMax: event.target.value ? Number(event.target.value) : undefined })} /></div>
          <div>Reviews <SortButton column="totalReviews" label="reviews" /><input aria-label="Reviews min filter" type="number" onChange={(event) => updateFilter({ reviewsMin: event.target.value ? Number(event.target.value) : undefined })} /></div>
          <div>Website <SortButton column="websiteClicks" label="website" /><input aria-label="Website min filter" type="number" onChange={(event) => updateFilter({ websiteMin: event.target.value ? Number(event.target.value) : undefined })} /></div>
          <div>Call <SortButton column="callClicks" label="call" /><input aria-label="Call min filter" type="number" onChange={(event) => updateFilter({ callMin: event.target.value ? Number(event.target.value) : undefined })} /></div>
          <div>Blocking reason <SortButton column="blockingReason" label="blocking reason" /><select aria-label="Blocking reason filter" onChange={(event) => updateFilter({ blockingReason: event.target.value ? event.target.value as BlockingReason : undefined })}><option value="">All</option><option value="not-registered">Not registered</option><option value="rating">Rating</option><option value="reviews">Reviews</option><option value="rating-and-reviews">Rating and reviews</option><option value="needs-review">Needs review</option><option value="complete">Complete</option></select></div>
        </div>
        {rows.map((branch) => (
          <div className="branch-table-row" role="row" data-testid="branch-row" key={branch.id}>
            <strong>{branch.title}</strong>
            <span>{getBrandLabel(branch.brandId)}</span>
            <span>{branch.profileStatus}</span>
            <span>{branch.averageRating ?? 'N/A'}</span>
            <span>{branch.totalReviews ?? 'N/A'}</span>
            <span>{metricText(branch.websiteClicks.current, branch.websiteClicks.deltaPercent)}</span>
            <span>{metricText(branch.callClicks.current, branch.callClicks.deltaPercent)}</span>
            <span className={`reason reason-${branch.blockingReason}`}>{branch.blockingReason}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire table into App and styles**

Modify `gbp-dashboard/src/App.tsx` imports:

```tsx
import { BranchTable } from './components/BranchTable';
```

Add this below `<Scorecards summary={summary} />`:

```tsx
<BranchTable branches={filteredBranches} />
```

Append to `gbp-dashboard/src/styles.css`:

```css
.table-card { border: 1px solid #dbe4ef; border-radius: 8px; background: #fff; overflow: hidden; }
.table-card-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 14px; border-bottom: 1px solid #e2e8f0; }
.table-card-header h2 { margin: 0; font-size: 18px; }
.table-card-header p { margin: 4px 0 0; color: #64748b; font-size: 12px; }
.branch-table { overflow-x: auto; }
.branch-table-head, .branch-table-row { display: grid; grid-template-columns: 1.2fr .9fr .7fr .65fr .7fr .8fr .75fr 1fr; min-width: 1120px; gap: 8px; align-items: center; padding: 12px 14px; }
.branch-table-head { background: #f8fafc; color: #64748b; font-size: 11px; font-weight: 850; text-transform: uppercase; }
.branch-table-head > div { display: grid; gap: 6px; }
.branch-table-head input, .branch-table-head select { min-height: 30px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 8px; text-transform: none; }
.branch-table-row { border-top: 1px solid #eef2f7; font-size: 12px; }
.sort-button { display: inline-flex; vertical-align: middle; align-items: center; justify-content: center; width: 24px; height: 24px; margin-left: 4px; border: 0; background: transparent; color: #334155; }
.reason-rating, .reason-rating-and-reviews { color: #b91c1c; font-weight: 800; }
.reason-reviews, .reason-needs-review { color: #7c3aed; font-weight: 800; }
.reason-not-registered { color: #b45309; font-weight: 800; }
```

- [ ] **Step 5: Run tests and commit**

Run:

```bash
cd gbp-dashboard
npm test -- src/components/BranchTable.test.tsx src/components/Scorecards.test.tsx
npm run build
```

Expected: tests PASS and build succeeds.

Run:

```bash
git add gbp-dashboard/src/components/BranchTable.tsx gbp-dashboard/src/components/BranchTable.test.tsx gbp-dashboard/src/App.tsx gbp-dashboard/src/styles.css
git commit -m "feat: add gbp branch table controls"
```

## Task 9: Add Profile Health, Needs Review, And Settings Sync Views

**Files:**
- Create: `gbp-dashboard/src/components/ProfileHealth.tsx`
- Create: `gbp-dashboard/src/components/NeedsReview.tsx`
- Create: `gbp-dashboard/src/components/SettingsSync.tsx`
- Modify: `gbp-dashboard/src/App.tsx`
- Modify: `gbp-dashboard/src/styles.css`

- [ ] **Step 1: Add ProfileHealth component**

Create `gbp-dashboard/src/components/ProfileHealth.tsx`:

```tsx
import type { BranchProfile, ProfileStatus } from '../shared/types';

const statuses: ProfileStatus[] = ['verified', 'unverified', 'google-update', 'pending-review', 'temporarily-closed', 'permanently-closed', 'disabled', 'suspended', 'duplicate', 'missing-store-code', 'unknown'];

export function ProfileHealth({ branches }: { branches: BranchProfile[] }) {
  return (
    <section className="panel-grid" aria-label="Profile health">
      {statuses.map((status) => {
        const count = branches.filter((branch) => branch.profileStatus === status).length;
        return <article className="mini-panel" key={status}><span>{status}</span><strong>{count}</strong></article>;
      })}
    </section>
  );
}
```

- [ ] **Step 2: Add NeedsReview component**

Create `gbp-dashboard/src/components/NeedsReview.tsx`:

```tsx
import { BRANDS } from '../shared/brands';
import type { BranchProfile } from '../shared/types';

export function NeedsReview({ branches }: { branches: BranchProfile[] }) {
  const rows = branches.filter((branch) => branch.brandId === 'needs-review');

  return (
    <section className="table-card">
      <div className="table-card-header"><h2>Needs Review</h2><p>{rows.length} profiles need brand mapping</p></div>
      {rows.length === 0 ? <p className="empty-state">No ambiguous profiles in the current cache.</p> : rows.map((branch) => (
        <div className="mapping-row" key={branch.id}>
          <strong>{branch.title}</strong>
          <select aria-label={`Map brand for ${branch.title}`}>
            {BRANDS.map((brand) => <option value={brand.id} key={brand.id}>{brand.label}</option>)}
          </select>
          <button type="button" className="secondary-button">Save mapping</button>
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 3: Add SettingsSync component**

Create `gbp-dashboard/src/components/SettingsSync.tsx`:

```tsx
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';

export function SettingsSync({ onSynced }: { onSynced: () => void }) {
  const [message, setMessage] = useState('Ready to sync from local backend.');
  const [loading, setLoading] = useState(false);

  async function sync() {
    setLoading(true);
    setMessage('Sync running: locations, profile status, reputation, performance metrics, cache save.');
    const response = await fetch('/api/sync', { method: 'POST' });
    const json = await response.json();
    setLoading(false);
    setMessage(json.ok ? `Sync complete at ${json.syncedAt}` : `Sync failed: ${json.error}`);
    if (json.ok) onSynced();
  }

  return (
    <section className="settings-card">
      <h2>Settings & Sync</h2>
      <p>{message}</p>
      <a className="secondary-button" href="/auth/google">Connect Google account</a>
      <button type="button" className="primary-button" onClick={sync} disabled={loading}><RefreshCcw size={16} /> Sync Data</button>
    </section>
  );
}
```

- [ ] **Step 4: Add tab navigation**

Modify `gbp-dashboard/src/App.tsx` to track tabs and render panels:

```tsx
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

export default function App() {
  const [payload, setPayload] = useState<DashboardPayload | null>(null);
  const [filters, setFilters] = useState(initialFilters);
  const [tab, setTab] = useState<Tab>('overview');

  function loadDashboard() {
    fetch('/api/dashboard').then((response) => response.json()).then(setPayload).catch(() => setPayload(null));
  }

  useEffect(() => { loadDashboard(); }, []);

  const filteredBranches = useMemo(() => {
    if (!payload) return [];
    return filterBranches(payload.branches, { brandId: filters.brandId === 'all' ? undefined : filters.brandId, search: filters.search });
  }, [payload, filters]);

  const summary = useMemo(() => calculateDashboardSummary(filteredBranches), [filteredBranches]);

  if (!payload) return <main className="app-shell"><p>Loading dashboard data...</p></main>;

  return (
    <main className="app-shell">
      <header className="page-header"><div><p className="eyebrow">Google Business Profile</p><h1>Performance Dashboard</h1><p>Last sync: {new Date(payload.syncedAt).toLocaleString('id-ID')} · Source: {payload.source}</p></div></header>
      <nav className="tabs" aria-label="Dashboard pages">
        {(['overview', 'branches', 'profile-health', 'needs-review', 'settings'] as Tab[]).map((item) => <button type="button" className={tab === item ? 'active-tab' : ''} onClick={() => setTab(item)} key={item}>{item.replace('-', ' ')}</button>)}
      </nav>
      <FilterBar filters={filters} onChange={setFilters} />
      {tab === 'overview' && <><Scorecards summary={summary} /><ProfileHealth branches={filteredBranches} /><BranchTable branches={filteredBranches} /></>}
      {tab === 'branches' && <BranchTable branches={filteredBranches} />}
      {tab === 'profile-health' && <ProfileHealth branches={filteredBranches} />}
      {tab === 'needs-review' && <NeedsReview branches={payload.branches} />}
      {tab === 'settings' && <SettingsSync onSynced={loadDashboard} />}
    </main>
  );
}
```

Append to `gbp-dashboard/src/styles.css`:

```css
.tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.tabs button { border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; min-height: 38px; padding: 0 12px; text-transform: capitalize; }
.tabs .active-tab { color: #fff; background: #172033; border-color: #172033; }
.panel-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-bottom: 14px; }
.mini-panel { border: 1px solid #dbe4ef; border-radius: 8px; background: #fff; padding: 12px; }
.mini-panel span { color: #64748b; font-size: 11px; font-weight: 850; text-transform: uppercase; }
.mini-panel strong { display: block; margin-top: 8px; font-size: 24px; }
.mapping-row { display: grid; grid-template-columns: 1fr 260px 140px; gap: 10px; align-items: center; padding: 12px 14px; border-top: 1px solid #eef2f7; }
.mapping-row select { min-height: 38px; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0 10px; }
.empty-state { margin: 0; padding: 16px; color: #64748b; }
.settings-card { display: grid; gap: 12px; justify-items: start; border: 1px solid #dbe4ef; border-radius: 8px; background: #fff; padding: 16px; }
```

- [ ] **Step 5: Run build and commit**

Run:

```bash
cd gbp-dashboard
npm run build
```

Expected: build succeeds.

Run:

```bash
git add gbp-dashboard/src/components/ProfileHealth.tsx gbp-dashboard/src/components/NeedsReview.tsx gbp-dashboard/src/components/SettingsSync.tsx gbp-dashboard/src/App.tsx gbp-dashboard/src/styles.css
git commit -m "feat: add gbp dashboard tabs"
```

## Task 10: Add Manual Brand Mapping Persistence

**Files:**
- Create: `gbp-dashboard/server/brandMappingStore.mjs`
- Modify: `gbp-dashboard/server/index.mjs`
- Modify: `gbp-dashboard/src/components/NeedsReview.tsx`
- Test: `gbp-dashboard/server/brandMappingStore.test.mjs`

- [ ] **Step 1: Write brand mapping store tests**

Create `gbp-dashboard/server/brandMappingStore.test.mjs`:

```js
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { createBrandMappingStore } from './brandMappingStore.mjs';

let tempDir;

afterEach(async () => {
  if (tempDir) await rm(tempDir, { recursive: true, force: true });
});

describe('createBrandMappingStore', () => {
  it('saves and reads manual mappings by location name', async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'gbp-mapping-'));
    const store = createBrandMappingStore(join(tempDir, 'brand-mappings.json'));

    await store.saveMapping('locations/123', 'brainacademy');

    await expect(store.readMappings()).resolves.toEqual({ 'locations/123': 'brainacademy' });
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
cd gbp-dashboard
npm test -- server/brandMappingStore.test.mjs
```

Expected: FAIL because `brandMappingStore.mjs` does not exist.

- [ ] **Step 3: Add brand mapping store**

Create `gbp-dashboard/server/brandMappingStore.mjs`:

```js
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export function createBrandMappingStore(mappingFile = process.env.GBP_MAPPING_FILE || './data/brand-mappings.json') {
  return {
    async readMappings() {
      try {
        return JSON.parse(await readFile(mappingFile, 'utf8'));
      } catch (error) {
        if (error.code === 'ENOENT') return {};
        throw error;
      }
    },

    async saveMapping(locationName, brandId) {
      const mappings = await this.readMappings();
      mappings[locationName] = brandId;
      await mkdir(dirname(mappingFile), { recursive: true });
      await writeFile(mappingFile, JSON.stringify(mappings, null, 2));
      return mappings;
    }
  };
}
```

- [ ] **Step 4: Add backend mapping endpoints**

Modify `gbp-dashboard/server/index.mjs` imports:

```js
import { createBrandMappingStore } from './brandMappingStore.mjs';
```

Add these routes before `app.listen`:

```js
app.get('/api/brand-mappings', async (_request, response) => {
  response.json(await createBrandMappingStore().readMappings());
});

app.post('/api/brand-mappings', async (request, response) => {
  const { locationName, brandId } = request.body;
  if (!locationName || !brandId) {
    response.status(400).json({ ok: false, error: 'locationName and brandId are required' });
    return;
  }
  const mappings = await createBrandMappingStore().saveMapping(locationName, brandId);
  response.json({ ok: true, mappings });
});
```

- [ ] **Step 5: Wire Needs Review save button**

Replace `gbp-dashboard/src/components/NeedsReview.tsx` with:

```tsx
import { useState } from 'react';
import { BRANDS } from '../shared/brands';
import type { BranchProfile, BrandId } from '../shared/types';

export function NeedsReview({ branches }: { branches: BranchProfile[] }) {
  const rows = branches.filter((branch) => branch.brandId === 'needs-review');
  const [selected, setSelected] = useState<Record<string, BrandId>>({});
  const [message, setMessage] = useState('');

  async function saveMapping(branch: BranchProfile) {
    const brandId = selected[branch.locationName];
    if (!brandId) return;
    const response = await fetch('/api/brand-mappings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ locationName: branch.locationName, brandId })
    });
    const json = await response.json();
    setMessage(json.ok ? 'Mapping saved. Run Sync Data to refresh the dashboard.' : `Mapping failed: ${json.error}`);
  }

  return (
    <section className="table-card">
      <div className="table-card-header"><h2>Needs Review</h2><p>{rows.length} profiles need brand mapping</p></div>
      {message && <p className="empty-state">{message}</p>}
      {rows.length === 0 ? <p className="empty-state">No ambiguous profiles in the current cache.</p> : rows.map((branch) => (
        <div className="mapping-row" key={branch.id}>
          <strong>{branch.title}</strong>
          <select aria-label={`Map brand for ${branch.title}`} onChange={(event) => setSelected((current) => ({ ...current, [branch.locationName]: event.target.value as BrandId }))}>
            <option value="">Select brand</option>
            {BRANDS.map((brand) => <option value={brand.id} key={brand.id}>{brand.label}</option>)}
          </select>
          <button type="button" className="secondary-button" onClick={() => saveMapping(branch)}>Save mapping</button>
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 6: Run tests and commit**

Run:

```bash
cd gbp-dashboard
npm test -- server/brandMappingStore.test.mjs
npm run build
```

Expected: test PASS and build succeeds.

Run:

```bash
git add gbp-dashboard/server/brandMappingStore.mjs gbp-dashboard/server/brandMappingStore.test.mjs gbp-dashboard/server/index.mjs gbp-dashboard/src/components/NeedsReview.tsx
git commit -m "feat: add gbp brand mapping persistence"
```

## Task 11: Add Google OAuth And Live GBP Client

**Files:**
- Create: `gbp-dashboard/server/googleAuth.mjs`
- Create: `gbp-dashboard/server/gbpClient.mjs`
- Modify: `gbp-dashboard/server/index.mjs`
- Modify: `gbp-dashboard/server/syncService.mjs`

- [ ] **Step 1: Add Google OAuth helper**

Create `gbp-dashboard/server/googleAuth.mjs`:

```js
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const scope = 'https://www.googleapis.com/auth/business.manage';

function tokenFile() {
  return process.env.GBP_TOKEN_FILE || './data/google-token.json';
}

export function getAuthUrl() {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://127.0.0.1:4174/auth/google/callback',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    scope
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCodeForToken(code) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://127.0.0.1:4174/auth/google/callback',
      grant_type: 'authorization_code'
    })
  });

  if (!response.ok) throw new Error(`Google token exchange failed: ${response.status}`);
  const token = await response.json();
  await mkdir(dirname(tokenFile()), { recursive: true });
  await writeFile(tokenFile(), JSON.stringify({ ...token, saved_at: Date.now() }, null, 2));
  return token;
}

export async function readToken() {
  try {
    return JSON.parse(await readFile(tokenFile(), 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}
```

- [ ] **Step 2: Add GBP client with raw REST calls**

Create `gbp-dashboard/server/gbpClient.mjs`:

```js
export function createGbpClient(token) {
  async function googleFetch(url) {
    const response = await fetch(url, { headers: { authorization: `Bearer ${token.access_token}` } });
    if (!response.ok) throw new Error(`Google API request failed ${response.status}: ${url}`);
    return response.json();
  }

  return {
    async listAccounts() {
      const json = await googleFetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts');
      return json.accounts || [];
    },

    async listLocations(accountName) {
      const readMask = 'name,title,storeCode,metadata,storefrontAddress,openInfo';
      const json = await googleFetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=${encodeURIComponent(readMask)}&pageSize=100`);
      return json.locations || [];
    },

    async fetchPerformance(locationName, startDate, endDate) {
      const locationId = locationName.split('/').at(-1);
      const metrics = ['WEBSITE_CLICKS', 'CALL_CLICKS', 'BUSINESS_DIRECTION_REQUESTS'];
      const params = new URLSearchParams({
        dailyMetrics: metrics.join(','),
        'dailyRange.startDate.year': String(startDate.year),
        'dailyRange.startDate.month': String(startDate.month),
        'dailyRange.startDate.day': String(startDate.day),
        'dailyRange.endDate.year': String(endDate.year),
        'dailyRange.endDate.month': String(endDate.month),
        'dailyRange.endDate.day': String(endDate.day)
      });
      return googleFetch(`https://businessprofileperformance.googleapis.com/v1/locations/${locationId}:fetchMultiDailyMetricsTimeSeries?${params.toString()}`);
    },

    async listReviews(accountName, locationName) {
      const accountId = accountName.split('/').at(-1);
      const locationId = locationName.split('/').at(-1);
      const json = await googleFetch(`https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?pageSize=50`);
      return json.reviews || [];
    }
  };
}
```

- [ ] **Step 3: Wire auth routes**

Modify `gbp-dashboard/server/index.mjs` imports:

```js
import { exchangeCodeForToken, getAuthUrl } from './googleAuth.mjs';
```

Add routes before `app.listen`:

```js
app.get('/auth/google', (_request, response) => {
  response.redirect(getAuthUrl());
});

app.get('/auth/google/callback', async (request, response) => {
  try {
    await exchangeCodeForToken(String(request.query.code || ''));
    response.send('<p>Google account connected. You can close this tab and return to the dashboard.</p>');
  } catch (error) {
    response.status(500).send(`<p>Google OAuth failed: ${error instanceof Error ? error.message : 'Unknown error'}</p>`);
  }
});
```

- [ ] **Step 4: Keep mock sync as fallback while token is missing**

Modify `gbp-dashboard/server/syncService.mjs` imports:

```js
import { readToken } from './googleAuth.mjs';
import { createGbpClient } from './gbpClient.mjs';
```

At the start of `runManualSync`, after setting `syncState`, add:

```js
const token = await readToken();
if (!token) {
  const syncedAt = new Date().toISOString();
  const payload = { source: 'mock-sync', syncedAt, summary: calculateDashboardSummary(mockBranches), branches: mockBranches.map((branch) => ({ ...branch, lastSyncedAt: syncedAt })) };
  await createCacheStore().writeCache(payload);
  syncState = { status: 'success', stage: 'cache-saved', error: null, startedAt: syncState.startedAt, finishedAt: new Date().toISOString() };
  return payload;
}

createGbpClient(token);
```

This preserves a working dashboard before OAuth is configured. The next task replaces the live sync body with normalized GBP data.

- [ ] **Step 5: Run build and commit**

Run:

```bash
cd gbp-dashboard
npm run build
```

Expected: build succeeds.

Run:

```bash
git add gbp-dashboard/server/googleAuth.mjs gbp-dashboard/server/gbpClient.mjs gbp-dashboard/server/index.mjs gbp-dashboard/server/syncService.mjs
git commit -m "feat: add google oauth for gbp dashboard"
```

## Task 12: Normalize Live GBP Data During Sync

**Files:**
- Modify: `gbp-dashboard/server/syncService.mjs`
- Test: `gbp-dashboard/server/syncService.test.mjs`

- [ ] **Step 1: Write normalization test**

Create `gbp-dashboard/server/syncService.test.mjs`:

```js
import { describe, expect, it } from 'vitest';
import { normalizeLocation } from './syncService.mjs';

describe('normalizeLocation', () => {
  it('maps Google location fields into a branch profile', () => {
    const branch = normalizeLocation({
      accountName: 'accounts/1',
      location: {
        name: 'locations/123',
        title: 'Brain Academy Bandung',
        storeCode: 'BA-BDG',
        metadata: { hasGoogleUpdated: false, duplicateLocation: null },
        openInfo: { status: 'OPEN' },
        storefrontAddress: { locality: 'Bandung' }
      },
      rating: 4.6,
      totalReviews: 11,
      websiteClicks: { current: 20, previous: 10, deltaPercent: 100 },
      callClicks: { current: 5, previous: 5, deltaPercent: 0 },
      directionRequests: { current: 8, previous: 4, deltaPercent: 100 },
      syncedAt: '2026-05-25T02:00:00.000Z'
    });

    expect(branch).toMatchObject({
      id: 'locations/123',
      brandId: 'brainacademy',
      profileStatus: 'verified',
      verified: true,
      completionStatus: 'complete',
      blockingReason: 'complete'
    });
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
cd gbp-dashboard
npm test -- server/syncService.test.mjs
```

Expected: FAIL because `normalizeLocation` is not exported.

- [ ] **Step 3: Add normalization function**

Modify `gbp-dashboard/server/syncService.mjs` to export this function:

```js
import { detectBrand } from '../src/shared/brands.ts';
import { calculateDashboardSummary, getBlockingReason } from '../src/shared/metrics.ts';

export function normalizeLocation(input) {
  const title = input.location.title || input.location.name;
  const detected = detectBrand(title);
  const duplicate = Boolean(input.location.metadata?.duplicateLocation);
  const openStatus = input.location.openInfo?.status;
  const hasStoreCode = Boolean(input.location.storeCode);
  const profileStatus = duplicate
    ? 'duplicate'
    : !hasStoreCode
      ? 'missing-store-code'
      : openStatus === 'CLOSED_PERMANENTLY'
        ? 'permanently-closed'
        : openStatus === 'CLOSED_TEMPORARILY'
          ? 'temporarily-closed'
          : 'verified';
  const verified = profileStatus === 'verified';
  const blockingReason = getBlockingReason({ verified, averageRating: input.rating, totalReviews: input.totalReviews, brandId: detected.brandId });

  return {
    id: input.location.name,
    accountName: input.accountName,
    locationName: input.location.name,
    title,
    brandId: detected.brandId,
    brandConfidence: detected.confidence,
    storeCode: input.location.storeCode || null,
    address: input.location.storefrontAddress?.locality || null,
    profileStatus,
    verified,
    averageRating: input.rating,
    totalReviews: input.totalReviews,
    completionStatus: blockingReason === 'complete' ? 'complete' : 'not-complete',
    blockingReason,
    websiteClicks: input.websiteClicks,
    callClicks: input.callClicks,
    directionRequests: input.directionRequests,
    lastSyncedAt: input.syncedAt
  };
}
```

- [ ] **Step 4: Replace live sync branch with normalized data**

In `runManualSync`, after creating the GBP client with a token, fetch accounts and locations:

```js
const client = createGbpClient(token);
syncState = { ...syncState, stage: 'locations' };
const accounts = await client.listAccounts();
const syncedAt = new Date().toISOString();
const branches = [];

for (const account of accounts) {
  const locations = await client.listLocations(account.name);
  for (const location of locations) {
    branches.push(normalizeLocation({
      accountName: account.name,
      location,
      rating: null,
      totalReviews: null,
      websiteClicks: { current: null, previous: null, deltaPercent: null },
      callClicks: { current: null, previous: null, deltaPercent: null },
      directionRequests: { current: null, previous: null, deltaPercent: null },
      syncedAt
    }));
  }
}

const payload = { source: 'google-api', syncedAt, summary: calculateDashboardSummary(branches), branches };
await createCacheStore().writeCache(payload);
syncState = { status: 'success', stage: 'cache-saved', error: null, startedAt: syncState.startedAt, finishedAt: new Date().toISOString() };
return payload;
```

This creates the live location inventory and leaves metric fields as `null` until the enrichment task fills them from the reviews and performance APIs.

- [ ] **Step 5: Run tests and commit**

Run:

```bash
cd gbp-dashboard
npm test -- server/syncService.test.mjs src/shared/metrics.test.ts src/shared/brands.test.ts
npm run build
```

Expected: tests PASS and build succeeds.

Run:

```bash
git add gbp-dashboard/server/syncService.mjs gbp-dashboard/server/syncService.test.mjs
git commit -m "feat: normalize gbp live sync data"
```

## Task 13: Enrich Sync With Reviews And Performance Metrics

**Files:**
- Modify: `gbp-dashboard/server/gbpClient.mjs`
- Modify: `gbp-dashboard/server/syncService.mjs`
- Test: `gbp-dashboard/server/syncService.enrichment.test.mjs`

- [ ] **Step 1: Write enrichment helper tests**

Create `gbp-dashboard/server/syncService.enrichment.test.mjs`:

```js
import { describe, expect, it } from 'vitest';
import { extractReviewStats, sumDailyMetric } from './syncService.mjs';

describe('extractReviewStats', () => {
  it('uses API aggregate fields when available', () => {
    expect(extractReviewStats({ averageRating: 4.7, totalReviewCount: 12, reviews: [] })).toEqual({ averageRating: 4.7, totalReviews: 12 });
  });

  it('falls back to review list when aggregate fields are absent', () => {
    expect(extractReviewStats({ reviews: [{ starRating: 'FIVE' }, { starRating: 'FOUR' }] })).toEqual({ averageRating: 4.5, totalReviews: 2 });
  });
});

describe('sumDailyMetric', () => {
  it('sums metric values from performance time series', () => {
    const response = {
      multiDailyMetricTimeSeries: [{
        dailyMetricTimeSeries: [{
          dailyMetric: 'WEBSITE_CLICKS',
          timeSeries: { datedValues: [{ value: '3' }, { value: '4' }] }
        }]
      }]
    };

    expect(sumDailyMetric(response, 'WEBSITE_CLICKS')).toBe(7);
  });
});
```

- [ ] **Step 2: Run tests and confirm they fail**

Run:

```bash
cd gbp-dashboard
npm test -- server/syncService.enrichment.test.mjs
```

Expected: FAIL because `extractReviewStats` and `sumDailyMetric` are not exported.

- [ ] **Step 3: Return full review response from the GBP client**

Modify `gbp-dashboard/server/gbpClient.mjs` `listReviews` so it returns the full API JSON:

```js
async listReviews(accountName, locationName) {
  const accountId = accountName.split('/').at(-1);
  const locationId = locationName.split('/').at(-1);
  return googleFetch(`https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?pageSize=50`);
}
```

- [ ] **Step 4: Add enrichment helpers**

Add these exports to `gbp-dashboard/server/syncService.mjs`:

```js
const starRatingValues = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

export function extractReviewStats(reviewResponse) {
  if (typeof reviewResponse.averageRating === 'number' && typeof reviewResponse.totalReviewCount === 'number') {
    return { averageRating: reviewResponse.averageRating, totalReviews: reviewResponse.totalReviewCount };
  }

  const reviews = reviewResponse.reviews || [];
  if (reviews.length === 0) return { averageRating: null, totalReviews: 0 };
  const totalStars = reviews.reduce((sum, review) => sum + (starRatingValues[review.starRating] || 0), 0);
  return { averageRating: Math.round((totalStars / reviews.length) * 100) / 100, totalReviews: reviews.length };
}

export function sumDailyMetric(performanceResponse, metricName) {
  const groups = performanceResponse.multiDailyMetricTimeSeries || [];
  let total = 0;
  for (const group of groups) {
    for (const series of group.dailyMetricTimeSeries || []) {
      if (series.dailyMetric !== metricName) continue;
      for (const point of series.timeSeries?.datedValues || []) {
        total += Number(point.value || 0);
      }
    }
  }
  return total;
}
```

- [ ] **Step 5: Enrich each live branch during sync**

Inside the live sync loop in `gbp-dashboard/server/syncService.mjs`, replace the `branches.push(normalizeLocation({ ... }))` block with:

```js
const reviewResponse = await client.listReviews(account.name, location.name).catch(() => ({ reviews: [] }));
const reviewStats = extractReviewStats(reviewResponse);
const currentPerformance = await client.fetchPerformance(location.name, { year: 2026, month: 4, day: 28 }, { year: 2026, month: 5, day: 25 }).catch(() => ({}));
const previousPerformance = await client.fetchPerformance(location.name, { year: 2026, month: 3, day: 31 }, { year: 2026, month: 4, day: 27 }).catch(() => ({}));
const websiteCurrent = sumDailyMetric(currentPerformance, 'WEBSITE_CLICKS');
const websitePrevious = sumDailyMetric(previousPerformance, 'WEBSITE_CLICKS');
const callCurrent = sumDailyMetric(currentPerformance, 'CALL_CLICKS');
const callPrevious = sumDailyMetric(previousPerformance, 'CALL_CLICKS');
const directionsCurrent = sumDailyMetric(currentPerformance, 'BUSINESS_DIRECTION_REQUESTS');
const directionsPrevious = sumDailyMetric(previousPerformance, 'BUSINESS_DIRECTION_REQUESTS');

branches.push(normalizeLocation({
  accountName: account.name,
  location,
  rating: reviewStats.averageRating,
  totalReviews: reviewStats.totalReviews,
  websiteClicks: { current: websiteCurrent, previous: websitePrevious, deltaPercent: calculateDeltaPercent(websiteCurrent, websitePrevious) },
  callClicks: { current: callCurrent, previous: callPrevious, deltaPercent: calculateDeltaPercent(callCurrent, callPrevious) },
  directionRequests: { current: directionsCurrent, previous: directionsPrevious, deltaPercent: calculateDeltaPercent(directionsCurrent, directionsPrevious) },
  syncedAt
}));
```

Also update the metrics import at the top of `syncService.mjs`:

```js
import { calculateDashboardSummary, calculateDeltaPercent, getBlockingReason } from '../src/shared/metrics.ts';
```

The fixed dates above match the first MVP default period used in mock verification. A later implementation can replace them with request-driven period parameters after the API access and quota behavior are confirmed.

- [ ] **Step 6: Run tests and commit**

Run:

```bash
cd gbp-dashboard
npm test -- server/syncService.enrichment.test.mjs server/syncService.test.mjs src/shared/metrics.test.ts
npm run build
```

Expected: tests PASS and build succeeds.

Run:

```bash
git add gbp-dashboard/server/gbpClient.mjs gbp-dashboard/server/syncService.mjs gbp-dashboard/server/syncService.enrichment.test.mjs
git commit -m "feat: enrich gbp sync metrics"
```

## Task 14: Final Verification

**Files:**
- Modify: `gbp-dashboard/README.md`

- [ ] **Step 1: Add usage notes**

Create `gbp-dashboard/README.md`:

```md
# GBP Performance Dashboard

Local prototype dashboard for Google Business Profile KPI monitoring.

## Run Locally

1. Copy `.env.example` to `.env` and fill Google OAuth values.
2. Run `npm install`.
3. Run `npm run dev:all`.
4. Open `http://127.0.0.1:5174`.
5. Open Settings & Sync, connect Google, then run Sync Data.

Without Google OAuth, Sync Data uses deterministic mock data so the dashboard can be reviewed safely.

## KPI Definitions

- Register Rate = verified profiles / total Google Business Profile profiles.
- Completion Rate = verified profiles with rating >= 4.5 and total reviews >= 10 / total Google Business Profile profiles.
```

- [ ] **Step 2: Run full test suite and build**

Run:

```bash
cd gbp-dashboard
npm test
npm run build
```

Expected: all tests PASS and build succeeds.

- [ ] **Step 3: Run local app and inspect manually**

Run:

```bash
cd gbp-dashboard
npm run dev:all
```

Open `http://127.0.0.1:5174` and verify:

- Scorecards show Register Rate and Completion Rate.
- Filter bar changes the scorecards and table.
- Branch table shows all branch and brand rows.
- Column filters exist for brand, rating, reviews, website, call, and blocking reason.
- Sort icons toggle highest-to-lowest and lowest-to-highest.
- Export filtered CSV downloads rows that match active filters.
- Profile Health shows status counts.
- Needs Review shows empty state or ambiguous profiles.
- Settings & Sync can run mock sync when Google OAuth is not configured.

- [ ] **Step 4: Commit verification docs**

Run:

```bash
git add gbp-dashboard/README.md
git commit -m "docs: add gbp dashboard usage notes"
```

## Self-Review Notes

- Spec coverage: the plan covers KPI scorecards, overall and per-brand calculation inputs, branch table filters and sorting, filtered export, profile health, needs review with persisted manual mapping, manual sync, OAuth, cache latest, daily snapshots, review metrics, performance metrics, and error fallback through cache/mock data.
- Scope: the MVP starts as a local prototype with mock data fallback and live Google sync. Custom date ranges are represented in the UI and export context; the first live sync enrichment uses the default last-28-days and previous-period windows, with request-driven date parameters left for the next iteration after API access and quota behavior are confirmed.
- Type consistency: shared type names used across calculations, filters, export, and React components match the definitions in `src/shared/types.ts`.
