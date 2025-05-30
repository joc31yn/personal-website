import { motion } from "framer-motion";
import { Sora } from "next/font/google";
import { useState, useEffect } from "react";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
});

interface AnimateWordProps {
  word: string;
  x: string;
  y: string;
  f_smallest: string;
  f_sm: string;
  f_xl: string;
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
    width: window.innerWidth,
    height: window.innerHeight,
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
          className={`${sora.className} font-bold z-1 ${
            dimensions.width < 640
              ? props.f_smallest
              : dimensions.width < 1024
              ? props.f_sm
              : props.f_xl
          } truncate`}
          style={{
            stroke: "#fcba03", // #6000d6
            strokeWidth: "2.5px",
            fill: "#ffffff",
          }}
          variants={textVariants}
        >
          {props.word}
        </motion.text>
      </motion.svg>
    </>
  );
}
