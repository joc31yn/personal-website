import { useState, useEffect } from "react";

// returns true if window view matches query (used to check for mobile view)
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQueryList = window.matchMedia(query);
      const listener = (event: MediaQueryListEvent) =>
        setMatches(event.matches);

      setMatches(mediaQueryList.matches);
      mediaQueryList.addEventListener("change", listener);

      return () => {
        mediaQueryList.removeEventListener("change", listener);
      };
    }
  }, [query]);

  return matches;
}
