"use client";

import { motion } from "motion/react";

interface TimelineItem {
  title: string;
  subtitle: string;
  date: string;
  location?: string;
  details: string[];
}

export default function ExperienceEducation() {
  const experiences: TimelineItem[] = [
    {
      title: "Senior Full-Stack Developer",
      subtitle: "Freelance / Consultor de Software",
      date: "2022 - Presente",
      location: "Maracaibo, Venezuela (Remoto)",
      details: [
        "Arquitectura y desarrollo web escalable con React, Next.js y Node.js.",
        "Integración de agentes de IA y flujos cognitivos LLM con ThinköAI.",
        "Automatización de procesos y orquestación de APIs en n8n.",
        "Infraestructura cloud en Cloudflare R2 y despliegue optimizado en Vercel.",
      ],
    },
    {
      title: "Full-Stack Developer",
      subtitle: "Agencias & Clientes Corporativos",
      date: "2020 - 2022",
      location: "Venezuela (Híbrido)",
      details: [
        "Desarrollo de PWAs para control de inventario y stock en retail.",
        "Modelado de bases de datos ágiles con Firebase Cloud Firestore.",
        "Migración de backends monolíticos a microservicios en Node.js.",
      ],
    },
  ];

  const educations: TimelineItem[] = [
    {
      title: "Ingeniería en Computación / Software",
      subtitle: "Universidad Rafael Belloso Chacín (URBE)",
      date: "2021 - Presente",
      location: "Maracaibo, Zulia, Venezuela",
      details: [
        "Cursando último año de carrera y fase final del proyecto de grado.",
        "Especialización en Ingeniería de Software y Estructuras de Datos.",
        "Desarrollo de pasarela de pago integrada para plataforma de cursos.",
      ],
    },
  ];

  return (
    <section id="experiencia" className="py-24 px-6 bg-zinc-950 border-t border-zinc-900 font-sans">
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
            Trayectoria y Formación
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-455 text-sm leading-relaxed max-w-[60ch]"
          >
            Mi recorrido profesional desarrollando software de alto nivel, sumado a mi formación académica en ingeniería.
          </motion.p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience Column */}
          <div className="space-y-12">
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Experiencia Profesional
              </h3>
            </div>

            <div className="relative border-l border-zinc-900/60 pl-6 ml-3 space-y-10">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.title + i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative flex flex-col gap-1.5"
                >
                  {/* Small Timeline Node */}
                  <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-emerald-450" />
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h4 className="text-base font-semibold text-zinc-100">
                      {exp.title}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-550 uppercase">
                      {exp.date}
                    </span>
                  </div>

                  <div className="text-xs text-zinc-450 font-normal">
                    <span>{exp.subtitle}</span>
                    {exp.location && (
                      <span className="text-zinc-650"> &middot; {exp.location}</span>
                    )}
                  </div>

                  <ul className="list-none space-y-1.5 pt-1 text-xs text-zinc-400 leading-relaxed">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full border border-zinc-900 bg-zinc-950" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="space-y-12">
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Educación y Formación
              </h3>
            </div>

            <div className="relative border-l border-zinc-900/60 pl-6 ml-3 space-y-10">
              {educations.map((edu, i) => (
                <motion.div
                  key={edu.title + i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative flex flex-col gap-1.5"
                >
                  {/* Small Timeline Node */}
                  <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-emerald-450" />
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h4 className="text-base font-semibold text-zinc-100">
                      {edu.title}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-550 uppercase">
                      {edu.date}
                    </span>
                  </div>

                  <div className="text-xs text-zinc-455 font-normal">
                    <span>{edu.subtitle}</span>
                    {edu.location && (
                      <span className="text-zinc-650"> &middot; {edu.location}</span>
                    )}
                  </div>

                  <ul className="list-none space-y-1.5 pt-1 text-xs text-zinc-400 leading-relaxed">
                    {edu.details.map((detail, dIdx) => (
                      <li key={dIdx} className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full border border-zinc-900 bg-zinc-950" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
