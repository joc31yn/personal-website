"use client";
import AnimateWord from "../utils/animateWord";
import { useMediaQuery } from "../utils/mobile";

export default function Projects() {
  const isSmall = useMediaQuery("(max-width: 767px)");
  const isMedium = useMediaQuery("(max-width: 1023px)");
  return (
    // need to chagne to animate on scroll
    <section id="Projects" data-guidestar="true">
      <AnimateWord
        word={"Projects"}
        x={"50%"}
        y={isSmall ? "6%" : isMedium ? "8%" : "10%"}
        f_smallest={"text-4xl"}
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
