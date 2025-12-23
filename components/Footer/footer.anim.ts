import { motion } from "@/lib/motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type FooterAnimArgs = {
  footer: HTMLElement;
  trigger: HTMLElement;
  heading: HTMLElement;
};

export function initFooterAnimations({
  footer,
  trigger,
  heading,
}: FooterAnimArgs) {
  const originalText = heading.innerText;

  const ctx = gsap.context(() => {
    if (!heading.querySelector(".footer-letter")) {
      heading.innerHTML = originalText
        .split("")
        .map(
          (char) =>
            `<span class="footer-letter">${
              char === " " ? "&nbsp;" : char
            }</span>`,
        )
        .join("");
    }

    const letters = heading.querySelectorAll<HTMLElement>(".footer-letter");

    gsap.set(letters, {
      opacity: prefersReducedMotion ? 0.08 : 0,
      y: prefersReducedMotion ? 0 : motion.distance.sm,
      filter: prefersReducedMotion ? "none" : "blur(6px)",
    });

    if (prefersReducedMotion) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      })
      .to(letters, {
        opacity: 0.08,
        y: 0,
        filter: "blur(0px)",
        duration: motion.duration.slow,
        ease: motion.ease.out,
        stagger: motion.stagger.xs,
      });
  }, footer);

  return () => {
    ctx.revert();
    heading.innerText = originalText;
  };
}
