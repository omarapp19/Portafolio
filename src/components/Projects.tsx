"use client";

import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
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
      image: "/projects/worship-app.png",
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

  return (
    <section id="proyectos" className="py-24 px-6 bg-zinc-950 border-t border-zinc-900 font-sans">
      <div className="max-w-7xl mx-auto">
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

        {/* Minimalist 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projectsList.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col gap-5"
            >
              {/* Clean Flat Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border border-zinc-900 rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-top opacity-80 group-hover:opacity-95 group-hover:scale-[1.01] transition-all duration-500 ease-out"
                />
              </div>

              {/* Text metadata and info */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-550 uppercase">
                    {project.id} &mdash; {project.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-emerald-450 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
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
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-450 hover:text-emerald-400 transition-colors"
                    >
                      Visitar sitio web
                      <ArrowUpRight size={12} weight="bold" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
