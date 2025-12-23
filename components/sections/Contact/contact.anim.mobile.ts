import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initContactMobile(section: HTMLElement) {
  const grid = section.querySelector<HTMLElement>("[data-contact-grid]");
  if (!grid) return;

  gsap.from(grid, {
    y: 30,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
    },
  });
}
