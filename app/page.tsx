import Landing from "./component_sections/landing";
import About from "./component_sections/about";
import Experience from "./component_sections/experience";
import Projects from "./component_sections/projects";
import Contact from "./component_sections/contact";
export default function Home() {
  return (
    <div className="w-full h-full">
      <Landing />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}
