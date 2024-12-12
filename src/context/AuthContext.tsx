import React, { createContext, useContext, useReducer } from 'react';
import type { AuthState, User, LoginCredentials, SignupData } from '../types/auth';

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SIGNUP_SUCCESS'; payload: User };

const AuthContext = createContext<{
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<void>;
} | null>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  const login = async (credentials: LoginCredentials) => {
    // In a real app, this would make an API call
    const mockUser: User = {
      id: '1',
      email: credentials.email,
      fullName: 'John Doe',
      userType: 'hospital',
      organizationName: 'General Hospital',
      address: '123 Medical St',
      contactNumber: '555-0123',
    };
    dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
  };

  const signup = async (data: SignupData) => {
    // In a real app, this would make an API call
    const mockUser: User = {
      id: '1',
      ...data,
    };
    dispatch({ type: 'SIGNUP_SUCCESS', payload: mockUser });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}