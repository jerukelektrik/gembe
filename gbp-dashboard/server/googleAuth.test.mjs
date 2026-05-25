import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getAuthUrl, getGoogleOAuthConfigStatus } from './googleAuth.mjs';

const originalEnv = { ...process.env };

beforeEach(() => {
  delete process.env.GOOGLE_CLIENT_ID;
  delete process.env.GOOGLE_CLIENT_SECRET;
  delete process.env.GOOGLE_REDIRECT_URI;
});

afterEach(() => {
  process.env = { ...originalEnv };
});

describe('Google OAuth config', () => {
  it('reports missing OAuth config before redirecting to Google', () => {
    expect(getGoogleOAuthConfigStatus()).toEqual({
      configured: false,
      missingKeys: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET']
    });
    expect(() => getAuthUrl()).toThrow('Google OAuth is not configured');
  });

  it('builds an auth URL when client config is present', () => {
    process.env.GOOGLE_CLIENT_ID = 'client-id';
    process.env.GOOGLE_CLIENT_SECRET = 'client-secret';

    expect(getGoogleOAuthConfigStatus()).toEqual({ configured: true, missingKeys: [] });
    expect(getAuthUrl()).toContain('client_id=client-id');
  });
});
