import type { BranchProfile, ProfileStatus } from '../shared/types';

const statuses: ProfileStatus[] = ['verified', 'unverified', 'google-update', 'pending-review', 'temporarily-closed', 'permanently-closed', 'disabled', 'suspended', 'duplicate', 'missing-store-code', 'unknown'];

export function ProfileHealth({ branches, compact = false }: { branches: BranchProfile[]; compact?: boolean }) {
  const visibleStatuses = compact ? statuses.filter((status) => status !== 'unknown') : statuses;
  return (
    <section className="panel-grid" aria-label="Profile health">
      {visibleStatuses.map((status) => {
        const count = branches.filter((branch) => branch.profileStatus === status).length;
        return <article className="mini-panel" key={status}><span>{status}</span><strong>{count}</strong></article>;
      })}
    </section>
  );
}
