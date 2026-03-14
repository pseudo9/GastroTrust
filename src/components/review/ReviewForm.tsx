import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { AuthenticityBadge } from '../ui/AuthenticityBadge';
import { DetailedRatings } from './DetailedRatings';
import { PhotoUpload } from './PhotoUpload';
import { authenticityService } from '../../services/authenticityService';
import { useAuthStore } from '../../store/useAuthStore';
import { useReviewStore } from '../../store/useReviewStore';
import type { DetailedRatings as DetailedRatingsType } from '../../types/review';
import { useDebounce } from '../../hooks/useDebounce';

interface ReviewFormProps {
  restaurantId: string;
  onReviewSubmitted?: () => void;
}

const initialRatings: DetailedRatingsType = {
  food: 0,
  service: 0,
  ambience: 0,
  value: 0,
  cleanliness: 0
};

export function ReviewForm({ restaurantId, onReviewSubmitted }: ReviewFormProps) {
  const [text, setText] = useState('');
  const [ratings, setRatings] = useState<DetailedRatingsType>(initialRatings);
  const [photos, setPhotos] = useState<File[]>([]);
  const [authenticityScore, setAuthenticityScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisFlags, setAnalysisFlags] = useState<string[]>([]);
  
  const { user, language } = useAuthStore();
  const { addReview } = useReviewStore();

  const handleRatingChange = (category: keyof DetailedRatingsType, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const analyzeText = async (reviewText: string) => {
    if (reviewText.length < 20) return;

    setIsAnalyzing(true);
    try {
      const result = await authenticityService.analyzeReview(reviewText, language);
      setAuthenticityScore(result.score);
      setAnalysisFlags(result.flags || []);
    } catch (error) {
      console.error('Error analyzing review:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const debouncedAnalyzeText = useDebounce(analyzeText, 500);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    debouncedAnalyzeText(newText);
  };

  const getOverallRating = () => {
    const ratedCategories = Object.values(ratings).filter(val => val > 0);
    if (ratedCategories.length === 0) return 0;
    return Math.round(ratedCategories.reduce((sum, val) => sum + val, 0) / ratedCategories.length);
  };

  const canSubmit = () => {
    return (
      text.length >= 20 && 
      Object.values(ratings).some(rating => rating > 0) &&
      !isSubmitting
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !canSubmit()) return;

    setIsSubmitting(true);
    setError(null);
    
    try {
      const review = {
        text,
        rating: getOverallRating(),
        detailedRatings: ratings,
        authenticityScore,
        language,
        photos: [],
        userId: user.id,
        restaurantId,
        verified: true,
        helpfulCount: 0,
        achievements: ['first-review'],
        createdAt: new Date().toISOString()
      };

      await addReview(review, photos);
      
      // Reset form
      setText('');
      setRatings(initialRatings);
      setPhotos([]);
      setAuthenticityScore(0);
      setAnalysisFlags([]);
      
      onReviewSubmitted?.();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error creating review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Write a Review</h3>
        {isAnalyzing ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader className="w-4 h-4 animate-spin" />
            <span>Analyzing...</span>
          </div>
        ) : (
          authenticityScore > 0 && <AuthenticityBadge score={authenticityScore} />
        )}
      </div>

      <DetailedRatings ratings={ratings} onChange={handleRatingChange} />

      <div className="mt-6">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Share your detailed experience..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        {text.length < 20 && text.length > 0 && (
          <p className="text-sm text-amber-600 mt-1">
            Please write at least 20 characters for a helpful review
          </p>
        )}
        {analysisFlags.length > 0 && (
          <ul className="mt-2 space-y-1">
            {analysisFlags.map((flag, index) => (
              <li key={index} className="text-sm text-blue-600">
                💡 {flag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <PhotoUpload
          photos={photos}
          onChange={setPhotos}
          onError={setError}
        />

        <button
          type="submit"
          disabled={!canSubmit()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Post Review'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
    </form>
  );
}