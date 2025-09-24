// src/app/driver/page.tsx
'use client';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RoleGuard from '@/components/RoleGuard';

export default function DriverDashboard() {
  const { getToken } = useAuth();
  const [rides, setRides] = useState<{ id: string; pickup_location: string; dropoff_location: string; status: string; user_id: string }[]>([]);
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
    <RoleGuard allowedRole="driver">
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-devanagari text-vimana-gold mb-6 text-center animate-pulse">Driver Dashboard</h1>
          <p className="mb-6 text-vimana-silver text-center">Guide the celestial chariots, Divine Charioteer!</p>
          
          <div className="bg-vimana-silver bg-opacity-10 p-6 rounded-xl shadow-lg border border-vimana-gold/30 backdrop-blur-sm">
            <h2 className="text-2xl text-vimana-gold mb-4">Your Assigned Rides</h2>
            {loading ? (
              <p>Loading your celestial assignments...</p>
            ) : rides.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-vimana-crimson mb-4">No rides assigned yet.</p>
                <p className="text-vimana-silver text-sm">
                  Wait for divine travelers to request your chariot services.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {rides.map((ride) => (
                  <div key={ride.id} className="bg-vimana-indigo/50 p-4 rounded-lg border border-vimana-gold/50 hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p><strong className="text-vimana-gold">From:</strong> {ride.pickup_location}</p>
                        <p><strong className="text-vimana-gold">To:</strong> {ride.dropoff_location}</p>
                        <p><strong className="text-vimana-gold">Status:</strong> 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            ride.status === 'requested' ? 'bg-yellow-500/20 text-yellow-300' :
                            ride.status === 'accepted' ? 'bg-blue-500/20 text-blue-300' :
                            ride.status === 'in_progress' ? 'bg-green-500/20 text-green-300' :
                            ride.status === 'completed' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {ride.status}
                          </span>
                        </p>
                      </div>
                      {ride.status === 'requested' && (
                        <button className="bg-vimana-gold text-vimana-indigo px-4 py-2 rounded-full font-bold hover:bg-vimana-crimson hover:text-white transition-all duration-300">
                          Accept Ride
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 bg-vimana-silver bg-opacity-10 p-6 rounded-xl shadow-lg border border-vimana-gold/30 backdrop-blur-sm">
            <h2 className="text-2xl text-vimana-gold mb-4">Driver Status</h2>
            <div className="flex items-center justify-between">
              <span className="text-vimana-silver">Currently:</span>
              <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm">
                Available for Divine Journeys
              </span>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}