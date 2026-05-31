"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { CosmicBackground } from "@/components/cosmic-background";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const sectionMap: Record<string, number> = {
              hero: 0,
              skills: 1,
              projects: 2,
              contact: 3,
            };
            setActiveSection(sectionMap[id] ?? 0);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030303]">
      <CosmicBackground activeSection={activeSection} />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
