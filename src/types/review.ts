export interface RatingCategory {
  id: string;
  label: string;
  description: string;
}

export interface DetailedRatings {
  food: number;
  service: number;
  ambience: number;
  value: number;
  cleanliness: number;
}

export interface ReviewFormData {
  text: string;
  detailedRatings: DetailedRatings;
  photos: File[];
}

export interface ReviewData {
  text: string;
  rating: number;
  detailedRatings: DetailedRatings;
  authenticityScore: number;
  language: string;
  photos: string[];
  userId: string;
  restaurantId: string;
  verified: boolean;
  helpfulCount: number;
  achievements: string[];
  createdAt: string;
}