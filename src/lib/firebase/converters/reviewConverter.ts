import { QueryDocumentSnapshot, Timestamp, serverTimestamp } from 'firebase/firestore';
import type { Review } from '../../../types';

export const reviewConverter = {
  toFirestore: (review: Omit<Review, 'id'>) => {
    return {
      ...review,
      createdAt: serverTimestamp(),
      helpfulCount: review.helpfulCount || 0
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data();
    const createdAt = data.createdAt instanceof Timestamp 
      ? data.createdAt.toDate().toISOString()
      : new Date().toISOString();

    return {
      id: snapshot.id,
      ...data,
      createdAt
    } as Review;
  }
};