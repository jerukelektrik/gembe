import { ArrowDownUp, Download } from 'lucide-react';
import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { BRANDS, getBrandLabel } from '../shared/brands';
import { buildExportRows, toCsv } from '../shared/exportRows';
import { filterBranches, sortBranches, type BranchFilters, type BranchSort, type SortColumn } from '../shared/filters';
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

export function BranchTable({ branches }: { branches: BranchProfile[] }) {
  const [filters, setFilters] = useState<BranchFilters>({});
  const [sort, setSort] = useState<BranchSort>({ column: 'title', direction: 'asc' });

  const rows = useMemo(() => sortBranches(filterBranches(branches, filters), sort), [branches, filters, sort]);
  const exportRows = useMemo(() => buildExportRows(rows, { activeStart: 'active-start', activeEnd: 'active-end', compareStart: 'compare-start', compareEnd: 'compare-end' }), [rows]);

  function updateFilter(next: Partial<BranchFilters>) {
    setFilters((current) => ({ ...current, ...next }));
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
    const sheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'branches');
    XLSX.writeFile(workbook, 'gbp-branches-filtered.xlsx');
  }

  function SortButton({ column, label }: { column: SortColumn; label: string }) {
    return (
      <button type="button" className="sort-button" aria-label={`Sort ${label}`} onClick={() => setSort((current) => nextSort(current, column))}>
        <ArrowDownUp size={14} />
      </button>
    );
  }

  return (
    <section className="table-card">
      <div className="table-card-header">
        <div>
          <h2>All branch and brand table</h2>
          <p>{rows.length} profiles shown from {branches.length} total</p>
        </div>
        <div className="row-actions">
          <button type="button" className="secondary-button" onClick={downloadCsv}><Download size={16} /> CSV</button>
          <button type="button" className="secondary-button" onClick={downloadXlsx}><Download size={16} /> XLSX</button>
        </div>
      </div>
      <div className="branch-table" role="table">
        <div className="branch-table-head" role="row">
          <div>Branch <SortButton column="title" label="branch" /><input aria-label="Branch search" onChange={(event) => updateFilter({ search: event.target.value })} /></div>
          <div>Brand <SortButton column="brandId" label="brand" /><select aria-label="Brand filter" onChange={(event) => updateFilter({ brandId: event.target.value ? event.target.value as BrandId : undefined })}><option value="">All</option>{BRANDS.map((brand) => <option value={brand.id} key={brand.id}>{brand.label}</option>)}</select></div>
          <div>Status <SortButton column="profileStatus" label="status" /></div>
          <div>Rating <SortButton column="averageRating" label="rating" /><input aria-label="Rating max filter" type="number" step="0.1" onChange={(event) => updateFilter({ ratingMax: event.target.value ? Number(event.target.value) : undefined })} /></div>
          <div>Reviews <SortButton column="totalReviews" label="reviews" /><input aria-label="Reviews min filter" type="number" onChange={(event) => updateFilter({ reviewsMin: event.target.value ? Number(event.target.value) : undefined })} /></div>
          <div>Website <SortButton column="websiteClicks" label="website" /><input aria-label="Website min filter" type="number" onChange={(event) => updateFilter({ websiteMin: event.target.value ? Number(event.target.value) : undefined })} /></div>
          <div>Call <SortButton column="callClicks" label="call" /><input aria-label="Call min filter" type="number" onChange={(event) => updateFilter({ callMin: event.target.value ? Number(event.target.value) : undefined })} /></div>
          <div>Blocking reason <SortButton column="blockingReason" label="blocking reason" /><select aria-label="Blocking reason filter" onChange={(event) => updateFilter({ blockingReason: event.target.value ? event.target.value as BlockingReason : undefined })}><option value="">All</option><option value="not-registered">Not registered</option><option value="rating">Rating</option><option value="reviews">Reviews</option><option value="rating-and-reviews">Rating and reviews</option><option value="needs-review">Needs review</option><option value="complete">Complete</option></select></div>
        </div>
        {rows.length === 0 ? <p className="empty-state">No branches match the active filters.</p> : rows.map((branch) => (
          <div className="branch-table-row" role="row" data-testid="branch-row" key={branch.id}>
            <strong>{branch.title}</strong>
            <span>{getBrandLabel(branch.brandId)}</span>
            <span>{branch.profileStatus}</span>
            <span>{branch.averageRating ?? 'N/A'}</span>
            <span>{branch.totalReviews ?? 'N/A'}</span>
            <span>{metricText(branch.websiteClicks.current, branch.websiteClicks.deltaPercent)}</span>
            <span>{metricText(branch.callClicks.current, branch.callClicks.deltaPercent)}</span>
            <span className={`reason reason-${branch.blockingReason}`}>{branch.blockingReason}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
