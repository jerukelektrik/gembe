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
