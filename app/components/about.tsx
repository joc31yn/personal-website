"use client";
import AnimateWord from "../utils/animateWord";
import { useMediaQuery } from "../utils/mobile";
import Image from "next/image";
import MatrixGlitchText from "./matrixGlitchText";

export default function About() {
  // const isSmall = useMediaQuery("(max-width: 767px)");
  const isMedium = useMediaQuery("(max-width: 1023px)");
  return (
    // need to chagne to animate on scroll
    <section id="About" className="relative w-full h-screen">
      <AnimateWord
        word={"About"}
        x={"50%"}
        y={!isMedium ? "18%" : "13%"}
        f_smallest={"text-[2.5rem]"}
        f_sm={"text-5xl"}
        f_xl={"text-6xl"}
        border_col={"#ffffff"}
        fill_col={"transparent"}
        pixel={2.25}
        delay={0}
      />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center text-white">
        <div className="absolute top-[15%] md:top-1/2 md:-translate-y-1/2 flex items-center md:items-start flex-col md:flex-row justify-center gap-12 sm:gap-12 md:gap-20 lg:gap-24 w-full h-fit px-8 sm:px-16 md:px-20 lg:px-40">
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 flex-shrink-0">
            <Image
              src="girl_coding.svg"
              alt="girl coding"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 10rem, (max-width: 768px) 14rem, (max-width: 1024px) 18rem, 20rem"
              priority
            />
          </div>
          <p className="text-xl md:text-xl font-opensans px-10 md:px-0 leading-relaxed">
            Hey, I'm Jocelyn :D and I'm currently studying{" "}
            <MatrixGlitchText
              text="Computer Science"
              solveChance={0.15}
              glitchSpeed={100}
              startDelay={100}
            />{" "}
            at the <span className="">University of Waterloo</span>
          </p>
        </div>
      </div>
    </section>
  );
}
