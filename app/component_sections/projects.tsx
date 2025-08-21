"use client";
import AnimateWord from "../components/animateWord";
import { useMediaQuery } from "../components/mobile";
import ProjectCard from "../components/projectCard";

export default function Projects() {
  const isSmall = useMediaQuery("(max-width: 767px)");
  const isMedium = useMediaQuery("(max-width: 1023px)");
  return (
    // need to chagne to animate on scroll
    <section
      id="Projects"
      className="w-full min-h-screen h-full flex flex-col items-center"
    >
      <div className="mt-20">
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
      <div>
        <ProjectCard
          title="ResuMix"
          githubLink="test"
          imgUrl="/resumix_home.png"
          alt="test"
          description={`ML-powered resume builder that tailors resumes to specific job
          descriptions. By analyzing the semantic similarity between a user’s
          experiences and job postings, it automatically selects and rewrites
          the most relevant bullet points, generating ATS-optimized PDFs.`}
          link="https://resu-mix.vercel.app/"
        />
      </div>
    </section>
  );
}
