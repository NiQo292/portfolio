import { motion } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAboutMobile(section: HTMLElement) {
  const paragraphs = section.querySelectorAll<HTMLElement>(
    "[data-about-paragraph]",
  );
  const divider = section.querySelector<HTMLElement>("[data-about-divider]");
  const metaBlocks = section.querySelectorAll<HTMLElement>(
    "[data-about-meta-block]",
  );

  if (paragraphs.length) {
    gsap.from(paragraphs, {
      opacity: 0,
      y: motion.distance.sm,
      duration: motion.duration.base,
      ease: motion.ease.soft,
      stagger: motion.stagger.sm,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
      },
      clearProps: "transform",
    });
  }

  if (divider) {
    gsap.fromTo(
      divider,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        transformOrigin: "left",
        duration: motion.duration.base,
        ease: motion.ease.soft,
        scrollTrigger: {
          trigger: divider,
          start: "top 90%",
        },
      },
    );
  }

  if (metaBlocks.length) {
    gsap.from(metaBlocks, {
      opacity: 0,
      y: motion.distance.xs,
      duration: motion.duration.fast,
      ease: motion.ease.soft,
      stagger: motion.stagger.xs,
      scrollTrigger: {
        trigger: metaBlocks[0],
        start: "top 90%",
      },
      clearProps: "transform",
    });
  }
}
