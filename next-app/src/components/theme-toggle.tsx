"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg p-2 hover:bg-muted"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
