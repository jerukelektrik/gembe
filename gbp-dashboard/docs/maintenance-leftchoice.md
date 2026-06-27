# LeftChoice Maintenance Guide

LeftChoice is a local prototype for managing Google Business Profile operations across Ruangguru brands. It currently uses deterministic dummy data for product demos and workflow simulation.

## Run Locally

```bash
cd gbp-dashboard
npm install
npm run dev:all
```

Open:

```text
http://127.0.0.1:5174
```

## Demo Walkthrough

1. Start on **Overview** and explain selected listings, profile strength, completion score, suspension risk, review response, and ranking drops.
2. Move to **Listings** and show filtering, issue tags, branch metrics, and CSV/XLSX export.
3. Move to **Reviews** and show negative review escalation plus suggested replies.
4. Move to **Content** and explain profile hygiene work.
5. Move to **Post Scheduling** and explain branch/brand campaign planning.
6. Move to **Rank Tracker** and **Geo Grid** for local SEO visibility.
7. Move to **Competitors** and **Reports & Alerts** for benchmarking and weekly management reporting.
8. End on **Settings** to explain dummy data and future Google API sync.

## Edit Dummy Data

Main demo data:

```text
src/shared/leftchoiceData.ts
```

Backend branch profiles:

```text
server/mockData.mjs
```

Keep `branchId` values aligned. For example, if a review uses `branchId: "mock-8"`, that ID should exist in `server/mockData.mjs` or in `leftChoiceBranchNames`.

## Add a Brand

1. Add the brand ID to `BrandId` in `src/shared/types.ts`.
2. Add the display label and detection pattern in `src/shared/brands.ts`.
3. Add one or more branch records in `server/mockData.mjs`.
4. Add related demo data in `src/shared/leftchoiceData.ts`.
5. Run:

```bash
npm test
npm run build
```

## Add a Branch Scenario

1. Add a branch object to `server/mockData.mjs`.
2. Add its readable name to `leftChoiceBranchNames`.
3. Add `leftChoiceBranchMeta` with city, province, owner, profile strength, completion score, suspension risk, and issue tags.
4. Add supporting review/post/ranking/alert records if the branch should appear in other modules.

## Test Before Demo

```bash
cd gbp-dashboard
npm test
npm run build
```

Then run the app:

```bash
npm run dev:all
```

## Future Google API Integration

Keep dummy and live actions separate:

- Listing sync can use Google Business Profile APIs.
- Reviews should stay draft-only until reply publishing is explicitly implemented and approved.
- Post Scheduling should stay draft-only until Google post publishing is explicitly implemented and approved.
- Geo Grid should be replaced by a real local rank provider or approved SERP measurement workflow.
- Competitor and market data should be stored separately from Google-owned branch profile data.

## Operational Notes

- Use Overview for manager reporting.
- Use Listings and Reviews for daily triage.
- Use Reports & Alerts for weekly review.
- Treat all publish-like actions as non-persistent in this prototype.
