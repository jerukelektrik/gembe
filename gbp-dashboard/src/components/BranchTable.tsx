import { ArrowDown, ArrowUp, ArrowUpDown, Download, FilterX } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BRANDS, getBrandLabel } from '../shared/brands';
import { buildExportRows, toCsv, toXlsxBlob } from '../shared/exportRows';
import { filterBranches, sortBranches, type BranchFilters, type BranchSort, type SortColumn } from '../shared/filters';
import { Badge, Button, Card, CardDescription, CardHeader, CardTitle, Input, Select, cn } from './ui';
import type { BlockingReason, BranchProfile, BrandId } from '../shared/types';

function metricText(value: number | null, delta: number | null) {
  const base = value === null ? 'N/A' : String(value);
  if (delta === null) return base;
  return `${base} · ${delta > 0 ? '+' : ''}${delta}%`;
}

function nextSort(current: BranchSort, column: SortColumn): BranchSort {
  if (current.column !== column) return { column, direction: 'desc' };
  return { column, direction: current.direction === 'desc' ? 'asc' : 'desc' };
}

function reasonLabel(reason: BlockingReason) {
  const labels: Record<BlockingReason, string> = {
    complete: 'Complete',
    'not-registered': 'Not registered',
    rating: 'Rating < 4.5',
    reviews: 'Reviews < 10',
    'rating-and-reviews': 'Rating & reviews',
    'needs-review': 'Needs review'
  };
  return labels[reason];
}

function reasonVariant(reason: BlockingReason): 'success' | 'warning' | 'danger' | 'secondary' {
  if (reason === 'complete') return 'success';
  if (reason === 'not-registered' || reason === 'needs-review') return 'warning';
  if (reason === 'rating' || reason === 'rating-and-reviews') return 'danger';
  return 'secondary';
}

function statusLabel(status: BranchProfile['profileStatus']) {
  return status.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join(' ');
}

function statusVariant(status: BranchProfile['profileStatus']): 'success' | 'warning' | 'danger' | 'secondary' {
  if (status === 'verified') return 'success';
  if (status === 'suspended' || status === 'disabled' || status === 'permanently-closed') return 'danger';
  if (status === 'pending-review' || status === 'unverified' || status === 'google-update') return 'warning';
  return 'secondary';
}

function metricDelta(delta: number | null) {
  if (delta === null) return <Badge variant="secondary">No compare</Badge>;
  return <Badge variant={delta >= 0 ? 'success' : 'danger'}>{delta > 0 ? '+' : ''}{delta}%</Badge>;
}

function cleanFilters(filters: BranchFilters): BranchFilters {
  return Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined && value !== '')) as BranchFilters;
}

interface BranchTableProps {
  branches: BranchProfile[];
  title?: string;
  description?: string;
}

export function BranchTable({ branches, title = 'Listings Management', description }: BranchTableProps) {
  const [filters, setFilters] = useState<BranchFilters>({});
  const [sort, setSort] = useState<BranchSort>({ column: 'title', direction: 'asc' });

  const rows = useMemo(() => sortBranches(filterBranches(branches, filters), sort), [branches, filters, sort]);
  const exportRows = useMemo(() => buildExportRows(rows, { activeStart: 'active-start', activeEnd: 'active-end', compareStart: 'compare-start', compareEnd: 'compare-end' }), [rows]);
  const activeFilterCount = Object.keys(cleanFilters(filters)).length;

  function updateFilter(next: Partial<BranchFilters>) {
    setFilters((current) => cleanFilters({ ...current, ...next }));
  }

  function downloadCsv() {
    const csv = toCsv(exportRows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'gbp-branches-filtered.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function downloadXlsx() {
    const blob = toXlsxBlob(exportRows);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'gbp-branches-filtered.xlsx';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function SortButton({ column, label }: { column: SortColumn; label: string }) {
    const active = sort.column === column;
    const Icon = !active ? ArrowUpDown : sort.direction === 'desc' ? ArrowDown : ArrowUp;
    return (
      <button type="button" className={cn('sort-button', active && 'active-sort')} aria-label={`Sort ${label}`} onClick={() => setSort((current) => nextSort(current, column))}>
        <Icon size={14} aria-hidden="true" />
      </button>
    );
  }

  return (
    <Card className="table-card">
      <CardHeader className="table-card-header">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description ?? `${rows.length} profiles shown from ${branches.length} total`}</CardDescription>
        </div>
        <div className="row-actions">
          {activeFilterCount > 0 && <Button type="button" variant="ghost" onClick={() => setFilters({})}><FilterX size={16} aria-hidden="true" />Clear {activeFilterCount}</Button>}
          <Button type="button" variant="outline" onClick={downloadCsv}><Download size={16} aria-hidden="true" />CSV</Button>
          <Button type="button" variant="outline" onClick={downloadXlsx}><Download size={16} aria-hidden="true" />XLSX</Button>
        </div>
      </CardHeader>
      <div className="branch-table">
        <table>
          <thead>
            <tr>
              <th aria-sort={sort.column === 'title' ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}>
                <div className="table-head-cell"><span>Branch <SortButton column="title" label="branch" /></span><Input aria-label="Branch search" value={filters.search ?? ''} onChange={(event) => updateFilter({ search: event.target.value })} placeholder="Search" /></div>
              </th>
              <th aria-sort={sort.column === 'brandId' ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}>
                <div className="table-head-cell"><span>Brand <SortButton column="brandId" label="brand" /></span><Select aria-label="Brand filter" value={filters.brandId ?? ''} onChange={(event) => updateFilter({ brandId: event.target.value ? event.target.value as BrandId : undefined })}><option value="">All</option>{BRANDS.map((brand) => <option value={brand.id} key={brand.id}>{brand.label}</option>)}</Select></div>
              </th>
              <th aria-sort={sort.column === 'profileStatus' ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}>
                <div className="table-head-cell table-head-cell-static"><span>Status <SortButton column="profileStatus" label="status" /></span></div>
              </th>
              <th aria-sort={sort.column === 'averageRating' ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}>
                <div className="table-head-cell"><span>Rating <SortButton column="averageRating" label="rating" /></span><Input aria-label="Rating max filter" value={filters.ratingMax ?? ''} type="number" step="0.1" placeholder="Max" onChange={(event) => updateFilter({ ratingMax: event.target.value ? Number(event.target.value) : undefined })} /></div>
              </th>
              <th aria-sort={sort.column === 'totalReviews' ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}>
                <div className="table-head-cell"><span>Reviews <SortButton column="totalReviews" label="reviews" /></span><Input aria-label="Reviews min filter" value={filters.reviewsMin ?? ''} type="number" placeholder="Min" onChange={(event) => updateFilter({ reviewsMin: event.target.value ? Number(event.target.value) : undefined })} /></div>
              </th>
              <th aria-sort={sort.column === 'websiteClicks' ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}>
                <div className="table-head-cell"><span>Website <SortButton column="websiteClicks" label="website" /></span><Input aria-label="Website min filter" value={filters.websiteMin ?? ''} type="number" placeholder="Min" onChange={(event) => updateFilter({ websiteMin: event.target.value ? Number(event.target.value) : undefined })} /></div>
              </th>
              <th aria-sort={sort.column === 'callClicks' ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}>
                <div className="table-head-cell"><span>Call <SortButton column="callClicks" label="call" /></span><Input aria-label="Call min filter" value={filters.callMin ?? ''} type="number" placeholder="Min" onChange={(event) => updateFilter({ callMin: event.target.value ? Number(event.target.value) : undefined })} /></div>
              </th>
              <th aria-sort={sort.column === 'blockingReason' ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}>
                <div className="table-head-cell"><span>Blocking reason <SortButton column="blockingReason" label="blocking reason" /></span><Select aria-label="Blocking reason filter" value={filters.blockingReason ?? ''} onChange={(event) => updateFilter({ blockingReason: event.target.value ? event.target.value as BlockingReason : undefined })}><option value="">All</option><option value="not-registered">Not registered</option><option value="rating">Rating</option><option value="reviews">Reviews</option><option value="rating-and-reviews">Rating and reviews</option><option value="needs-review">Needs review</option><option value="complete">Complete</option></Select></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={8}><p className="empty-state">No branches match the active filters.</p></td></tr>
            ) : rows.map((branch) => (
              <tr data-testid="branch-row" key={branch.id}>
                <td><strong>{branch.title}</strong><small>{branch.storeCode ?? branch.address ?? 'No store code'}</small></td>
                <td><Badge variant={branch.brandId === 'needs-review' ? 'warning' : 'secondary'}>{getBrandLabel(branch.brandId)}</Badge></td>
                <td><Badge variant={statusVariant(branch.profileStatus)}>{statusLabel(branch.profileStatus)}</Badge></td>
                <td><span className="metric-value">{branch.averageRating ?? 'N/A'}</span>{branch.averageRating !== null && branch.averageRating < 4.5 && <small className="negative-note">Below 4.5</small>}</td>
                <td><span className="metric-value">{branch.totalReviews ?? 'N/A'}</span>{branch.totalReviews !== null && branch.totalReviews < 10 && <small className="negative-note">Need 10+</small>}</td>
                <td><span className="metric-value">{metricText(branch.websiteClicks.current, null)}</span>{metricDelta(branch.websiteClicks.deltaPercent)}</td>
                <td><span className="metric-value">{metricText(branch.callClicks.current, null)}</span>{metricDelta(branch.callClicks.deltaPercent)}</td>
                <td><Badge variant={reasonVariant(branch.blockingReason)}>{reasonLabel(branch.blockingReason)}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
