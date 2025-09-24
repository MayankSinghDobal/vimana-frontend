// src/app/sign-in/page.tsx
'use client';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-vimana-indigo to-vimana-crimson text-white p-8 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-devanagari text-vimana-gold mb-6 animate-pulse">
          Choose Your Path
        </h1>
        <p className="mb-8 text-vimana-silver">
          Select your role to begin your celestial journey with Vimana
        </p>
        
        <div className="space-y-4">
          <a
            href="/rider/sign-in"
            className="block w-full bg-vimana-gold text-vimana-indigo px-6 py-4 rounded-full font-bold hover:bg-vimana-crimson hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Sign In as Rider
            <p className="text-sm opacity-75 mt-1">Begin your divine journey</p>
          </a>
          
          <a
            href="/driver/sign-in"
            className="block w-full bg-vimana-silver text-vimana-indigo px-6 py-4 rounded-full font-bold hover:bg-vimana-gold hover:text-vimana-indigo transition-all duration-300 transform hover:scale-105"
          >
            Sign In as Driver
            <p className="text-sm opacity-75 mt-1">Guide celestial chariots</p>
          </a>
        </div>

        <div className="mt-6 text-sm text-vimana-silver">
          Don't have an account?{' '}
          <a href="/rider/sign-up" className="text-vimana-gold hover:underline">
            Sign up as Rider
          </a>
          {' '}or{' '}
          <a href="/driver/sign-up" className="text-vimana-gold hover:underline">
            Sign up as Driver
          </a>
        </div>
      </div>
    </div>
  );
}