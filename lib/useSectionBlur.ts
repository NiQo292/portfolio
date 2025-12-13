"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionBlurOptions {
  ref: React.RefObject<HTMLElement>;
  blur?: number;
  fadeTo?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export function useSectionBlur({
  ref,
  blur = 6,
  fadeTo = 0.45,
  start = "bottom+=300 bottom",
  end = "bottom-=200 top",
  scrub = true,
}: SectionBlurOptions) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    let overlay = section.querySelector(".section-blur-overlay") as HTMLElement;

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "section-blur-overlay";
      section.appendChild(overlay);
    }

    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "999";
    overlay.style.opacity = "0";
    overlay.style.backdropFilter = "blur(0px)";
    overlay.style.transition = "none";

    if (getComputedStyle(section).position === "static") {
      section.style.position = "relative";
    }

    const ctx = gsap.context(() => {
      gsap.to(overlay, {
        opacity: 1,
        backdropFilter: `blur(${blur}px)`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start,
          end,
          scrub,
        },
      });

      gsap.to(section, {
        opacity: fadeTo,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start,
          end,
          scrub,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [ref, blur, fadeTo, start, end, scrub]);
}
