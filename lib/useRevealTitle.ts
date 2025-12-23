"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { withMatchMedia, media } from "@/lib/animation/media";
import { motion } from "./motion";

gsap.registerPlugin(ScrollTrigger);

type UseRevealTitleOptions = {
  scopeRef: RefObject<HTMLElement | null>;
  selector?: string;
};

export function useRevealTitle({
  scopeRef,
  selector = ".section-title",
}: UseRevealTitleOptions) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const titles = Array.from(scope.querySelectorAll<HTMLElement>(selector));

    if (!titles.length) return;

    return withMatchMedia((mm) => {
      mm.add(media.desktop, () => {
        const ctx = gsap.context(() => {
          titles.forEach((el) => {
            gsap.set(el, { opacity: 1, y: 0, filter: "none" });

            gsap.fromTo(
              el,
              { y: motion.distance.xl, opacity: 0, filter: "blur(10px)" },
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: motion.duration.slow,
                ease: motion.ease.out,
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          });
        }, scope);

        return () => ctx.revert();
      });

      mm.add(media.mobile, () => {
        gsap.set(titles, { opacity: 1, y: 0, filter: "none" });
      });
    });
  }, [scopeRef, selector]);
}
