import { motion } from "@/lib/motion";
import { gsap } from "gsap";

export function initTechStackMobile(scope: HTMLElement) {
  const headings = scope.querySelectorAll<HTMLElement>("[data-ts-heading]");
  const items = scope.querySelectorAll<HTMLElement>("[data-ts-item]");

  gsap.from([...headings, ...items], {
    y: motion.distance.sm,
    opacity: 0,
    duration: motion.duration.fast,
    ease: motion.ease.soft,
    stagger: motion.stagger.xs,
    clearProps: "transform",
  });
}
