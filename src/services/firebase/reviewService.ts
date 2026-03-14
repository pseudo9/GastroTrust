import { 
  collection, 
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import type { Review } from '../../types';

export const reviewService = {
  async getReviewsByRestaurant(restaurantId: string): Promise<Review[]> {
    try {
      const reviewsRef = collection(db, 'reviews');
      const q = query(
        reviewsRef,
        where('restaurantId', '==', restaurantId)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      } as Review));
    } catch (error) {
      console.error('Error fetching restaurant reviews:', error);
      throw error;
    }
  },

  async uploadPhotos(photos: File[], restaurantId: string): Promise<string[]> {
    try {
      const uploadPromises = photos.map(async (photo) => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const extension = photo.name.split('.').pop();
        const filename = `reviews/${restaurantId}/${timestamp}_${randomString}.${extension}`;
        
        const storageRef = ref(storage, filename);
        await uploadBytes(storageRef, photo);
        return getDownloadURL(storageRef);
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading photos:', error);
      throw error;
    }
  },

  async createReview(review: Omit<Review, 'id'>, photos: File[]): Promise<string> {
    try {
      // First upload photos if any
      let photoUrls: string[] = [];
      if (photos.length > 0) {
        photoUrls = await this.uploadPhotos(photos, review.restaurantId);
      }

      // Create review with photo URLs
      const reviewData = {
        ...review,
        photos: photoUrls,
        createdAt: serverTimestamp()
      };

      const reviewRef = await addDoc(collection(db, 'reviews'), reviewData);
      return reviewRef.id;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }
};