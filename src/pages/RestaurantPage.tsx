import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star, MapPin, Euro, Utensils } from 'lucide-react';
import { ReviewForm } from '../components/review/ReviewForm';
import { ReviewCard } from '../components/review/ReviewCard';
import { AuthenticityBadge } from '../components/ui/AuthenticityBadge';
import { MOCK_RESTAURANTS } from '../data/mockData';
import { useReviewStore } from '../store/useReviewStore';

export function RestaurantPage() {
  const { id } = useParams();
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
  const { reviews, fetchReviews } = useReviewStore();

  React.useEffect(() => {
    if (id) {
      fetchReviews(id);
    }
  }, [id, fetchReviews]);

  if (!restaurant) {
    return <Navigate to="/" replace />;
  }

  const handleReviewSubmitted = () => {
    if (id) {
      fetchReviews(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative h-96">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <AuthenticityBadge score={restaurant.authenticityScore} size="lg" />
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-6 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  <span>{restaurant.cuisine}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="w-5 h-5" />
                  <span>{restaurant.priceRange}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-2xl font-bold">{restaurant.rating}</span>
                <span className="text-gray-500">({restaurant.reviewCount})</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Specialties</h2>
            <div className="flex flex-wrap gap-3">
              {restaurant.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {restaurant.photos.length > 0 && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restaurant.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${restaurant.name} - Photo ${index + 1}`}
                    className="rounded-lg object-cover w-full h-48"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <ReviewForm 
          restaurantId={restaurant.id}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showRestaurant={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}