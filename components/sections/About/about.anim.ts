import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initAboutAnimations(section: HTMLElement) {
  const editorial = section.querySelector<HTMLElement>(
    "[data-about-editorial]",
  );
  const metaBlocks = section.querySelectorAll<HTMLElement>("[data-about-meta]");
  const divider = section.querySelector<HTMLElement>("[data-about-divider]");
  const paragraphs = section.querySelectorAll<HTMLElement>(
    "[data-about-paragraph]",
  );

  if (prefersReducedMotion()) {
    gsap.set([editorial, metaBlocks], {
      opacity: 1,
      y: 0,
      filter: "none",
    });
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  if (editorial) {
    tl.from(editorial, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  }

  if (metaBlocks.length) {
    tl.from(
      metaBlocks,
      {
        y: 18,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
      },
      "-=0.4",
    );
  }

  if (divider) {
    gsap.set(divider, { scaleX: 0 });

    tl.to(
      divider,
      {
        scaleX: 1,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.6",
    );
  }

  if (paragraphs.length) {
    tl.from(paragraphs, {
      y: 32,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
    });
  }
}
