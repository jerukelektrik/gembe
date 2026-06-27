import { AlertTriangle, MessageSquareText, Sparkles, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { leftChoiceBranchNames, leftChoiceReviews } from '../shared/leftchoiceData';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Select } from './ui';

type RatingFilter = 'all' | '1-2' | '3' | '4-5';
type StatusFilter = 'all' | 'pending' | 'drafted' | 'approved' | 'replied';

export function ReviewsPanel() {
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const rows = useMemo(() => leftChoiceReviews.filter((review) => {
    const ratingMatch = ratingFilter === 'all'
      || (ratingFilter === '1-2' && review.rating <= 2)
      || (ratingFilter === '3' && review.rating === 3)
      || (ratingFilter === '4-5' && review.rating >= 4);
    const statusMatch = statusFilter === 'all' || review.status === statusFilter;
    return ratingMatch && statusMatch;
  }), [ratingFilter, statusFilter]);

  return (
    <Card>
      <CardHeader className="section-header">
        <div>
          <CardTitle>Reviews Management</CardTitle>
          <CardDescription>Demo inbox for triaging review sentiment and preparing reply drafts before publishing in Google Business Profile.</CardDescription>
        </div>
        <div className="row-actions">
          <Select aria-label="Rating filter" value={ratingFilter} onChange={(event) => setRatingFilter(event.target.value as RatingFilter)}>
            <option value="all">All ratings</option>
            <option value="1-2">1-2 stars</option>
            <option value="3">3 stars</option>
            <option value="4-5">4-5 stars</option>
          </Select>
          <Select aria-label="Reply status filter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}>
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="drafted">Drafted</option>
            <option value="approved">Approved</option>
            <option value="replied">Replied</option>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="review-list">
        {rows.map((review) => (
          <article className="review-card" key={review.id}>
            <div className="review-main">
              <div className="review-title">
                <strong>{review.reviewer}</strong>
                <span>{leftChoiceBranchNames[review.branchId] ?? review.branchId}</span>
              </div>
              <p>{review.text}</p>
              <div className="suggestion-box">
                <Sparkles size={16} aria-hidden="true" />
                <span>{review.suggestedReply}</span>
              </div>
            </div>
            <div className="review-meta">
              <Badge variant={review.rating <= 2 ? 'danger' : review.rating === 3 ? 'warning' : 'success'}><Star size={12} aria-hidden="true" /> {review.rating}</Badge>
              <Badge variant={review.sentiment === 'negative' ? 'danger' : review.sentiment === 'neutral' ? 'warning' : 'success'}>{review.sentiment}</Badge>
              <Badge variant={review.status === 'pending' ? 'warning' : review.status === 'drafted' ? 'info' : 'success'}><MessageSquareText size={12} aria-hidden="true" /> {review.status}</Badge>
              {review.rating <= 2 && <Badge variant="danger"><AlertTriangle size={12} aria-hidden="true" /> Escalate</Badge>}
              <small>{new Date(review.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</small>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
