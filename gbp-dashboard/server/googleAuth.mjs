import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const scope = 'https://www.googleapis.com/auth/business.manage';
const requiredOAuthKeys = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];

function tokenFile() {
  return process.env.GBP_TOKEN_FILE || './data/google-token.json';
}

export function getAuthUrl() {
  requireGoogleOAuthConfig();
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://127.0.0.1:4174/auth/google/callback',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    scope
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function getGoogleOAuthConfigStatus() {
  const missingKeys = requiredOAuthKeys.filter((key) => !process.env[key]);
  return {
    configured: missingKeys.length === 0,
    missingKeys
  };
}

export function requireGoogleOAuthConfig() {
  const status = getGoogleOAuthConfigStatus();
  if (!status.configured) {
    throw new Error(`Google OAuth is not configured. Missing: ${status.missingKeys.join(', ')}`);
  }
}

export async function exchangeCodeForToken(code) {
  requireGoogleOAuthConfig();
  if (!code) throw new Error('Google OAuth callback is missing code');

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://127.0.0.1:4174/auth/google/callback',
      grant_type: 'authorization_code'
    })
  });

  if (!response.ok) throw new Error(`Google token exchange failed: ${response.status}`);
  const token = await response.json();
  await mkdir(dirname(tokenFile()), { recursive: true });
  await writeFile(tokenFile(), JSON.stringify({ ...token, saved_at: Date.now() }, null, 2));
  return token;
}

export async function readToken() {
  try {
    return JSON.parse(await readFile(tokenFile(), 'utf8'));
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') return null;
    throw error;
  }
}
