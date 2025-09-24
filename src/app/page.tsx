'use client';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn, getToken } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isSignedIn) {
        setMessage('Please sign in to access the divine ride.');
        setLoadingRole(false);
        return;
      }
      
      try {
        // Fetch user role
        const token = await getToken();
        const profileResponse = await axios.get('http://localhost:3001/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRole(profileResponse.data.role);

        // Fetch backend data
        const response = await axios.get('http://localhost:3001/');
        setMessage(response.data);
      } catch (err) {
        setError('Failed to fetch data from backend.');
      } finally {
        setLoadingRole(false);
      }
    };
    fetchData();
  }, [isSignedIn, getToken]);

  const handleBookRide = async () => {
    if (!pickup || !dropoff) {
      alert('Please enter both pickup and dropoff locations.');
      return;
    }
    try {
      const token = await getToken();
      const response = await axios.post('http://localhost:3001/book-ride', {
        pickup_location: pickup,
        dropoff_location: dropoff,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Ride booked successfully! Ride ID: ${response.data.id}`);
      setPickup('');
      setDropoff('');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      alert(`Error booking ride: ${errorMessage}`);
    }
  };

  const renderBookingSection = () => {
    if (loadingRole) {
      return (
        <div className="max-w-md mx-auto bg-vimana-silver bg-opacity-20 p-6 rounded-lg">
          <div className="animate-spin w-8 h-8 border-4 border-vimana-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-center text-vimana-silver">Loading...</p>
        </div>
      );
    }

    if (isSignedIn && userRole === 'driver') {
      return (
        <div className="max-w-md mx-auto bg-vimana-silver bg-opacity-20 p-6 rounded-lg relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-vimana-gold text-2xl">🚗</div>
          <div className="text-center">
            <h3 className="text-xl font-devanagari text-vimana-gold mb-4">Welcome, Divine Charioteer!</h3>
            <p className="text-vimana-silver mb-4">As a driver, you guide celestial journeys rather than book them.</p>
            <a
              href="/driver"
              className="block w-full bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-crimson hover:text-white transition-all duration-300"
            >
              Go to Driver Dashboard
            </a>
          </div>
        </div>
      );
    }

    // Show booking form for non-authenticated users or riders
    return (
      <div className="max-w-md mx-auto bg-vimana-silver bg-opacity-20 p-6 rounded-lg relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-vimana-gold text-2xl">🚂</div>
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
          disabled={!isSignedIn || userRole === 'driver'}
          className="w-full bg-vimana-gold text-vimana-indigo px-4 py-2 rounded-full font-bold hover:bg-vimana-crimson hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!isSignedIn ? 'Sign In to Book Divine Ride' : 'Book Divine Ride'}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-vimana-indigo text-white">
      {/* Header */}
      <header className="bg-vimana-crimson p-4">
        <h1 className="text-2xl font-devanagari text-vimana-gold">Vimana Ride-Hailing</h1>
        <p className="text-sm">Soar through the skies with divine precision</p>
      </header>

      {/* Hero Section with Role-Based Content */}
      <main className="p-6">
        <div className="text-center">
          <h2 className="text-4xl font-devanagari mb-4 text-vimana-gold">
            Welcome to the Divine Journey
          </h2>
          <p className="mb-6 text-vimana-silver">
            {isSignedIn && userRole === 'driver' 
              ? "Guide celestial travelers on their divine journeys with Vimana."
              : "Book your celestial ride with Vimana, inspired by the mythical chariots of the gods."
            }
          </p>

          {/* Role-based booking section */}
          {renderBookingSection()}

          {isSignedIn ? (
            <div className="mt-6">
              {userRole && (
                <p className="text-vimana-gold mb-2">
                  Signed in as: <span className="capitalize">{userRole}</span>
                </p>
              )}
              {error ? (
                <p className="text-vimana-crimson">{error}</p>
              ) : (
                <p className="text-sm text-vimana-silver">System Status: Connected</p>
              )}
            </div>
          ) : (
            <div className="mt-6">
              <p className="mb-4 text-vimana-silver">Choose your path to begin:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/rider/sign-in"
                  className="bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-silver transition"
                >
                  Sign In as Rider
                </a>
                <a
                  href="/driver/sign-in"
                  className="bg-vimana-silver text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-gold transition"
                >
                  Sign In as Driver
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}