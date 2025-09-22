// src/app/driver/page.tsx
'use client';
import { useAuth } from '@clerk/nextjs';
import RoleGuard from '@/components/RoleGuard';

export default function DriverDashboard() {
  return (
    <RoleGuard allowedRole="driver">
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-devanagari text-vimana-gold mb-6 text-center animate-pulse">Driver Dashboard</h1>
          <p className="mb-6 text-vimana-silver text-center">Guide the celestial chariots, Divine Charioteer!</p>
          <div className="bg-vimana-silver bg-opacity-10 p-6 rounded-xl shadow-lg border border-vimana-gold/30 backdrop-blur-sm">
            <h2 className="text-2xl text-vimana-gold mb-4">Pending Ride Requests</h2>
            <p className="text-vimana-crimson">No requests yet. (Backend integration pending)</p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}