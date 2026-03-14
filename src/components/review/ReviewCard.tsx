import React from 'react';
import { ThumbsUp, Calendar, MapPin, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthenticityBadge } from '../ui/AuthenticityBadge';
import { AuthenticityExplanation } from '../ui/AuthenticityExplanation';
import { ReviewerBadge } from '../ui/ReviewerBadge';
import { DetailedRatingsDisplay } from './DetailedRatingsDisplay';
import type { Review } from '../../types';
import { MOCK_USERS } from '../../data/mockData';
import { format } from 'date-fns';

interface ReviewCardProps {
  review: Review;
  showRestaurant?: boolean;
}

export function ReviewCard({ review, showRestaurant = false }: ReviewCardProps) {
  // Find the user for this review
  const user = MOCK_USERS.find(u => u.id === review.userId)!;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <Link to={`/user/${user.id}`} className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex -space-x-1">
                {user.badges?.map((badge) => (
                  <ReviewerBadge key={badge} type={badge} animate />
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Trust Score: {user.trustScore}%</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <AuthenticityBadge score={review.authenticityScore} />
          <AuthenticityExplanation />
        </div>
      </div>

      {showRestaurant && (
        <Link to={`/restaurant/${review.restaurantId}`} className="flex items-center gap-2 mb-3 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Restaurant Name</span>
        </Link>
      )}

      <DetailedRatingsDisplay 
        overallRating={review.rating} 
        detailedRatings={review.detailedRatings} 
      />

      <p className="text-gray-700 my-4 whitespace-pre-line">{review.text}</p>

      {review.photos.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {review.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Review photo ${index + 1}`}
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>Helpful ({review.helpfulCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(review.createdAt), 'PPpp')}</span>
        </div>
      </div>
    </div>
  );
}