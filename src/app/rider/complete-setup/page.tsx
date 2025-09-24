// src/app/rider/complete-setup/page.tsx
'use client';
import { useAuth, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RiderCompleteSetup() {
  const { isSignedIn, getToken, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const setupRiderRole = async () => {
      if (!isSignedIn || !user) {
        router.push('/rider/sign-in');
        return;
      }

      try {
        console.log('Setting up rider role for user:', userId);
        
        const token = await getToken();
        
        // Use the new role switching endpoint
        const response = await axios.post('http://localhost:3001/switch-role', {
          role: 'rider'
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Role switched to rider:', response.data);

        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);

      } catch (err: any) {
        console.error('Error setting up rider role:', err);
        setError(err.response?.data?.error || 'Failed to setup rider account. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    setupRiderRole();
  }, [isSignedIn, user, getToken, router, userId]);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-vimana-gold">Please sign in to continue.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-vimana-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-2xl font-devanagari text-vimana-gold mb-4">Setting up your Rider Account</h2>
          <p className="text-vimana-silver">Please wait while we prepare your celestial journey...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-devanagari text-red-300 mb-4">Setup Failed</h2>
          <p className="text-red-300 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="block w-full bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-silver transition-all duration-300"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/driver/complete-setup')}
              className="block w-full bg-vimana-silver text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-gold transition-all duration-300"
            >
              Set up as Driver Instead
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-devanagari text-vimana-gold mb-4">Welcome, Divine Traveler!</h2>
          <p className="text-vimana-silver mb-4">Your rider account has been set up successfully.</p>
          <p className="text-sm text-vimana-silver">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return null;
}