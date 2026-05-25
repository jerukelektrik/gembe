import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export function createBrandMappingStore(mappingFile = process.env.GBP_MAPPING_FILE || './data/brand-mappings.json') {
  return {
    async readMappings() {
      try {
        return JSON.parse(await readFile(mappingFile, 'utf8'));
      } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') return {};
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
