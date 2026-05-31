"use client";

import useScrollReveal from "@/lib/useScrollReveal";
import WaveDivider from "@/components/ui/WaveDivider";
import Image from "next/image";

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js",
  "Node.js", "C", "C++", "Python",
  "MySQL", "PostgreSQL", "MongoDB", "REST APIs",
  "Git", "Docker", "TailwindCSS", "Figma",
];

export default function AboutSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="about"
      className="relative"
      style={{ background: "var(--section-bg)" }}
    >
      <WaveDivider flip={true} color="var(--section-bg)" />

      <div className="max-w-6xl mx-auto px-6 py-24">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Profile image placeholder + floating card */}
          <div className="relative flex justify-center">
            {/* Glow behind avatar */}
            <div
              className="absolute rounded-full"
              style={{
                width: "280px",
                height: "280px",
                background:
                  "radial-gradient(circle, rgba(136,201,191,0.2) 0%, transparent 70%)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Avatar container */}
            <div
              className="relative animate-float"
              style={{ animationDuration: "5s" }}
            >
              {/* Profile image circle */}
              <div
                className="rounded-full overflow-hidden"
                style={{
                  width: "220px",
                  height: "220px",
                  border: "3px solid var(--surface-border)",
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Your Name"
                  width={220}
                  height={220}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>

              {/* Floating badge */}
              <div
                className="absolute glass-card rounded-xl px-4 py-2"
                style={{
                  bottom: "-10px",
                  right: "-20px",
                  border: "1px solid var(--surface-border)",
                }}
              >
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--ocean-seafoam)" }}
                >
                  📍 Cebu City, PH
                </p>
              </div>

              {/* Floating badge 2 */}
              <div
                className="absolute glass-card rounded-xl px-4 py-2 animate-float-delayed"
                style={{
                  top: "-10px",
                  left: "-20px",
                  border: "1px solid var(--surface-border)",
                }}
              >
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--sand-mid)" }}
                >
                  💻 3rd Year Komsai Student
                </p>
              </div>
            </div>
          </div>

          {/* Right: Bio & Skills */}
          <div>
            {/* Section label */}
            <p
              className="font-mono text-sm mb-3"
              style={{ color: "var(--ocean-seafoam)", letterSpacing: "0.12em" }}
            >
              01 / ABOUT ME
            </p>

            <h2
              className="font-display font-bold mb-6"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "var(--text-main)",
                lineHeight: "1.2",
              }}
            >
              Crafting digital
              <span className="gradient-text font-display italic block">
                {" "}experiences
              </span>
            </h2>

            <div
              className="space-y-4 mb-8"
              style={{
                color: "var(--text-muted)",
                lineHeight: "1.8",
                fontSize: "0.95rem",
              }}
            >
              <p>
                Full-stack developer and BS Computer Science student skilled in building
                intuitive mobile and web platforms. With a strong foundation in software 
                engineering, data structures, and database management, I specialize in 
                transforming complex logical workflows into clean, user-centric interfaces.
                My technical toolkit includes JavaScript, TypeScript, Python, React Native, 
                and Supabase, backed by a proven track record of delivering collaborative, 
                functional software solutions.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me reading books or dreaming about the ocean waves, 
                leveling up in game dev, or contributing to open-source projects.
              </p>
            </div>

            {/* Skills */}
            <div>
              <p
                className="font-mono text-xs mb-3"
                style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
              >
                TECH STACK
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider color="var(--section-alt-bg)" />
    </section>
  );
}
