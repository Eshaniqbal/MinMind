"use client";

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SliderProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
}

export function Slider({
  children,
  className,
  itemClassName,
  showControls = true,
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalItems = children.length;

  // Calculate max index based on screen size
  const getMaxIndex = () => {
    if (typeof window === 'undefined') return totalItems - 1;
    return window.innerWidth >= 1024 ? totalItems - 3 : totalItems - 1;
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, getMaxIndex()));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="relative">
        <motion.div
          ref={sliderRef}
          className="flex w-full"
          animate={{
            x: `-${currentIndex * 100}%`
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "flex-shrink-0 w-full lg:w-1/3 px-4",
                itemClassName
              )}
            >
              {child}
            </div>
          ))}
        </motion.div>

        {showControls && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-opacity z-10",
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
              )}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-opacity z-10",
                currentIndex === getMaxIndex() ? "opacity-50 cursor-not-allowed" : "opacity-100"
              )}
              onClick={handleNext}
              disabled={currentIndex === getMaxIndex()}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
} 