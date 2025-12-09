"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A reusable cinematic parallax system.
 * Automatically attaches subtle Apple-like parallax to:
 * - .parallax-fg (foreground)
 * - .parallax-mg (midground)
 * - .parallax-bg (background)
 */
export function useParallaxLayers() {
  useEffect(() => {
    const fg = gsap.utils.toArray<HTMLElement>(".parallax-fg");
    const mg = gsap.utils.toArray<HTMLElement>(".parallax-mg");
    const bg = gsap.utils.toArray<HTMLElement>(".parallax-bg");

    // GLOBAL subtle ranges (Option A)
    const fgOffset = -6; // foreground moves most
    const mgOffset = -4; // midground moves medium
    const bgOffset = -2; // background moves least

    // Foreground
    fg.forEach((el, i) => {
      gsap.to(el, {
        yPercent: fgOffset - i * 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Midground
    mg.forEach((el, i) => {
      gsap.to(el, {
        yPercent: mgOffset - i * 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Background
    bg.forEach((el, i) => {
      gsap.to(el, {
        yPercent: bgOffset - i * 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}
