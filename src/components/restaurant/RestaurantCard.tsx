import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthenticityBadge } from '../ui/AuthenticityBadge';
import type { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-[1.02]">
        <div className="relative h-48">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <AuthenticityBadge score={restaurant.authenticityScore} />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{restaurant.name}</h3>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{restaurant.address}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">({restaurant.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
