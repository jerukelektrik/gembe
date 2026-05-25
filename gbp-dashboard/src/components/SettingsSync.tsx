import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';

export function SettingsSync({ onSynced }: { onSynced: () => void }) {
  const [message, setMessage] = useState('Ready to sync from local backend.');
  const [loading, setLoading] = useState(false);

  async function sync() {
    setLoading(true);
    setMessage('Sync running: locations, profile status, reputation, performance metrics, cache save.');
    const response = await fetch('/api/sync', { method: 'POST' });
    const json = await response.json();
    setLoading(false);
    setMessage(json.ok ? `Sync complete at ${json.syncedAt}` : `Sync failed: ${json.error}`);
    if (json.ok) onSynced();
  }

  return (
    <section className="settings-card">
      <h2>Settings & Sync</h2>
      <p>{message}</p>
      <div className="row-actions">
        <a className="secondary-button" href="/auth/google">Connect Google account</a>
        <button type="button" className="primary-button" onClick={sync} disabled={loading}><RefreshCcw size={16} /> Sync Data</button>
      </div>
    </section>
  );
}
