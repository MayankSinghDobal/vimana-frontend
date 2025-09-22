// src/app/dashboard/page.tsx
'use client';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RoleGuard from '@/components/RoleGuard';

export default function RiderDashboard() {
  const { getToken } = useAuth();
  const [rides, setRides] = useState<{ id: string; pickup_location: string; dropoff_location: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get('http://localhost:3001/rides', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRides(data);
      } catch (err) {
        console.error('Error fetching rides:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, [getToken]);

  return (
    <RoleGuard allowedRole="rider">
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-devanagari text-vimana-gold mb-6 text-center animate-pulse">Rider Dashboard</h1>
          <p className="mb-6 text-vimana-silver text-center">Embark on your celestial journeys, Divine Traveler!</p>
          <div className="bg-vimana-silver bg-opacity-10 p-6 rounded-xl shadow-lg border border-vimana-gold/30 backdrop-blur-sm">
            <h2 className="text-2xl text-vimana-gold mb-4">Ride History</h2>
            {loading ? (
              <p>Loading celestial journeys...</p>
            ) : rides.length === 0 ? (
              <p className="text-vimana-crimson">No celestial journeys yet.</p>
            ) : (
              <div className="grid gap-4">
                {rides.map((ride) => (
                  <div key={ride.id} className="bg-vimana-indigo/50 p-4 rounded-lg border border-vimana-gold/50 hover:shadow-xl transition-all duration-300">
                    <p><strong>From:</strong> {ride.pickup_location}</p>
                    <p><strong>To:</strong> {ride.dropoff_location}</p>
                    <p><strong>Status:</strong> {ride.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}