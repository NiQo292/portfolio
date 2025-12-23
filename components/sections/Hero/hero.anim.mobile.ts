import { motion } from "@/lib/motion";
import { gsap } from "gsap";

export function initHeroMobile(section: HTMLElement) {
  const elements = section.querySelectorAll<HTMLElement>(
    "[data-hero-char], [data-hero-role], [data-hero-location]",
  );

  gsap.from(elements, {
    y: motion.distance.sm,
    opacity: 0,
    duration: motion.duration.base,
    ease: motion.ease.out,
    stagger: motion.stagger.xs,
    clearProps: "transform",
  });
}
