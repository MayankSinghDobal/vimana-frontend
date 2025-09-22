// src/app/rider/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function RiderSignInPage() {
  return (
    <div className="min-h-screen bg-vimana-indigo text-white p-6 text-center">
      <h1 className="text-3xl font-devanagari text-vimana-gold mb-4">Rider Sign-In</h1>
      <SignIn afterSignInUrl="/dashboard" />
    </div>
  );
}