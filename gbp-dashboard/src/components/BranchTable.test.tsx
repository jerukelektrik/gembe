import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BranchTable } from './BranchTable';
import type { BranchProfile } from '../shared/types';

const branches: BranchProfile[] = [
  { id: 'a', accountName: 'accounts/1', locationName: 'locations/a', title: 'Brain Academy Bandung', brandId: 'brainacademy', brandConfidence: 'high', storeCode: 'BA-BDG', address: 'Bandung', profileStatus: 'verified', verified: true, averageRating: 4.3, totalReviews: 42, completionStatus: 'not-complete', blockingReason: 'rating', websiteClicks: { current: 120, previous: 100, deltaPercent: 20 }, callClicks: { current: 31, previous: 35, deltaPercent: -11.43 }, directionRequests: { current: 44, previous: 40, deltaPercent: 10 }, lastSyncedAt: '2026-05-25T02:00:00.000Z' },
  { id: 'b', accountName: 'accounts/1', locationName: 'locations/b', title: 'English Academy Bekasi', brandId: 'englishacademy', brandConfidence: 'high', storeCode: 'EA-BKS', address: 'Bekasi', profileStatus: 'verified', verified: true, averageRating: 4.8, totalReviews: 7, completionStatus: 'not-complete', blockingReason: 'reviews', websiteClicks: { current: 84, previous: 80, deltaPercent: 5 }, callClicks: { current: 22, previous: 20, deltaPercent: 10 }, directionRequests: { current: 18, previous: 16, deltaPercent: 12.5 }, lastSyncedAt: '2026-05-25T02:00:00.000Z' }
];

describe('BranchTable', () => {
  it('filters by blocking reason and sorts rating', () => {
    render(<BranchTable branches={branches} />);
    fireEvent.change(screen.getByLabelText('Blocking reason filter'), { target: { value: 'rating' } });
    expect(screen.getByText('Brain Academy Bandung')).toBeInTheDocument();
    expect(screen.queryByText('English Academy Bekasi')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Blocking reason filter'), { target: { value: '' } });
    fireEvent.click(screen.getByLabelText('Sort rating'));
    const rows = screen.getAllByTestId('branch-row');
    expect(rows[0]).toHaveTextContent('English Academy Bekasi');
  });
});
