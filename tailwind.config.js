/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ocean: {
          deep: "#0a1628",
          mid: "#0d2240",
          surface: "#0f3460",
          shallow: "#1a5276",
          foam: "#a8d8ea",
          seafoam: "#88c9bf",
          mist: "#c8e6f5",
        },
        sand: {
          dark: "#c9a96e",
          mid: "#e0c08a",
          light: "#f5e6c8",
        },
        coral: "#e07b6b",
        kelp: "#2d6a4f",
      },
      animation: {
        "wave-slow": "waveMove 8s ease-in-out infinite",
        "wave-mid": "waveMove 6s ease-in-out infinite reverse",
        "wave-fast": "waveMove 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "ripple": "ripple 2s ease-out infinite",
      },
      keyframes: {
        waveMove: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-4%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
