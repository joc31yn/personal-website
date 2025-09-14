import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { easeInOut, easeOut } from "framer-motion";

interface AnimateWordProps {
  word: string;
  f_smallest: string;
  f_sm: string;
  f_lg: string;
  border_col: string;
  fill_col: string;
  pixel: number;
  delay: number;
  once?: boolean;
  strokeDuration: number;
  whenInView?: boolean;
}

export default function AnimateWord({
  word,
  f_smallest,
  f_sm,
  f_lg,
  border_col,
  fill_col,
  pixel,
  delay,
  once = true,
  strokeDuration,
  whenInView = true,
}: AnimateWordProps) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [textBounds, setTextBounds] = useState({
    width: 0,
    height: 0,
  });
  const textRef = useRef<SVGTextElement>(null);
  const measureRef = useRef<SVGTextElement>(null);

  const textVariants = {
    hidden: {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
      fillOpacity: 0,
    },
    visible: {
      strokeDashoffset: 0,
      fillOpacity: 1,
      transition: {
        strokeDashoffset: {
          duration: strokeDuration,
          ease: easeInOut,
          delay: delay,
        },
        fillOpacity: {
          duration: 1,
          ease: easeOut,
          delay: delay + 1,
        },
      },
    },
  };

  const motionProps = whenInView
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: {
          once: once,
          amount: 0.3,
          margin: "0px 0px -100px 0px",
        },
      }
    : {
        initial: "hidden",
        animate: "visible",
      };

  // Get current font size class based on screen width
  const getFontSizeClass = (width: number) => {
    if (width < 640) return f_smallest;
    if (width < 1024) return f_sm;
    return f_lg;
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    handleResize();

    // Debounce resize events to prevent excessive re-renders
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Measure text dimensions after dimensions change
  useEffect(() => {
    if (measureRef.current && dimensions.width > 0) {
      // Small delay to ensure DOM has updated after resize
      const measureText = () => {
        try {
          const bbox = measureRef.current?.getBBox();
          if (bbox) {
            setTextBounds({
              width: Math.ceil(bbox.width),
              height: Math.ceil(bbox.height),
            });
          }
        } catch (error) {
          // Fallback if getBBox fails during resize
          console.warn("getBBox failed, retrying...", error);
          setTimeout(measureText, 50);
        }
      };
      requestAnimationFrame(measureText);
    }
  }, [dimensions, pixel, word, f_smallest, f_sm, f_lg]);

  if (dimensions.width === 0 || textBounds.width === 0) {
    return (
      // Hidden measuring SVG with consistent styling
      <svg
        style={{
          position: "absolute",
          visibility: "hidden",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      >
        <text
          ref={measureRef}
          className={`font-sora font-bold ${getFontSizeClass(
            dimensions.width
          )}`}
          style={{
            strokeWidth: pixel,
            stroke: border_col,
            fill: fill_col,
          }}
        >
          {word}
        </text>
      </svg>
    );
  }

  const strokeWidth = pixel;
  const centerX = textBounds.width / 2;
  const centerY = textBounds.height / 2;

  return (
    <motion.svg
      width={textBounds.width}
      height={textBounds.height}
      viewBox={`0 0 ${textBounds.width} ${textBounds.height}`}
      className="inline-block"
    >
      <motion.text
        ref={textRef}
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`font-sora font-bold ${getFontSizeClass(dimensions.width)}`}
        style={{
          stroke: border_col,
          strokeWidth: strokeWidth,
          fill: fill_col,
        }}
        variants={textVariants}
        {...motionProps}
      >
        {word}
      </motion.text>
    </motion.svg>
  );
}
