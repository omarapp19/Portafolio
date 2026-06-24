"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = (newTheme: "dark" | "light") => {
    if (newTheme === theme) return;
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collapsed State Bar (minimalist sliver peeking out) */}
      <div
        className={`w-1 h-12 bg-blue-500/80 rounded-r-md transition-all duration-500 ease-out cursor-pointer shadow-[2px_0_10px_rgba(59,130,246,0.3)] ${
          isHovered ? "opacity-0 -translate-x-full scale-y-75" : "opacity-100 translate-x-0"
        }`}
      />

      {/* Expanded Minimalist Switch Panel */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 backdrop-blur-md border border-l-0 rounded-r-2xl py-3 px-2.5 flex flex-col items-center gap-4 transition-all duration-500 ease-out ${
          theme === "light"
            ? "bg-white/80 border-zinc-200/60 shadow-[6px_0_30px_rgba(0,0,0,0.06)]"
            : "bg-zinc-950/90 border-zinc-800/80 shadow-[6px_0_30px_rgba(0,0,0,0.25)]"
        } ${
          isHovered
            ? "translate-x-0 opacity-100 scale-100 pointer-events-auto"
            : "-translate-x-full opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className={`relative flex flex-col gap-2.5 p-1 rounded-full border items-center ${
          theme === "light"
            ? "bg-zinc-100/60 border-zinc-200/30"
            : "bg-zinc-900/40 border-white/[0.02]"
        }`}>
          {/* Sliding active indicator capsule */}
          <motion.div
            className="absolute w-7 h-7 bg-blue-500/20 border border-blue-500/30 rounded-full"
            animate={{
              y: theme === "light" ? 0 : 38, // 28px button + 10px gap
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          />

          {/* Light Mode (Sun) Button */}
          <button
            onClick={() => toggleTheme("light")}
            className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors z-10 ${
              theme === "light"
                ? "text-blue-600"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            aria-label="Modo claro"
          >
            <Sun size={15} weight={theme === "light" ? "fill" : "regular"} />
          </button>

          {/* Dark Mode (Moon) Button */}
          <button
            onClick={() => toggleTheme("dark")}
            className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors z-10 ${
              theme === "dark"
                ? "text-blue-400"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
            aria-label="Modo oscuro"
          >
            <Moon size={15} weight={theme === "dark" ? "fill" : "regular"} />
          </button>
        </div>
      </div>
    </div>
  );
}
