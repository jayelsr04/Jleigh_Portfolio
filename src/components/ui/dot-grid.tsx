"use client";

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import '../../styles/dot-grid.css';

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  vx: number;
  vy: number;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 6,
  gap = 24,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 120,
  speedTrigger = 80,
  shockRadius = 200,
  shockStrength = 8,
  maxSpeed = 3000,
  className = '',
  style
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cell = dotSize + gap;
    const cols = Math.floor((width + gap) / cell);
    const rows = Math.floor((height + gap) / cell);

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          vx: 0,
          vy: 0
        });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId: number;
    const proxSq = proximity * proximity;

    const spring = 0.08;
    const friction = 0.85;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ax = -dot.xOffset * spring;
        const ay = -dot.yOffset * spring;
        dot.vx = (dot.vx + ax) * friction;
        dot.vy = (dot.vy + ay) * friction;
        dot.xOffset += dot.vx;
        dot.yOffset += dot.vy;

        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    buildGrid();

    const handleResize = (): void => {
      buildGrid();
    };

    const currentWrapper = wrapperRef.current;
    let ro: ResizeObserver | null = null;

    if ('ResizeObserver' in window && currentWrapper) {
      ro = new ResizeObserver(handleResize);
      ro.observe(currentWrapper);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [buildGrid]);

    useEffect(() => {
    const handlePointerMove = (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;

      const currentX = clientX - rect.left;
      const currentY = clientY - rect.top;

      const dx = currentX - pr.lastX;
      const dy = currentY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }

      pr.lastTime = now;
      pr.lastX = currentX;
      pr.lastY = currentY;
      pr.x = currentX;
      pr.y = currentY;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity) {
          const factor = (1 - dist / proximity) * (speed / maxSpeed) * 15;
          dot.vx += (dx > 0 ? 1 : -1) * factor;
          dot.vy += (dy > 0 ? 1 : -1) * factor;
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      handlePointerMove(touch.clientX, touch.clientY);
    };

    const onClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const angle = Math.atan2(dot.cy - cy, dot.cx - cx);
          const force = falloff * shockStrength;
          dot.vx += Math.cos(angle) * force;
          dot.vy += Math.sin(angle) * force;
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (!touch) return;

      const cx = touch.clientX - rect.left;
      const cy = touch.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const angle = Math.atan2(dot.cy - cy, dot.cx - cx);
          const force = falloff * shockStrength;
          dot.vx += Math.cos(angle) * force;
          dot.vy += Math.sin(angle) * force;
        }
      }
    };

    const throttledMove = throttle(onMove, 16);
    const throttledTouchMove = throttle(onTouchMove, 16);
    const wrap = wrapperRef.current;

    if (wrap) {
      wrap.addEventListener("mousemove", throttledMove, { passive: true });
      wrap.addEventListener("click", onClick);
      wrap.addEventListener("touchmove", throttledTouchMove, { passive: true });
      wrap.addEventListener("touchstart", onTouchStart, { passive: true });
    }

    return () => {
      if (wrap) {
        wrap.removeEventListener("mousemove", throttledMove);
        wrap.removeEventListener("click", onClick);
        wrap.removeEventListener("touchmove", throttledTouchMove);
        wrap.removeEventListener("touchstart", onTouchStart);
      }
    };
  }, [maxSpeed, speedTrigger, proximity, shockRadius, shockStrength]);
  
  return (
    <div className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </div>
  );
};

export default DotGrid;