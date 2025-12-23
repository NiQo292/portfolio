import { gsap } from "gsap";

export function initExperienceMobile(scope: HTMLElement) {
  const blocks = scope.querySelectorAll<HTMLElement>("[data-exp-block]");

  blocks.forEach((block) => {
    const items = block.querySelectorAll(
      "[data-exp-company], [data-exp-role], [data-exp-period], [data-exp-item]",
    );

    gsap.from(items, {
      y: 24,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: block,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
}
