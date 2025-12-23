import { motion } from "@/lib/motion";
import gsap from "gsap";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function openContactModal(modal: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(modal, { opacity: 1, pointerEvents: "auto" });
    return;
  }

  gsap
    .timeline()
    .set(modal, { pointerEvents: "auto" })
    .to(modal, {
      opacity: 1,
      duration: motion.duration.fast,
      ease: motion.ease.soft,
    })
    .fromTo(
      modal.querySelector("[data-modal-content]"),
      { y: motion.distance.lg, opacity: 0, filter: "blur(14px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: motion.duration.base,
        ease: motion.ease.out,
      },
    );
}

export function closeContactModal(modal: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(modal, { opacity: 0, pointerEvents: "none" });
    return;
  }

  gsap
    .timeline()
    .to(modal.querySelector("[data-modal-content]"), {
      y: motion.distance.md,
      opacity: 0,
      filter: "blur(14px)",
      duration: motion.duration.fast,
      ease: motion.ease.inOut,
    })
    .to(modal, {
      opacity: 0,
      duration: motion.duration.fast,
      ease: motion.ease.soft,
      onComplete: () => {
        gsap.set(modal, { pointerEvents: "none" });
      },
    });
}

export function animateSubmitSuccess(btn: HTMLElement) {
  if (prefersReducedMotion()) return;

  gsap
    .timeline()
    .to(btn, {
      scale: 1.08,
      boxShadow: "0 0 38px rgba(0,255,255,0.55)",
      duration: motion.duration.fast,
      ease: motion.ease.soft,
    })
    .to(btn, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0,255,255,0)",
      duration: motion.duration.base,
      ease: "elastic.out(1.1,0.4)",
    });
}

export function rippleLiquid(liquid: HTMLElement) {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    liquid,
    { scale: 1, opacity: 0.45 },
    {
      scale: 1.25,
      opacity: 0.25,
      duration: motion.duration.base,
      ease: motion.ease.soft,
    },
  );
}
