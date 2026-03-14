import { 
  collection, 
  query, 
  where, 
  orderBy,
  type Query,
  type DocumentData 
} from 'firebase/firestore';
import { db } from '../config';
import { reviewConverter } from '../converters/reviewConverter';

export const createReviewQuery = (
  restaurantId: string, 
  withOrdering = false
): Query<DocumentData> => {
  const reviewsRef = collection(db, 'reviews').withConverter(reviewConverter);
  const baseQuery = query(
    reviewsRef,
    where('restaurantId', '==', restaurantId)
  );
  
  return withOrdering 
    ? query(baseQuery, orderBy('createdAt', 'desc'))
    : baseQuery;
};