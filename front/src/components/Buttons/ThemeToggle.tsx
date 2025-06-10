import { useEffect, useState } from "react";

export default function ThemeToggle() {
  //  sets the theme to the system / user preference
  const [isDark, setIsDark] = useState(
    () =>
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  return (
    <button
      data-testid="themeToggle"
      onClick={() => setIsDark((prev) => !prev)}
      className="p-2 rounded bg-white opacity-70 dark:bg-black dark:text-white cursor-pointer"
    >
      Toggle {isDark ? "Light" : "Dark"} Mode
    </button>
  );
}
