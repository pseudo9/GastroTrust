import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  type QueryDocumentSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import type { Review } from '../types';

const reviewConverter = {
  toFirestore: (review: Omit<Review, 'id'>) => {
    return {
      ...review,
      createdAt: serverTimestamp(),
      helpfulCount: 0
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString()
    } as Review;
  }
};

export const reviewService = {
  async getReviewsByRestaurant(restaurantId: string): Promise<Review[]> {
    try {
      const reviewsRef = collection(db, 'reviews').withConverter(reviewConverter);
      
      // Create a basic query without ordering first
      const q = query(
        reviewsRef,
        where('restaurantId', '==', restaurantId)
      );

      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return [];
      }

      try {
        // Try with ordering if we have documents
        const orderedQuery = query(
          reviewsRef,
          where('restaurantId', '==', restaurantId),
          orderBy('createdAt', 'desc')
        );
        
        const orderedSnapshot = await getDocs(orderedQuery);
        return orderedSnapshot.docs.map(doc => reviewConverter.fromFirestore(doc));
      } catch (error) {
        if (error instanceof Error && error.message.includes('indexes?create_composite=')) {
          // Extract the index creation URL if available
          const indexUrlMatch = error.message.match(/indexes\?create_composite=([^"]+)/);
          const indexUrl = indexUrlMatch ? indexUrlMatch[1] : null;
          
          throw new Error(`
Missing required index. Please create the following index in Firebase Console:

Collection: reviews
Fields to index:
- restaurantId (Ascending)
- createdAt (Descending)

${indexUrl ? `Direct link to create index:\nhttps://console.firebase.google.com/project/gastrotrust-17d83/firestore/${decodeURIComponent(indexUrl)}` : ''}

Falling back to unordered results...`);
        }
        
        // Fall back to unordered results
        console.warn('Using unordered results due to missing index');
        return snapshot.docs.map(doc => reviewConverter.fromFirestore(doc));
      }
    } catch (error) {
      console.error('Error fetching restaurant reviews:', error);
      throw error;
    }
  },

  async createReview(review: Omit<Review, 'id'>, photos: File[]): Promise<string> {
    try {
      const reviewsRef = collection(db, 'reviews').withConverter(reviewConverter);
      
      // Upload photos first if any
      const photoUrls = await Promise.all(
        photos.map(async (photo) => {
          const photoRef = ref(storage, `reviews/${Date.now()}_${photo.name}`);
          await uploadBytes(photoRef, photo);
          return getDownloadURL(photoRef);
        })
      );

      // Create review with photo URLs
      const reviewRef = await addDoc(reviewsRef, {
        ...review,
        photos: photoUrls
      });

      return reviewRef.id;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  async updateHelpfulCount(reviewId: string): Promise<void> {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      const reviewDoc = await getDoc(reviewRef);
      
      if (!reviewDoc.exists()) {
        throw new Error('Review not found');
      }
      
      await updateDoc(reviewRef, {
        helpfulCount: (reviewDoc.data().helpfulCount || 0) + 1
      });
    } catch (error) {
      console.error('Error updating helpful count:', error);
      throw error;
    }
  }
};