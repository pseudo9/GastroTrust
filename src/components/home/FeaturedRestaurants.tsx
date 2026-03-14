import React from 'react';
import { RestaurantCard } from '../restaurant/RestaurantCard';

const FEATURED_RESTAURANTS = [
  {
    id: '1',
    name: 'Bella Italia',
    address: 'Hauptstraße 123, Berlin',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    authenticityScore: 95,
    reviewCount: 128
  },
  {
    id: '2',
    name: 'Sushi Master',
    address: 'Kantstraße 45, Berlin',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    authenticityScore: 92,
    reviewCount: 89
  },
  {
    id: '3',
    name: 'Burger House',
    address: 'Friedrichstraße 78, Berlin',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17',
    authenticityScore: 88,
    reviewCount: 156
  },
  {
    id: '4',
    name: 'Le Petit Bistro',
    address: 'Schönhauser Allee 5, Berlin',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c',
    authenticityScore: 90,
    reviewCount: 112
  }
];

export function FeaturedRestaurants() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Featured Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_RESTAURANTS.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
}
