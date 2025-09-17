'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!isSignedIn) {
        setMessage('Please sign in to access the divine ride.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3001/');
        setMessage(response.data);
      } catch (err) {
        setError('Failed to fetch data from backend.');
      }
    };
    fetchData();
  }, [isSignedIn]);

  const handleBookRide = () => {
    if (pickup && dropoff) {
      alert(`Ride booked from ${pickup} to ${dropoff}! (Backend integration pending)`);
    } else {
      alert('Please enter both pickup and dropoff locations.');
    }
  };

  return (
    <div className="min-h-screen bg-vimana-indigo text-white">
      {/* Header */}
      <header className="bg-vimana-crimson p-4">
        <h1 className="text-2xl font-devanagari text-vimana-gold">Vimana Ride-Hailing</h1>
        <p className="text-sm">Soar through the skies with divine precision</p>
      </header>

      {/* Hero Section with Ride Booking Form */}
      <main className="p-6">
        <div className="text-center">
          <h2 className="text-4xl font-devanagari mb-4 text-vimana-gold">
            Welcome to the Divine Journey
          </h2>
          <p className="mb-6 text-vimana-silver">
            Book your celestial ride with Vimana, inspired by the mythical chariots of the gods.
          </p>

          {/* Ride Booking Form */}
          <div className="max-w-md mx-auto bg-vimana-silver bg-opacity-20 p-6 rounded-lg">
            <input
              type="text"
              placeholder="Pickup Location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full p-2 mb-4 bg-vimana-indigo text-white border border-vimana-gold rounded"
            />
            <input
              type="text"
              placeholder="Dropoff Location"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full p-2 mb-4 bg-vimana-indigo text-white border border-vimana-gold rounded"
            />
            <button
              onClick={handleBookRide}
              className="w-full bg-vimana-gold text-vimana-indigo px-4 py-2 rounded-full font-bold hover:bg-vimana-crimson transition"
            >
              Book Divine Ride
            </button>
          </div>

          {isSignedIn ? (
            <div className="mt-6">
              <p>Authenticated User Data:</p>
              {error ? (
                <p className="text-vimana-crimson">{error}</p>
              ) : (
                <p>{message}</p>
              )}
            </div>
          ) : (
            <a
              href="/sign-in"
              className="bg-vimana-gold text-vimana-indigo px-6 py-3 mt-6 inline-block rounded-full font-bold hover:bg-vimana-silver transition"
            >
              Sign In to Begin
            </a>
          )}
        </div>
      </main>
    </div>
  );
}