"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function BackgroundNebulae() {
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(500);
  const [isLight, setIsLight] = useState(false);

  // Define different springs for each nebula to create a premium fluid-splitting effect
  const spring1X = useSpring(mouseX, { damping: 45, stiffness: 80, mass: 1 });
  const spring1Y = useSpring(mouseY, { damping: 45, stiffness: 80, mass: 1 });

  const spring2X = useSpring(mouseX, { damping: 55, stiffness: 50, mass: 1.5 });
  const spring2Y = useSpring(mouseY, { damping: 55, stiffness: 50, mass: 1.5 });

  const spring3X = useSpring(mouseX, { damping: 65, stiffness: 30, mass: 2 });
  const spring3Y = useSpring(mouseY, { damping: 65, stiffness: 30, mass: 2 });

  useEffect(() => {
    // Set to center of viewport initially
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Observe theme changes on <html> class list
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    setIsLight(document.documentElement.classList.contains("light"));

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Indigo Nebula */}
      <motion.div
        className={`absolute w-[45vw] h-[45vw] max-w-[500px] rounded-full blur-[110px] transition-colors duration-700 ${
          isLight ? "bg-indigo-400/[0.12]" : "bg-indigo-500/[0.08]"
        }`}
        style={{
          x: spring1X,
          y: spring1Y,
          left: 0,
          top: 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Deep Indigo Nebula */}
      <motion.div
        className={`absolute w-[50vw] h-[50vw] max-w-[600px] rounded-full blur-[130px] transition-colors duration-700 ${
          isLight ? "bg-indigo-300/[0.10]" : "bg-indigo-600/[0.06]"
        }`}
        style={{
          x: spring2X,
          y: spring2Y,
          left: 0,
          top: 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Purple/Indigo Nebula */}
      <motion.div
        className={`absolute w-[42vw] h-[42vw] max-w-[550px] rounded-full blur-[120px] transition-colors duration-700 ${
          isLight ? "bg-purple-400/[0.08]" : "bg-purple-500/[0.05]"
        }`}
        style={{
          x: spring3X,
          y: spring3Y,
          left: 0,
          top: 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}

