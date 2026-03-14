import React from 'react';
import { Shield, MapPin } from 'lucide-react';
import { ReviewCard } from '../components/review/ReviewCard';

const MOCK_USER = {
  id: '1',
  name: 'Sarah Schmidt',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  trustScore: 95,
  reviewCount: 48,
  language: 'en' as const,
};

const MOCK_REVIEWS = [
  {
    id: '1',
    text: 'Amazing experience! The pasta was perfectly cooked and the service was outstanding. I particularly enjoyed their house wine selection.',
    rating: 5,
    authenticityScore: 92,
    language: 'en' as const,
    photos: ['https://images.unsplash.com/photo-1481931098730-318b6f776db0'],
    userId: '1',
    restaurantId: '1',
    createdAt: '2024-03-15T14:30:00Z',
    verified: true,
  },
  {
    id: '2',
    text: 'Great atmosphere but the food was slightly overpriced. The sushi was fresh though!',
    rating: 4,
    authenticityScore: 88,
    language: 'en' as const,
    photos: [],
    userId: '1',
    restaurantId: '2',
    createdAt: '2024-03-10T18:45:00Z',
    verified: true,
  },
];

export function UserProfile() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-start gap-6">
          <img
            src={MOCK_USER.avatar}
            alt={MOCK_USER.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold mb-2">{MOCK_USER.name}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Trust Score: {MOCK_USER.trustScore}%</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Berlin, Germany</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-6">
        {MOCK_REVIEWS.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            user={MOCK_USER}
            showRestaurant={true}
          />
        ))}
      </div>
    </div>
  );
}
