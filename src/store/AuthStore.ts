import { create } from 'zustand';
import { User, AuthState } from '../types/auth';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful login
    const mockUser: User = {
      id: '1',
      email,
      name: 'John Doe',
      role: 'hospital',
      organizationName: 'Central Hospital',
      address: '123 Medical St',
      contactNumber: '+1-555-0123',
      createdAt: new Date().toISOString(),
    };

    set({ user: mockUser, isAuthenticated: true });
  },

  signup: async (userData) => {
    // In a real app, this would make an API call
    const newUser: User = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...userData,
    };

    set({ user: newUser, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));