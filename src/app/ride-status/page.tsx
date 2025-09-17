'use client';
import { useAuth } from '@clerk/nextjs';

export default function RideStatus() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-vimana-indigo text-white p-6 text-center">
        <p className="text-vimana-crimson">Please sign in to view ride status.</p>
        <a
          href="/sign-in"
          className="mt-4 inline-block bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-silver transition"
        >
          Sign In
        </a>
      </div>
    );
  }

  // Placeholder ride status (to be replaced with real data later)
  const rideStatus = {
    status: 'Requested',
    pickup: 'Mount Meru Temple',
    dropoff: 'Indra’s Palace',
    driver: 'Arjuna (Assigned)',
  };

  return (
    <div className="min-h-screen bg-vimana-indigo text-white p-6">
      <h1 className="text-3xl font-devanagari text-vimana-gold mb-4">Ride Status</h1>
      <p className="mb-4 text-vimana-silver">Track your divine journey with Vimana.</p>
      <div className="bg-vimana-silver bg-opacity-20 p-4 rounded-lg">
        <p className="text-vimana-gold"><strong>Status:</strong> {rideStatus.status}</p>
        <p className="text-vimana-silver"><strong>Pickup:</strong> {rideStatus.pickup}</p>
        <p className="text-vimana-silver"><strong>Dropoff:</strong> {rideStatus.dropoff}</p>
        <p className="text-vimana-silver"><strong>Driver:</strong> {rideStatus.driver}</p>
      </div>
    </div>
  );
}