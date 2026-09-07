import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer ring trailing effect
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverable = (e) => {
      const target = e.target;
      const isInteractive = target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer, .group");
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", checkHoverable);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", checkHoverable);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Trailing HUD Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.75 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? "rgba(59, 130, 246, 0.8)" : "rgba(6, 182, 212, 0.4)",
          backgroundColor: isHovered ? "rgba(59, 130, 246, 0.08)" : "rgba(6, 182, 212, 0.02)",
        }}
        transition={{ duration: 0.15 }}
        className="w-8 h-8 rounded-full border border-cyan-400/40 backdrop-blur-[1px] flex items-center justify-center relative"
      >
        {/* Subtle HUD Crosshair notches */}
        {isHovered && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1 h-0.5 bg-blue-400"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1 h-0.5 bg-blue-400"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0.5 h-1 bg-blue-400"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0.5 h-1 bg-blue-400"></div>
          </>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 1.4 : isHovered ? 0.6 : 1,
          backgroundColor: isHovered ? "#3b82f6" : "#22d3ee",
        }}
        transition={{ duration: 0.08 }}
        className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.9)]"
      />
    </div>
  );
}
