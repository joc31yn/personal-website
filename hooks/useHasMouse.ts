"use client";
import { useEffect, useState } from "react";

export default function useHasMouse() {
  const [hasMouse, setHasMouse] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(pointer: fine)");
    setHasMouse(mq.matches);

    const handler = (e: MediaQueryListEvent) => setHasMouse(e.matches);
    mq.addEventListener?.("change", handler);

    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return hasMouse;
}
