"use client";
import AnimateWord from "../utils/animateWord";
import { useMediaQuery } from "../utils/mobile";

export default function Experience() {
  const isSmall = useMediaQuery("(max-width: 767px)");
  const isMedium = useMediaQuery("(max-width: 1023px)");
  return (
    // need to chagne to animate on scroll
    <section id="Experience" data-guidestar="true">
      <AnimateWord
        word={"Experience"}
        x={"50%"}
        y={!isMedium ? "10%" : "8%"}
        f_smallest={"text-[2.5rem]"}
        f_sm={"text-5xl"}
        f_xl={"text-6xl"}
        border_col={"#ffffff"}
        fill_col={"transparent"}
        pixel={2.25}
        delay={0}
      />
    </section>
  );
}
