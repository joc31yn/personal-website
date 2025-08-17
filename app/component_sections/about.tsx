"use client";
import AnimateWord from "../components/animateWord";
import { useMediaQuery } from "../components/mobile";
import Image from "next/image";
import MatrixGlitchText from "../components/matrixGlitchText";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Carousel from "../components/carousel";

export default function About() {
  const isMedium = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    AOS.init({ duration: 750 });
  });

  return (
    // need to chagne to animate on scroll
    <section id="About" className="relative w-full min-h-screen">
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
        once={false}
        strokeDuration={2.5}
      />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center text-white">
        <div className="absolute top-[15%] md:top-1/2 md:-translate-y-1/2 flex items-center flex-col md:flex-row justify-center gap-12 sm:gap-12 md:gap-20 lg:gap-24 w-full h-fit px-8 sm:px-16 md:px-20 lg:px-40">
          <div
            data-aos="fade-up-right"
            data-aos-anchor-placement="top-bottom"
            data-aos-once="true"
            className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 flex-shrink-0"
          >
            <Image
              src="girl_coding.svg"
              alt="girl coding"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 10rem, (max-width: 768px) 14rem, (max-width: 1024px) 18rem, 20rem"
              priority
            />
          </div>
          <div className="flex flex-col gap-10 text-base sm:text-lg font-lato">
            <p
              data-aos="fade-up-left"
              data-aos-once="true"
              data-aos-anchor-placement="top-bottom"
              className="px-10 md:px-0 leading-relaxed"
            >
              Hey, I'm Jocelyn :D and I'm currently studying{" "}
              <MatrixGlitchText
                className="text-xl"
                text="Computer Science"
                solveChance={0.15}
                glitchSpeed={100}
                startDelay={100}
              />{" "}
              at the <span className="text-xl">University of Waterloo</span>.
              I'm currently on co-op working at BMO as a Software Developer! But
              enough about careers [find more in the next sections ;)]... In my
              free time I LOVE playing ping pong and badminton, or any sport at
              that. If you ever find me, invite me to a game, I love the
              challenge and getting to meet new people 🤩
            </p>
            <p
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-once="true"
            >
              A couple snapshots of my hobbies&nbsp;&nbsp;📸
            </p>
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-once="true"
            >
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
