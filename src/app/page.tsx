import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import ExperienceEducation from "@/components/ExperienceEducation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="w-full min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* Selected Works Bento Showcase */}
        <Projects />

        {/* Skills & Tools Categorization Matrix */}
        <TechStack />

        {/* Experience and Academic Timeline */}
        <ExperienceEducation />

        {/* Contact Form Details */}
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer />
    </>
  );
}
