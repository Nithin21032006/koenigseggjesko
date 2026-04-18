"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Track raw mouse position centered at 0,0
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth out the position for trailing ring effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Simple hover detection strategy for interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = window.getComputedStyle(target).cursor === 'pointer' || 
                            target.tagName.toLowerCase() === 'a' ||
                            target.tagName.toLowerCase() === 'button';
      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      <style>{`
        /* Hide default cursor globally */
        * { cursor: none !important; }
      `}</style>
      
      {/* Outer trailing ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={`fixed -top-4 -left-4 w-8 h-8 rounded-full border border-jesko-gold pointer-events-none z-[9999] mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
      
      {/* Inner sharp dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovering ? 3 : 1,
          backgroundColor: isHovering ? "#FFF" : "#ca9e3b" // var(--color-jesko-gold)
        }}
        transition={{ duration: 0.2 }}
        className={`fixed -top-1 -left-1 w-2 h-2 rounded-full pointer-events-none z-[10000] mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </>
  );
}
