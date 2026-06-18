"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDarkMode(false);
    } else if (saved === "dark") {
      setIsDarkMode(true);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setIsDarkMode(false);
    }
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return { isDarkMode, handleToggleTheme };
}
