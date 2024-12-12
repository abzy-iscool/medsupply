import React, { useState } from 'react';
import { LoginForm } from '../components/Login';
import { SignupForm } from '../components/SignUp';
import { Pill } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <Pill className="h-12 w-12 text-blue-600 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Medicine Tracking System
        </h1>
        <p className="mt-2 text-center text-gray-600 max-w-md">
          Streamline your medical supply chain with our advanced tracking system
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                isLogin
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                !isLogin
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8">
            {isLogin ? (
              <LoginForm onToggleForm={() => setIsLogin(false)} />
            ) : (
              <SignupForm onToggleForm={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}