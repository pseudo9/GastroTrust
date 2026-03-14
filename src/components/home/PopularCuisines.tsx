import React from 'react';
import { Pizza, Coffee, Beef, Fish, Soup, Sandwich } from 'lucide-react';

const CUISINES = [
  { name: 'Italian', icon: Pizza, count: 245 },
  { name: 'Café', icon: Coffee, count: 189 },
  { name: 'Steakhouse', icon: Beef, count: 156 },
  { name: 'Seafood', icon: Fish, count: 134 },
  { name: 'Asian', icon: Soup, count: 223 },
  { name: 'Fast Food', icon: Sandwich, count: 167 }
];

export function PopularCuisines() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Popular Cuisines</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CUISINES.map((cuisine) => (
            <button
              key={cuisine.name}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
            >
              <cuisine.icon className="w-8 h-8 mb-2 text-blue-600" />
              <span className="font-medium">{cuisine.name}</span>
              <span className="text-sm text-gray-500">{cuisine.count} places</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
