import React from 'react';
import { Utensils, Star, Shield, Users } from 'lucide-react';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de'
];

export function Hero() {
  return (
    <div className="relative bg-blue-600 text-white">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex animate-slide">
          {[...HERO_IMAGES, ...HERO_IMAGES].map((img, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 h-full"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-blue-900/70" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6 animate-bounce">
              <Shield className="w-12 h-12" />
              <Star className="w-8 h-8 text-yellow-400 -ml-3" />
            </div>
            
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Discover Authentic Restaurant Reviews
            </h1>
            
            <p className="text-xl mb-12 text-blue-100 max-w-2xl mx-auto animate-fade-in-delay">
              Join our community of food lovers and discover trusted reviews from real diners
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              {[
                { icon: Utensils, text: '2,500+ Restaurants', count: 2500 },
                { icon: Star, text: '15,000+ Reviews', count: 15000 },
                { icon: Shield, text: '95% Trust Score', count: 95 },
                { icon: Users, text: '50,000+ Users', count: 50000 }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center transform hover:scale-105 transition-transform"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
                    <item.icon className="w-12 h-12 mb-3 relative z-10" />
                  </div>
                  <span className="text-2xl font-bold mb-1">
                    {new Intl.NumberFormat().format(item.count)}
                  </span>
                  <span className="text-blue-100">{item.text.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
