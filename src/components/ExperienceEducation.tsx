"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Certificate } from "@phosphor-icons/react";

interface Certification {
  title: string;
  issuer: string;
  link: string;
}

export default function ExperienceEducation() {
  const certificationsList: Certification[] = [
    {
      title: "Curso Práctico de HTML y CSS",
      issuer: "Platzi",
      link: "https://platzi.com/p/omarapp/curso/1758-course/diploma/detalle/",
    },
    {
      title: "Curso Práctico de C++",
      issuer: "Platzi",
      link: "https://platzi.com/p/omarapp/curso/1545-course/diploma/detalle/",
    },
    {
      title: "Curso de Computación Básica",
      issuer: "Platzi",
      link: "https://platzi.com/p/omarapp/curso/1741-course/diploma/detalle/",
    },
    {
      title: "Curso de E-Commerce",
      issuer: "Platzi",
      link: "https://platzi.com/p/omarapp/curso/1986-course/diploma/detalle/",
    },
    {
      title: "Curso de Business Model Canvas",
      issuer: "Platzi",
      link: "https://platzi.com/p/omarapp/curso/1309-course/diploma/detalle/",
    },
    {
      title: "Curso de Creación de Tiendas en Línea con WooCommerce",
      issuer: "Platzi",
      link: "https://platzi.com/p/omarapp/curso/1981-course/diploma/detalle/",
    },
    {
      title: "Python Essentials 1",
      issuer: "Cisco Networking Academy",
      link: "https://drive.google.com/file/d/1gkG1UKCtMBk-YJJw5bnhFa06YIvsSjYx/view?usp=sharing",
    },
    {
      title: "Python Essentials 2",
      issuer: "Cisco Networking Academy",
      link: "https://drive.google.com/file/d/1uJ6-3MT4sFSbw9me16cjfKqXaWkDMA0m/view?usp=sharing",
    },
  ];

  return (
    <section id="experiencia" className="relative overflow-hidden py-24 px-6 bg-transparent border-t border-zinc-900/50 font-sans">
      {/* Ambient glass glowing decorations */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.01] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.01] rounded-full blur-3xl pointer-events-none" />

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
            Trayectoria y Certificaciones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-450 text-sm leading-relaxed max-w-[60ch]"
          >
            Mis certificaciones académicas, cursos completados e insignias verificadas que avalan mi formación continua.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Certifications Card */}
          <div className="glass-card p-6 rounded-2xl lg:col-span-2 flex flex-col gap-4">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              CURSOS Y CERTIFICADOS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificationsList.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.02] bg-zinc-950/20 hover:border-accent/20 hover:bg-zinc-900/10 transition-all duration-300 group"
                >
                  <div className="text-accent shrink-0 mt-0.5">
                    <Certificate size={16} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-zinc-200 group-hover:text-accent transition-colors leading-tight">
                      {cert.title}
                    </span>
                    <span className="text-[9px] text-zinc-550 font-mono">
                      {cert.issuer}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Badges Card */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-550 uppercase">
                LOGROS
              </span>
              <h4 className="text-sm font-semibold text-zinc-200 mt-1.5">
                Insignias Verificadas (Python)
              </h4>
            </div>

            <div className="flex-1 flex items-center gap-6 sm:gap-8 justify-center py-4">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 transition-all duration-300 hover:scale-110 filter drop-shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                <Image
                  src="/projects/python 1.png"
                  alt="Python Badge 1"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 transition-all duration-300 hover:scale-110 filter drop-shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                <Image
                  src="/projects/python 2.png"
                  alt="Python Badge 2"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
