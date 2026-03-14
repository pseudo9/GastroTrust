import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import { handleFirebaseError } from '../../lib/firebase/utils/errorHandling';
import type { User } from '../../types';

export const userService = {
  async getUser(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (!userDoc.exists()) return null;
      return userDoc.data() as User;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(handleFirebaseError(error));
    }
  },

  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), userData);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error(handleFirebaseError(error));
    }
  },

  async createUser(user: User): Promise<void> {
    try {
      await setDoc(doc(db, 'users', user.id), user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error(handleFirebaseError(error));
    }
  },

  async getUsersByLanguage(language: string): Promise<User[]> {
    try {
      const q = query(collection(db, 'users'), where('language', '==', language));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as User);
    } catch (error) {
      console.error('Error fetching users by language:', error);
      throw new Error(handleFirebaseError(error));
    }
  }
};