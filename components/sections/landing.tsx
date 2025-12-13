"use client";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/mobile";
import { ChevronDown } from "lucide-react";
import AnimateWord from "../animateWord";
import { Meteors } from "../ui/meteors";

export default function Landing() {
  const words = ["Hi", "my", "name", "is", "Jocelyn Xu"];
  const isSmall = useIsMobile("(max-width: 767px)");
  const isMedium = useIsMobile("(max-width: 1023px)");

  const pathCoordinates = isSmall
    ? [
        { x: 1, y: 43 },
        { x: 11, y: 50 },
        { x: 22, y: 57 },
        { x: 43, y: 64 },
        { x: 51, y: 70 },
      ]
    : isMedium
      ? [
          { x: 2, y: 13 },
          { x: 11, y: 28 },
          { x: 23, y: 43 },
          { x: 42, y: 58 },
          { x: 52, y: 70 },
        ]
      : [
          { x: 3, y: 11 },
          { x: 12, y: 27 },
          { x: 24, y: 42 },
          { x: 43, y: 57 },
          { x: 53, y: 65 },
        ];
  return (
    <div
      className={`relative w-full h-full min-h-screen font-caveat text-white flex flex-col items-start justify-center`}
    >
      <div className="h-full w-full">
        <Meteors
          number={30}
          angle={50}
          minDuration={1.5}
          maxDuration={3}
          minDelay={3}
          maxDelay={6}
        />
      </div>

      <div aria-label="Hi my name is Jocelyn Xu" className="sr-only">
        Hi my name is Jocelyn Xu
      </div>
      <div className="absolute top-[27%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <AnimateWord
          word="Welcome"
          f_smallest="text-6xl"
          f_sm="text-8xl"
          f_lg="text-8xl"
          border_col="#ffffff"
          fill_col="transparent"
          pixel={2.5}
          delay={2}
          whenInView={false}
          strokeDuration={3.5}
        />
      </div>
      {/* Animated stair path */}
      <svg
        className="absolute top-0 left-0 w-full h-full z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d={
            !isSmall
              ? "M 0 25 L 10 25 L 10 40 L 20 40 L 20 55 L 40 55 L 40 70 L 50 70 L 50 85 L 100 85"
              : "M 0 50 L 10 50 L 10 57 L 21 57 L 21 64 L 42 64 L 42 71 L 50 71 L 50 78 L 100 78"
          }
          fill="transparent"
          stroke="white"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.75, ease: "easeInOut" }}
        />
      </svg>

      {/* Words */}
      <div className="w-auto h-auto z-10">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className={`absolute`}
            style={{
              fontSize: isSmall
                ? i === words.length - 1
                  ? "3.1rem"
                  : "2.5rem"
                : isMedium
                  ? i === words.length - 1
                    ? "6rem"
                    : "3.75rem"
                  : i === words.length - 1
                    ? "8.25rem"
                    : "5rem",
              left: `${pathCoordinates[i]?.x}%`,
              top: `${pathCoordinates[i]?.y}%`,
              fontWeight: 600,
            }}
            initial={{ opacity: 0, rotate: -180, y: -250 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            transition={{
              delay: 0.21 + i * 0.4,
              duration: 0.65,
              type: "spring",
            }}
          >
            {i !== words.length - 1 ? (
              word
            ) : (
              <span className="text-white">{word}</span>
            )}
          </motion.span>
        ))}
      </div>
      <a
        href="#About"
        className={`absolute ${
          isSmall ? "bottom-5" : "bottom-0"
        } left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center cursor-pointer hover:scale-110 duration-100 z-10`}
        aria-label="Scroll to About section"
      >
        <span className="text-2xl md:text-[2rem] -mb-2">About</span>
        <ChevronDown className="w-10 h-10 md:w-12 md:h-12 stroke-[1.5]" />
      </a>
    </div>
  );
}
