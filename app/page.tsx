"use client";
import useHasMouse from "@/hooks/useHasMouse";
import CanvasCursor from "@/cursors/canvasCursor";
import Landing from "@/components/sections/landing";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
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
