"use client";
import AnimateWord from "../components/animateWord";
import BallCavas from "@/app/components/canvas/BallCanvas";
import SectionWrapper from "../hoc/SectionWrapper";
import { useEffect, useRef, useState } from "react";
import BigDipperTimeline from "../components/bigDipperTimeline";

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

const items = [
  {
    id: "1",
    title: "Bank of Montreal Software Developer",
    displayTitle: "BMO Software Developer",
    date: "May 2025 — Present",
    summary: "Lexicon Design System: Created 10+ responsive, WCAG 2.2 AA accessible Web Components, expanding the use of the Lexicon Design System to 300+ developers, designers, and UX teams. By automating 250+ unit and E2E tests with Jest and Playwright and managing bi-weekly releases with semantic versioning, I boosted developer efficiency by 48% and improved accessibility, UI/UX, and consistency for 60,000+ clients.",
  },
  {
    id: "2",
    title: "UW Datascience Club VP",
    displayTitle: "UW Datascience Club",
    date: "Dec 2025 — Present",
    summary: "CxC (datathon) Coordinator, Developer, Vice President of Development",
  },
  {
    id: "3",
    title: "TEDxUW SWE",
    displayTitle: "TEDxUW SWE",
    date: "May 2025 — Present",
    summary: "Category win",
  },
  {
    id: "4",
    title: "Internship",
    displayTitle: "testtest",
    date: "2022",
    summary: "Frontend intern",
  },
  {
    id: "5",
    title: "MERN App",
    displayTitle: "testtest",
    date: "2023",
    summary: "Shipped",
  },
  {
    id: "6",
    title: "Datathon Lead",
    displayTitle: "testest",
    date: "2024",
    summary: "Organized",
  },
  {
    id: "7",
    title: "Now",
    displayTitle: "testsetestes",
    date: "2025",
    summary: "Building delightful UX",
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
      <div className="w-full mb-10">
        <BigDipperTimeline items={items} title="" subtitle="" />
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
