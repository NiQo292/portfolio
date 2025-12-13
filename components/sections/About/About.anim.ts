import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initAboutAnimations(section: HTMLElement) {
  const line = section.querySelector("[data-about-line]");
  const heading = section.querySelector("[data-about-heading]");
  const sub = section.querySelector("[data-about-sub]");
  const items = section.querySelectorAll("[data-about-stagger]");

  if (prefersReducedMotion) {
    gsap.set([line, heading, sub, items], {
      opacity: 1,
      y: 0,
      filter: "none",
    });

    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
    },
  });

  if (line) {
    tl.from(line, {
      height: 0,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  }

  if (heading) {
    tl.from(
      heading,
      {
        y: 40,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1,
        ease: "power3.out",
      },
      "-=0.4",
    );
  }

  if (sub) {
    tl.from(
      sub,
      {
        y: 30,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.45",
    );
  }

  if (items.length) {
    tl.from(
      items,
      {
        y: 28,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
      },
      "-=0.35",
    );
  }
}
