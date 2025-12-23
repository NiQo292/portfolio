// Hero.anim.mobile.ts
import { gsap } from "gsap";

export function initHeroMobile(section: HTMLElement) {
  const elements = section.querySelectorAll<HTMLElement>(
    "[data-hero-char], [data-hero-role], [data-hero-location]",
  );

  gsap.from(elements, {
    y: 24,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.03,
    clearProps: "transform",
  });
}
