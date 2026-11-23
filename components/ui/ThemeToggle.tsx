"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`relative min-h-11 min-w-11 p-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--gold-primary)] text-[var(--gold-primary)] transition-all duration-300 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-primary)] cursor-pointer flex items-center justify-center ${className}`}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-[var(--gold-primary)] transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="w-4 h-4 text-[var(--gold-primary)] transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>
    </button>
  );
}
