export interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  imageUrl: string;
  authenticityScore: number;
  reviewCount: number;
  cuisine: string;
  priceRange: string;
  specialties: string[];
  photos: string[];
}

export interface Review {
  id: string;
  text: string;
  rating: number;
  authenticityScore: number;
  language: Language;
  photos: string[];
  userId: string;
  restaurantId: string;
  createdAt: string;
  verified: boolean;
  helpfulCount: number;
  achievements: string[];
}

export type BadgeType = 
  | 'expert'
  | 'photographer'
  | 'top-reviewer'
  | 'cuisine-specialist'
  | 'verified'
  | 'local-expert';

export type Language = 'de' | 'en';

export interface User {
  id: string;
  name: string;
  avatar: string;
  trustScore: number;
  reviewCount: number;
  language: Language;
  badges?: BadgeType[];
  level?: number;
  xp?: number;
  specialties?: string[];
}