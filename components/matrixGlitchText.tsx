import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface MatrixGlitchTextProps {
  text: string;
  className?: string;
  startDelay?: number;
  glowColour?: string;
}

export default function MatrixGlitchText({
  text,
  className = "",
  startDelay = 300,
  glowColour = "#22c55e",
}: MatrixGlitchTextProps) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const textLen = text.length;
  const [displayText, setDisplayText] = useState(Array(textLen).fill(""));
  const [completedLetters, setCompletedLetters] = useState(
    new Array(textLen).fill(false),
  );

  const { ref, inView } = useInView({ threshold: 0.5 });
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
  }, [inView, text, startDelay, textLen]);

  // Alphabet flipping animation
  useEffect(() => {
    if (!isAnimating) return;

    const timers: NodeJS.Timeout[] = [];

    text.split("").forEach((targetChar, index) => {
      // Each letter starts 150ms after the previous one
      const letterStartDelay = index * 100;

      if (targetChar === " ") {
        const timer = setTimeout(() => {
          setDisplayText((prev) => {
            const newText = [...prev];
            newText[index] = "\u00A0";
            return newText;
          });
          setCompletedLetters((prev) => {
            const newCompleted = [...prev];
            newCompleted[index] = true;
            return newCompleted;
          });
        }, letterStartDelay);
        timers.push(timer);
        return;
      }

      const targetLower = targetChar.toLowerCase();
      const targetIndex = alphabet.indexOf(targetLower);
      
      // If the target character is not in the alphabet, just display it
      if (targetIndex === -1) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => {
            const newText = [...prev];
            newText[index] = targetChar;
            return newText;
          });
          setCompletedLetters((prev) => {
            const newCompleted = [...prev];
            newCompleted[index] = true;
            return newCompleted;
          });
        }, letterStartDelay);
        timers.push(timer);
        return;
      }

      // Flip through the alphabet until we reach the target letter
      for (let i = 0; i <= targetIndex; i++) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => {
            const newText = [...prev];
            // Match the case of the original character
            newText[index] = targetChar === targetChar.toUpperCase() 
              ? alphabet[i].toUpperCase() 
              : alphabet[i];
            return newText;
          });

          // Mark as completed when we reach the target letter
          if (i === targetIndex) {
            setCompletedLetters((prev) => {
              const newCompleted = [...prev];
              newCompleted[index] = true;
              return newCompleted;
            });
          }
        }, letterStartDelay + i * 55);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isAnimating, text, alphabet]);

  return (
    <span ref={ref}>
      <span className="p-0.5 w-fit rounded-lg">
        <span className={`inline-block ${className}`}>
          {displayText.map((char, index) => (
            <motion.span
              key={`${text}-${index}`}
              className={`inline-block ${
                completedLetters[index] || text[index] === " "
                  ? "text-white"
                  : "text-green-400"
              }`}
              style={{
                textShadow: completedLetters[index] || text[index] === " "
                  ? "none"
                  : `0 0 8px ${glowColour}, 0 0 12px ${glowColour}`,
                filter: completedLetters[index] || text[index] === " "
                  ? "none"
                  : "brightness(1.2)",
              }}
              animate={
                !completedLetters[index] && text[index] !== " "
                  ? { 
                      rotateX: [0, 180, 360],
                      scale: [1, 1.1, 1]
                    }
                  : { rotateX: 0, scale: 1 }
              }
              transition={{
                duration: 0.05,
                ease: "easeInOut",
              }}
            >
              {text[index] === " " ? "\u00A0" : (char || "#")}
            </motion.span>
          ))}
        </span>
      </span>
    </span>
  );
}
