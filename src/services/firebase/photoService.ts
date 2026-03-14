import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export class PhotoUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PhotoUploadError';
  }
}

export const photoService = {
  validatePhoto(photo: File): void {
    if (photo.size > MAX_PHOTO_SIZE) {
      throw new PhotoUploadError(`Photo ${photo.name} exceeds 5MB limit`);
    }

    if (!ALLOWED_TYPES.includes(photo.type)) {
      throw new PhotoUploadError(`Invalid file type for ${photo.name}. Allowed types: JPEG, PNG, WebP`);
    }
  },

  async uploadPhoto(photo: File, path: string): Promise<string> {
    try {
      this.validatePhoto(photo);

      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = photo.name.split('.').pop();
      const filename = `${path}/${timestamp}_${randomString}.${extension}`;
      
      const storageRef = ref(storage, filename);
      const snapshot = await uploadBytes(storageRef, photo, {
        contentType: photo.type,
        customMetadata: {
          originalName: photo.name,
          uploadedAt: new Date().toISOString()
        }
      });
      
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error instanceof PhotoUploadError ? error : new PhotoUploadError(
        error instanceof Error ? error.message : 'Failed to upload photo'
      );
    }
  },

  async uploadPhotos(photos: File[], path: string): Promise<string[]> {
    if (!photos.length) return [];
    
    try {
      // Upload photos sequentially to avoid overwhelming the connection
      const uploadedUrls: string[] = [];
      
      for (const photo of photos) {
        const url = await this.uploadPhoto(photo, path);
        uploadedUrls.push(url);
      }
      
      return uploadedUrls;
    } catch (error) {
      console.error('Error uploading photos:', error);
      throw error;
    }
  }
};