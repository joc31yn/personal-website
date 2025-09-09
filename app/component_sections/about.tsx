"use client";
import AnimateWord from "../components/animateWord";
import Image from "next/image";
import MatrixGlitchText from "../components/matrixGlitchText";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Carousel from "../components/carousel";
import SectionWrapper from "../hoc/SectionWrapper";
import Link from "next/link";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 750 });
  });

  return (
    <section id="About" className="w-full h-full flex flex-col items-center">
      <div className="mt-24">
        <AnimateWord
          word="About"
          f_smallest="text-[2.5rem]"
          f_sm="text-5xl"
          f_lg="text-6xl"
          border_col="#ffffff"
          fill_col="transparent"
          pixel={1.5}
          delay={0}
          strokeDuration={2.5}
        />
      </div>

      <div className="w-full flex justify-center text-white md:mt-16 xl:my-24 max-w-[1440px]">
        <div className="flex items-center flex-col md:flex-row justify-center gap-8 md:gap-16 lg:gap-24 w-full h-full">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-once="true"
            className="relative mt-5 md:mt-0 w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 flex-shrink-0"
          >
            <Image
              className="md:-rotate-[8deg]"
              src="/headshot.png"
              alt="headshot"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 12rem, (max-width: 768px) 14rem, (max-width: 1024px) 18rem, 24rem"
              priority
            />
          </div>
          <div
            className="flex flex-col text-lg sm:text-[22px] font-lato"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-anchor-placement="top-bottom"
          >
            <p className="leading-relaxed xl:mb-10 text-center md:text-left">
              Hey, I&apos;m Jocelyn :D and I&apos;m currently in my 2nd year
              studying{" "}
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-xl font-mono text-green-400 font-semibold text-glow-green">
                  {"{"}
                </span>
                <MatrixGlitchText
                  className="sm:text-xl"
                  text="Computer Science"
                  solveChance={0.15}
                  glitchSpeed={100}
                  startDelay={100}
                />
                <span className="text-xl font-mono text-green-400 font-semibold text-glow-green">
                  {"}"}
                </span>
              </span>{" "}
              at the{" "}
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-xl font-mono text-waterlooYellow font-semibold text-glow-yellow">
                  {"{"}
                </span>{" "}
                <span className="sm:text-xl font-mono">
                  University of Waterloo
                </span>{" "}
                <span className="text-xl font-mono text-waterlooYellow font-semibold text-glow-yellow">
                  {"}"}
                </span>
              </span>
              . I&apos;m currently on co-op working at{" "}
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-xl font-mono text-[#0078C1] font-semibold text-glow-blue">
                  {"{"}
                </span>{" "}
                <span className="sm:text-xl font-mono">BMO</span>{" "}
                <span className="text-xl font-mono text-[#0078C1] font-semibold text-glow-blue">
                  {"}"}
                </span>
              </span>{" "}
              as a Software Developer! But enough about career [find more in the{" "}
              <Link href="#Experience">
                <span className="">next sections</span>
              </Link>{" "}
              ;)]... In my free time I LOVE playing ping pong and badminton, or
              any sport at that. If you ever find me, invite me to a game, I
              love the challenge and getting to meet new people {"\u{1F929}"}
            </p>
            <div>
              <p className="mb-2 sm:mb-8 text-lg md:text-[22px]">
                A couple snapshots of my interests&nbsp;&nbsp;📸
              </p>
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SectionWrapper(About);
