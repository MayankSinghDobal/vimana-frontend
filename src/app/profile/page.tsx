// src/app/profile/page.tsx
'use client';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const { isSignedIn, userId, getToken } = useAuth();
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    role: string;
    phone?: string;
    vehicle_number?: string;
    license_number?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      const fetchProfile = async () => {
        try {
          setError(null);
          const token = await getToken();
          const { data } = await axios.get('http://localhost:3001/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProfile(data);
          setName(data.name || '');
          setPhone(data.phone || '');
          setVehicleNumber(data.vehicle_number || '');
          setLicenseNumber(data.license_number || '');
        } catch (err: any) {
          console.error('Error fetching profile:', err);
          setError(err.response?.data?.message || err.response?.data?.error || 'Failed to load profile.');
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [isSignedIn, getToken]);

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      setUpdateMessage('Name is required');
      return;
    }

    if (profile?.role === 'driver' && (!vehicleNumber.trim() || !licenseNumber.trim())) {
      setUpdateMessage('Vehicle number and license number are required for drivers');
      return;
    }

    try {
      setUpdating(true);
      setUpdateMessage(null);
      
      const token = await getToken();
      const updateData: any = { 
        name: name.trim(), 
        phone: phone.trim(),
      };
      
      if (profile?.role === 'driver') {
        updateData.vehicle_number = vehicleNumber.trim();
        updateData.license_number = licenseNumber.trim();
      }

      const { data } = await axios.put('http://localhost:3001/profile', updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(data);
      setUpdateMessage('Profile updated successfully!');
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setUpdateMessage(err.response?.data?.message || err.response?.data?.error || 'Failed to update profile.');
    } finally {
      setUpdating(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8">
        <p className="text-vimana-gold text-center text-2xl font-devanagari">Please sign in to access your profile.</p>
        <a
          href="/rider/sign-in"
          className="mt-4 block w-fit mx-auto bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-silver transition-all duration-300"
        >
          Sign In
        </a>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-devanagari text-vimana-gold mb-6 text-center animate-pulse">Your Profile</h1>
        <p className="mb-6 text-vimana-silver text-center">Manage your divine identity, Celestial Traveler!</p>
        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center border border-red-500/30 mb-6">
            {error}
          </div>
        )}
        <div className="bg-vimana-silver bg-opacity-10 p-6 rounded-xl shadow-lg border border-vimana-gold/30 backdrop-blur-sm">
          <div className="grid gap-4">
            <div>
              <label className="block text-vimana-gold mb-2">Name *</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-vimana-indigo/50 text-white border border-vimana-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-vimana-gold transition-all"
                disabled={updating}
              />
            </div>
            <div>
              <label className="block text-vimana-gold mb-2">Email</label>
              <input
                type="email"
                value={profile?.email || ''}
                className="w-full p-3 bg-vimana-indigo/50 text-white border border-vimana-gold rounded-lg opacity-50"
                disabled
              />
            </div>
            <div>
              <label className="block text-vimana-gold mb-2">Phone</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 bg-vimana-indigo/50 text-white border border-vimana-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-vimana-gold transition-all"
                disabled={updating}
              />
            </div>
            <div>
              <label className="block text-vimana-gold mb-2">Role</label>
              <input
                type="text"
                value={profile?.role || ''}
                className="w-full p-3 bg-vimana-indigo/50 text-white border border-vimana-gold rounded-lg opacity-50"
                disabled
              />
            </div>
            {profile?.role === 'driver' && (
              <>
                <div>
                  <label className="block text-vimana-gold mb-2">Vehicle Number *</label>
                  <input
                    type="text"
                    placeholder="Enter vehicle number"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full p-3 bg-vimana-indigo/50 text-white border border-vimana-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-vimana-gold transition-all"
                    disabled={updating}
                  />
                </div>
                <div>
                  <label className="block text-vimana-gold mb-2">License Number *</label>
                  <input
                    type="text"
                    placeholder="Enter license number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full p-3 bg-vimana-indigo/50 text-white border border-vimana-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-vimana-gold transition-all"
                    disabled={updating}
                  />
                </div>
              </>
            )}
            <button
              onClick={handleUpdateProfile}
              disabled={updating || !name.trim()}
              className="w-full bg-vimana-gold text-vimana-indigo px-6 py-3 rounded-full font-bold hover:bg-vimana-crimson hover:text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {updating ? 'Updating...' : 'Update Profile'}
            </button>
            {updateMessage && (
              <div className={`p-3 rounded-lg text-center font-medium ${
                updateMessage.includes('successfully') 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {updateMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}