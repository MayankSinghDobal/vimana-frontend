'use client';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserDashboard() {
  const { isSignedIn, userId, getToken } = useAuth();
  const [profile, setProfile] = useState<{ name: string; email: string; role: string; phone?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      const fetchProfile = async () => {
        try {
          const token = await getToken();
          const { data } = await axios.get('http://localhost:3001/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProfile(data);
          setName(data.name || '');
          setPhone(data.phone || '');
        } catch (err) {
          console.error('Error fetching profile:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [isSignedIn]);

  const handleUpdateProfile = async () => {
    try {
      const token = await getToken();
      await axios.put(
        'http://localhost:3001/profile',
        { name, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile({ ...profile!, name, phone });
      setUpdateMessage('Profile updated successfully!');
      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setUpdateMessage('Error updating profile.');
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-vimana-indigo text-white p-6 text-center">
        <p className="text-vimana-crimson">Please sign in to access your dashboard.</p>
        <a
          href="/sign-in"
          className="mt-4 inline-block bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-silver transition"
        >
          Sign In
        </a>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen bg-vimana-indigo text-white p-6 text-center">Loading divine profile...</div>;
  }

  if (!profile) {
    return <div className="min-h-screen bg-vimana-indigo text-white p-6 text-center">Error loading profile.</div>;
  }

  return (
    <div className="min-h-screen bg-vimana-indigo text-white p-6">
      <h1 className="text-3xl font-devanagari text-vimana-gold mb-4">User Dashboard</h1>
      <p className="mb-4 text-vimana-silver">Welcome, Divine Traveler! Manage your profile here.</p>
      <div className="bg-vimana-silver bg-opacity-20 p-4 rounded-lg">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <p><strong>Phone:</strong> {profile.phone || 'Not set'}</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Update Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 bg-vimana-indigo text-white border border-vimana-gold rounded"
          />
          <input
            type="text"
            placeholder="Update Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-4 bg-vimana-indigo text-white border border-vimana-gold rounded"
          />
          <button
            onClick={handleUpdateProfile}
            className="bg-vimana-gold text-vimana-indigo px-4 py-2 rounded-full font-bold hover:bg-vimana-crimson transition"
          >
            Update Profile
          </button>
          {updateMessage && (
            <p className={`mt-2 ${updateMessage.includes('Error') ? 'text-vimana-crimson' : 'text-vimana-gold'}`}>
              {updateMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}