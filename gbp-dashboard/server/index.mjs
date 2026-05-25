import express from 'express';
import { createBrandMappingStore } from './brandMappingStore.mjs';
import { exchangeCodeForToken, getAuthUrl } from './googleAuth.mjs';
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

app.listen(port, '127.0.0.1', () => {
  console.log(`GBP dashboard API listening on http://127.0.0.1:${port}`);
});
