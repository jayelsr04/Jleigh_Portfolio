"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden noise-bg"
      style={{
        background:
          "linear-gradient(180deg, var(--hero-top) 0%, var(--hero-mid) 40%, var(--hero-bottom) 100%)",
      }}
    >
      {/* Deep ocean gradient layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(26,82,118,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Stars/particles in background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: "rgba(168, 216, 234, 0.6)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              opacity: "0.7",
              animation: `shimmer ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease",
        }}
      >
        {/* Small eyebrow label */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(136, 201, 191, 0.1)",
            border: "1px solid rgba(136, 201, 191, 0.3)",
            color: "var(--ocean-seafoam)",
            fontSize: "0.8rem",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            letterSpacing: "0.1em",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "var(--ocean-seafoam)",
              animation: "shimmer 2s ease-in-out infinite",
            }}
          />
          Available for Internship
        </div>

        {/* Name */}
        <h1
          className="font-display font-black mb-2 leading-none"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 6rem)",
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
          }}
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text font-display italic">
            Jana Leigh
          </span>
        </h1>

        {/* Typewriter role */}
        <h2
          className="font-display font-normal mb-6"
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.8rem)",
            color: "var(--text-soft)",
            letterSpacing: "0.01em",
          }}
        >
          Full-Stack Web Developer
        </h2>

        {/* Bio */}
        <p
          className="max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            fontSize: "1rem",
            color: "var(--text-muted)",
            lineHeight: "1.8",
          }}
        >
          I am a UP Cebu Computer Science student and DOST Scholar who pairs a 
          strong technical foundation in software engineering with a creative 
          perspective shaped by a love for reading. Driven by logic and inspired 
          by storytelling, I focus on building impactful, user-centric applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="btn-primary" onClick={() => scrollTo("projects")}>
            View My Work
          </button>
          <button className="btn-outline" onClick={() => scrollTo("contact")}>
            Get In Touch
          </button>
        </div>

        {/* Scroll cue */}
        <div
          className="mt-16 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollTo("about")}
          style={{ opacity: 0.5 }}
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
            style={{ border: "1.5px solid rgba(168,216,234,0.4)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{
                background: "var(--ocean-foam)",
                animation: "float 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Ocean waves at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Wave layer 1 (back) */}
        <svg
          className="wave-layer-1 absolute bottom-0"
          viewBox="0 0 1440 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "104%", height: "120px" }}
        >
          <path
            fillOpacity="0.5"
            style={{ fill: "var(--wave-fill)" }}
            d="M0,80 C180,120 360,40 540,80 C720,120 900,40 1080,80 C1260,120 1380,60 1440,80 L1440,160 L0,160 Z"
          />
        </svg>
        {/* Wave layer 2 (mid) */}
        <svg
          className="wave-layer-2 absolute bottom-0"
          viewBox="0 0 1440 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "104%", height: "100px" }}
        >
          <path
            fillOpacity="0.7"
            style={{ fill: "var(--wave-fill)" }}
            d="M0,90 C240,50 480,130 720,90 C960,50 1200,130 1440,90 L1440,160 L0,160 Z"
          />
        </svg>
        {/* Wave layer 3 (front) */}
        <svg
          className="wave-layer-3 absolute bottom-0"
          viewBox="0 0 1440 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "104%", height: "80px" }}
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
