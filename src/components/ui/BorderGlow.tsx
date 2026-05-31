"use client";

import type {
  CSSProperties,
  HTMLAttributes,
  MutableRefObject,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { forwardRef, useCallback, useMemo, useRef } from "react";

type BorderGlowProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  colors?: string[];
  fillOpacity?: number;
};

type GlowVars = CSSProperties & Record<string, string | number>;

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "").trim();
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  if (full.length !== 6) {
    return { r: 136, g: 201, b: 191 };
  }

  const value = Number.parseInt(full, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHslString(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case rn:
        h = 60 * (((gn - bn) / delta) % 6);
        break;
      case gn:
        h = 60 * ((bn - rn) / delta + 2);
        break;
      default:
        h = 60 * ((rn - gn) / delta + 4);
        break;
    }
  }

  if (h < 0) {
    h += 360;
  }

  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function buildGlowVars(glowColor: string, intensity: number): GlowVars {
  const base = rgbToHslString(glowColor);
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars: GlowVars = {};

  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(
      opacities[i] * intensity,
      100
    )}%)`;
  }

  return vars;
}

function buildGradientVars(colors: string[]) {
  const palette = colors.length > 0 ? colors : ["#88c9bf", "#a8d8ea", "#e0c08a"];
  const gradientPositions = [
    "80% 55%",
    "69% 34%",
    "8% 6%",
    "41% 38%",
    "86% 85%",
    "82% 18%",
    "51% 4%",
  ];
  const gradientKeys = [
    "--gradient-one",
    "--gradient-two",
    "--gradient-three",
    "--gradient-four",
    "--gradient-five",
    "--gradient-six",
    "--gradient-seven",
  ];
  const colorMap = [0, 1, 2, 0, 1, 2, 1];
  const vars: GlowVars = {};

  for (let i = 0; i < gradientKeys.length; i++) {
    const color = palette[Math.min(colorMap[i], palette.length - 1)];
    vars[gradientKeys[i]] = `radial-gradient(at ${gradientPositions[i]}, ${color} 0px, transparent 50%)`;
  }

  vars["--gradient-base"] = `linear-gradient(${palette[0]} 0 100%)`;
  return vars;
}

function clampEdgeValue(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

const BorderGlow = forwardRef<HTMLDivElement, BorderGlowProps>(
  (
    {
      children,
      className = "",
      edgeSensitivity = 30,
      glowColor = "#88c9bf",
      backgroundColor = "var(--card-bg)",
      borderRadius = 28,
      glowRadius = 40,
      glowIntensity = 1,
      coneSpread = 25,
      colors = ["#88c9bf", "#a8d8ea", "#e0c08a"],
      fillOpacity = 0.5,
      onPointerMove,
      onPointerLeave,
      style,
      ...rest
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement | null>(null);

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    const glowVars = useMemo(
      () => buildGlowVars(glowColor, glowIntensity),
      [glowColor, glowIntensity]
    );

    const gradientVars = useMemo(() => buildGradientVars(colors), [colors]);

    const handlePointerMove = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        const card = localRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const dx = x - centerX;
        const dy = y - centerY;

        const proximity = clampEdgeValue(
          100 - Math.min(100, (Math.hypot(dx, dy) / Math.max(rect.width, rect.height)) * 180)
        );
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        card.style.setProperty("--edge-proximity", `${proximity.toFixed(3)}`);
        card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
        card.style.setProperty("--edge-sensitivity", `${edgeSensitivity}`);
      },
      [edgeSensitivity]
    );

    const handlePointerLeave = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        const card = localRef.current;
        if (card) {
          card.style.setProperty("--edge-proximity", "0");
          card.style.setProperty("--cursor-angle", "45deg");
        }

        onPointerLeave?.(event);
      },
      [onPointerLeave]
    );

    const mergedStyle = useMemo<GlowVars>(
      () => ({
        "--card-bg": backgroundColor,
        "--edge-proximity": 0,
        "--cursor-angle": "45deg",
        "--edge-sensitivity": edgeSensitivity,
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": coneSpread,
        "--fill-opacity": fillOpacity,
        ...glowVars,
        ...gradientVars,
        ...style,
      }),
      [
        backgroundColor,
        borderRadius,
        coneSpread,
        edgeSensitivity,
        fillOpacity,
        glowRadius,
        glowVars,
        gradientVars,
        style,
      ]
    );

    return (
      <div
        ref={setRef}
        onPointerMove={(event) => {
          handlePointerMove(event);
          onPointerMove?.(event);
        }}
        onPointerLeave={handlePointerLeave}
        className={`border-glow-card ${className}`.trim()}
        style={mergedStyle}
        {...rest}
      >
        <span className="edge-light" aria-hidden="true" />
        <div className="border-glow-inner">{children}</div>
      </div>
    );
  }
);

BorderGlow.displayName = "BorderGlow";

export default BorderGlow;
