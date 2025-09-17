'use client';
import { useAuth } from '@clerk/nextjs';

export default function DriverDashboard() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-vimana-indigo text-white p-6 text-center">
        <p className="text-vimana-crimson">Please sign in as a driver to access this dashboard.</p>
        <a
          href="/sign-in"
          className="mt-4 inline-block bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-silver transition"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vimana-indigo text-white p-6">
      <h1 className="text-3xl font-devanagari text-vimana-gold mb-4">Driver Dashboard</h1>
      <p className="mb-4 text-vimana-silver">Welcome, Divine Charioteer! Manage your rides here.</p>
      <div className="bg-vimana-silver bg-opacity-20 p-4 rounded-lg">
        <h2 className="text-xl text-vimana-gold">Pending Ride Requests</h2>
        <p className="text-vimana-crimson">No requests yet. (Backend integration pending)</p>
      </div>
    </div>
  );
}