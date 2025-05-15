"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
}

export function Carousel({
  children,
  className,
  itemClassName,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const totalItems = children.length;

  useEffect(() => {
    const updateLayout = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      setItemsPerView(isMobileView ? 1 : 3);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Ensure last page always shows the last N cards, never blanks
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const totalDots = isMobile ? totalItems : Math.ceil(totalItems / itemsPerView);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50; // minimum distance for swipe

    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0 && currentIndex > 0) {
        // Swipe right
        handlePrev();
      } else if (info.offset.x < 0 && currentIndex < maxIndex) {
        // Swipe left
        handleNext();
      }
    } else {
      // Return to current position if swipe distance is too small
      controls.start({ x: `-${currentIndex * 100}%` });
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex w-full cursor-grab active:cursor-grabbing"
          animate={controls}
          initial={{ x: 0 }}
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{
            x: `-${currentIndex * 100}%`
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            mass: 1
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "flex-shrink-0 px-2 sm:px-4 w-full max-w-full sm:max-w-md mx-auto flex flex-col",
                itemClassName
              )}
              style={{ 
                width: `${100 / itemsPerView}%`,
                transition: 'width 0.3s ease-in-out',
                height: '100%'
              }}
            >
              {child}
            </div>
          ))}
        </motion.div>

        {/* Desktop Navigation Arrows */}
        {!isMobile && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Mobile Navigation Dots - Outside the cards */}
      {isMobile && (
        <div className="flex justify-center items-center gap-3 mt-6">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-primary scale-125"
                  : "bg-primary/30 hover:bg-primary/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 