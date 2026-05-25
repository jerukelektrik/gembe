# Google Business Profile Performance Dashboard Design

Date: 2026-05-25

## Summary

Build a local/internal prototype dashboard for tracking Google Business Profile performance across eight Ruangguru-related brands and 1,049 current business profiles. The dashboard syncs data on demand from Google Business Profile APIs using the owner's Google account, caches the data locally, and helps the team monitor Register Rate, Completion Rate, branch reputation, profile health, and core action metrics.

The MVP is a local prototype without internal login. It is designed for daily or weekly monitoring, with custom date ranges and automatic previous-period comparison for action metrics.

## Brands

The dashboard tracks these brands:

- Ruangguru
- Brain Academy
- Math Champs
- English Academy
- Kalananti / Ruangguru Coding
- Work Abroad Academy
- Ruangguru Privat
- Alta Global School

Brand detection is based on profile name patterns. Clear matches are assigned automatically. New or ambiguous profiles are placed in a Needs Review queue for manual brand mapping.

## Users

### Primary Operator

The primary operator is the Google Business Profile owner account holder. They connect Google OAuth, run manual syncs, validate ambiguous new profiles, and export filtered branch data.

### Internal Viewers

Internal team members can view the local dashboard from the cached data. The MVP does not require internal login. Access control is handled by where and how the local app is run.

## Business KPIs

### Register Rate

Register Rate measures how many profiles are verified.

Formula:

```text
Register Rate = verified profiles / total Google Business Profile profiles
```

The denominator is all Google Business Profile profiles available to the owner's email, including unverified, duplicate, suspended, closed, disabled, missing-store-code, and other problematic profile states.

### Completion Rate

Completion Rate measures how many profiles are verified and meet reputation depth requirements.

Formula:

```text
Completion Rate = profiles where verified = true, average rating >= 4.5, and total reviews >= 10 / total Google Business Profile profiles
```

Completion Rate uses inclusive thresholds: rating `>= 4.5` and total reviews `>= 10`.

Both KPIs are calculated overall and per brand.

For the MVP, Register Rate and Completion Rate use the latest synced profile state. The cache design also stores one daily snapshot so the app can later show historical KPI trends after daily sync is enabled.

## Core Metrics

### Reputation Metrics

The reputation layer is the first priority for the MVP.

Track per profile:

- Average rating.
- Total reviews/comments.
- Completion status.
- Blocking reason for incomplete profiles.

A profile needs attention if any of these are true:

- It is not verified.
- Average rating is below 4.5.
- Total reviews are below 10.
- Brand mapping is missing or ambiguous.

Individual review reply workflows are out of scope for the MVP.

### Action Metrics

Track these action metrics from Google Business Profile Performance data when available:

- Website clicks.
- Call clicks.
- Direction requests.

The dashboard and export show the active-period value and the delta versus the previous period by default. If the user selects a 28-day date range, the comparison period is the previous 28 days. If the user selects a custom range, the comparison period is the same number of days immediately before that range.

WhatsApp clicks are not treated as a first-class metric in the MVP because their source is not guaranteed in Google Business Profile data. The MVP records this as an audit item: WhatsApp may appear as website clicks if the profile link points to WhatsApp, or may need separate tracking links later.

### Profile Health Metrics

Track status counts and profile issue lists for:

- Verified.
- Unverified.
- Google update.
- Pending review.
- Temporarily closed.
- Permanently closed.
- Disabled.
- Suspended.
- Duplicate.
- Missing store code.
- Needs review for ambiguous brand mapping.

Profile Health is separate from performance ranking, but all profile states remain in the KPI denominator.

## Dashboard Pages

### Overview

The Overview page is the default screen.

It contains:

- Scorecards for Register Rate, Completion Rate, action clicks, and not-complete/blocking branches.
- KPI by brand, showing Register Rate and Completion Rate per brand.
- Profile Health summary.
- All Branch and Brand Table with filters, sorting, and export.

The scorecards remain visible as the top-level executive summary. The table below them is for operational investigation.

### Branches

The Branches page focuses on exploring all profiles and branch metrics.

It contains a full table with:

- Branch/location name.
- Brand.
- Store code when available.
- Profile status.
- Verified status.
- Completion status.
- Blocking reason.
- Average rating.
- Total reviews.
- Website clicks and delta.
- Call clicks and delta.
- Direction requests and delta.
- Last synced timestamp.

### Profile Health

The Profile Health page focuses on operational profile issues such as unverified, suspended, duplicate, closed, disabled, pending review, and missing store code.

It helps the team separate profile setup problems from reputation problems.

### Needs Review

The Needs Review page lists profiles that were newly synced but could not be confidently mapped to one of the eight brands.

Operators can manually assign the correct brand. After assignment, the profile enters the normal dashboard and KPI calculations.

### Settings And Sync

The Settings/Sync page contains:

- Google OAuth connection status.
- Manual Sync Data button.
- Last sync timestamp.
- Sync progress by stage.
- API error summary.
- Cache status.

## Filters And Sorting

Global filters are available at the top of the dashboard:

- Date range: last 7 days, last 28 days, month to date, and custom range.
- Compare period: previous period by default.
- Brand.
- Branch search.
- More filters panel.

The More Filters panel includes:

- Profile status.
- Completion status.
- Blocking reason.
- Rating threshold or min/max.
- Review count threshold or min/max.
- Website click min/max.
- Call click min/max.
- Direction request min/max.

The All Branch and Brand Table also has column-level controls for:

- Brand.
- Rating.
- Reviews.
- Website clicks.
- Call clicks.
- Blocking reason.

Each sortable column has a sort icon. Clicking once sorts highest to lowest; clicking again sorts lowest to highest. Only one active sort column is required for the MVP.

## Export

The MVP supports CSV and XLSX export.

Export follows the active global filters, table filters, and current sort. The exported dataset contains branch rows and their metrics, not only issue summaries.

Export columns include:

- Brand.
- Branch/location name.
- Store code.
- Profile status.
- Verified status.
- Completion status.
- Blocking reason.
- Average rating.
- Total reviews/comments.
- Website clicks for the active period.
- Website clicks delta versus comparison period.
- Call clicks for the active period.
- Call clicks delta versus comparison period.
- Direction requests for the active period.
- Direction requests delta versus comparison period.
- Active period start and end.
- Comparison period start and end.
- Last synced timestamp.

## Technical Architecture

### Runtime

The MVP is a local web application with two parts:

- Frontend dashboard for UI, filters, tables, charts, and export.
- Local backend for Google OAuth, Google Business Profile API calls, sync orchestration, and cache writes.

The browser does not call Google APIs directly. It reads dashboard data from the local backend/cache.

### Google API Sources

Use official Google Business Profile API surfaces where available:

- Business Profile location data for profile identity, status, names, addresses, and store codes.
- Business Profile Performance API for website clicks, call clicks, and direction requests.
- Business Profile Reviews API for rating and review-count data when needed.
- Business Calls API only if call insights are available and useful beyond standard call click metrics.

API references used during design:

- https://developers.google.com/my-business/reference/performance/rest
- https://developers.google.com/my-business/reference/performance/rest/v1/DailyMetric
- https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews
- https://developers.google.com/my-business/reference/businesscalls/rest

### Sync Flow

Manual sync is the MVP default.

When the operator clicks Sync Data:

1. Backend verifies that Google OAuth is connected.
2. Backend fetches all accessible Google Business Profile locations.
3. Backend normalizes location/profile data.
4. Backend detects brand from profile name.
5. Clear brand matches enter the dashboard directly.
6. Ambiguous matches enter Needs Review.
7. Backend fetches current rating, total reviews, profile status, and selected action metrics.
8. Backend calculates KPI fields, completion status, and blocking reasons.
9. Backend writes latest cache.
10. Backend writes or updates one daily snapshot.
11. Frontend refreshes from the latest cache.

The design should make it easy to add automatic daily sync later.

### Cache Design

The cache has two layers:

- Latest cache: current normalized dataset used by the dashboard.
- Daily snapshots: one snapshot per day for future KPI history and trend analysis.

If sync runs multiple times in the same day, latest cache is always updated. The daily snapshot for that date is overwritten with the most recent successful sync, so there is only one representative snapshot per day.

Review detail storage is minimized. The MVP stores branch-level reputation summaries for all profiles. If review detail storage is later needed, it should store full details only for reviews that need action, such as low-rated or unreplied reviews.

## Error Handling

- If Google OAuth is not connected, the app shows a connect prompt on the Settings/Sync page.
- If Google API sync fails, the dashboard remains usable from the latest cache and clearly labels the data as coming from the last successful sync.
- If an API metric is unavailable for a profile, the UI displays `N/A` rather than a false zero.
- If a profile cannot be mapped to a brand, it is placed in Needs Review rather than discarded.
- If sync takes time across 1,049 profiles, the app shows progress stages: locations, profile status, reputation, performance metrics, cache save.
- If export has no matching rows under the active filters, the app shows a clear empty-state message.

## Testing Plan

Automated or focused manual tests should cover:

- Register Rate formula.
- Completion Rate formula.
- Inclusive thresholds for rating `>= 4.5` and reviews `>= 10`.
- Overall KPI calculation.
- Per-brand KPI calculation.
- Brand detection for the eight brands, including Kalananti / Ruangguru Coding as one combined brand.
- Ambiguous profile routing to Needs Review.
- Global filters.
- Table-level filters.
- Single-column sorting with ascending and descending behavior.
- Export follows active filters and sort.
- Action metric delta against previous period.
- Latest cache read/write.
- Daily snapshot creation.
- Dashboard behavior when API sync fails but cache exists.
- `N/A` display when a metric is unavailable.

## Out Of Scope For MVP

- Hosted deployment.
- Internal user login.
- Role-based access by brand or branch.
- Replying to reviews from the dashboard.
- WhatsApp click attribution as a guaranteed metric.
- Automatic daily sync implementation.
- Historical KPI trend charts beyond storing daily snapshots.
- Advanced sentiment or keyword analysis for review comments.
- Integration with a master branch database.
