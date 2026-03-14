import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  language: 'de' | 'en';
  setUser: (user: User | null) => void;
  setLanguage: (language: 'de' | 'en') => void;
  logout: () => void;
  login: () => void;
}

// Mock user data for development
const MOCK_USER = {
  id: '1',
  name: 'Sarah Schmidt',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  trustScore: 95,
  reviewCount: 48,
  language: 'en' as const,
};

export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_USER, // Set mock user by default
  isAuthenticated: true, // Set authenticated by default
  language: 'en',
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLanguage: (language) => set({ language }),
  logout: () => set({ user: null, isAuthenticated: false }),
  login: () => set({ user: MOCK_USER, isAuthenticated: true }),
}));