'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show on homepage
    if (pathname !== '/') return;

    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:left-auto sm:right-4 z-50 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] rounded-xl shadow-2xl overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-5 border-2 border-primary/20 hover:border-primary/40 backdrop-blur-sm bg-background/5">
      <div className="relative">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 z-10 h-6 w-6 bg-black/70 hover:bg-black/90 text-white rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-3 w-3" />
        </Button>

        {/* Media Content */}
        <div className="relative aspect-[9/16] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          <video
            src="/banner/test.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
} 