"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useParallaxLayers() {
  useEffect(() => {
    const fg = gsap.utils.toArray<HTMLElement>(".parallax-fg");
    const mg = gsap.utils.toArray<HTMLElement>(".parallax-mg");
    const bg = gsap.utils.toArray<HTMLElement>(".parallax-bg");

    const fgOffset = -6;
    const mgOffset = -4;
    const bgOffset = -2;

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
