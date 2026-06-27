import { describe, expect, it } from 'vitest';
import { getCompletionScore, getPriorityBranches, getProfileStrength, getRankingDrops, getReviewResponseRate, getSuspensionRisk } from './leftchoiceMetrics';
import type { BranchProfile, LeftChoiceAlert, LeftChoiceBranchMeta, LeftChoiceRanking, LeftChoiceReview } from './types';

const branch = (id: string, complete = false): BranchProfile => ({
  id,
  accountName: 'accounts/mock',
  locationName: `locations/${id}`,
  title: id,
  brandId: 'brainacademy',
  brandConfidence: 'high',
  storeCode: id,
  address: 'Jakarta',
  profileStatus: complete ? 'verified' : 'unverified',
  verified: complete,
  averageRating: complete ? 4.8 : 4.1,
  totalReviews: complete ? 20 : 4,
  completionStatus: complete ? 'complete' : 'not-complete',
  blockingReason: complete ? 'complete' : 'rating',
  websiteClicks: { current: 10, previous: 8, deltaPercent: 25 },
  callClicks: { current: 3, previous: 2, deltaPercent: 50 },
  directionRequests: { current: 4, previous: 5, deltaPercent: -20 },
  lastSyncedAt: '2026-06-27T00:00:00.000Z'
});

describe('leftchoiceMetrics', () => {
  it('returns zero for empty profile strength and completion score', () => {
    expect(getProfileStrength([], [])).toBe(0);
    expect(getCompletionScore([], [])).toBe(0);
  });

  it('uses branch meta scores when available', () => {
    const metas: LeftChoiceBranchMeta[] = [
      { branchId: 'a', city: 'Jakarta', province: 'DKI Jakarta', owner: 'SEO', profileStrength: 80, completionScore: 60, suspensionRisk: 'low', issues: [] },
      { branchId: 'b', city: 'Bogor', province: 'Jawa Barat', owner: 'SEO', profileStrength: 40, completionScore: 20, suspensionRisk: 'medium', issues: [] }
    ];
    expect(getProfileStrength([branch('a'), branch('b')], metas)).toBe(60);
    expect(getCompletionScore([branch('a'), branch('b')], metas)).toBe(40);
  });

  it('classifies suspension risk from alert severity', () => {
    const alerts: LeftChoiceAlert[] = [
      { id: 'a', branchId: 'a', severity: 'critical', type: 'suspended-listing', title: 'Suspended', detail: 'Issue', createdAt: '2026-06-27T00:00:00.000Z' }
    ];
    expect(getSuspensionRisk([])).toBe('Low');
    expect(getSuspensionRisk(alerts)).toBe('Medium');
    expect(getSuspensionRisk([...alerts, { ...alerts[0], id: 'b' }])).toBe('High');
  });

  it('calculates review response rate from approved and replied reviews', () => {
    const reviews: LeftChoiceReview[] = [
      { id: '1', branchId: 'a', reviewer: 'A', rating: 5, sentiment: 'positive', status: 'replied', text: 'Good', suggestedReply: 'Thanks', createdAt: '2026-06-27T00:00:00.000Z' },
      { id: '2', branchId: 'a', reviewer: 'B', rating: 3, sentiment: 'neutral', status: 'approved', text: 'Ok', suggestedReply: 'Thanks', createdAt: '2026-06-27T00:00:00.000Z' },
      { id: '3', branchId: 'a', reviewer: 'C', rating: 1, sentiment: 'negative', status: 'pending', text: 'Bad', suggestedReply: 'Sorry', createdAt: '2026-06-27T00:00:00.000Z' }
    ];
    expect(getReviewResponseRate(reviews)).toBe(67);
  });

  it('counts ranking drops when current rank is worse than previous rank', () => {
    const rankings: LeftChoiceRanking[] = [
      { id: '1', branchId: 'a', brandId: 'brainacademy', city: 'Jakarta', keyword: 'bimbel', currentRank: 5, previousRank: 2, topCompetitor: 'X' },
      { id: '2', branchId: 'b', brandId: 'brainacademy', city: 'Bandung', keyword: 'bimbel', currentRank: 1, previousRank: 3, topCompetitor: 'Y' }
    ];
    expect(getRankingDrops(rankings)).toBe(1);
  });

  it('prioritizes branches with low completion and critical alerts', () => {
    const branches = [branch('safe', true), branch('risk')];
    const metas: LeftChoiceBranchMeta[] = [
      { branchId: 'safe', city: 'Jakarta', province: 'DKI Jakarta', owner: 'SEO', profileStrength: 95, completionScore: 94, suspensionRisk: 'low', issues: [] },
      { branchId: 'risk', city: 'Jakarta', province: 'DKI Jakarta', owner: 'SEO', profileStrength: 30, completionScore: 22, suspensionRisk: 'high', issues: [] }
    ];
    const alerts: LeftChoiceAlert[] = [
      { id: 'alert', branchId: 'risk', severity: 'critical', type: 'suspended-listing', title: 'Suspended', detail: 'Issue', createdAt: '2026-06-27T00:00:00.000Z' }
    ];
    expect(getPriorityBranches(branches, metas, alerts)[0].id).toBe('risk');
  });
});
