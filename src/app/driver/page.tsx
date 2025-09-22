'use client';
import { useAuth } from '@clerk/nextjs';

export default function DriverDashboard() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8">
        <p className="text-vimana-gold text-center text-2xl font-devanagari">Please sign in as a driver to access your Driver Dashboard.</p>
        <a
          href="/sign-in"
          className="mt-4 block w-fit mx-auto bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-silver transition-all duration-300"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-devanagari text-vimana-gold mb-6 text-center animate-pulse">Driver Dashboard</h1>
        <p className="mb-6 text-vimana-silver text-center">Guide the celestial chariots, Divine Charioteer!</p>
        <div className="bg-vimana-silver bg-opacity-10 p-6 rounded-xl shadow-lg border border-vimana-gold/30 backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/vimana-pattern.png')] bg-cover opacity-10"></div>
          <h2 className="text-2xl text-vimana-gold mb-4">Pending Ride Requests</h2>
          <p className="text-vimana-crimson">No requests yet. (Backend integration pending)</p>
        </div>
      </div>
    </div>
  );
}