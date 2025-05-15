"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb, Code2, Users, CheckCircle, Globe, Database, Server, Shield, Zap, BookOpen, Award, Calendar, Clock, GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';
import { APP_NAME, FOUNDER_NAME, PLACEHOLDER_PROJECTS, SERVICES_PROVIDED } from '@/lib/constants';
import { ProjectCard } from '@/components/project-card';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import { ServiceSlider } from "@/components/service-slider";
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import gsap from 'gsap';
import { Slider } from '@/components/ui/slider';
import { Carousel } from '@/components/carousel';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';

// Fixed positions for particles to ensure consistent server/client rendering
const PARTICLES = [
  { id: 1, x: 10, y: 20, size: 2 },
  { id: 2, x: 30, y: 40, size: 2 },
  { id: 3, x: 50, y: 60, size: 2 },
  { id: 4, x: 70, y: 80, size: 2 },
  { id: 5, x: 90, y: 10, size: 2 },
  { id: 6, x: 20, y: 30, size: 2 },
  { id: 7, x: 40, y: 50, size: 2 },
  { id: 8, x: 60, y: 70, size: 2 },
  { id: 9, x: 80, y: 90, size: 2 },
  { id: 10, x: 15, y: 25, size: 2 },
  { id: 11, x: 35, y: 45, size: 2 },
  { id: 12, x: 55, y: 65, size: 2 },
  { id: 13, x: 75, y: 85, size: 2 },
  { id: 14, x: 95, y: 15, size: 2 },
  { id: 15, x: 25, y: 35, size: 2 }
];

// Fixed positions for blobs
const BLOBS = [
  { id: 1, x: 20, y: 30, size: 80 },
  { id: 2, x: 60, y: 70, size: 90 },
  { id: 3, x: 40, y: 50, size: 70 }
];

// Fixed positions for accent elements
const ACCENTS = [
  { id: 1, x: 15, y: 25, size: 120 },
  { id: 2, x: 75, y: 65, size: 150 },
  { id: 3, x: 45, y: 85, size: 100 }
];

// Add these constants at the top with other constants
const SPARKLES = [
  { id: 1, x: 15, y: 25, size: 1.5, duration: 2 },
  { id: 2, x: 35, y: 45, size: 1.2, duration: 2.5 },
  { id: 3, x: 55, y: 65, size: 1.8, duration: 1.8 },
  { id: 4, x: 75, y: 85, size: 1.3, duration: 2.2 },
  { id: 5, x: 25, y: 35, size: 1.6, duration: 2.1 },
  { id: 6, x: 45, y: 55, size: 1.4, duration: 2.3 },
  { id: 7, x: 65, y: 75, size: 1.7, duration: 1.9 },
  { id: 8, x: 85, y: 95, size: 1.5, duration: 2.4 },
  { id: 9, x: 95, y: 15, size: 1.3, duration: 2.2 },
  { id: 10, x: 5, y: 85, size: 1.6, duration: 2.0 }
];

const GLOW_DOTS = [
  { id: 1, x: 20, y: 30, size: 3, opacity: 0.4 },
  { id: 2, x: 40, y: 50, size: 2.5, opacity: 0.3 },
  { id: 3, x: 60, y: 70, size: 3.5, opacity: 0.5 },
  { id: 4, x: 80, y: 90, size: 2.8, opacity: 0.35 },
  { id: 5, x: 30, y: 40, size: 3.2, opacity: 0.45 }
];

// Add these constants at the top with other constants
const DARK_DOTS = [
  { id: 1, x: 10, y: 20, size: 2, opacity: 0.3 },
  { id: 2, x: 30, y: 40, size: 1.5, opacity: 0.25 },
  { id: 3, x: 50, y: 60, size: 2.5, opacity: 0.35 },
  { id: 4, x: 70, y: 80, size: 1.8, opacity: 0.28 },
  { id: 5, x: 90, y: 10, size: 2.2, opacity: 0.32 },
  { id: 6, x: 20, y: 30, size: 1.7, opacity: 0.27 },
  { id: 7, x: 40, y: 50, size: 2.3, opacity: 0.33 },
  { id: 8, x: 60, y: 70, size: 1.9, opacity: 0.29 },
  { id: 9, x: 80, y: 90, size: 2.1, opacity: 0.31 },
  { id: 10, x: 15, y: 25, size: 1.6, opacity: 0.26 }
];

interface SlidingCardProps {
  children: React.ReactNode;
  index: number;
  totalCards: number;
  className?: string;
}

const SlidingCard: React.FC<SlidingCardProps> = ({ children, index, totalCards, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / (rect.height / 2)) * -3;
    const rotateY = (x / (rect.width / 2)) * 3;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.2,
      ease: "power1.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.2,
      ease: "power1.out"
    });
  };

  useEffect(() => {
    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative rounded-xl bg-background/50 border border-primary/20 hover:border-primary/40 transition-all duration-200 perspective-1000 overflow-visible",
        className ?? "p-6 min-h-[320px] md:min-h-[380px] lg:min-h-[420px] xl:min-h-[480px] 2xl:min-h-[520px]"
      )}
      style={{
        transformStyle: "preserve-3d",
        zIndex: isHovered ? 10 : 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Simple hover effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* Content */}
      <div className="relative flex flex-col" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// Remove the team section and update the blog section
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies shaping the future of web development.",
    date: "March 15, 2024",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Optimizing React Performance",
    excerpt: "Best practices and techniques for building high-performance React applications.",
    date: "March 10, 2024",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Cloud Security Best Practices",
    excerpt: "Essential security measures for protecting your cloud infrastructure.",
    date: "March 5, 2024",
    readTime: "6 min read"
  }
];

// EmblaCarouselWithNav: A reusable Embla carousel with arrows and dots
type EmblaCarouselWithNavProps = {
  children: React.ReactNode;
  className?: string;
  dotClassName?: string;
};
function EmblaCarouselWithNav({ children, className = '', dotClassName = '' }: EmblaCarouselWithNavProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (idx: number) => emblaApi && emblaApi.scrollTo(idx);
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className={`relative w-full ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {Array.isArray(children)
            ? children.map((child, idx) => (
                <div key={idx} className="flex-[0_0_100%] sm:flex-[0_0_50%] max-w-full sm:max-w-[50%] min-w-0">
                  {child}
                </div>
              ))
            : <div className="flex-[0_0_100%] sm:flex-[0_0_50%] max-w-full sm:max-w-[50%] min-w-0">{children}</div>
          }
        </div>
      </div>
      {/* Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
        onClick={scrollPrev}
        disabled={selectedIndex === 0}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
        onClick={scrollNext}
        disabled={selectedIndex === scrollSnaps.length - 1}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      {/* Dots */}
      <div className={`flex justify-center items-center gap-3 mt-4 ${dotClassName}`}>
        {scrollSnaps.map((_, idx: number) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              selectedIndex === idx ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/50"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const featuredProjects = PLACEHOLDER_PROJECTS.slice(0, 2);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // Create motion values for particle transformations
  const particleTransformX = useTransform(mouseX, [-1, 1], [-2, 2]);
  const particleTransformY = useTransform(mouseY, [-1, 1], [-2, 2]);
  const blobTransformX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const blobTransformY = useTransform(mouseY, [-1, 1], [-10, 10]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const targetX = (clientX / window.innerWidth - 0.5) * 2;
      const targetY = (clientY / window.innerHeight - 0.5) * 2;

      const animate = () => {
        currentX += (targetX - currentX) * 0.004;
        currentY += (targetY - currentY) * 0.004;
        
        setMousePosition({ x: currentX, y: currentY });
        mouseX.set(currentX);
        mouseY.set(currentY);

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Modern Dynamic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        {/* Base gradient */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(13, 24, 41, 0.7) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(14, 91, 130, 0.7) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgba(14, 91, 130, 0.7) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(13, 24, 41, 0.7) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(13, 24, 41, 0.7) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(14, 91, 130, 0.7) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(13, 24, 41, 0.7) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(14, 91, 130, 0.7) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Animated mesh gradient */}
        <motion.div 
          className="absolute inset-0 opacity-70"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(13, 24, 41, 0.5) 0%, rgba(14, 91, 130, 0.5) 25%, rgba(13, 24, 41, 0.5) 50%, rgba(14, 91, 130, 0.5) 75%, rgba(13, 24, 41, 0.5) 100%)',
              'linear-gradient(135deg, rgba(13, 24, 41, 0.5) 0%, rgba(14, 91, 130, 0.5) 25%, rgba(13, 24, 41, 0.5) 50%, rgba(14, 91, 130, 0.5) 75%, rgba(13, 24, 41, 0.5) 100%)',
              'linear-gradient(225deg, rgba(13, 24, 41, 0.5) 0%, rgba(14, 91, 130, 0.5) 25%, rgba(13, 24, 41, 0.5) 50%, rgba(14, 91, 130, 0.5) 75%, rgba(13, 24, 41, 0.5) 100%)',
              'linear-gradient(315deg, rgba(13, 24, 41, 0.5) 0%, rgba(14, 91, 130, 0.5) 25%, rgba(13, 24, 41, 0.5) 50%, rgba(14, 91, 130, 0.5) 75%, rgba(13, 24, 41, 0.5) 100%)',
              'linear-gradient(45deg, rgba(13, 24, 41, 0.5) 0%, rgba(14, 91, 130, 0.5) 25%, rgba(13, 24, 41, 0.5) 50%, rgba(14, 91, 130, 0.5) 75%, rgba(13, 24, 41, 0.5) 100%)'
            ]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Dark dots */}
        <div className="absolute inset-0">
          {DARK_DOTS.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute rounded-full"
              style={{
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                opacity: dot.opacity,
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                filter: 'blur(0.5px)',
                boxShadow: '0 0 4px rgba(255,255,255,0.2)'
              }}
              animate={isClient ? {
                scale: [1, 1.2, 1],
                opacity: [dot.opacity, dot.opacity * 1.5, dot.opacity],
                x: [0, 3, 0],
                y: [0, -3, 0]
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot.id * 0.2
              }}
            />
          ))}
        </div>

        {/* Enhanced sparkle dots */}
        <div className="absolute inset-0">
          {SPARKLES.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute rounded-full"
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                boxShadow: '0 0 6px rgba(255,255,255,0.4)'
              }}
              animate={isClient ? {
                scale: [1, 1.5, 1],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              } : {}}
              transition={{
                duration: sparkle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: sparkle.id * 0.2
              }}
            />
          ))}
        </div>

        {/* Enhanced glow dots */}
        <div className="absolute inset-0">
          {GLOW_DOTS.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute rounded-full"
              style={{
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                opacity: dot.opacity,
                background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)',
                filter: 'blur(1px)',
                boxShadow: '0 0 10px rgba(255,255,255,0.5)'
              }}
              animate={isClient ? {
                scale: [1, 1.2, 1],
                opacity: [dot.opacity, dot.opacity * 1.5, dot.opacity],
                x: [0, 5, 0],
                y: [0, -5, 0]
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot.id * 0.3
              }}
            />
          ))}
        </div>

        {/* Enhanced floating particles */}
        <div className="absolute inset-0">
          {PARTICLES.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: 0.4,
                x: particleTransformX,
                y: particleTransformY,
                background: 'linear-gradient(45deg, rgba(13, 24, 41, 0.8), rgba(14, 91, 130, 0.8))',
                boxShadow: '0 0 8px rgba(13, 24, 41, 0.5)'
              }}
              animate={isClient ? {
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.5, 0.4],
                rotate: [0, 180, 360]
              } : {}}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.id * 0.5
              }}
            />
          ))}
        </div>

        {/* Enhanced animated blobs */}
        <div className="absolute inset-0">
          {BLOBS.map((blob) => (
            <motion.div
              key={blob.id}
              className="absolute rounded-full"
              style={{
                width: `${blob.size}px`,
                height: `${blob.size}px`,
                left: `${blob.x}%`,
                top: `${blob.y}%`,
                opacity: 0.25,
                filter: 'blur(40px)',
                x: blobTransformX,
                y: blobTransformY,
                background: 'linear-gradient(45deg, rgba(13, 24, 41, 0.6), rgba(14, 91, 130, 0.6))',
                boxShadow: '0 0 25px rgba(13, 24, 41, 0.4)'
              }}
              animate={isClient ? {
                scale: [1, 1.1, 1],
                opacity: [0.25, 0.3, 0.25],
                rotate: [0, 90, 180]
              } : {}}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
                delay: blob.id * 2
              }}
            />
          ))}
        </div>

        {/* Enhanced interactive glow effect */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${50 + mouseX.get() * 2}% ${50 + mouseY.get() * 2}%, 
                        rgba(14, 91, 130, 0.6) 0%, 
                        transparent 50%)`,
            filter: 'blur(150px)',
            boxShadow: '0 0 35px rgba(14, 91, 130, 0.4)'
          }}
        />

        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/50 to-background/40" />
      </div>

      {/* Hero Section */}
      <section className="py-6 min-h-[60vh] md:min-h-[75vh] flex items-center">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <ScrollAnimationWrapper animationType="fadeInUp">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
              animate={{
                y: [0, -1, 0],
                scale: [1, 1.002, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1]
              }}
            >
              <motion.span 
                className="block text-foreground mb-1"
                style={{
                  x: useTransform(mouseX, [-1, 1], [-1, 1]),
                  y: useTransform(mouseY, [-1, 1], [-1, 1])
                }}
              >
                Welcome to
              </motion.span>
              <motion.span 
                className="block text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400 animate-gradient-x pb-2 leading-tight"
                style={{
                  x: useTransform(mouseX, [-1, 1], [1, -1]),
                  y: useTransform(mouseY, [-1, 1], [1, -1])
                }}
              >
                {APP_NAME}
              </motion.span>
            </motion.h1>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animationType="fadeInUp" delay={200}>
            <motion.p 
              className="mt-6 max-w-xl md:max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-muted-foreground"
              style={{
                x: useTransform(mouseX, [-1, 1], [-0.5, 0.5]),
                y: useTransform(mouseY, [-1, 1], [-0.5, 0.5])
              }}
            >
              Founded by {FOUNDER_NAME}, we build modern, responsive websites and deliver high-quality projects.
              Your vision, our digital expertise.
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animationType="fadeInUp" delay={400}>
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
              style={{
                x: useTransform(mouseX, [-1, 1], [0.5, -0.5]),
                y: useTransform(mouseY, [-1, 1], [0.5, -0.5])
              }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                  <Link href="/services">
                    Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-lg">
                  <Link href="/quote">
                    Get a Quote
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-8 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { number: "10+", label: "Projects Completed", icon: "🎯" },
              { number: "5+", label: "Happy Clients", icon: "😊" },
              { number: "1+", label: "Years Experience", icon: "⭐" },
              { number: "24/7", label: "Support", icon: "🛟" }
            ].map((stat, index) => (
              <ScrollAnimationWrapper
                key={stat.label}
                animationType="fadeInUp"
                delay={index * 100}
                className="text-center"
              >
                <motion.div
                  className="aspect-square p-6 rounded-xl bg-background border border-primary/20 hover:border-primary/40 transition-all duration-300 relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                  <div className="relative h-full flex flex-col items-center justify-center">
                    <span className="text-4xl mb-4">{stat.icon}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced What We Do Section */}
      <section className="pt-6 pb-0">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">What We Do</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We specialize in turning complex ideas into elegant digital solutions.
            </p>
          </ScrollAnimationWrapper>
          {/* Embla Slider for What We Do */}
          {(() => {
            const services = [
              {
                icon: Globe,
                title: "Web Development",
                description: "Custom websites and web applications built with modern technologies like Next.js, React, and Node.js.",
                features: ["Responsive Design", "Progressive Web Apps", "E-commerce Solutions"]
              },
              {
                icon: Database,
                title: "Backend Development",
                description: "Robust server-side solutions and API development for scalable applications.",
                features: ["RESTful APIs", "GraphQL", "Microservices"]
              },
              {
                icon: Server,
                title: "Cloud Solutions",
                description: "Cloud infrastructure setup and management for optimal performance and scalability.",
                features: ["AWS", "Azure", "Google Cloud"]
              },
              {
                icon: Shield,
                title: "Security",
                description: "Comprehensive security solutions to protect your digital assets.",
                features: ["SSL/TLS", "DDoS Protection", "Security Audits"]
              },
              {
                icon: Zap,
                title: "Performance Optimization",
                description: "Speed and performance optimization for better user experience.",
                features: ["Load Testing", "Caching", "CDN Integration"]
              },
              {
                icon: Users,
                title: "Consulting",
                description: "Expert guidance on technology choices and digital transformation.",
                features: ["Tech Stack Selection", "Architecture Design", "Best Practices"]
              },
              {
                icon: Code2,
                title: "Custom Software",
                description: "Tailored software solutions designed to meet your specific business needs.",
                features: ["Enterprise Software", "Workflow Automation", "Integration Services"]
              },
              {
                icon: BookOpen,
                title: "Training & Support",
                description: "Comprehensive training programs and ongoing technical support for your team.",
                features: ["Technical Workshops", "Documentation", "24/7 Support"]
              }
            ];
            return (
              <EmblaCarouselWithNav>
                {services.map((service, index) => (
                  <div key={service.title} className="h-full p-4 bg-background rounded-xl border border-primary/20 flex flex-col">
                    <service.icon className="h-12 w-12 text-primary mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold text-foreground mb-2 text-center">{service.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-center">{service.description}</p>
                    <ul className="space-y-2 flex-grow">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </EmblaCarouselWithNav>
            );
          })()}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mt-4 md:mt-6 pb-6">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Featured Projects</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Explore our latest and most impactful projects
            </p>
          </ScrollAnimationWrapper>
          {/* Embla Slider for Projects */}
          {(() => {
            return (
              <EmblaCarouselWithNav>
                {PLACEHOLDER_PROJECTS.map((project, index) => (
                  <div key={project.id} className="h-full p-8 bg-background rounded-xl border border-primary/20 flex flex-col">
                    <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2 truncate text-center">{project.title}</h3>
                    <p className="text-muted-foreground mb-3 line-clamp-3 break-words overflow-hidden text-center">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto justify-center">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-auto justify-center">
                      {project.liveLink && (
                        <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Link href={project.liveLink}>
                            View Live <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      {project.repoLink && (
                        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          <Link href={project.repoLink}>
                            View Code <GitBranch className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </EmblaCarouselWithNav>
            );
          })()}
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section className="py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with our latest thoughts and industry insights
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-xl bg-background border border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                    <Clock className="h-4 w-4 ml-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button asChild variant="ghost" className="group-hover:bg-primary/10">
                    <Link href="/blog">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">
                View All Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-6">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Our Process</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A streamlined approach to bringing your vision to life.
            </p>
          </ScrollAnimationWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { number: "01", title: "Discovery", description: "We begin by understanding your needs, goals, and vision for the project.", icon: "🔍" },
              { number: "02", title: "Planning", description: "Detailed project planning and strategy development to ensure success.", icon: "📋" },
              { number: "03", title: "Development", description: "Expert implementation of your project with regular updates and feedback.", icon: "💻" },
              { number: "04", title: "Launch", description: "Thorough testing and smooth deployment to bring your project to life.", icon: "🚀" }
            ].map((step, index) => (
              <ScrollAnimationWrapper
                key={step.title}
                animationType="fadeInUp"
                delay={index * 150}
                className="h-full"
              >
                <div className="group relative aspect-square p-6 rounded-xl bg-background border border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300" />
                  <div className="relative h-full flex flex-col items-center justify-center text-center">
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                    <span className="text-4xl mb-4">{step.icon}</span>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-8 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Client Testimonials</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Hear what our clients have to say about working with us.
            </p>
          </ScrollAnimationWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: "Inayat Altaf Shah", role: "FullStack Developer", content: "MinMind is a great company that provides top-notch services. I highly recommend them to anyone looking for a reliable and skilled partner.", rating: 5 },
              { name: "Athar Gulzar", role: "FullStack Developer", content: "The team's expertise and attention to detail made our project a huge success.", rating: 5 },
              { name: "Shafid Bilal", role: "Marketing Director, KashMeds", content: "MinMind is a great company that provides top-notch services. I highly recommend them to anyone looking for a reliable and skilled partner.", rating: 5 }
            ].map((testimonial, index) => (
              <SlidingCard key={testimonial.name} index={index} totalCards={3} className="p-2 h-auto min-h-0">
                <div className="flex flex-col justify-start h-32 md:h-36 overflow-y-auto">
                  <div className="flex items-center mb-1">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-2">
                      <h4 className="font-semibold text-foreground text-sm leading-tight">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground leading-tight">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">⭐</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs leading-snug">{testimonial.content}</p>
                </div>
              </SlidingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mt-8 py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-teal-400 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <ScrollAnimationWrapper animationType="zoomIn">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-4">Ready to Start Your Project?</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/90">
              Let's discuss how MinMind can help you achieve your digital goals.
            </p>
            <div className="mt-8">
              <div className="hover:scale-105 transition-transform">
                <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 shadow-lg">
                  <Link href="/contact">
                    Contact Us Today
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mt-8 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Why Choose Us</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We combine technical expertise with creative innovation to deliver exceptional results.
            </p>
          </ScrollAnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Expert Team",
                description: "Our team consists of experienced developers, designers, and project managers."
              },
              {
                icon: "⚡",
                title: "Fast Delivery",
                description: "We prioritize efficiency without compromising on quality."
              },
              {
                icon: "💡",
                title: "Innovative Solutions",
                description: "We stay ahead of the curve with cutting-edge technologies."
              },
              {
                icon: "🤝",
                title: "Client-Centric",
                description: "Your success is our priority. We work closely with you throughout the process."
              },
              {
                icon: "🛡️",
                title: "Secure & Reliable",
                description: "We implement robust security measures to protect your digital assets."
              },
              {
                icon: "📈",
                title: "Scalable Solutions",
                description: "Our solutions grow with your business needs."
              }
            ].map((feature, index) => (
              <ScrollAnimationWrapper
                key={feature.title}
                animationType="fadeInUp"
                delay={index * 100}
                className="h-full"
              >
                <div className="group p-6 rounded-xl bg-background border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground mt-2">{feature.description}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="mt-8 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Our Tech Stack</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We use modern technologies to build robust and scalable solutions.
            </p>
          </ScrollAnimationWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", icon: "⚛️" },
              { name: "Next.js", icon: "▲" },
              { name: "Node.js", icon: "🟢" },
              { name: "TypeScript", icon: "📘" },
              { name: "Python", icon: "🐍" },
              { name: "AWS", icon: "☁️" },
              { name: "Docker", icon: "🐳" },
              { name: "MongoDB", icon: "🍃" }
            ].map((tech, index) => (
              <ScrollAnimationWrapper
                key={tech.name}
                animationType="fadeInUp"
                delay={index * 100}
              >
                <div className="group p-6 rounded-xl bg-background border border-primary/20 hover:border-primary/40 transition-all duration-300 text-center">
                  <div className="text-4xl mb-2">{tech.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground">{tech.name}</h3>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-8 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Get answers to common questions about our services.
            </p>
          </ScrollAnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "What services do you offer?",
                answer: "We offer a wide range of services including web development, mobile app development, cloud solutions, and consulting services."
              },
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on complexity and scope. We'll provide a detailed timeline during our initial consultation."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, we offer comprehensive support and maintenance services to ensure your solution runs smoothly."
              },
              {
                question: "What is your pricing model?",
                answer: "We offer flexible pricing models including fixed-price projects and retainer-based services. Contact us for a custom quote."
              }
            ].map((faq, index) => (
              <ScrollAnimationWrapper
                key={faq.question}
                animationType="fadeInUp"
                delay={index * 100}
                className="h-full"
              >
                <div className="p-6 rounded-xl bg-background border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      

    </div>
  );
}
