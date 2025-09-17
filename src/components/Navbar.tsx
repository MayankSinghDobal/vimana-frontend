"use client";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, signOut } = useAuth();

  return (
    <nav className="bg-vimana-crimson p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-devanagari text-vimana-gold hover:text-vimana-silver"
        >
          Vimana
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/"
              className="text-vimana-silver hover:text-vimana-gold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/driver"
              className="text-vimana-silver hover:text-vimana-gold"
            >
              Driver Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/ride-status"
              className="text-vimana-silver hover:text-vimana-gold"
            >
              Ride Status
            </Link>
          </li>
          {isSignedIn ? (
            <li>
              <button
                onClick={() => signOut({ redirectUrl: "/" })}
                className="text-vimana-silver hover:text-vimana-crimson"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <Link
                href="/sign-in"
                className="text-vimana-silver hover:text-vimana-gold"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
