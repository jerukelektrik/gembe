# LeftChoice

Local prototype platform for managing Google Business Profile operations across Ruangguru brands. LeftChoice is inspired by the RightChoice benchmark and uses deterministic dummy data by default so managers and SEO/local ops can review the product vision safely.

## Run Locally

1. Copy `.env.example` to `.env` and fill `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from a Google Cloud OAuth client.
2. Run `npm install`.
3. Run `npm run dev:all`.
4. Open `http://127.0.0.1:5174`.
5. Review the Overview, Listings, Reviews, Content, Post Scheduling, Rank Tracker, Geo Grid, Competitors, Reports & Alerts, and Settings screens.

If the Connect Google button is disabled, the local server did not find the required OAuth values. Edit `.env`, then restart `npm run dev:all`.

Without Google OAuth, Sync Data uses deterministic mock data so the dashboard can be reviewed safely.

## LeftChoice Demo Flow

Use this path when presenting to a manager:

1. Open **Overview** for selected listings, profile strength, completion score, suspension risk, review response rate, and ranking drops.
2. Open **Listings** to show branch-level issue triage and CSV/XLSX export.
3. Open **Reviews** to show review inbox, escalation, and AI-style reply drafts.
4. Open **Content** to show profile hygiene tasks such as stale photos, missing services, and category issues.
5. Open **Post Scheduling** to show campaign planning by brand and branch.
6. Open **Rank Tracker** and **Geo Grid** to show local SEO visibility and ranking risk.
7. Open **Competitors** for local benchmark gaps.
8. Open **Reports & Alerts** for weekly reporting and exception management.
9. Open **Settings** to explain demo data maintenance and future Google API sync.

## Dummy Data Maintenance

Most RightChoice-like demo scenarios live in:

```text
src/shared/leftchoiceData.ts
```

Edit this file to add or update:

- Branch metadata and owners.
- Reviews and suggested replies.
- Content issues.
- Scheduled posts.
- Keyword rankings.
- Geo grid ranks.
- Competitor benchmarks.
- Alerts and weekly report summaries.

The original branch profiles used by the local backend live in:

```text
server/mockData.mjs
```

Keep IDs consistent between `server/mockData.mjs` and `src/shared/leftchoiceData.ts` so reviews, alerts, rankings, and posts point to the right branch.

## Maintenance Commands

```bash
npm test
npm run build
npm run dev:all
```

Use `npm test` before handing changes to another teammate. Use `npm run build` before a manager demo.

## Google API Access And Quota

If Sync Data fails with `Google API quota/access error (429)`, the OAuth connection is working but the Google Cloud project may not have Business Profile API access yet.

Check:

1. Google Cloud Console > APIs & Services > Enabled APIs & Services.
2. Open **My Business Account Management API**.
3. Open **Quotas**.
4. If quota is `0 QPM`, request **Business Profile API Application for Basic API Access** for that project.

Google's GBP API docs state that 0 QPM means the project has not been granted access yet.

## KPI Definitions

- Register Rate = verified profiles / total Google Business Profile profiles.
- Completion Rate = verified profiles with rating >= 4.5 and total reviews >= 10 / total Google Business Profile profiles.
- Profile Strength = dummy audit score from `leftchoiceData.ts`, falling back to verification status when no dummy audit exists.
- Suspension Risk = alert-derived risk level from critical and warning alerts.

## Prototype Boundaries

- Review replies are draft/demo-only and do not publish to Google.
- Post scheduling is draft/demo-only and does not publish to Google.
- Geo Grid is a visual dummy heatmap, not a live map/rank API.
- OAuth and sync code remain available for future integration, but the manager demo should use dummy data unless live API access is ready.
