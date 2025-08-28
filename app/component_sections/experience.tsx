"use client";
import AnimateWord from "../components/animateWord";
import BallCavas from "@/app/components/canvas/BallCanvas";
import SectionWrapper from "../hoc/SectionWrapper";
import { useEffect, useRef, useState } from "react";

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
  // {
  //   name: "SQL",
  //   icon: "/languages/sql.svg",
  // },
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
    name: "Next.js",
    icon: "/frameworks-tools/nextjs.png",
  },
  {
    name: "Flask",
    icon: "/frameworks-tools/flask.png",
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
    name: "PostgreSQL",
    icon: "/databases/postgresql.svg",
  },
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

const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLElement | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); // only once
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-100px",
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

const Experience = () => {
  const [sectionRef, isInView] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-50px",
  });

  const renderBallCanvases = (
    title: string,
    data: { name: string; icon: string }[]
  ) => (
    <>
      <p className="text-5xl font-caveat font-bold text-center">{title}</p>
      <div className="flex flex-row gap-16 flex-wrap justify-center my-10">
        {data.map((tech) => (
          <div className="w-20 h-20 sm:w-24 sm:h-24" key={tech.name}>
            <BallCavas icon={tech.icon} />
          </div>
        ))}
      </div>
    </>
  );
  return (
    // need to chagne to animate on scroll
    <section
      ref={sectionRef}
      id="Experience"
      className="w-full min-h-screen h-full flex flex-col items-center text-white"
    >
      <div className="mt-24 mb-10">
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
      {isInView && (
        <div>
          {renderBallCanvases("Languages", languages)}
          {renderBallCanvases("Framework & Tools", frameworksTools)}
          {renderBallCanvases("Databases", databases)}
        </div>
      )}
    </section>
  );
};

export default SectionWrapper(Experience);
