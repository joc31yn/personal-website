import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ConstellationHintText() {
  const [showConstellationName, setShowConstellationName] = useState(false);
  return (
    <button
      onClick={() => setShowConstellationName((prev) => !prev)}
      className="flex flex-col items-center justify-center group z-20 text-left my-5 relative hover:scale-[107%] duration-200"
      aria-label="Recognize the constellation?"
    >
      <AnimatePresence mode="wait">
        {!showConstellationName ? (
          <motion.p
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white font-light tracking-wider text-base md:text-xl cursor-pointer hover:scale-105 transition-transform duration-200"
            style={{
              filter: "drop-shadow(0 0 3px rgba(255,255,255,0.4))",
            }}
          >
            Recognize the constellation?
          </motion.p>
        ) : (
          <>
            <motion.p
              key="answer-desktop"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-white font-medium tracking-wider text-base md:text-xl cursor-pointer hidden md:block"
              style={{
                filter:
                  "drop-shadow(0 0 6px rgba(255,255,255,0.6)) drop-shadow(0 0 12px rgba(255,255,255,0.3))",
              }}
            >
              The Big Dipper
            </motion.p>
            <motion.p
              key="answer-mobile"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-white font-medium tracking-wider text-base md:text-xl cursor-pointer block md:hidden"
              style={{
                filter:
                  "drop-shadow(0 0 6px rgba(255,255,255,0.6)) drop-shadow(0 0 12px rgba(255,255,255,0.3))",
              }}
            >
              Orion's Belt
            </motion.p>
          </>
        )}
      </AnimatePresence>

      {/* Subtle glow effect */}
      <div
        className="absolute inset-0 bg-white rounded-full blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ transform: "scale(1.5)" }}
      ></div>
      <div
        className="absolute top-2 right-1 w-[1.5px] h-[1.5px] bg-white rounded-full opacity-80 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "0s" }}
      ></div>
      <div
        className="absolute bottom-3 -left-1 w-1 h-1 bg-white rounded-full opacity-70 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-0 w-[2.5px] h-[2.5px] bg-white rounded-full opacity-60 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-0 left-1/3 w-[1.5px] h-[1.5px] bg-white rounded-full opacity-60 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "2.5s" }}
      ></div>
      <div
        className="absolute top-0 left-2 w-[2px] h-[2px] bg-white rounded-full opacity-60 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "3.5s" }}
      ></div>
      <div
        className="absolute bottom-1 left-1/4 w-[2.5px] h-[2.5px] bg-white rounded-full opacity-60 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute bottom-1 left-2/5 w-[1px] h-[1px] bg-white rounded-full opacity-60 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1 right-1/2 w-1 h-1 bg-white rounded-full opacity-70 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-1 right-5 w-1 h-1 bg-white rounded-full opacity-70 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "3.5s" }}
      ></div>
      <div
        className="absolute top-1 right-8 w-[2px] h-[2px] bg-white rounded-full opacity-70 animate-ping"
        style={{ animationDuration: "2s", animationDelay: "1s" }}
      ></div>
    </button>
  );
}
