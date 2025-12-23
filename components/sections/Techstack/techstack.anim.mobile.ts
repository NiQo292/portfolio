import { gsap } from "gsap";

export function initTechStackMobile(scope: HTMLElement) {
  const headings = scope.querySelectorAll<HTMLElement>("[data-ts-heading]");
  const items = scope.querySelectorAll<HTMLElement>("[data-ts-item]");

  gsap.from([...headings, ...items], {
    y: 16,
    opacity: 0,
    duration: 0.45,
    ease: "power2.out",
    stagger: 0.03,
    clearProps: "transform",
  });
}
