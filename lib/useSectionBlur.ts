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
  blur = 4,
  fadeTo = 0.45,
  start = "bottom 85%",
  end = "bottom 20%",
  scrub = true,
}: SectionBlurOptions) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: fadeTo,
        filter: `blur(${blur}px)`,
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, blur, fadeTo, start, end, scrub]);
}
