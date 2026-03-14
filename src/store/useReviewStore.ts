import { create } from 'zustand';
import { reviewService } from '../services/firebase/reviewService';
import type { Review } from '../types';

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  fetchReviews: (restaurantId: string) => Promise<void>;
  addReview: (review: Omit<Review, 'id'>, photos: File[]) => Promise<void>;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  loading: false,
  error: null,

  fetchReviews: async (restaurantId: string) => {
    try {
      set({ loading: true, error: null });
      const reviews = await reviewService.getReviewsByRestaurant(restaurantId);
      set({ reviews, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch reviews',
        loading: false 
      });
    }
  },

  addReview: async (review: Omit<Review, 'id'>, photos: File[]) => {
    try {
      set({ loading: true, error: null });
      await reviewService.createReview(review, photos);
      await get().fetchReviews(review.restaurantId);
      set({ loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add review',
        loading: false 
      });
      throw error; // Re-throw to handle in the component
    }
  }
}));