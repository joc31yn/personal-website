import Landing from "./components/landing";
import About from "./components/about";
import Experience from "./components/experience";
import Projects from "./components/projects";
import Contact from "./components/contact";
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
