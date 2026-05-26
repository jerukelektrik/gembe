import { describe, expect, it, vi } from 'vitest';
import { createGbpClient, GoogleApiError } from './gbpClient.mjs';

describe('createGbpClient', () => {
  it('turns 429 responses into a quota/access message', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(async () => new Response(JSON.stringify({ error: { message: 'Quota exceeded' } }), { status: 429 }));

    const client = createGbpClient({ access_token: 'token' });
    await expect(client.listAccounts()).rejects.toThrow('Google API quota/access error (429)');
    await expect(client.listAccounts()).rejects.toThrow('0 QPM quota');

    try {
      await client.listAccounts();
    } catch (error) {
      expect(error).toBeInstanceOf(GoogleApiError);
      expect(error.status).toBe(429);
    }

    globalThis.fetch = originalFetch;
  });
});
