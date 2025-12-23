import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectsMobile(scope: HTMLElement) {
  const blocks = scope.querySelectorAll<HTMLElement>(
    "[data-featured-card], [data-project-card-secondary]",
  );

  blocks.forEach((block) => {
    gsap.from(block, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: block,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
}
