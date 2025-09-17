'use client';

export default function Footer() {
  return (
    <footer className="bg-vimana-crimson text-vimana-silver p-4 mt-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-2">
          {/* Chariot Icon (CSS-based) */}
          <span className="text-2xl" style={{ fontFamily: 'Arial', color: '#FFD700' }}>
            🚂 {/* Placeholder for chariot; replace with SVG later */}
          </span>
          {/* Garuda Wing Decoration */}
          <span className="text-xl" style={{ color: '#C0C0C0' }}>✨</span>
        </div>
        <p className="mb-2">© 2025 Vimana Ride-Hailing - Inspired by the Chariots of the Gods</p>
        <div className="flex justify-center space-x-4">
          <a href="/help" className="hover:text-vimana-gold">Help</a>
          <a href="/terms" className="hover:text-vimana-gold">Terms</a>
          <a href="/privacy" className="hover:text-vimana-gold">Privacy</a>
        </div>
      </div>
    </footer>
  );
}