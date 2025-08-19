"use client";
import AnimateWord from "../components/animateWord";
import { useMediaQuery } from "../components/mobile";
import BallCavas from "@/app/components/canvas/BallCanvas";

const languages = [
  {
    name: "Java",
    icon: "/languages/java.svg",
  },
  {
    name: "Python",
    icon: "/languages/python.svg",
  },
  {
    name: "Webdev",
    icon: "/languages/webdev.svg",
  },
  {
    name: "C",
    icon: "/languages/c.svg",
  },
  {
    name: "Racket",
    icon: "/languages/racket.svg",
  },
  {
    name: "SQL",
    icon: "/languages/sql.svg",
  },
]

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
      <div className="flex flex-row gap-16 flex-wrap justify-center mt-10">
        {languages.map((tech) => (<div className="w-20 h-20 sm:w-24 sm:h-24" key={tech.name}>
          <BallCavas icon={tech.icon} />
        </div>))}
      </div>
    </section>
  );
}
