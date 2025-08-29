"use client";
import Landing from "./component_sections/landing";
import About from "./component_sections/about";
import Experience from "./component_sections/experience";
import Projects from "./component_sections/projects";
import Contact from "./component_sections/contact";
import useHasMouse from "@/hooks/useHasMouse";
import CanvasCursor from "@/cursors/canvasCursor";
export default function Home() {
  const hasMouse = useHasMouse();
  return (
    <div className="w-full h-full">
      <Landing />
      <About />
      <Experience />
      <Projects />
      <Contact />
      {hasMouse && <CanvasCursor />}
    </div>
  );
}
