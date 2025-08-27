"use client";

import { motion } from "framer-motion";

interface ProjectChipProps {
  text: string;
  border_bg: string;
}

export default function ProjectChip({ text, border_bg }: ProjectChipProps) {
  return (
    <motion.div
      className={`relative w-fit px-3 py-1.5 rounded-lg text-xs font-medium text-white overflow-hidden`}
      style={{ border: `1px solid #${border_bg}` }}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: [
          "0 0 0 0 rgba(255,255,255,0)",
          `0 0 10px 2px #${border_bg}40`,
          "0 0 0 0 rgba(255,255,255,0)",
        ],
      }}
      transition={{
        duration: 0.6,
        boxShadow: {
          duration: 3,
          repeat: Infinity,
          repeatDelay: 4,
        },
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 15px 4px #${border_bg}60`,
        transition: { duration: 0.2 },
      }}
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 -skew-x-12"
        style={{
          background: `linear-gradient(135deg, transparent, #${border_bg}75, transparent)`,
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      />

      <span
        className={`relative z-10 font-semibold`}
        style={{ color: `#${border_bg}` }}
      >
        {text}
      </span>
    </motion.div>
  );
}
