import React from 'react';
import { ThumbsUp, Star, Camera, Users, Award, MapPin } from 'lucide-react';
import { LevelProgress } from '../components/dashboard/LevelProgress';
import { StatCard } from '../components/dashboard/StatCard';
import { AchievementBadge } from '../components/dashboard/AchievementBadge';
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
    text: 'Amazing experience! The pasta was perfectly cooked and the service was outstanding.',
    rating: 5,
    authenticityScore: 92,
    language: 'en' as const,
    photos: ['https://images.unsplash.com/photo-1481931098730-318b6f776db0'],
    userId: '1',
    restaurantId: '1',
    createdAt: '2024-03-15T14:30:00Z',
    verified: true,
  }
];

const ACHIEVEMENTS = [
  {
    name: 'Helpful Hero',
    description: 'Received 100+ helpful votes',
    icon: 'Trophy',
    tier: 'gold' as const,
    progress: 85
  },
  {
    name: 'Photo Master',
    description: 'Shared 1000+ food photos',
    icon: 'Camera',
    tier: 'platinum' as const,
    progress: 92
  },
  {
    name: 'Cuisine Expert',
    description: '50+ reviews in German cuisine',
    icon: 'Utensils',
    tier: 'silver' as const,
    progress: 65
  },
  {
    name: 'Elite Reviewer',
    description: 'Top 1% of reviewers',
    icon: 'Star',
    tier: 'diamond' as const,
    progress: 100
  }
];

export function UserDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-6">
              <img
                src={MOCK_USER.avatar}
                alt={MOCK_USER.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">{MOCK_USER.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>Berlin, Germany</span>
                </div>
                <div className="flex gap-4 mt-4">
                  {ACHIEVEMENTS.map((achievement) => (
                    <AchievementBadge key={achievement.name} {...achievement} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <LevelProgress level={42} xp={8450} nextLevelXp={10000} />

          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={ThumbsUp}
              label="Helpful Votes"
              value="10,185"
              change={12}
            />
            <StatCard
              icon={Star}
              label="Reviews"
              value="288"
              change={8}
            />
            <StatCard
              icon={Camera}
              label="Photos"
              value="7,650"
              change={15}
            />
            <StatCard
              icon={Users}
              label="Followers"
              value="1,243"
              change={5}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Expertise Areas</h2>
            <div className="space-y-3">
              {['German', 'French', 'Italian'].map((cuisine) => (
                <div key={cuisine} className="flex items-center justify-between">
                  <span>{cuisine} Cuisine</span>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
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
        </div>
      </div>
    </div>
  );
}
