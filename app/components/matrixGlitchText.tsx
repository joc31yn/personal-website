import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface MatrixGlitchTextProps {
  text: string;
  className?: string;
  glitchSpeed?: number;
  solveChance?: number;
  startDelay?: number;
  glowColour?: string;
}

export default function MatrixGlitchText({
  text,
  className = "",
  glitchSpeed = 80,
  solveChance = 0.03,
  startDelay = 500,
  glowColour = "#22c55e",
}: MatrixGlitchTextProps) {
  const matrixChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_?アイウエオカキクケコサシスセソタチツテト";
  const textLen = text.length;
  const [displayText, setDisplayText] = useState(Array(textLen).fill(""));
  const [completedLetters, setCompletedLetters] = useState(
    new Array(textLen).fill(false)
  );

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (inView) {
      // Reset state every time element enters viewport
      setDisplayText(Array(textLen).fill(""));
      setCompletedLetters(new Array(textLen).fill(false));

      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, startDelay);

      return () => clearTimeout(timer);
    } else {
      // Stop animation when out of view
      setIsAnimating(false);
    }
  }, [inView, text, startDelay]);

  // Glitch animation
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        const newText = [...prev];
        // Replace with local completed tracking
        let localCompleted = prev.map((char, i) => completedLetters[i]);

        text.split("").forEach((targetChar, index) => {
          if (!localCompleted[index]) {
            if (targetChar === " ") {
              newText[index] = "\u00A0";
              localCompleted[index] = true;
              return;
            }

            const randomChar =
              matrixChars[Math.floor(Math.random() * matrixChars.length)];
            newText[index] = randomChar;

            if (Math.random() < solveChance + index * 0.01) {
              newText[index] = targetChar;
              localCompleted[index] = true;
            }
          }
        });

        setCompletedLetters(localCompleted); // update state
        return newText;
      });
    }, glitchSpeed);

    return () => clearInterval(interval);
  }, [
    isAnimating,
    completedLetters,
    text,
    glitchSpeed,
    solveChance,
    matrixChars,
  ]);

  // Placeholder before animation starts
  if (!isAnimating && displayText.every((c) => c === "")) {
    return (
      <span ref={ref} className={`font-mono ${className}`}>
        <span className="text-green-400">{"█".repeat(textLen)}</span>
      </span>
    );
  }

  return (
    <span ref={ref}>
      <span className="p-0.5 w-fit rounded-lg">
        <span className={`inline-block font-mono ${className}`}>
          {displayText.map((char, index) => (
            <motion.span
              key={`${text}-${index}`}
              className={`inline-block ${
                completedLetters[index] || text[index] === " "
                  ? "text-current"
                  : "text-green-400"
              }`}
              style={{
                textShadow:
                  completedLetters[index] || text[index] === " "
                    ? "none"
                    : `0 0 8px ${glowColour}, 0 0 12px ${glowColour}`,
                filter:
                  completedLetters[index] || text[index] === " "
                    ? "none"
                    : "brightness(1.2)",
              }}
              animate={
                !completedLetters[index] && text[index] !== " "
                  ? { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }
                  : { scale: 1, opacity: 1 }
              }
              transition={{
                duration: 0.1,
                repeat: completedLetters[index] ? 0 : Infinity,
                ease: "easeInOut",
              }}
            >
              {char || text[index]}
            </motion.span>
          ))}
        </span>
      </span>
    </span>
  );
}
