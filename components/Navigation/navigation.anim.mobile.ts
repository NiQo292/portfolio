import { motion } from "@/lib/motion";
import gsap from "gsap";

export function initNavMobile(_nav: HTMLElement, overlay: HTMLElement) {
  gsap.set(overlay, { opacity: 0, pointerEvents: "none" });

  const tl = gsap.timeline({ paused: true });
  tl.to(overlay, {
    opacity: 1,
    pointerEvents: "auto",
    duration: motion.duration.fast,
    ease: motion.ease.soft,
  });

  return {
    menuTl: tl,
    cleanup() {
      tl.kill();
    },
  };
}
