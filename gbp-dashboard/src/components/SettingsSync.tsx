import { RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Alert, Badge, Button, ButtonLink, Card, CardDescription, CardHeader, CardTitle } from './ui';

interface AuthStatus {
  configured: boolean;
  missingKeys: string[];
}

export function SettingsSync({ onSynced }: { onSynced: () => void }) {
  const [message, setMessage] = useState('LeftChoice is running with demo data. Google sync is available for future/live integration when OAuth and GBP API access are ready.');
  const [loading, setLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);

  useEffect(() => {
    fetch('/api/auth/status')
      .then((response) => response.json())
      .then((status: AuthStatus) => {
        setAuthStatus(status);
        if (!status.configured) {
          setMessage(`Google OAuth belum dikonfigurasi. Isi ${status.missingKeys.join(', ')} di gbp-dashboard/.env lalu restart server.`);
        }
      })
      .catch(() => setAuthStatus(null));
  }, []);

  async function sync() {
    setLoading(true);
    setMessage('Sync running: locations, profile status, reputation, performance metrics, cache save.');
    const response = await fetch('/api/sync', { method: 'POST' });
    const json = await response.json();
    setLoading(false);
    setMessage(json.ok ? `Sync complete at ${json.syncedAt}` : `Sync failed: ${json.error}`);
    if (json.ok) onSynced();
  }

  const messageVariant = message.toLowerCase().includes('failed') || message.toLowerCase().includes('belum') ? 'warning' : 'info';

  return (
    <Card className="settings-card">
      <CardHeader className="section-header">
        <div>
          <CardTitle>Settings & Maintenance</CardTitle>
          <CardDescription>Demo data aktif secara default. Hubungkan akun Google owner hanya saat ingin mencoba jalur live sync.</CardDescription>
        </div>
        <Badge variant={authStatus?.configured ? 'success' : 'warning'}>{authStatus?.configured ? 'OAuth ready' : 'OAuth setup'}</Badge>
      </CardHeader>
      <Alert variant={messageVariant}>{message}</Alert>
      <Alert variant="info">
        <strong>Maintenance note</strong>
        <span>Edit dummy scenarios in <code>src/shared/leftchoiceData.ts</code>. Real Google publishing for reviews/posts is intentionally not enabled in this prototype.</span>
      </Alert>
      <div className="row-actions">
        {authStatus?.configured ? <ButtonLink href="/auth/google" variant="outline">Connect Google account</ButtonLink> : <Button type="button" variant="outline" disabled>Connect Google account</Button>}
        <Button type="button" onClick={sync} disabled={loading}><RefreshCcw size={16} aria-hidden="true" />{loading ? 'Syncing' : 'Sync Data'}</Button>
      </div>
    </Card>
  );
}
