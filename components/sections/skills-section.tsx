"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "Redis"],
  },
  {
    category: "DevOps",
    items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
  },
  {
    category: "Tools",
    items: ["Git", "Vim", "Linux", "Figma", "VS Code"],
  },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: itemsRef.current,
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(100),
              duration: 600,
              easing: "easeOutExpo",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="px-4 md:px-12 py-12 md:py-32 border-b border-[#F5F5F7]/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-xs text-[#F59E0B] tracking-widest uppercase mb-4">
            02 / Skills
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#F5F5F7]">
            Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#F5F5F7]/10">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="bg-[#030303] p-6 md:p-10 opacity-0"
            >
              <h3 className="font-mono text-xs text-[#F5F5F7]/40 tracking-widest uppercase mb-6">
                {skill.category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-sm text-[#F5F5F7]/80 border border-[#F5F5F7]/10 px-4 py-2 hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors duration-300 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
