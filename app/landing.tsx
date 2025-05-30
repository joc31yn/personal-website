"use client";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/app/utils/mobile";
import { Sora, Caveat } from "next/font/google";
import AnimateWord from "@/app/utils/animateWord";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Landing() {
  const words = ["Hi", "my", "name", "is", "Jocelyn Xu"];
  const isSmall = useMediaQuery("(max-width: 640px)");
  const isMedium = useMediaQuery("(max-width: 1024px)");
  const pathCoordinates = isSmall
    ? [
        { x: 1, y: 43 },
        { x: 11, y: 50 },
        { x: 22, y: 57 },
        { x: 43, y: 64 },
        { x: 52, y: 71 },
      ]
    : isMedium
    ? [
        { x: 2, y: 28 },
        { x: 11, y: 43 },
        { x: 23, y: 58 },
        { x: 42, y: 73 },
        { x: 52, y: 85 },
      ]
    : [
        { x: 3, y: 21 },
        { x: 12, y: 37 },
        { x: 24, y: 52 },
        { x: 43, y: 67 },
        { x: 54, y: 74 },
      ];
  return (
    <div
      className={`relative w-full h-screen ${caveat.className} bg-black text-white flex flex-col items-start justify-center`}
    >
      <AnimateWord
        word="Welcome"
        x="50%"
        y="35%"
        f_smallest="text-[4rem]"
        f_sm="text-8xl"
        f_xl="text-[8rem]"
        delay={2}
      />
      {/* Animated stair path */}
      <svg
        className="absolute top-0 left-0 w-full h-full z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={
            !isSmall
              ? "M 0 35 L 10 35 L 10 50 L 20 50 L 20 65 L 40 65 L 40 80 L 50 80 L 50 95 L 100 95"
              : "M 0 50 L 10 50 L 10 57 L 21 57 L 21 64 L 42 64 L 42 71 L 50 71 L 50 78 L 100 78"
          }
          fill="transparent"
          stroke="white"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          // style={{
          //   filter: `
          //   drop-shadow(0 0 0.5px white)
          //   drop-shadow(0 0 1px #200589)
          //   drop-shadow(0 0 2px #200589)
          // `,
          // }}
        />
      </svg>

      {/* Words */}
      <div className="z-10">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className={`absolute top-0 left-0`}
            style={{
              fontSize: isSmall
                ? i === words.length - 1
                  ? "3rem"
                  : "2.5rem"
                : isMedium
                ? i === words.length - 1
                  ? "6rem"
                  : "3.75rem"
                : i === words.length - 1
                ? "8.25rem"
                : "5rem",
              left: `calc(${pathCoordinates[i]?.x || 0}%)`,
              top: `calc(${pathCoordinates[i]?.y || 0}%)`,
              fontWeight: 600,
            }}
            initial={{ opacity: 0, rotate: -90, y: -200 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            transition={{
              delay: 0.21 + i * 0.4,
              duration: 0.6,
              type: "spring",
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
