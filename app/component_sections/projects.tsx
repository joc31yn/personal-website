"use client";
import AnimateWord from "../components/animateWord";
import ProjectCard from "../components/projectCard";
import ProjectChip from "../components/projectChip";
import SectionWrapper from "../hoc/SectionWrapper";

const Projects = () => {
  const projects = [
    {
      name: "Resumix",
      githubLink: "test",
      imgUrl: "/projects/resumix_home.png",
      alt: "Resumix home page",
      description: `ML-powered resume builder that tailors resumes to specific job
          descriptions. By analyzing the semantic similarity between a user's
          experiences and job postings, it selects the most relevant points, generating ATS-optimized resume PDFs.`,
      link: "",
      chips: [
        {
          text: "Python",
          border_bg: "4B8BBE",
        },
        {
          text: "React",
          border_bg: "61DBFB",
        },
        {
          text: "Flask",
          border_bg: "ffffff",
        },
      ],
    },
    {
      name: "Battleship",
      githubLink: "test",
      imgUrl: "/projects/battleship.png",
      alt: "Battleship game",
      description: `An interactive Battleship implementation built with dynamic GUI components, real-time game statistics, audio integration, and AI opponents, through modular class architecture.`,
      link: "",
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
    {
      name: "Ecosim",
      githubLink: "test",
      imgUrl: "/projects/ecosim.png",
      alt: "Ecosim graph",
      description: `an interactive ecological simulator aimed to teach sustainability and biodiversity using algorithmic modeling (hunting, hunger, reproduction) with visual graphs to predict ecosystem survival timeline.`,
      link: "",
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
      name: "Personal Website",
      githubLink: "test",
      imgUrl: "/projects/personal_website.png",
      alt: "Ecosim graph",
      description: `A responsive, component-based architecture portfolio featuring fluid animations, interactive 3D objects, and an end-to-end contact form using Axios and Mailgun API for client communication.`,
      link: "",
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
  ];

  return (
    // need to change to animate on scroll
    <section
      id="Projects"
      className="w-full min-h-screen h-full flex flex-col items-center"
    >
      <div className="mt-24">
        <AnimateWord
          word="Projects"
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
      <div className="flex flex-row flex-wrap gap-10 my-10 justify-center">
        {projects.map((project, i) => (
          <ProjectCard
            key={`${project.name}-${i}`}
            title={project.name}
            githubLink={project.githubLink}
            imgUrl={project.imgUrl}
            alt={project.alt}
            description={project.description}
            link={project.link}
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
    </section>
  );
};

export default SectionWrapper(Projects);
