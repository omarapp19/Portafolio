"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  navbar: {
    inicio: { es: "Inicio", en: "Home" },
    proyectos: { es: "Proyectos", en: "Projects" },
    techStack: { es: "Tech Stack", en: "Tech Stack" },
    trayectoria: { es: "Trayectoria", en: "Timeline" },
    contacto: { es: "Contacto", en: "Contact" },
    contactame: { es: "Contáctame", en: "Contact Me" },
  },
  hero: {
    scroll: { es: "Desplazar para explorar", en: "Scroll to explore" },
    developer: { es: "DESARROLLADOR", en: "DEVELOPER" },
  },
  projects: {
    title: { es: "Proyectos Seleccionados", en: "Selected Projects" },
    subtitle: {
      es: "Una selección de aplicaciones web y de escritorio que demuestran diseño y desarrollo técnico de principio a fin.",
      en: "A curated selection of web and desktop applications demonstrating end-to-end design and technical development.",
    },
    categories: {
      website: { es: "SITIO WEB", en: "WEBSITE" },
      pwa: { es: "APLICACIÓN WEB / PWA", en: "WEB APP / PWA" },
      webapp: { es: "APLICACIÓN WEB", en: "WEB APP" },
      corporate: { es: "PLATAFORMA CORPORATIVA", en: "CORPORATE PLATFORM" },
    },
    visit: { es: "Visitar sitio web", en: "Visit website" },
    prev: { es: "Proyecto anterior", en: "Previous project" },
    next: { es: "Siguiente proyecto", en: "Next project" },
  },
  techStack: {
    title: { es: "Habilidades Técnicas", en: "Technical Skills" },
    subtitle: {
      es: "Tecnologías y herramientas que domino para construir soluciones estables y eficientes.",
      en: "Technologies and tools I master to build stable and efficient solutions.",
    },
    categories: {
      frontend: { es: "Desarrollo Frontend", en: "Frontend Development" },
      backend: { es: "Backend & BD", en: "Backend & Database" },
      infra: { es: "Infraestructura & CI/CD", en: "Infrastructure & CI/CD" },
      automation: { es: "Automatización & IA", en: "Automation & AI" },
    },
    levels: {
      solid: { es: "Sólido", en: "Solid" },
      advanced: { es: "Avanzado", en: "Advanced" },
    },
  },
  experience: {
    title: { es: "Trayectoria y Certificaciones", en: "Timeline & Certifications" },
    subtitle: {
      es: "Mis certificaciones académicas, cursos completados e insignias verificadas que avalan mi formación continua.",
      en: "My academic certifications, completed courses, and verified badges validating my continuous learning.",
    },
    coursesTitle: { es: "CURSOS Y CERTIFICADOS", en: "COURSES & CERTIFICATES" },
    achievementsTitle: { es: "LOGROS", en: "ACHIEVEMENTS" },
    badgesTitle: { es: "Insignias Verificadas (Python)", en: "Verified Badges (Python)" },
    list: {
      c1: { es: "Curso Práctico de HTML y CSS", en: "HTML and CSS Practical Course" },
      c2: { es: "Curso Práctico de C++", en: "C++ Practical Course" },
      c3: { es: "Curso de Computación Básica", en: "Basic Computing Course" },
      c4: { es: "Curso de E-Commerce", en: "E-Commerce Course" },
      c5: { es: "Curso de Business Model Canvas", en: "Business Model Canvas Course" },
      c6: {
        es: "Curso de Creación de Tiendas en Línea con WooCommerce",
        en: "Online Store Creation with WooCommerce Course",
      },
    },
  },
  contact: {
    title: { es: "Contacto", en: "Contact" },
    subtitle: {
      es: "Escríbeme para colaborar o consultar disponibilidad.",
      en: "Write to me to collaborate or check availability.",
    },
    nameLabel: { es: "Nombre Completo", en: "Full Name" },
    namePlaceholder: { es: "Ej. Juan Pérez", en: "e.g., John Doe" },
    emailLabel: { es: "Correo Electrónico", en: "Email Address" },
    emailPlaceholder: { es: "Ej. juan@correo.com", en: "e.g., john@email.com" },
    messageLabel: { es: "Mensaje", en: "Message" },
    messagePlaceholder: { es: "Cuéntame sobre tu proyecto...", en: "Tell me about your project..." },
    errors: {
      name: { es: "El nombre completo es obligatorio.", en: "Full name is required." },
      emailReq: { es: "El correo electrónico es obligatorio.", en: "Email address is required." },
      emailVal: { es: "Ingresa una dirección de correo electrónico válida.", en: "Please enter a valid email address." },
      message: { es: "El mensaje no puede estar vacío.", en: "Message cannot be empty." },
    },
    status: {
      success: { es: "¡Mensaje enviado con éxito! Te responderé muy pronto.", en: "Message sent successfully! I will reply very soon." },
      error: { es: "Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.", en: "An error occurred while sending the message. Please try again." },
      loading: { es: "Enviando...", en: "Sending..." },
      submit: { es: "Enviar Mensaje", en: "Send Message" },
    },
    direct: { es: "Contacto Directo", en: "Direct Contact" },
    email: { es: "Email", en: "Email" },
    phone: { es: "Teléfono", en: "Phone" },
    location: { es: "Ubicación", en: "Location" },
    locationValue: { es: "Maracaibo, Venezuela", en: "Maracaibo, Venezuela" },
    socials: { es: "Redes Sociales", en: "Social Media" },
  },
  footer: {
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    credits: {
      es: "Made in Maracaibo ⚡ Powered by Laura's love",
      en: "Made in Maracaibo ⚡ Powered by Laura's love",
    },
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("language") as Language;
      if (saved === "es" || saved === "en") {
        setLanguageState(saved);
      } else {
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === "es") {
          setLanguageState("es");
        }
      }
    } catch (e) {
      console.warn("Failed to access localStorage for language preference", e);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch (e) {
      console.warn("Failed to save language preference to localStorage", e);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
