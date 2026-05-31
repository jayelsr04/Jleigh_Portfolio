"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import '../../styles/scrambled-text.css';

gsap.registerPlugin(ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string; 
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const spans = rootRef.current.querySelectorAll('.char');
    charsRef.current = Array.from(spans) as HTMLElement[];

    const handleMove = (e: PointerEvent) => {
      charsRef.current.forEach(c => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.getAttribute('data-content') || '',
              chars: scrambleChars,
              speed
            },
            ease: 'none'
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
    };
  }, [radius, duration, speed, scrambleChars]);

  const words = children.split(' ');

  return (
    <div ref={rootRef} className={className} style={style}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, charIdx) => (
            <span 
              key={charIdx} 
              className="char" 
              style={{ display: 'inline-block' }}
              data-content={char}
            >
              {char}
            </span>
          ))}
          {wordIdx < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </div>
  );
};

export default ScrambledText;