"use client";

import React, { ReactNode, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
};

export default function TextUpDown({
  children,
  className = "",
  stagger = 0.02,
  duration = 0.4,
}: Props) {
  const topRefs = useRef<HTMLSpanElement[]>([]);
  const bottomRefs = useRef<HTMLSpanElement[]>([]);

  const text = useMemo(() => String(children ?? ""), [children]);
  const chars = useMemo(() => text.split(""), [text]);

  // Ensure refs arrays don't keep stale entries across rerenders
  topRefs.current = [];
  bottomRefs.current = [];

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) return;

    // Initial state: top in place, bottom below
    gsap.set(topRefs.current, { yPercent: 0 });
    gsap.set(bottomRefs.current, { yPercent: 100 });
  }, [text]);

  const lift = () => {
    gsap.killTweensOf(topRefs.current);
    gsap.killTweensOf(bottomRefs.current);

    gsap.to(topRefs.current, {
      yPercent: -100,
      duration,
      stagger,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(bottomRefs.current, {
      yPercent: 0,
      duration,
      stagger,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const drop = () => {
    gsap.killTweensOf(topRefs.current);
    gsap.killTweensOf(bottomRefs.current);

    gsap.to(topRefs.current, {
      yPercent: 0,
      duration,
      stagger,
      ease: "power2.inOut",
      overwrite: "auto",
    });

    gsap.to(bottomRefs.current, {
      yPercent: 100,
      duration,
      stagger,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  return (
    <span
      className={`relative inline-block cursor-pointer overflow-hidden align-baseline whitespace-nowrap select-none ${className}`}
      onMouseEnter={lift}
      onMouseLeave={drop}
    >
      {/* TOP LAYER */}
      <span className="absolute top-0 left-0 inline-block">
        {chars.map((ch, i) => (
          <span
            key={`top-${i}`}
            ref={(el) => {
              if (el) topRefs.current[i] = el;
            }}
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>

      {/* BOTTOM LAYER */}
      <span className="absolute top-0 left-0 inline-block">
        {chars.map((ch, i) => (
          <span
            key={`bottom-${i}`}
            ref={(el) => {
              if (el) bottomRefs.current[i] = el;
            }}
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>

      <span className="invisible inline-block">
        {chars.map((ch, i) => (
          <span key={`ghost-${i}`} className="inline-block">
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
