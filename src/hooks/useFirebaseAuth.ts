import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser 
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { userService } from '../services/userService';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useFirebaseAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const user = await userService.getUser(firebaseUser.uid);
          setAuthState({ user, loading: false, error: null });
        } catch (error) {
          setAuthState({ 
            user: null, 
            loading: false, 
            error: 'Error fetching user data' 
          });
        }
      } else {
        setAuthState({ user: null, loading: false, error: null });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Invalid email or password' 
      }));
    }
  };

  const signup = async (email: string, password: string, userData: Omit<User, 'id'>) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      const newUser: User = {
        ...userData,
        id: firebaseUser.uid
      };
      
      await userService.createUser(newUser);
      setAuthState({ user: newUser, loading: false, error: null });
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Error creating account' 
      }));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAuthState({ user: null, loading: false, error: null });
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        error: 'Error signing out' 
      }));
    }
  };

  return {
    ...authState,
    login,
    signup,
    logout
  };
}