"use client";
import AnimateWord from "../components/animateWord";
import BallCavas from "@/app/components/canvas/BallCanvas";
import SectionWrapper from "../hoc/SectionWrapper";
import { useEffect, useRef, useState } from "react";
import BigDipperTimeline from "../components/bigDipperTimeline";
import { useIsMobile } from "@/hooks/mobile";

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
  // {
  //   name: "Neon",
  //   icon: "/databases/neon.svg",
  // },
];

const items = [
  {
    id: "1",
    title: "Bank of Montreal Software Developer",
    displayTitle: "BMO Software Developer",
    date: "May 2025 — Present",
    summary: [
      "AI Chatbot: Engineered a serverless chatbot platform powered by AWS Lambda, S3, and Bedrock Knowledge Base, with automated ingestion pipelines for transcripts (PDFs) and web-scraped banking content to enhance customer query coverage and reduce manual support needs.",
      "Lexicon Design System: Created 10+ responsive, WCAG 2.2 AA accessible Web Components, expanding the use of the Lexicon Design System to 300+ developers, designers, and UX teams. Automated 250+ unit and E2E tests with Jest and Playwright and managed bi-weekly releases with semantic versioning to streamline developer efficiency by 48%.",
    ],
  },
  {
    id: "2",
    title: "UW Datascience Club VP",
    displayTitle: "UW Datascience Club VP",
    date: "Dec 2025 — Present",
    summary: [
      "CxC (Data Hackathon) Coordinator: Organized Canada's largest student-run data hackathon.",
      "Developer: maintained and added new features for uwdsc website, events, and student resources.",
      "Vice President of Development: led a team of 8 members to revamp the uwdsc website and create the CxC application portal",
    ],
  },
  {
    id: "3",
    title: "TEDxUW SWE",
    displayTitle: "TEDxUW SWE",
    date: "May 2025 — Nov 2025",
    summary: [
      "Built the 2025 TEDxUW conference site with dynamic speaker/organizer profiles, themes + timeline visualization, and a secure Stripe ticket purchasing flow.",
    ],
  },
  {
    id: "4",
    title: "Graduated Highschool",
    displayTitle: "Graduated Highschool",
    date: "June 2024",
    summary: [
      "YRDSB Director's Achievement Award (Highest Gr9-12 Average: 98.3), YRDSB Academic Accomplishment Award (Second Highest Gr12 Top 6 Average: 99.2)",
      "Departmental Subject Award for Mathematics, Departmental Subject Award for Health and Physical Education",
    ],
  },
  {
    id: "5",
    title: "Varsity Table Tennis",
    displayTitle: "Varsity Table Tennis",
    date: "Mar 2023 — Present",
    summary: [
      "Member of the Women's Table Tennis Team in high school and university, where I managed training schedules, mentored new players, and analyzed match recordings to optimize strategies.",
      "Earned YRAA 2nd place in Grade 11 followed by winning the regional championship in Grade 12.",
    ],
  },
  {
    id: "6",
    title: "KatyYouthHacks Winner",
    displayTitle: "Hackathon Win",
    date: "Aug 2023",
    summary: [
      "First hackathon with a team of 4 building an ecological simulator that teaches middle-school students about sustainability, biodiversity, and food chains through modelling realistic ecosystem dynamics where animals hunt, eat, and reproduce.",
      "The project won 1st place at KatyYouthHacks (2023) for its creativity and potential to inspire the next generation of environmentalists :)",
    ],
  },
  {
    id: "7",
    title: "Math/CS Peer Tutor",
    displayTitle: "Math/CS Peer Tutor",
    date: "Jan 2022 — Jan 2024",
    summary: [
      "Supporting students through one-on-one tutoring to strengthen learning habits and academic performance, improving grades by 7%+.",
      "Collaborated with students and teachers to clarify complex concepts, complete assignments, and target areas of weakness for test and exam preparation.",
    ],
  },
];

const displace_x = [0, 0, 0, 0, 0, 0, 5];
const displace_x_mobile = [0, -5, 0, 5, -15, -15, 10];

const displace_y = [-7, 7, 7, -7, 7, -7, 7];
const displace_y_mobile = [-4, 5, -4, 4, -1, -2, 3];

const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
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
  const isMobile = useIsMobile("(max-width: 767px)");

  const updatedItems = items.map((item, i) => ({
    ...item,
    display_x: isMobile ? displace_x_mobile[i] : displace_x[i],
    display_y: isMobile ? displace_y_mobile[i] : displace_y[i],
  }));

  const renderBallCanvases = (
    title: string,
    data: { name: string; icon: string }[]
  ) => (
    <>
      <p className="text-5xl font-caveat font-bold text-center">{title}</p>
      <div
        className="flex flex-row gap-16 flex-wrap justify-center my-10"
        aria-label={`${title} I use`}
        role="group"
      >
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
      id="Experience"
      className="w-full min-h-screen h-full flex flex-col items-center text-white"
      aria-labelledby="experience-heading"
    >
      <h2 id="experience-heading" className="sr-only">
        Experience
      </h2>
      <div className="mt-12 sm:mb-10">
        <AnimateWord
          word="Experience"
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
      <div className="w-full mb-10">
        <BigDipperTimeline items={updatedItems} title="" subtitle="" />
      </div>
      <div ref={sectionRef}>
        {isInView && (
          <div>
            {renderBallCanvases("Languages", languages)}
            {renderBallCanvases("Framework & Tools", frameworksTools)}
            {renderBallCanvases("Databases", databases)}
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionWrapper(Experience);
