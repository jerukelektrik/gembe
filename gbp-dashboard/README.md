# GBP Performance Dashboard

Local prototype dashboard for Google Business Profile KPI monitoring.

## Run Locally

1. Copy `.env.example` to `.env` and fill `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from a Google Cloud OAuth client.
2. Run `npm install`.
3. Run `npm run dev:all`.
4. Open `http://127.0.0.1:5174`.
5. Open Settings & Sync, connect Google, then run Sync Data.

If the Connect Google button is disabled, the local server did not find the required OAuth values. Edit `.env`, then restart `npm run dev:all`.

Without Google OAuth, Sync Data uses deterministic mock data so the dashboard can be reviewed safely.

## KPI Definitions

- Register Rate = verified profiles / total Google Business Profile profiles.
- Completion Rate = verified profiles with rating >= 4.5 and total reviews >= 10 / total Google Business Profile profiles.
