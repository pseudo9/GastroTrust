import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { userService } from '../../services/firebase/userService';
import { reviewService } from '../../services/firebase/reviewService';
import { format } from 'date-fns';
import type { Review } from '../../types';

export function FirebaseTest() {
  const { user } = useAuthStore();
  const [message, setMessage] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [indexError, setIndexError] = useState<string | null>(null);

  const testCreateUser = async () => {
    if (!user) {
      setMessage('No user available');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      setIndexError(null);
      
      await userService.createUser(user);
      setMessage('User created successfully!');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const testCreateReview = async () => {
    if (!user) {
      setMessage('No user available');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      setIndexError(null);
      
      const review = {
        text: `Test review created at ${format(new Date(), 'PPpp')}`,
        rating: 5,
        authenticityScore: 95,
        language: 'en' as const,
        photos: [],
        userId: user.id,
        restaurantId: '1', // Ensure this is a string
        verified: true,
        helpfulCount: 0,
        achievements: ['first-review'],
        createdAt: new Date().toISOString()
      };

      const reviewId = await reviewService.createReview(review, []);
      setMessage(`Review created successfully! ID: ${reviewId}`);
      await fetchReviews();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setMessage('');
      setIndexError(null);
      
      const fetchedReviews = await reviewService.getReviewsByRestaurant('1');
      setReviews(fetchedReviews);
      
      if (fetchedReviews.length === 0) {
        setMessage('No reviews found');
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Missing required index')) {
          setIndexError(error.message);
        } else {
          setMessage(error.message);
        }
      } else {
        setMessage('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Firebase Test Panel</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Current User:</h3>
          <pre className="bg-white p-2 rounded overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        {indexError && (
          <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
            <h4 className="font-semibold mb-2">⚠️ Index Required</h4>
            <p className="whitespace-pre-wrap font-mono text-sm">{indexError}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={testCreateUser}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Test Create User'}
          </button>
          <button
            onClick={testCreateReview}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Test Create Review'}
          </button>
          <button
            onClick={fetchReviews}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Refresh Reviews'}
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded ${
            message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-8">
          <h3 className="font-semibold mb-4">Reviews from Firebase:</h3>
          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No reviews found</div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 bg-white shadow rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Review ID: {review.id}</p>
                      <p className="text-sm text-gray-500">Restaurant ID: {review.restaurantId}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(review.createdAt), 'PPpp')}
                    </span>
                  </div>
                  <p className="mt-2">{review.text}</p>
                  <div className="mt-2 flex gap-4 text-sm text-gray-600">
                    <span>Rating: {review.rating}★</span>
                    <span>Helpful: {review.helpfulCount || 0}</span>
                    <span>Authenticity: {review.authenticityScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}