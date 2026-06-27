import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Scorecards } from './Scorecards';

describe('Scorecards', () => {
  it('renders LeftChoice overview metrics', () => {
    render(
      <Scorecards
        summary={{ totalProfiles: 1049, verifiedProfiles: 873, completedProfiles: 500, registerRate: 83.22, completionRate: 47.66, notCompleteProfiles: 549 }}
        selectedListings={47}
        completionScore={64}
        profileStrength={72}
        suspensionRisk="Medium"
        reviewResponseRate={81}
        rankingDrops={3}
      />
    );
    expect(screen.getByText('Selected Listings')).toBeInTheDocument();
    expect(screen.getByText('47')).toBeInTheDocument();
    expect(screen.getByText('Completion Score')).toBeInTheDocument();
    expect(screen.getByText('64%')).toBeInTheDocument();
    expect(screen.getByText('Profile Strength')).toBeInTheDocument();
    expect(screen.getByText('72%')).toBeInTheDocument();
    expect(screen.getByText('Suspension Risk')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Review Response')).toBeInTheDocument();
    expect(screen.getByText('81%')).toBeInTheDocument();
    expect(screen.getByText('Ranking Drops')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
