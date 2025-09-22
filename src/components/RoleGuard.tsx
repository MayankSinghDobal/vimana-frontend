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
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push(allowedRole === 'rider' ? '/rider/sign-in' : '/driver/sign-in');
      return;
    }

    const fetchRole = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get('http://localhost:3001/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRole(data.role);
      } catch (err) {
        console.error('Error fetching role:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [isSignedIn, getToken, router]);

  if (!isSignedIn || loading) {
    return (
      <div className="min-h-screen bg-vimana-indigo text-white p-8 text-center">
        Loading...
      </div>
    );
  }

  if (role !== allowedRole) {
    router.push(allowedRole === 'rider' ? '/driver' : '/dashboard');
    return null;
  }

  return <>{children}</>;
}