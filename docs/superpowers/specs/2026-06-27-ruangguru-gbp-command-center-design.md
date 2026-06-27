# Ruangguru GBP Command Center Design

Date: 2026-06-27

## Summary

Upgrade the existing `gbp-dashboard` prototype into a RightChoice-like Google Business Profile command center for Ruangguru's multi-brand branch portfolio. The prototype uses dummy data by default and is meant for two jobs:

- Help managers understand the target platform vision.
- Help the SEO/local ops team simulate daily workflows before real Google API integration is expanded.

The implementation extends the current React/Vite frontend and existing local Express backend instead of creating a new app.

## Target Brands

The dummy portfolio should represent the brands mentioned in the benchmark request:

- Ruangguru Privat
- Brain Academy
- English Academy
- MatChamps
- Alta Global School
- Wonderlab
- Additional Ruangguru learning brands as needed for realistic portfolio scale

## Primary Users

### Manager / Stakeholder

Needs a clear executive view of total branches, profile health, risk, review quality, rank visibility, and operational alerts.

### SEO / Local Ops

Needs a daily command center for finding branches that need attention, reviewing negative feedback, planning posts, checking ranking drops, and exporting lists for follow-up.

### Future Regional / Brand Operator

Needs filtered views by brand, city, region, or branch group, with enough context to fix local profile issues without touching unrelated brands.

## Product Shape

The app becomes `Ruangguru GBP Command Center`.

It keeps the existing local app structure:

- Frontend: `gbp-dashboard/src`
- Local backend and mock sync service: `gbp-dashboard/server`
- Dummy/cache data: existing `gbp-dashboard/data` patterns or structured mock modules
- Documentation: `gbp-dashboard/README.md` plus a maintenance guide

## Navigation

The dashboard uses a left sidebar similar to RightChoice's operating model, but adapted for Ruangguru:

- Overview
- Listings
- Reviews
- Content
- Post Scheduling
- Rank Tracker
- Geo Grid
- Competitors
- Reports & Alerts
- Settings & Maintenance

The current `Settings & Sync` remains, but should be reframed as the maintenance and future Google API integration area.

## Core Screens

### Overview

The default page shows an executive and ops summary:

- Selected listings count.
- Active brands and cities.
- Google sync/source status.
- Completion score.
- Profile strength.
- Suspension risk.
- Policy or data quality violations.
- Review response health.
- Total profile actions such as website clicks, calls, direction requests.
- Critical alerts.
- A compact table of highest priority branches.

This page should feel presentation-ready and useful for a manager review.

### Listings

Listings is the main operational table.

Required fields:

- Branch name.
- Brand.
- City/province.
- Google status.
- Verification status.
- Profile health score.
- Completion score.
- Rating and review count.
- Website clicks.
- Calls.
- Direction requests.
- Issue tags.
- Last updated/synced timestamp.

Required controls:

- Brand filter.
- Search.
- Status filter.
- Sort by risk, score, rating, reviews, or actions.
- CSV export using the active filtered rows.

### Reviews

Reviews simulates review management without publishing to Google.

Required features:

- Review inbox with dummy reviewer, branch, rating, text, sentiment, and date.
- Filter by rating, sentiment, brand, and reply status.
- Reply status: pending, drafted, approved, replied.
- Suggested reply text for each review.
- Escalation marker for one- and two-star reviews.

The prototype must not imply it can publish real replies yet. It should label replies as demo/draft actions.

### Content

Content shows profile content hygiene:

- Missing or stale photos.
- Missing service descriptions.
- Incorrect category warnings.
- Brand asset status.
- Recommended update items per branch.

This can be card/table based for the prototype.

### Post Scheduling

Post Scheduling simulates campaign planning:

- Calendar/list of scheduled posts.
- Brand and branch targeting.
- Campaign type: offer, event, update, trial class, open house.
- Publish status: draft, scheduled, published, failed.
- UTM/campaign label.

### Rank Tracker

Rank Tracker shows local keyword visibility:

- Keyword.
- Brand.
- Branch/city.
- Current rank.
- Previous rank.
- Direction/trend.
- Competitor above/below.

Use dummy keywords relevant to education, tutoring, English course, and school-related searches.

### Geo Grid

Geo Grid is a visual approximation, not a real map integration.

Required features:

- Branch selector.
- Keyword selector.
- Grid of ranking cells.
- Color states for strong, medium, weak visibility.
- Summary of grid average rank and weak zones.

### Competitors

Competitors compares Ruangguru branches against local competitors.

Required fields:

- Competitor name.
- Brand/category.
- City.
- Rating.
- Review count.
- Keyword rank.
- Profile completeness.
- Gap summary.

### Reports & Alerts

Reports & Alerts focuses on exception management:

- Negative review alert.
- Suspended/disabled listing alert.
- Profile completion drop.
- Ranking drop.
- Sync/data quality warning.
- Weekly report summary by brand.

### Settings & Maintenance

This screen and/or documentation should explain:

- How to run the app locally.
- How to edit dummy data.
- How to build for review.
- How to run tests.
- Which files contain feature modules.
- Which parts are dummy-only.
- Future API integration notes.

## Data Model

The prototype should add structured dummy domain data in TypeScript modules or server mock data:

- Branch profiles.
- Review records.
- Scheduled posts.
- Content issues.
- Keyword rankings.
- Geo grid cells.
- Competitor records.
- Alerts.
- Report summaries.

Each record should include brand and branch references so filters can stay consistent across screens.

## UI Direction

The UI should be an operational SaaS dashboard, not a marketing landing page.

Design principles:

- Dense but readable.
- Left navigation.
- Summary cards at the top.
- Tables and issue lists for daily work.
- Color used for risk and status, not decoration.
- Ruangguru-adjacent but not overly branded.
- Responsive enough for desktop and tablet review.

## Error Handling

The existing dashboard load error state remains.

Dummy-only modules should avoid network errors. Any future sync/API action must clearly show whether the app is using demo data or Google data.

Demo actions such as "draft reply" or "schedule post" should be framed as non-persistent if they are not stored.

## Testing

Keep tests focused on stable business logic and high-risk UI paths:

- Existing metrics and filters should keep passing.
- Add or update tests for any new filtering/export helpers.
- Run `npm run build`.
- Run `npm test` if available and not blocked.

## Documentation

Add practical usage and maintenance guidance:

- Local setup.
- Daily demo flow for manager presentation.
- Daily ops workflow using dummy data.
- How to edit brands, branches, reviews, rankings, posts, and competitors.
- How to export data.
- How future Google API integration should replace dummy data screen by screen.

## Out of Scope

- Real Google review reply publishing.
- Real Google post publishing.
- Real map/geo-grid API integration.
- Production authentication and role-based access.
- Database persistence beyond existing local cache/mock patterns.
- Billing or subscription logic.

## Acceptance Criteria

- The app visually and functionally resembles a local GBP management command center.
- A user can run the app locally and explore the prototype with dummy data.
- The dashboard includes the major RightChoice-inspired modules requested for benchmarking.
- The README or maintenance guide explains how to operate and update the prototype.
- Existing app behavior is not destructively removed.
