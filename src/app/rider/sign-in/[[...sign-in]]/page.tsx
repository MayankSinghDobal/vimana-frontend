// src/app/rider/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function RiderSignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-devanagari text-vimana-gold mb-6 text-center animate-pulse">
          Rider Sign-In
        </h1>
        <p className="mb-6 text-vimana-silver text-center">
          Welcome back, Divine Traveler! Continue your celestial journey.
        </p>
        <div className="bg-white rounded-lg shadow-xl p-4">
          <SignIn 
            fallbackRedirectUrl="/dashboard" 
            signUpUrl="/rider/sign-up"
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