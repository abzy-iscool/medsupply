import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, User, Building2, MapPin, Phone } from 'lucide-react';
import { UserRole } from '../../types/auth';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['hospital', 'pharmacy', 'delivery'] as const),
  organizationName: z.string().min(2, 'Organization name is required'),
  address: z.string().min(5, 'Address is required'),
  contactNumber: z.string().min(5, 'Contact number is required'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const roleLabels: Record<UserRole, string> = {
  hospital: 'Hospital',
  pharmacy: 'Pharmacy',
  delivery: 'Delivery Company',
};

const roleDescriptions: Record<UserRole, string> = {
  hospital: 'For healthcare facilities managing medicine inventory',
  pharmacy: 'For pharmacies distributing medicines',
  delivery: 'For companies handling medicine transportation',
};

export function SignupForm({ onToggleForm }: { onToggleForm: () => void }) {
  const signup = useAuthStore((state) => state.signup);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select your role
          </label>
          <div className="grid gap-3">
            {Object.entries(roleLabels).map(([value, label]) => (
              <label
                key={value}
                className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                  selectedRole === value
                    ? 'border-blue-600 ring-2 ring-blue-600'
                    : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  {...register('role')}
                  value={value}
                  className="sr-only"
                />
                <div className="flex flex-1">
                  <div className="flex flex-col">
                    <span className="block text-sm font-medium text-gray-900">
                      {label}
                    </span>
                    <span className="mt-1 flex items-center text-sm text-gray-500">
                      {roleDescriptions[value as UserRole]}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              {...register('email')}
              placeholder="Email address"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              {...register('password')}
              placeholder="Password"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              {...register('name')}
              placeholder="Full name"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              {...register('organizationName')}
              placeholder="Organization name"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.organizationName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.organizationName.message}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              {...register('address')}
              placeholder="Address"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              {...register('contactNumber')}
              placeholder="Contact number"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contactNumber.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </form>
  );
}