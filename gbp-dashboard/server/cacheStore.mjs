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
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') return null;
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
