// src/app/ride-status/page.tsx
'use client';
import { useAuth } from '@clerk/nextjs';
import RoleGuard from '@/components/RoleGuard';

export default function RideStatus() {
  // Placeholder ride status (to be replaced with real data)
  const rideStatus = {
    status: 'Requested',
    pickup: 'Mount Meru Temple',
    dropoff: 'Indra’s Palace',
    driver: 'Arjuna (Assigned)',
  };

  return (
    <RoleGuard allowedRole="rider">
      <div className="min-h-screen bg-vimana-indigo text-white p-6">
        <h1 className="text-3xl font-devanagari text-vimana-gold mb-4">Ride Status</h1>
        <p className="mb-4 text-vimana-silver">Track your divine journey with Vimana.</p>
        <div className="bg-vimana-silver bg-opacity-20 p-4 rounded-lg border-2 border-vimana-gold">
          <p className="text-vimana-gold"><strong>Status:</strong> {rideStatus.status}</p>
          <p className="text-vimana-silver"><strong>Pickup:</strong> {rideStatus.pickup}</p>
          <p className="text-vimana-silver"><strong>Dropoff:</strong> {rideStatus.dropoff}</p>
          <p className="text-vimana-silver"><strong>Driver:</strong> {rideStatus.driver}</p>
        </div>
      </div>
    </RoleGuard>
  );
}