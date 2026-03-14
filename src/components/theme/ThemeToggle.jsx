"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        color: "var(--color-text)",
        fontSize: "1.2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "color 0.3s ease",
      }}
    >
      <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
    </button>
  );
};

export default ThemeToggle;
