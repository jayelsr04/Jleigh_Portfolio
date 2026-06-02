"use client";

import useScrollReveal from "@/lib/useScrollReveal";
import WaveDivider from "@/components/ui/WaveDivider";
import BorderGlow from "@/components/ui/BorderGlow";
import Image from "next/image";
import React from "react";
import { 
  SiReact, 
  SiFirebase, 
  SiExpress, 
  SiPostgresql, 
  SiJsonwebtokens, 
  SiNodedotjs, 
  SiTypescript, 
  SiJavascript, 
  SiHtml5, 
  SiCss,
  SiPrisma,
} from "react-icons/si";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  accent: string;
  stackLogos: { name: string; icon: React.ReactNode }[]; 
}

const projects: Project[] = [
  {
    title: "MedDumdom",
    description:
      "A medication and consultation tracker that helps users manage their health routines. Features include medication scheduling, consultation history logging, and reminder notifications to help patients stay on track.",
    tech: ["Web App", "Med Tracker", "Appt Tracker"],
    link: "https://github.com/secretiv3plotter/Med-Dumdom",
    image: "/meddumdom.png",
    accent: "#9595f6",
    stackLogos: [
      { name: "React", icon: <SiReact /> },
      { name: "Firebase JS", icon: <SiFirebase /> },
    ]
  },
  {
    title: "SlimyPals",
    description:
      "An interactive slime game where players can create, customize, and play with virtual slime companions.",
    tech: ["Game Dev", "Slime Game", "Interactive"],
    link: "https://github.com/secretiv3plotter/SlimyPalsBackend",
    image: "/slimypals.png",
    accent: "#3434a3",
    stackLogos: [
      { name: "Express", icon: <SiExpress /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "JWT Auth", icon: <SiJsonwebtokens /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss /> } 
    ]
  },
  {
    title: "UPC Dorm Management System",
    description:
      "A comprehensive dormitory management system for UPC. Handles room assignments, tenant records, billing, maintenance requests, and administrative workflows for dormitory staff and students.",
    tech: ["Management System", "SQL", "Full-Stack"],
    link: "https://github.com/leidc024/UPC-DMS.git",
    image: "/dorm.png",
    accent: "#e0c08a",
    stackLogos: [
      { name: "Neon Database", icon: <SiPrisma /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "React JS", icon: <SiReact /> }
    ]
  },
];

export default function ProjectsSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="projects"
      className="relative"
      style={{ background: "var(--section-alt-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <p
            className="font-mono text-sm mb-3"
            style={{ color: "var(--ocean-seafoam)", letterSpacing: "0.12em" }}
          >
            02 / PROJECTS
          </p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "var(--text-main)",
              lineHeight: "1.2",
            }}
          >
            Things I&apos;ve{" "}
            <span className="gradient-text font-display italic">built</span>
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      <WaveDivider color="var(--section-bg)" />
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="flex h-full" style={{ transitionDelay: `${index * 0.1}s` }}>
      <BorderGlow
        className="w-full flex flex-col group cursor-pointer" 
        borderRadius={28}
        glowRadius={48}
        glowIntensity={0.9}
        coneSpread={22}
        colors={[project.accent, project.accent, project.accent]}
        fillOpacity={0.28}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-4 right-0 h-1 rounded-t-[28px] overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${project.accent}80, transparent)`,
          }}
        />

        {/* Card content wrapper */}
        <div className="p-6 flex-1 flex flex-col justify-between z-10">
          <div>
            {/* Project image */}
            <div
              className="w-full rounded-xl overflow-hidden mb-4"
              style={{ height: "160px", position: "relative" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <h3
              className="font-display font-bold mb-3"
              style={{ fontSize: "1.25rem", color: "var(--text-main)" }}
            >
              {project.title}
            </h3>

            <p
              className="mb-4 leading-relaxed"
              style={{
                fontSize: "0.87rem",
                color: "var(--text-muted)",
                lineHeight: "1.75",
              }}
            >
              {project.description}
            </p>

            {/* Tech Stack Logo List with Hover Titles */}
            <div className="flex flex-wrap items-center gap-3.5 mb-5 text-[1.35rem]">
              {project.stackLogos.map((tech) => (
                <div 
                  key={tech.name} 
                  title={tech.name} 
                  className="transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = project.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {tech.icon}
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="skill-pill text-xs"
                  style={{
                    color: project.accent,
                    borderColor: `${project.accent}30`,
                    background: `${project.accent}08`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 mt-auto">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:gap-2.5"
                style={{ color: project.accent }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
                <span>{"->"}</span>
              </a>
            </div>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}