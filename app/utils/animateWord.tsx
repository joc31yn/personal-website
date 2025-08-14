import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimateWordProps {
  word: string;
  x: string;
  y: string;
  f_smallest: string;
  f_sm: string;
  f_xl: string;
  border_col: string;
  fill_col: string;
  pixel: number;
  delay: number;
}
export default function AnimateWord(props: AnimateWordProps) {
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
          duration: 3.5,
          ease: "easeInOut",
          delay: props.delay,
        },
        fillOpacity: {
          duration: 1,
          ease: "easeOut",
          delay: props.delay + 1,
        },
      },
    },
  };
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <motion.svg
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        initial="hidden"
        animate="visible"
      >
        <motion.text
          x={props.x}
          y={props.y}
          textAnchor="middle"
          className={`font-sora font-bold ${
            dimensions.width < 640
              ? props.f_smallest
              : dimensions.width < 1024
              ? props.f_sm
              : props.f_xl
          } truncate`}
          style={{
            stroke: props.border_col,
            strokeWidth: dimensions.width < 768 ? props.pixel - 1 : props.pixel,
            fill: props.fill_col,
          }}
          variants={textVariants}
        >
          {props.word}
        </motion.text>
      </motion.svg>
    </>
  );
}
