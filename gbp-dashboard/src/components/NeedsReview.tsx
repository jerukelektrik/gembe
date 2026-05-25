import { useState } from 'react';
import { BRANDS } from '../shared/brands';
import type { BranchProfile, BrandId } from '../shared/types';

export function NeedsReview({ branches }: { branches: BranchProfile[] }) {
  const rows = branches.filter((branch) => branch.brandId === 'needs-review');
  const [selected, setSelected] = useState<Record<string, BrandId>>({});
  const [message, setMessage] = useState('');

  async function saveMapping(branch: BranchProfile) {
    const brandId = selected[branch.locationName];
    if (!brandId) return;
    const response = await fetch('/api/brand-mappings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ locationName: branch.locationName, brandId })
    });
    const json = await response.json();
    setMessage(json.ok ? 'Mapping saved. Run Sync Data to refresh the dashboard.' : `Mapping failed: ${json.error}`);
  }

  return (
    <section className="table-card">
      <div className="table-card-header"><div><h2>Needs Review</h2><p>{rows.length} profiles need brand mapping</p></div></div>
      {message && <p className="empty-state">{message}</p>}
      {rows.length === 0 ? <p className="empty-state">No ambiguous profiles in the current cache.</p> : rows.map((branch) => (
        <div className="mapping-row" key={branch.id}>
          <strong>{branch.title}</strong>
          <select aria-label={`Map brand for ${branch.title}`} onChange={(event) => setSelected((current) => ({ ...current, [branch.locationName]: event.target.value as BrandId }))}>
            <option value="">Select brand</option>
            {BRANDS.map((brand) => <option value={brand.id} key={brand.id}>{brand.label}</option>)}
          </select>
          <button type="button" className="secondary-button" onClick={() => saveMapping(branch)}>Save mapping</button>
        </div>
      ))}
    </section>
  );
}
