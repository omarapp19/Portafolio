"use client";

import { useEffect, useState, useRef } from "react";
import { Sun, Moon, CaretRight, CaretLeft } from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");

    // Close when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

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

  const isLight = theme === "light";

  return (
    <div
      ref={containerRef}
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center select-none transition-transform duration-300 ease-out ${
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%-2.25rem)]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Control Panel */}
      <div
        className={`py-3.5 px-3 flex flex-col items-center gap-3 backdrop-blur-xl transition-colors duration-300 ${
          isLight
            ? "bg-white/95 text-zinc-900 border border-l-0 border-zinc-200/90 shadow-[10px_0_35px_rgba(0,0,0,0.08)]"
            : "bg-zinc-950/95 text-zinc-100 border border-l-0 border-zinc-800/90 shadow-[10px_0_40px_rgba(0,0,0,0.5)]"
        }`}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500 font-medium">
            Modo
          </span>

          <div
            className={`relative flex flex-col gap-2 p-1 rounded-full border items-center ${
              isLight
                ? "bg-zinc-100/90 border-zinc-200/70"
                : "bg-zinc-900/80 border-white/[0.08]"
            }`}
          >
            {/* Sliding Capsule indicator */}
            <motion.div
              className={`absolute w-7 h-7 rounded-full ${
                isLight
                  ? "bg-amber-500/15 border border-amber-500/30"
                  : "bg-blue-500/20 border border-blue-500/40"
              }`}
              animate={{
                y: isLight ? 0 : 36,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
            />

            {/* Sun Button (Light Mode) */}
            <button
              onClick={() => toggleTheme("light")}
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors z-10 cursor-pointer ${
                isLight ? "text-amber-500" : "text-zinc-400 hover:text-zinc-200"
              }`}
              aria-label="Modo claro"
              title="Modo Claro"
            >
              <Sun size={15} weight={isLight ? "fill" : "regular"} />
            </button>

            {/* Moon Button (Dark Mode) */}
            <button
              onClick={() => toggleTheme("dark")}
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors z-10 cursor-pointer ${
                !isLight ? "text-blue-400" : "text-zinc-500 hover:text-zinc-800"
              }`}
              aria-label="Modo oscuro"
              title="Modo Oscuro"
            >
              <Moon size={15} weight={!isLight ? "fill" : "regular"} />
            </button>
          </div>
        </div>
      </div>

      {/* Permanently Attached Handle Tab */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-9 h-20 rounded-r-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer backdrop-blur-xl transition-all duration-300 shadow-md ${
          isLight
            ? "bg-white/95 border border-l-0 border-zinc-200/90 text-zinc-700 shadow-zinc-300/50 hover:bg-zinc-50"
            : "bg-zinc-950/95 border border-l-0 border-zinc-800/90 text-zinc-300 shadow-black/70 hover:bg-zinc-900"
        }`}
        aria-label={isOpen ? "Cerrar panel de tema" : "Abrir panel de tema"}
        title={isOpen ? "Cerrar panel de tema" : "Cambiar a modo " + (isLight ? "oscuro" : "claro")}
      >
        {isOpen ? (
          <CaretLeft size={16} weight="bold" className="text-zinc-400 hover:text-zinc-200 transition-colors" />
        ) : (
          <>
            <span className={isLight ? "text-amber-500" : "text-blue-400"}>
              {isLight ? <Sun size={15} weight="fill" /> : <Moon size={15} weight="fill" />}
            </span>
            <CaretRight size={11} className="text-zinc-500 mt-0.5" />
          </>
        )}
      </button>
    </div>
  );
}
