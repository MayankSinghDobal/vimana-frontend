'use client'; // Marks this as a Client Component
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!isSignedIn) {
        setMessage('Please sign in to see backend data.');
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

  return (
    <div style={{ padding: '20px', fontFamily: 'Hind Siliguri, sans-serif' }}>
      <h1 style={{ color: '#4B0082' }}>Welcome to Vimana</h1>
      {isSignedIn ? (
        <div>
          <p>Authenticated User Data:</p>
          {error ? <p style={{ color: '#DC143C' }}>{error}</p> : <p>{message}</p>}
        </div>
      ) : (
        <p style={{ color: '#FFD700' }}>Sign in to access the divine ride experience!</p>
      )}
    </div>
  );
}