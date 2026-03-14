import React from 'react';
import { Camera } from 'lucide-react';
import { photoService } from '../../services/firebase/photoService';

interface PhotoUploadProps {
  photos: File[];
  onChange: (photos: File[]) => void;
  onError: (error: string) => void;
  maxPhotos?: number;
}

export function PhotoUpload({ 
  photos, 
  onChange, 
  onError, 
  maxPhotos = 5 
}: PhotoUploadProps) {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.length > maxPhotos) {
      onError(`Maximum ${maxPhotos} photos allowed`);
      return;
    }

    try {
      // Validate all photos before accepting any
      selectedFiles.forEach(photo => {
        photoService.validatePhoto(photo);
      });
      
      onChange(selectedFiles);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Invalid photo selected');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="photos"
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
      >
        <Camera className="w-5 h-5" />
        <span>Add Photos</span>
      </label>
      <input
        type="file"
        id="photos"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handlePhotoChange}
        className="hidden"
      />
      {photos.length > 0 && (
        <span className="text-sm text-gray-500">
          {photos.length} photo{photos.length !== 1 ? 's' : ''} selected
        </span>
      )}
    </div>
  );
}