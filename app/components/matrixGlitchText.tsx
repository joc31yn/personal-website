import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+.?アイウエオカキクケコサシスセソタチツテト";
  const textLen = text.length;
  const [displayText, setDisplayText] = useState(Array(textLen).fill(""));
  const [completedLetters, setCompletedLetters] = useState(
    new Array(textLen).fill(false)
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayText(Array(textLen).fill(""));
    setCompletedLetters(new Array(textLen).fill(false));
    setIsAnimating(false);

    // Start animation after delay
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, startDelay]);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        const newText = [...prev];
        const newCompleted = [...completedLetters]; // Track locally

        text.split("").forEach((targetChar, index) => {
          if (!newCompleted[index]) {
            // Use local copy
            if (targetChar === " ") {
              newText[index] = "\u00A0";
              newCompleted[index] = true;
              return;
            }

            const randomChar =
              matrixChars[Math.floor(Math.random() * matrixChars.length)];
            newText[index] = randomChar;

            if (Math.random() < solveChance + index * 0.01) {
              newText[index] = targetChar;
              newCompleted[index] = true; // Update local copy
            }
          }
        });

        // Update completed letters state
        setCompletedLetters(newCompleted);
        return newText;
      });
    }, glitchSpeed);

    // Check if all letters are completed
    const allCompleted = completedLetters.every(
      (completed, index) => completed || text[index] === " "
    );

    if (allCompleted) {
      setIsAnimating(false);
    }

    return () => clearInterval(interval);
  }, [isAnimating, completedLetters, text, glitchSpeed, solveChance]);

  if (!isAnimating && displayText.every((char) => char === "")) {
    // Show placeholder blocks before animation starts
    return (
      <span className={`font-mono ${className}`}>
        <span className="text-green-400">{"█".repeat(textLen)}</span>
      </span>
    );
  }

  return (
    <span className="border-2 border-green-400 p-0.5 w-fit rounded-lg">
      <span className={`inline-block font-mono ${className}`}>
        {displayText.map((char, index) => (
          <motion.span
            key={`${text}-${index}`}
            className={`inline-block ${
              completedLetters[index] || text[index] === " "
                ? "text-current" // text-current
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
                ? {
                    scale: [1, 1.05, 1],
                    opacity: [1, 0.8, 1],
                  }
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
  );
}
