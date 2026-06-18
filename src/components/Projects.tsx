"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion } from "motion/react";

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  colSpan: string;
  isWide: boolean;
  url: string;
  objectFit?: "cover" | "contain";
}

export default function Projects() {
  const projectsList: Project[] = [
    {
      id: "01",
      category: "SITIO WEB",
      title: "ASP Worship (Landing)",
      description: "Landing page oficial y presentación de la plataforma para coordinación musical.",
      image: "/projects/worship-app-v2.png",
      tags: ["React", "Next.js", "Tailwind CSS"],
      link: "https://www.aspworship.online/",
      colSpan: "lg:col-span-1",
      isWide: false,
      url: "aspworship.online",
      objectFit: "contain",
    },
    {
      id: "02",
      category: "APLICACIÓN WEB / PWA",
      title: "ASP Worship App APP",
      description: "Aplicación interactiva para coordinar repertorios y acordes en tiempo real.",
      image: "/projects/aspworship.png",
      tags: ["React", "Node.js", "Cloudflare R2", "Firebase"],
      link: "https://app.aspworship.online/",
      colSpan: "lg:col-span-1",
      isWide: false,
      url: "app.aspworship.online",
    },
    {
      id: "03",
      category: "APLICACIÓN WEB",
      title: "Pizza Builder",
      description: "Constructor interactivo en tiempo real para personalización de ingredientes y pedidos.",
      image: "/projects/pizza-builder-v2.png",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      link: "https://pizzabuilder.vercel.app/",
      colSpan: "lg:col-span-1",
      isWide: false,
      url: "pizzabuilder.vercel.app",
    },
    {
      id: "04",
      category: "SITIO WEB",
      title: "Arma tu Antojo",
      description: "Catálogo interactivo y Progressive Web App optimizada para pedidos móviles.",
      image: "/projects/armatuantojo-v2.png",
      tags: ["React", "Tailwind CSS", "Netlify"],
      link: "https://armatuantojo.netlify.app/",
      colSpan: "lg:col-span-1",
      isWide: false,
      url: "armatuantojo.netlify.app",
    },
    {
      id: "05",
      category: "PLATAFORMA CORPORATIVA",
      title: "Grupo Serex",
      description: "Portal corporativo de consultoría integral optimizado para SEO y alto rendimiento.",
      image: "/projects/gruposerex.png",
      tags: ["Next.js", "Tailwind CSS", "Vercel"],
      link: "https://gruposerex.com/",
      colSpan: "lg:col-span-1",
      isWide: false,
      url: "gruposerex.com",
    },
    {
      id: "06",
      category: "APLICACIÓN WEB / PWA",
      title: "Super Samán App",
      description: "Catálogo digital y aplicación interactiva optimizada para automatización de servicios.",
      image: "/projects/supersaman.png",
      tags: ["React", "Tailwind CSS", "Netlify"],
      link: "https://supersaman.netlify.app/",
      colSpan: "lg:col-span-1",
      isWide: false,
      url: "supersaman.netlify.app",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projectsList.length);
  }, [projectsList.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projectsList.length) % projectsList.length);
  }, [projectsList.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex, handleNext]);

  return (
    <section id="proyectos" className="relative overflow-hidden py-24 px-6 bg-transparent border-t border-zinc-900/50 font-sans">
      {/* Ambient glass glowing decorations */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-3"
          >
            Proyectos Seleccionados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-450 text-sm leading-relaxed max-w-[60ch]"
          >
            Una selección de aplicaciones web y de escritorio que demuestran diseño y desarrollo técnico de principio a fin.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden w-full max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              const swipe = info.offset.x;
              const threshold = 50;
              if (swipe < -threshold) {
                handleNext();
              } else if (swipe > threshold) {
                handlePrev();
              }
            }}
          >
            {projectsList.map((project) => (
              <div key={project.id} className="w-full shrink-0 px-2 sm:px-4">
                <div className="glass-card group p-6 sm:p-8 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[460px] lg:min-h-[360px] hover:scale-[1.002] transition-transform duration-300">
                  {/* Clean Image Container with Glass Vibe */}
                  <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 border border-zinc-900/50 rounded-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className={`opacity-85 group-hover:opacity-100 transition-all duration-500 ease-out ${
                        project.objectFit === "contain"
                          ? "object-contain p-4"
                          : "object-cover object-top"
                      }`}
                    />
                  </div>

                  {/* Text metadata and info */}
                  <div className="lg:col-span-5 flex flex-col gap-3.5">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-550 uppercase">
                      {project.id} &mdash; {project.category}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-zinc-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Link */}
                    {project.link && (
                      <div className="pt-2">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                        >
                          Visitar sitio web
                          <ArrowUpRight size={13} weight="bold" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Indicators and Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8 max-w-5xl mx-auto px-4">
          {/* Dot indicators with loading animation */}
          <div className="flex gap-2.5">
            {projectsList.map((project, index) => (
              <button
                key={project.id}
                onClick={() => {
                  setCurrentIndex(index);
                }}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                style={{
                  width: currentIndex === index ? "2.5rem" : "0.5rem",
                  backgroundColor: currentIndex === index ? "rgba(99,102,241,0.2)" : "rgba(var(--white-rgb), 0.1)",
                }}
              >
                {currentIndex === index && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                    }}
                    key={currentIndex}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Nav arrows */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/[0.05] bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all duration-300 active:scale-95"
              aria-label="Proyecto anterior"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/[0.05] bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all duration-300 active:scale-95"
              aria-label="Siguiente proyecto"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
