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
          experiences and job postings, it automatically selects and rewrites
          the most relevant bullet points, generating ATS-optimized PDFs.`,
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
      description: `An interactive Battleship implementation built using Java and Java Swing with dynamic GUI components, real-time game statistics, audio integration, and intelligent AI opponents through modular class architecture.`,
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
      description: `An interactive ecological simulator to teach sustainability, biodiversity, and food chains by building different ecosystems and using algorithms to model interactions like hunting, hunger, and reproduction, to show how long the custom ecosystem survives.`,
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
      <div className="flex flex-row flex-wrap gap-10 my-10">
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
