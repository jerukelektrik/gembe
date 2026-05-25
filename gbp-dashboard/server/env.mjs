import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function loadLocalEnv(filePath = '.env') {
  const absolutePath = resolve(process.cwd(), filePath);
  if (!existsSync(absolutePath)) return;

  const lines = readFileSync(absolutePath, 'utf8').split('\n');
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const [key, ...valueParts] = line.split('=');
    const envKey = key.trim();
    const rawValue = valueParts.join('=').trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');
    if (!process.env[envKey]) process.env[envKey] = value;
  }
}

loadLocalEnv();
