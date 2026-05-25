import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Scorecards } from './Scorecards';

describe('Scorecards', () => {
  it('renders register and completion rates', () => {
    render(<Scorecards summary={{ totalProfiles: 1049, verifiedProfiles: 873, completedProfiles: 500, registerRate: 83.22, completionRate: 47.66, notCompleteProfiles: 549 }} />);
    expect(screen.getByText('Register Rate')).toBeInTheDocument();
    expect(screen.getByText('83.22%')).toBeInTheDocument();
    expect(screen.getByText('Completion Rate')).toBeInTheDocument();
    expect(screen.getByText('47.66%')).toBeInTheDocument();
  });
});
