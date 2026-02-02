"use client";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionWrapper from "../../app/hoc/SectionWrapper";
import Link from "next/link";
import { GraduationCap, SquareTerminal, BriefcaseBusiness } from "lucide-react";
import AnimateWord from "@/components/animateWord";
import Carousel from "@/components/carousel";
import MatrixGlitchText from "@/components/matrixGlitchText";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 750 });
  });

  return (
    <section
      id="About"
      className="w-full h-full flex flex-col items-center"
      aria-labelledby="about-heading"
    >
      <h2 id="about-heading" className="sr-only">
        About Me
      </h2>
      <div className="mt-12">
        <AnimateWord
          word="About"
          f_smallest="text-5xl"
          f_sm="text-5xl"
          f_lg="text-6xl"
          border_col="#ffffff"
          fill_col="transparent"
          pixel={1.5}
          delay={0}
          strokeDuration={2.5}
        />
      </div>

      <div className="w-full flex justify-center text-white md:mt-16 xl:my-16 max-w-[1440px]">
        <div className="flex items-center flex-col md:flex-row justify-center gap-8 md:gap-16 lg:gap-24 w-full h-full">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            className="relative mt-5 md:mt-0 w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 flex-shrink-0"
          >
            <Image
              className="md:-rotate-[8deg] object-contain"
              src="/headshot.png"
              alt="Portrait of Jocelyn Xu"
              fill
              sizes="(max-width: 640px) 12rem, (max-width: 768px) 14rem, (max-width: 1024px) 18rem, 24rem"
              quality={80}
              priority
            />
          </div>
          <div
            className="flex flex-col text-base sm:text-[22px] md:text-xl lg:text-[22px] font-lato"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div className="leading-relaxed xl:mb-10 text-center md:text-left">
              Hey, I&apos;m Jocelyn :D and I&apos;m currently in my 2nd year
              studying{" "}
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-xl font-mono text-green-400 font-semibold text-glow-green">
                  {"{"}
                </span>
                <SquareTerminal className="w-5 h-5 text-green-400" />
                <MatrixGlitchText
                  className="sm:text-xl font-mono tracking-wide"
                  text="Computer Science"
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
                <div className="sm:text-xl font-mono tracking-wide flex-row inline-flex items-center">
                  <GraduationCap
                    className="w-6 h-6 text-waterlooYellow"
                    strokeWidth={1.75}
                  />
                  &nbsp;University of Waterloo
                </div>{" "}
                <span className="text-xl font-mono text-waterlooYellow font-semibold text-glow-yellow">
                  {"}"}
                </span>
              </span>
              . I am back on study, just wrapping up my previous internship at
              &nbsp;
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-xl font-mono text-[#0078C1] font-semibold text-glow-blue">
                  {"{"}
                </span>{" "}
                <div className="sm:text-xl font-mono tracking-widest inline-flex flex-row items-center">
                  <BriefcaseBusiness className="w-5 h-5 text-[#0078C1]" />
                  &nbsp;BMO
                </div>
                <span className="text-xl font-mono text-[#0078C1] font-semibold text-glow-blue">
                  {"}"}
                </span>
              </span>{" "}
              as a Software Developer! But enough about career
              ... In my free time I LOVE playing ping pong and badminton, or any
              sport at that. If you ever find me, invite me to a game, I love
              the challenge and getting to meet new people {"\u{1F929}"}
            </div>
            <div>
              <p className="mb-3 mt-8 sm:mb-8 sm:mt-0 pt-5 text-base md:text-[22px] font-bold">
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
