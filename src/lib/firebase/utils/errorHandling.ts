export const handleFirebaseError = (error: unknown): string => {
  if (error instanceof Error) {
    // Handle specific Firebase error codes
    if (error.message.includes('permission-denied')) {
      return 'You do not have permission to perform this action';
    }
    if (error.message.includes('not-found')) {
      return 'The requested resource was not found';
    }
    return error.message;
  }
  return 'An unknown error occurred';
};

export const extractIndexUrl = (error: Error): string | null => {
  const indexUrlMatch = error.message.match(/indexes\?create_composite=([^"]+)/);
  return indexUrlMatch ? decodeURIComponent(indexUrlMatch[1]) : null;
};

export const formatIndexError = (error: Error): string => {
  const indexUrl = extractIndexUrl(error);
  return `
Missing required index. Please create the following index in Firebase Console:

Collection: reviews
Fields to index:
- restaurantId (Ascending)
- createdAt (Descending)

${indexUrl ? `Direct link to create index:\nhttps://console.firebase.google.com/project/gastrotrust-17d83/firestore/${indexUrl}` : ''}

Falling back to unordered results...`;
};