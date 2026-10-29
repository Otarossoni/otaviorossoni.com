"use client";

import { useEffect, useState } from "react";

// The initial theme is resolved by the inline script in the locale layout and
// written to <html data-theme> before the first paint. Error pages (404) are
// rendered on the client, where React resets <html>, so the same resolution
// runs again on mount: localStorage "theme", then prefers-color-scheme.
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const theme =
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    setIsDarkMode(theme === "dark");
  }, []);

  const handleToggleTheme = () => {
    const nextIsDark = document.documentElement.getAttribute("data-theme") === "light";
    const next = nextIsDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIsDarkMode(nextIsDark);
  };

  return { isDarkMode, handleToggleTheme };
}
