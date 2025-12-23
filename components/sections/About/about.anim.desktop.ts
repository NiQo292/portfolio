import { motion } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAboutDesktop(section: HTMLElement) {
  const editorial = section.querySelector("[data-about-editorial]");
  const paragraphs = section.querySelectorAll<HTMLElement>(
    "[data-about-paragraph]",
  );
  const divider = section.querySelector<HTMLElement>("[data-about-divider]");
  const metaBlocks = section.querySelectorAll<HTMLElement>(
    "[data-about-meta-block]",
  );

  if (!editorial) return;

  if (paragraphs.length) {
    gsap.from(paragraphs, {
      opacity: 0,
      y: motion.distance.md,
      duration: motion.duration.slow,
      ease: motion.ease.out,
      stagger: motion.stagger.md,
      scrollTrigger: {
        trigger: editorial,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      clearProps: "transform",
    });
  }

  if (divider) {
    gsap.fromTo(
      divider,
      { scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        transformOrigin: "top",
        duration: motion.duration.base,
        ease: motion.ease.soft,
        scrollTrigger: {
          trigger: editorial,
          start: "top 80%",
        },
      },
    );
  }

  if (metaBlocks.length) {
    gsap.from(metaBlocks, {
      opacity: 0,
      y: motion.distance.sm,
      duration: motion.duration.base,
      ease: motion.ease.soft,
      stagger: motion.stagger.sm,
      scrollTrigger: {
        trigger: metaBlocks[0],
        start: "top 85%",
        toggleActions: "play none none none",
      },
      clearProps: "transform",
    });
  }
}
