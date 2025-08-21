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
];

const frameworksTools = [
  {
    name: "React",
    icon: "/frameworks-tools/react.svg",
  },
    {
    name: "Angular",
    icon: "/frameworks-tools/angular.svg",
  },
  {
    name: "Tailwind",
    icon: "/frameworks-tools/tailwind.svg",
  },
  {
    name: "Git",
    icon: "/frameworks-tools/git.svg",
  },
  {
    name: "Node",
    icon: "/frameworks-tools/node.svg",
  },
];

const databases = [
  {
    name: "Supabase",
    icon: "/databases/supabase.svg",
  },
    {
    name: "MongoDB",
    icon: "/databases/mongo.svg",
  },
  {
    name: "Neon",
    icon: "/databases/neon.svg",
  },
];

export default function Experience() {
  const renderBallCanvases = (title: string, data: {name: string, icon: string}[]) => (
    <>
    <p className="text-5xl font-caveat font-bold">{title}</p>
      <div className="flex flex-row gap-16 flex-wrap justify-center my-10">
        {data.map((tech) => (
          <div className="w-20 h-20 sm:w-24 sm:h-24" key={tech.name}>
            <BallCavas icon={tech.icon} />
          </div>
        ))}
      </div>
    </>
  )
  return (
    // need to chagne to animate on scroll
    <section
      id="Experience"
      className="w-full min-h-screen h-full flex flex-col items-center text-white"
    >
      <div className="mt-20 mb-10">
        <AnimateWord
          word="Experience"
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
      {renderBallCanvases("Languages", languages)}
      {renderBallCanvases("Framework & Tools", frameworksTools)}
      {renderBallCanvases("Databases", databases)}
    </section>
  );
}
