"use client";

import { useEffect, useMemo, useState } from "react";
import ScrambledText from "../ui/ScrambledText";
import DotGrid from "../ui/dot-grid";
import ScrollVelocity from "../ui/ScrollVelocity";

export default function HomeSection() {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const particles = useMemo(() => {
    const count = isMobile ? 12 : 40;

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * (isMobile ? 2 : 3) + 1,
      left: Math.random() * 100,
      top: Math.random() * 60,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 4,
    }));
  }, [isMobile]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden noise-bg flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24"
      style={{
        background:
          "linear-gradient(180deg, var(--hero-top) 0%, var(--hero-mid) 40%, var(--hero-bottom) 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(26,82,118,0.3) 0%, transparent 70%)",
        }}
      />

      <DotGrid
        dotSize={isMobile ? 2 : 3}
        gap={isMobile ? 20 : 32}
        baseColor={isMobile ? "rgba(136, 201, 191, 0.22)" : "rgba(136, 201, 191, 0.15)"}
        activeColor="#88c9bf"
        proximity={isMobile ? 100 : 140}
        shockRadius={isMobile ? 160 : 240}
        shockStrength={isMobile ? 6 : 10}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: "rgba(168, 216, 234, 0.6)",
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: 0.7,
              animation: `shimmer ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <div className="w-full mb-4 sm:mb-8 overflow-hidden select-none pointer-events-none opacity-80">
          <ScrollVelocity
            velocity={isMobile ? 14 : 25}
            numCopies={isMobile ? 6 : 12}
            texts={[
              <div
                key="marquee-item"
                className="flex items-center gap-2 sm:gap-3 mx-3 sm:mx-6 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em]"
              >
                <span
                  style={{
                    color: "var(--ocean-seafoam)",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  }}
                >
                  AVAILABLE FOR INTERNSHIP
                </span>
              </div>,
            ]}
          />
        </div>

        <h1
          className="font-display font-black mb-3 leading-none"
          style={{
            fontSize: "clamp(2.4rem, 10vw, 6rem)",
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
          }}
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text font-display italic">Jana Leigh</span>
        </h1>

        <h2
          className="font-display font-normal mb-4 sm:mb-6"
          style={{
            fontSize: "clamp(1rem, 4vw, 1.8rem)",
            color: "var(--text-soft)",
            letterSpacing: "0.01em",
          }}
        >
          Full-Stack Web Developer
        </h2>

        <ScrambledText
          className="mx-auto mb-8 sm:mb-10 max-w-2xl leading-relaxed"
          style={{
            fontSize: isMobile ? "0.95rem" : "1rem",
            color: "var(--text-muted)",
            lineHeight: isMobile ? "1.65" : "1.8",
          }}
          radius={100}
          duration={1.2}
          speed={0.5}
          scrambleChars=".:"
        >
          I am a UP Cebu Computer Science student and DOST Scholar who pairs a
          strong technical foundation in software engineering with a creative
          perspective shaped by a love for reading. Driven by logic and inspired
          by storytelling, I focus on building impactful, user-centric applications.
        </ScrambledText>

        <div className="flex w-full flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            className="btn-primary w-full sm:w-auto"
            onClick={() => scrollTo("projects")}
            type="button"
          >
            View My Work
          </button>
          <button
            className="btn-outline w-full sm:w-auto"
            onClick={() => scrollTo("contact")}
            type="button"
          >
            Get In Touch
          </button>
        </div>

        {!isMobile && (
          <button
            type="button"
            className="mt-12 sm:mt-16 flex flex-col items-center gap-2 cursor-pointer mx-auto"
            onClick={() => scrollTo("about")}
            style={{ opacity: 0.5, background: "none", border: "none" }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "var(--ocean-mist)",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              SCROLL DOWN
            </span>
            <div
              className="w-5 h-8 rounded-full flex justify-center pt-1.5"
              style={{ border: "1.5px solid var(--surface-border)" }}
            >
              <div
                className="w-1 h-2 rounded-full"
                style={{
                  background: "var(--ocean-foam)",
                  animation: "float 2s ease-in-out infinite",
                }}
              />
            </div>
          </button>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="wave-layer-1 absolute bottom-0"
          viewBox="0 0 1440 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "104%", height: isMobile ? "72px" : "120px" }}
        >
          <path
            fillOpacity="0.5"
            style={{ fill: "var(--wave-fill)" }}
            d="M0,80 C180,120 360,40 540,80 C720,120 900,40 1080,80 C1260,120 1380,60 1440,80 L1440,160 L0,160 Z"
          />
        </svg>

        <svg
          className="wave-layer-2 absolute bottom-0"
          viewBox="0 0 1440 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "104%", height: isMobile ? "56px" : "100px" }}
        >
          <path
            fillOpacity="0.7"
            style={{ fill: "var(--wave-fill)" }}
            d="M0,90 C240,50 480,130 720,90 C960,50 1200,130 1440,90 L1440,160 L0,160 Z"
          />
        </svg>

        <svg
          className="wave-layer-3 absolute bottom-0"
          viewBox="0 0 1440 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "104%", height: isMobile ? "40px" : "80px" }}
        >
          <path
            style={{ fill: "var(--wave-fill)" }}
            d="M0,100 C360,60 720,140 1080,100 C1260,80 1380,110 1440,100 L1440,160 L0,160 Z"
          />
        </svg>
      </div>
    </section>
  );
}