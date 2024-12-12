export type UserType = 'hospital' | 'pharmacy' | 'delivery';

export interface User {
  id: string;
  email: string;
  fullName: string;
  userType: UserType;
  organizationName: string;
  licenseNumber?: string;
  address: string;
  contactNumber: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
  userType: UserType;
  organizationName: string;
  licenseNumber?: string;
  address: string;
  contactNumber: string;
}