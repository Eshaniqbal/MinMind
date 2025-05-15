"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2,
}));

const BLOBS = [
  { id: 1, x: 20, y: 30, size: 80 },
  { id: 2, x: 60, y: 70, size: 90 },
  { id: 3, x: 40, y: 50, size: 70 },
];

const ACCENTS = [
  { id: 1, x: 15, y: 25, size: 120 },
  { id: 2, x: 75, y: 65, size: 150 },
  { id: 3, x: 45, y: 85, size: 100 },
];

export function GradientBackground() {
  const [isClient, setIsClient] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const particleX = useTransform(mouseX, [-1, 1], [-2, 2]);
  const particleY = useTransform(mouseY, [-1, 1], [-2, 2]);

  const blobX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const blobY = useTransform(mouseY, [-1, 1], [-10, 10]);

  useEffect(() => {
    setIsClient(true);
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      currentX += (x - currentX) * 0.04;
      currentY += (y - currentY) * 0.04;

      mouseX.set(currentX);
      mouseY.set(currentY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Layered Gradient Mesh */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, var(--primary)/10, var(--secondary)/10, var(--accent)/10)",
            "linear-gradient(135deg, var(--primary)/10, var(--secondary)/10, var(--accent)/10)",
            "linear-gradient(225deg, var(--primary)/10, var(--secondary)/10, var(--accent)/10)",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.15,
            x: particleX,
            y: particleY,
          }}
          animate={
            isClient
              ? {
                  y: [0, -20, 0],
                  opacity: [0.15, 0.3, 0.15],
                  rotate: [0, 180, 360],
                }
              : {}
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.id * 0.2,
          }}
        />
      ))}

      {/* Blobs */}
      {BLOBS.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full bg-accent"
          style={{
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            opacity: 0.1,
            filter: "blur(50px)",
            x: blobX,
            y: blobY,
          }}
          animate={
            isClient
              ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.1, 0.15, 0.1],
                }
              : {}
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.id * 2,
          }}
        />
      ))}

      {/* Accent circles */}
      {ACCENTS.map((accent) => (
        <motion.div
          key={accent.id}
          className="absolute rounded-full bg-primary"
          style={{
            width: `${accent.size}px`,
            height: `${accent.size}px`,
            left: `${accent.x}%`,
            top: `${accent.y}%`,
            opacity: 0.05,
            filter: "blur(60px)",
            x: blobX,
            y: blobY,
          }}
          animate={
            isClient
              ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }
              : {}
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: accent.id,
          }}
        />
      ))}

      {/* Glow follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mouseX.get() * 30}% ${50 + mouseY.get() * 30}%, var(--accent)/15 0%, transparent 60%)`,
          filter: "blur(120px)",
        }}
      />

      {/* Faint base overlay */}
      <div className="absolute inset-0 bg-background/80" />
    </div>
  );
} 