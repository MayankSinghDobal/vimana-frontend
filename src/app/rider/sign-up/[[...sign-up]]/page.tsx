// src/app/rider/sign-up/[[...sign-up]]/page.tsx
'use client';
import { SignUp } from '@clerk/nextjs';

export default function RiderSignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-devanagari text-vimana-gold mb-6 text-center animate-pulse">
          Rider Sign-Up
        </h1>
        <p className="mb-6 text-vimana-silver text-center">
          Begin your celestial journey with Vimana!
        </p>
        <div className="bg-white rounded-lg shadow-xl p-4">
          <SignUp 
            fallbackRedirectUrl="/rider/complete-setup" 
            signInUrl="/rider/sign-in"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}