import { SlidersHorizontal } from 'lucide-react';
import { BRANDS } from '../shared/brands';
import type { BrandId } from '../shared/types';

export interface GlobalFilters {
  dateRange: 'last-7-days' | 'last-28-days' | 'month-to-date' | 'custom';
  brandId: BrandId | 'all';
  search: string;
}

interface FilterBarProps {
  filters: GlobalFilters;
  onChange: (filters: GlobalFilters) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <section className="filter-bar" aria-label="Dashboard filters">
      <label>
        <span>Date</span>
        <select value={filters.dateRange} onChange={(event) => onChange({ ...filters, dateRange: event.target.value as GlobalFilters['dateRange'] })}>
          <option value="last-7-days">Last 7 days</option>
          <option value="last-28-days">Last 28 days</option>
          <option value="month-to-date">Month to date</option>
          <option value="custom">Custom</option>
        </select>
      </label>
      <label>
        <span>Compare</span>
        <select value="previous-period" disabled>
          <option value="previous-period">Previous period</option>
        </select>
      </label>
      <label>
        <span>Brand</span>
        <select value={filters.brandId} onChange={(event) => onChange({ ...filters, brandId: event.target.value as GlobalFilters['brandId'] })}>
          <option value="all">All brands</option>
          {BRANDS.map((brand) => (
            <option value={brand.id} key={brand.id}>{brand.label}</option>
          ))}
        </select>
      </label>
      <label className="search-filter">
        <span>Search branch</span>
        <input value={filters.search} onChange={(event) => onChange({ ...filters, search: event.target.value })} placeholder="Branch, city, store code" />
      </label>
      <button type="button" className="secondary-button"><SlidersHorizontal size={16} /> More filters</button>
    </section>
  );
}
