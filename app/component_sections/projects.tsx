"use client";
import { useState } from "react";
import AnimateWord from "../components/animateWord";
import ProjectCard from "../components/projectCard";
import ProjectChip from "../components/projectChip";
import SectionWrapper from "../hoc/SectionWrapper";
import { ChevronDown, ChevronUp } from "lucide-react";

const Projects = () => {
  const [seeMore, setSeeMore] = useState(false);
  const projects = [
    {
      name: "Resumix",
      githubLink: "https://github.com/demonking-mw/ResuMix",
      imgUrl: "/projects/resumix_home.png",
      alt: "Resumix home page",
      description: `ML-powered resume builder that tailors resumes to specific job
          descriptions. By analyzing the semantic similarity between a user's
          experiences and job postings, it selects the most relevant points, generating ATS-optimized resume PDFs.`,
      chips: [
        {
          text: "Python",
          border_bg: "4B8BBE",
        },
        {
          text: "Flask",
          border_bg: "ffffff",
        },
        {
          text: "Sentence Transformers",
          border_bg: "FFBC29",
        },
        {
          text: "NeonDB",
          border_bg: "1DFFF4",
        },
        {
          text: "ReportLab",
          border_bg: "E87109",
        },
      ],
    },
    {
      name: "UWDSC Website",
      githubLink: "https://github.com/uw-datasci/uwdsc-website-v2",
      imgUrl: "/projects/uwdsc_website.png",
      alt: "UWDSC Website",
      description: `A full-stack club website featuring membereship check-ins, role-based authentication, MVC architecture and CRUD operations for events and executive applications, real-time updates, CSV exports, and dynamic data validation.`,
      chips: [
        {
          text: "React",
          border_bg: "61DBFB",
        },
        {
          text: "Typescript",
          border_bg: "007acc",
        },
        {
          text: "Next.js",
          border_bg: "8B8B8B",
        },
        {
          text: "REST API",
          border_bg: "A7CEFF",
        },
        {
          text: "MongoDB",
          border_bg: "15A44D",
        },
        {
          text: "FORMIK",
          border_bg: "0251CB",
        },
      ],
    },
    {
      name: "Fashionkilla",
      githubLink: "https://github.com/claireleu/Fashionkilla",
      imgUrl: "/projects/fashionkilla.png",
      alt: "Fashionkilla",
      description: `A digital wardrobe and outfit recommender that helps users organize their clothes and generate personalized, stylish outfit suggestions. Powered by semantic search and image analysis, it combines computer vision and NLP to make fashion management fun, efficient, and sustainable.`,
      chips: [
        {
          text: "Python",
          border_bg: "4B8BBE",
        },
        {
          text: "Typescript",
          border_bg: "007acc",
        },
        {
          text: "FastAPI",
          border_bg: "099386",
        },
        {
          text: "MongoDB",
          border_bg: "15A44D",
        },
        {
          text: "Gemini",
          border_bg: "808FFE",
        },
        {
          text: "Sentence Transformers",
          border_bg: "FFBC29",
        },
      ],
    },
    {
      name: "Personal Website",
      githubLink: "https://github.com/joc31yn/personal-website",
      imgUrl: "/projects/personal_website.png",
      alt: "Ecosim graph",
      description: `A responsive, component-based architecture portfolio featuring fluid animations, interactive 3D objects, and an end-to-end contact form using Mailgun API for client communication.`,
      chips: [
        {
          text: "Typescript",
          border_bg: "007acc",
        },
        {
          text: "React",
          border_bg: "61DBFB",
        },
        {
          text: "Tailwind",
          border_bg: "00BCFF",
        },
        {
          text: "Next.js",
          border_bg: "8B8B8B",
        },
        {
          text: "Three.js",
          border_bg: "A49DF2",
        },
        {
          text: "Mailgun",
          border_bg: "C22026",
        },
      ],
    },
    {
      name: "TEDxUW",
      githubLink: "https://github.com/TEDxUW25/website",
      imgUrl: "/projects/tedxuw.png",
      alt: "TEDxUW Website",
      description: `Built website for TEDxUW 2025 Conference featuring event speakers, organizers, sponsors, past themes and timelines, and a ticket purchasing page.`,
      chips: [
        {
          text: "React",
          border_bg: "61DBFB",
        },
        {
          text: "Typescript",
          border_bg: "007acc",
        },
        {
          text: "Next.js",
          border_bg: "8B8B8B",
        },
        {
          text: "SQL",
          border_bg: "DF6A21",
        },
      ],
    },
    {
      name: "Ecosim",
      githubLink: "https://github.com/candle08/EcoSim",
      imgUrl: "/projects/ecosim.png",
      alt: "Ecosim graph",
      description: `an interactive ecological simulator aimed to teach sustainability and biodiversity using algorithmic modeling (hunting, hunger, reproduction) with visual graphs to predict ecosystem survival timeline.`,
      chips: [
        {
          text: "HTML",
          border_bg: "F1682E",
        },
        {
          text: "CSS",
          border_bg: "2FAADD",
        },
        {
          text: "Javascript",
          border_bg: "F2BF25",
        },
      ],
    },
    {
      name: "Battleship",
      githubLink: "https://github.com/joc31yn/Battleship",
      imgUrl: "/projects/battleship.png",
      alt: "Battleship game",
      description: `An interactive Battleship implementation built with dynamic GUI components, real-time game statistics, audio integration, and AI opponents, through modular class architecture.`,
      chips: [
        {
          text: "Java",
          border_bg: "ED8B00",
        },
        {
          text: "Java Swing",
          border_bg: "5382a1",
        },
        {
          text: "OOP",
          border_bg: "9370DB",
        },
        {
          text: "Algorithm Design",
          border_bg: "DC143C",
        },
        {
          text: "Game Development",
          border_bg: "39FF14",
        },
      ],
    },
  ];

  const handleToggle = () => {
    if (seeMore) {
      const projectSection = document.getElementById("Projects");
      projectSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSeeMore((prev) => !prev);
  };

  return (
    // need to change to animate on scroll
    <section
      id="Projects"
      className="w-full min-h-screen h-full flex flex-col items-center"
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>
      <div className="mt-12">
        <AnimateWord
          word="Projects"
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
      <div className="flex flex-row flex-wrap gap-10 my-10 justify-center">
        {projects.slice(0, seeMore ? projects.length : 3).map((project, i) => (
          <ProjectCard
            key={`${project.name}-${i}`}
            title={project.name}
            githubLink={project.githubLink}
            imgUrl={project.imgUrl}
            alt={project.alt}
            description={project.description}
          >
            {project.chips.map((chip, i) => (
              <ProjectChip
                key={`${chip.text}-${i}`}
                text={chip.text}
                border_bg={chip.border_bg}
              />
            ))}
          </ProjectCard>
        ))}
      </div>
      <button
        className="font-caveat text-white text-3xl flex flex-col items-center justify-center hover:scale-110 duration-200"
        onClick={handleToggle}
      >
        {seeMore ? (
          <>
            <ChevronUp className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5] -mb-2" />
            See less
          </>
        ) : (
          <>
            See more
            <ChevronDown className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5] -mt-2" />
          </>
        )}
      </button>
    </section>
  );
};

export default SectionWrapper(Projects);
