import { motion } from "@/lib/motion";
import { gsap } from "gsap";

export function initExperienceMobile(scope: HTMLElement) {
  const blocks = scope.querySelectorAll<HTMLElement>("[data-exp-block]");

  blocks.forEach((block) => {
    const items = block.querySelectorAll(
      "[data-exp-company], [data-exp-role], [data-exp-period], [data-exp-item]",
    );

    gsap.from(items, {
      y: motion.distance.sm,
      opacity: 0,
      duration: motion.duration.fast,
      ease: motion.ease.out,
      stagger: motion.stagger.xs,
      scrollTrigger: {
        trigger: block,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      clearProps: "transform",
    });
  });
}
