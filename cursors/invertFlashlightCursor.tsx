"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function InvertFlashlightCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Inverted circle that follows the cursor */}
      <motion.div
        style={{
          position: "fixed",
          top: pos.y - 100,
          left: pos.x - 100,
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          background: "white",
        }}
        animate={{
          top: pos.y - 100,
          left: pos.x - 100,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.3,
        }}
      />
    </>
  );
}
