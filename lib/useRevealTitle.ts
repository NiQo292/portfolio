"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UseRevealTitleOptions = {
  scopeRef: RefObject<HTMLElement | null>;
  selector?: string;
  start?: string;
};

export function useRevealTitle({
  scopeRef,
  selector = ".section-title",
  start = "top bottom",
}: UseRevealTitleOptions) {
  useEffect(() => {
    if (!scopeRef || typeof scopeRef !== "object") return;
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const titles = gsap.utils.toArray<HTMLElement>(selector);
      if (!titles.length) return;

      titles.forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          filter: "blur(10px)",
          ease: "power3.out",
          duration: 1.4,
          scrollTrigger: {
            trigger: el,
            start,
            scrub: 1,
          },
        });
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, selector, start]);
}
