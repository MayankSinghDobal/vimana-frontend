// src/components/Navbar.tsx
'use client';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

export default function Navbar() {
  const { isSignedIn, signOut } = useAuth();

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
            <li>
              <Link href="/dashboard" className="text-vimana-silver hover:text-vimana-gold">
                Rider Dashboard
              </Link>
            </li>
            <li>
              <Link href="/driver" className="text-vimana-silver hover:text-vimana-gold">
                Driver Dashboard
              </Link>
            </li>
            <li>
              <Link href="/ride-status" className="text-vimana-silver hover:text-vimana-gold">
                Ride Status
              </Link>
            </li>
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
          {isSignedIn && (
            <Link href="/profile">
              <img
                src="/profile-placeholder.png"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-vimana-gold object-cover hover:scale-110 transition-all duration-300"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}