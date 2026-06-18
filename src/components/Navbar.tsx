"use client";

import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Trayectoria", href: "#experiencia" },
    { name: "Contacto", href: "#contacto" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-300 ${
        scrolled
          ? "h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/40"
          : "h-16 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#inicio"
          onClick={(e) => handleLinkClick(e, "#inicio")}
          className="flex items-center gap-1 group text-white font-medium text-base tracking-tight"
        >
          <span>
            Omar Pérez<span className="text-accent font-semibold">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors duration-200 font-medium"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={(e) => handleLinkClick(e, "#contacto")}
            className="tap-feedback inline-flex items-center justify-center px-3 py-1.5 text-[11px] font-medium tracking-wide text-zinc-300 hover:text-white bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-md transition-all duration-300"
          >
            Contáctame
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/30 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-zinc-950/95 border-b border-zinc-900/60 backdrop-blur-lg md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="text-sm font-medium text-zinc-450 hover:text-zinc-100 py-1.5 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={(e) => handleLinkClick(e, "#contacto")}
                className="tap-feedback w-full inline-flex items-center justify-center py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-950 border border-zinc-800 rounded-md transition-colors mt-2"
              >
                Contáctame
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
