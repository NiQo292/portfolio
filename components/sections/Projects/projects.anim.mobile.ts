import { motion } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectsMobile(scope: HTMLElement) {
  const blocks = scope.querySelectorAll<HTMLElement>(
    "[data-featured-card], [data-project-card-secondary]",
  );

  blocks.forEach((block) => {
    gsap.from(block, {
      y: motion.distance.md,
      opacity: 0,
      duration: motion.duration.base,
      ease: motion.ease.soft,
      scrollTrigger: {
        trigger: block,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
}
