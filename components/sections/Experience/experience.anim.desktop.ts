import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initExperienceDesktop(scope: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(
      scope.querySelectorAll(
        "[data-exp-company], [data-exp-role], [data-exp-bar], [data-exp-period], [data-exp-item], [data-exp-glow]",
      ),
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "none",
        width: "100%",
      },
    );
    return;
  }

  const blocks = Array.from(
    scope.querySelectorAll<HTMLElement>("[data-exp-block]"),
  );

  blocks.forEach((block, index) => {
    const company = block.querySelector<HTMLElement>("[data-exp-company]");
    const role = block.querySelector<HTMLElement>("[data-exp-role]");
    const bar = block.querySelector<HTMLElement>("[data-exp-bar]");
    const period = block.querySelector<HTMLElement>("[data-exp-period]");
    const items = block.querySelectorAll<HTMLElement>("[data-exp-item]");
    const glow = block.querySelector<HTMLElement>("[data-exp-glow]");

    if (glow) {
      gsap.fromTo(
        glow,
        { opacity: 0, scale: 0.93 },
        {
          opacity: 1,
          scale: 1,
          duration: motion.duration.slow,
          ease: motion.ease.soft,
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          },
        },
      );
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    if (company) {
      tl.from(company, {
        y: motion.distance.lg,
        opacity: 0,
        filter: "blur(6px)",
        duration: motion.duration.base,
        ease: motion.ease.out,
        clearProps: "filter",
      });
    }

    if (role) {
      tl.from(
        role,
        {
          y: motion.distance.md,
          opacity: 0,
          filter: "blur(6px)",
          duration: motion.duration.base,
          ease: motion.ease.out,
          clearProps: "filter",
        },
        "-=0.45",
      );
    }

    if (bar) {
      tl.from(
        bar,
        {
          width: 0,
          duration: motion.duration.base,
          ease: motion.ease.out,
        },
        "-=0.35",
      );
    }

    if (period) {
      tl.from(
        period,
        {
          y: motion.distance.sm,
          opacity: 0,
          filter: "blur(4px)",
          duration: motion.duration.base,
          ease: motion.ease.out,
          clearProps: "filter",
        },
        "-=0.3",
      );
    }

    if (items.length) {
      tl.from(
        items,
        {
          y: motion.distance.xs,
          opacity: 0,
          filter: "blur(3px)",
          duration: motion.duration.base,
          ease: motion.ease.out,
          stagger: motion.stagger.sm,
          clearProps: "filter",
        },
        "-=0.2",
      );
    }

    gsap.to(block, {
      yPercent: motion.parallax.base - index * motion.parallax.step,
      ease: "none",
      scrollTrigger: {
        trigger: block,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}
