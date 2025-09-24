// src/components/RoleGuard.tsx
'use client';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface RoleGuardProps {
  allowedRole: 'rider' | 'driver';
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const { isSignedIn, getToken } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      if (!isSignedIn) {
        router.push(allowedRole === 'rider' ? '/rider/sign-in' : '/driver/sign-in');
        return;
      }

      try {
        const token = await getToken();
        if (!token) {
          router.push('/sign-in');
          return;
        }

        console.log(`RoleGuard checking access for ${allowedRole}`);

        const { data } = await axios.get('http://localhost:3001/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log(`Current user role: ${data.role}, required: ${allowedRole}`);
        setRole(data.role);
        
        // If user has wrong role, show option to switch
        if (data.role !== allowedRole) {
          console.log(`Role mismatch: ${data.role} != ${allowedRole}`);
          // Don't auto-redirect, let user choose
        }
      } catch (err: any) {
        console.error('Error fetching role:', err);
        setError('Failed to verify access permissions');
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [isSignedIn, getToken, router, allowedRole]);

  const handleRoleSwitch = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      
      await axios.post('http://localhost:3001/switch-role', {
        role: allowedRole
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Refresh the page to update the role
      window.location.reload();
    } catch (error) {
      console.error('Error switching role:', error);
      setError('Failed to switch role');
      setLoading(false);
    }
  };

  if (!isSignedIn || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-vimana-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-vimana-gold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-300 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/sign-in')}
            className="bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-silver transition-all duration-300"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (role !== allowedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl text-vimana-gold mb-4">Role Switch Required</h2>
          <p className="text-vimana-silver mb-6">
            This page is for {allowedRole}s only. You are currently set up as a {role || 'unknown'}.
          </p>
          <p className="text-vimana-silver mb-6 text-sm">
            Would you like to switch to {allowedRole} mode?
          </p>
          <div className="space-y-3">
            <button 
              onClick={handleRoleSwitch}
              className="block w-full bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-silver transition-all duration-300"
            >
              Switch to {allowedRole.charAt(0).toUpperCase() + allowedRole.slice(1)}
            </button>
            {role && (
              <button 
                onClick={() => router.push(role === 'rider' ? '/dashboard' : '/driver')}
                className="block w-full bg-vimana-silver text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-gold transition-all duration-300"
              >
                Go to Your {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
              </button>
            )}
            <button 
              onClick={() => router.push('/')}
              className="block w-full bg-transparent border border-vimana-gold text-vimana-gold px-6 py-3 rounded-full font-bold hover:bg-vimana-gold hover:text-vimana-indigo transition-all duration-300"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}