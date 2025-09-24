// src/components/Navbar.tsx
'use client';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Navbar() {
  const { isSignedIn, signOut, getToken, userId } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isSignedIn) {
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();
        const { data } = await axios.get('http://localhost:3001/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRole(data.role);
        
        // Load profile image from localStorage
        const savedImage = localStorage.getItem(`profile_image_${userId}`);
        if (savedImage) {
          setProfileImage(savedImage);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isSignedIn, getToken, userId]);

  return (
    <nav className="bg-vimana-crimson p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-devanagari text-vimana-gold hover:text-vimana-silver">
          Vimana
        </Link>
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-vimana-silver hover:text-vimana-gold">
                Home
              </Link>
            </li>
            
            {/* Role-specific navigation */}
            {isSignedIn && !loading && (
              <>
                {userRole === 'rider' && (
                  <>
                    <li>
                      <Link href="/dashboard" className="text-vimana-silver hover:text-vimana-gold">
                        My Rides
                      </Link>
                    </li>
                    <li>
                      <Link href="/ride-status" className="text-vimana-silver hover:text-vimana-gold">
                        Ride Status
                      </Link>
                    </li>
                  </>
                )}
                
                {userRole === 'driver' && (
                  <li>
                    <Link href="/driver" className="text-vimana-silver hover:text-vimana-gold">
                      Driver Dashboard
                    </Link>
                  </li>
                )}
              </>
            )}
            
            {/* Auth buttons */}
            {isSignedIn ? (
              <li>
                <button
                  onClick={() => signOut({ redirectUrl: '/' })}
                  className="text-vimana-silver hover:text-vimana-crimson"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/rider/sign-in" className="text-vimana-silver hover:text-vimana-gold">
                    Rider Sign-In
                  </Link>
                </li>
                <li>
                  <Link href="/driver/sign-in" className="text-vimana-silver hover:text-vimana-gold">
                    Driver Sign-In
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          {/* Profile picture */}
          {isSignedIn && (
            <Link href="/profile">
              <div className="relative group">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-vimana-gold hover:scale-110 transition-all duration-300 shadow-lg"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border-2 border-vimana-gold bg-vimana-gold/20 flex items-center justify-center hover:scale-110 transition-all duration-300">
                    <span className="text-vimana-gold text-lg">👤</span>
                  </div>
                )}
                <div className="absolute -bottom-8 right-0 bg-vimana-indigo text-vimana-gold px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  View Profile
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}