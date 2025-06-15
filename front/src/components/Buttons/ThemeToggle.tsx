import { useEffect, useState } from "react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useColorContext } from "../../context/ColorContext";

export default function ThemeToggle() {
  //  sets the theme to the system / user preference
  // const [isDark, setIsDark] = useState(
  //   () =>
  //     localStorage.theme === "dark" ||
  //     (!("theme" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches)
  // );
  const { setDarkMode, darkMode, buttonTextColor } = useColorContext();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  return (
    <button
      data-testid="themeToggle"
      onClick={() => setDarkMode((prev) => !prev)}
      className={`rounded dark:text-[${buttonTextColor}] cursor-pointer`}
    >
      {darkMode ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </button>
  );
}
