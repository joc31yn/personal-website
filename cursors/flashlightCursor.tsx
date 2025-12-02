"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FlashlightCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        // dark overlay with circular spotlight
        background: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.95) 100%)`,
        mixBlendMode: "multiply",
      }}
      animate={{}}
    />
  );
}
