"use client";

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'zoomIn';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds, overrides CSS if set
  once?: boolean; // Trigger animation only once
  threshold?: number; // Intersection observer threshold
  as?: React.ElementType; // Allow specifying the wrapper element type, defaults to 'div'
}

export function ScrollAnimationWrapper({
  children,
  className,
  animationType = 'fadeInUp',
  delay = 0,
  duration, // If not provided, CSS default will be used
  once = true,
  threshold = 0.1,
  as: Component = 'div',
}: ScrollAnimationWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else {
          if (!once) {
            setIsVisible(false); // Re-trigger animation if not `once`
          }
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  const animationClasses: Record<AnimationType, string> = {
    fadeInUp: 'animate-fadeInUp',
    fadeIn: 'animate-fadeIn',
    slideInLeft: 'animate-slideInLeft',
    slideInRight: 'animate-slideInRight',
    zoomIn: 'animate-zoomIn',
  };

  const style: React.CSSProperties = isVisible ? {
    animationDelay: `${delay}ms`,
    ...(duration && { animationDuration: `${duration}ms` }), // Apply duration if provided
    opacity: 1, // Animation will handle transition, but this ensures final state
  } : {
    opacity: 0, // Start hidden
  };

  return (
    <Component
      ref={ref}
      className={cn(
        { 'opacity-0': !isVisible && !style.opacity }, // Set initial opacity-0 if not yet visible
        isVisible && animationClasses[animationType],
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}
