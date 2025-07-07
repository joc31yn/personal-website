"use client";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/app/utils/mobile";
import { Caveat } from "next/font/google";
import AnimateWord from "@/app/utils/animateWord";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Landing() {
  const words = ["Hi", "my", "name", "is", "Jocelyn Xu"];
  const isSmall = useMediaQuery("(max-width: 767px)");
  const isMedium = useMediaQuery("(max-width: 1023px)");

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
        { x: 3, y: 6 },
        { x: 12, y: 22 },
        { x: 24, y: 37 },
        { x: 43, y: 52 },
        { x: 53, y: 60 },
      ];
  return (
    <div
      className={`relative w-full h-full min-h-screen ${caveat.className} text-white flex flex-col items-start justify-center`}
    >
      <Image
        className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-[40%]"
        src="moon.svg"
        alt="moon"
        width={700}
        height={700}
      />
      <AnimateWord
        word="Welcome"
        x="50%"
        y="20%"
        f_smallest="text-[4rem]"
        f_sm="text-8xl"
        f_xl="text-[8rem]"
        border_col="#ffffff"
        fill_col="#000000"
        pixel={3}
        delay={2}
      />
      {/* Animated stair path */}
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={
            !isSmall
              ? "M 0 20 L 10 20 L 10 35 L 20 35 L 20 50 L 40 50 L 40 65 L 50 65 L 50 80 L 100 80"
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
      <div className="w-auto h-auto">
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
              <span
                className="text-white"
                // style={{
                //   textShadow: `
                //   0 0 2px white,
                //   0 0 4px white,
                //   0 0 6px white,
                //   0 0 8px white,
                //   0 0 10px white
                //   `,
                // }}
              >
                {word}
              </span>
            )}
          </motion.span>
        ))}
      </div>
      <a
        href="#About"
        className="absolute bottom-[8%] left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center cursor-pointer hover:scale-110 duration-100"
      >
        <span className="text-2xl md:text-[2rem] -mb-3">About</span>
        <ChevronDown className="w-10 h-10 md:w-12 md:h-12 stroke-[1.5]" />
      </a>
    </div>
  );
}
