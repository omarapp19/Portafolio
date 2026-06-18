"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function SpotlightCard({ children, className = "", maxTilt = 5 }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasHover, setHasHover] = useState(false);

  // Motion values for tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Springs for smooth movement
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  useEffect(() => {
    // Only enable 3D tilt on devices that support hover (desktops)
    setHasHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of mouse relative to card top-left
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Update CSS variables for spotlight gradient
    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

    if (hasHover) {
      // Calculate normalized position: -0.5 to 0.5
      const normalizedX = (mouseX / width) - 0.5;
      const normalizedY = (mouseY / height) - 0.5;

      // Map normalized values to degree rotations
      rotateX.set(-normalizedY * maxTilt);
      rotateY.set(normalizedX * maxTilt);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", `-999px`);
      cardRef.current.style.setProperty("--mouse-y", `-999px`);
    }
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: hasHover ? rotateXSpring : 0,
        rotateY: hasHover ? rotateYSpring : 0,
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/10 backdrop-blur-md transition-all duration-300 hover:border-zinc-700/80 hover:shadow-[0_0_50px_rgba(99,102,241,0.04)] ${className}`}
    >
      {/* Background Spotlight Radial Gradient Overlay */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(450px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(99, 102, 241, 0.08), transparent 80%)`,
        }}
      />
      
      {/* Border Spotlight effect using masking */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-30"
        style={{
          border: "1px solid transparent",
          background: `radial-gradient(220px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(99, 102, 241, 0.35), transparent 70%) border-box`,
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      
      {/* Content wrapper with translateZ to enable 3D depth layers */}
      <div className="h-full w-full relative z-10" style={{ transform: "translateZ(12px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
