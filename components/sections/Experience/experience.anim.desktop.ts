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
          duration: 1.1,
          ease: "power2.out",
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
        y: 45,
        opacity: 0,
        filter: "blur(6px)",
        duration: motion.medium,
        ease: "back.out(1.6)",
        clearProps: "filter",
      });
    }

    if (role) {
      tl.from(
        role,
        {
          y: 35,
          opacity: 0,
          filter: "blur(6px)",
          duration: motion.medium,
          ease: "back.out(1.6)",
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
          duration: motion.medium,
          ease: motion.easeOut,
        },
        "-=0.35",
      );
    }

    if (period) {
      tl.from(
        period,
        {
          y: 20,
          opacity: 0,
          filter: "blur(4px)",
          duration: motion.medium,
          ease: motion.easeOut,
          clearProps: "filter",
        },
        "-=0.3",
      );
    }

    if (items.length) {
      tl.from(
        items,
        {
          y: 14,
          opacity: 0,
          filter: "blur(3px)",
          duration: motion.medium,
          ease: motion.easeOut,
          stagger: motion.staggerMd,
          clearProps: "filter",
        },
        "-=0.2",
      );
    }

    gsap.to(block, {
      yPercent: -6 - index * 1.2,
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
