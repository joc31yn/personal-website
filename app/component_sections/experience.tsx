"use client";
import AnimateWord from "../components/animateWord";
import { useMediaQuery } from "../components/mobile";

export default function Experience() {
  const isSmall = useMediaQuery("(max-width: 767px)");
  const isMedium = useMediaQuery("(max-width: 1023px)");
  return (
    // need to chagne to animate on scroll
    <section
      id="Experience"
      className="w-full min-h-screen h-full flex flex-col items-center"
    >
      <div className="mt-20">
        <AnimateWord
          word="Experience"
          f_smallest="text-[2.5rem]"
          f_sm="text-5xl"
          f_lg="text-6xl"
          border_col="#ffffff"
          fill_col="transparent"
          pixel={1.5}
          delay={0}
          once={false}
          strokeDuration={2.5}
        />
      </div>
    </section>
  );
}
