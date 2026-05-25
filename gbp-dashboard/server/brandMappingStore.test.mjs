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
