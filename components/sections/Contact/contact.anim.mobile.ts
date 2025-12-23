import { motion } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initContactMobile(section: HTMLElement) {
  const grid = section.querySelector<HTMLElement>("[data-contact-grid]");
  if (!grid) return;

  gsap.from(grid, {
    y: motion.distance.md,
    opacity: 0,
    duration: motion.duration.base,
    ease: motion.ease.soft,
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
    },
  });
}
