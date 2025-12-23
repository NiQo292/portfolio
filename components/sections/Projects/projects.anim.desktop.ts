import { motion } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectsDesktop(scope: HTMLElement) {
  const featuredCard = scope.querySelector<HTMLElement>("[data-featured-card]");
  const featuredImg = scope.querySelector<HTMLElement>(
    "[data-featured-img-wrap]",
  );
  const vignette = scope.querySelector<HTMLElement>(
    ".project-featured-vignette",
  );

  const content = scope.querySelectorAll<HTMLElement>(
    "[data-project-title], [data-project-desc], [data-project-tech-list] span, .btn-primary",
  );

  const secondaryCards = scope.querySelectorAll<HTMLElement>(
    "[data-project-card-secondary]",
  );

  if (!featuredCard || !featuredImg) return;

  gsap.from(featuredImg, {
    y: motion.distance.lg,
    opacity: 0,
    filter: "blur(14px)",
    duration: motion.duration.slow,
    ease: motion.ease.out,
    scrollTrigger: {
      trigger: featuredCard,
      start: "top 85%",
    },
    clearProps: "filter",
  });

  if (vignette) {
    gsap.from(vignette, {
      opacity: 0,
      scale: 0.92,
      duration: motion.duration.slow,
      ease: motion.ease.out,
      scrollTrigger: {
        trigger: featuredCard,
        start: "top 85%",
      },
    });
  }

  gsap.from(content, {
    y: motion.distance.md,
    opacity: 0,
    filter: "blur(10px)",
    duration: motion.duration.base,
    ease: motion.ease.soft,
    stagger: motion.stagger.sm,
    scrollTrigger: {
      trigger: featuredCard,
      start: "top 80%",
    },
    clearProps: "filter",
  });

  if (secondaryCards.length) {
    gsap.from(secondaryCards, {
      y: motion.distance.lg,
      opacity: 0,
      filter: "blur(10px)",
      duration: motion.duration.base,
      ease: motion.ease.soft,
      stagger: motion.stagger.md,
      scrollTrigger: {
        trigger: secondaryCards[0],
        start: "top 85%",
      },
      clearProps: "filter",
    });
  }

  gsap.to(featuredImg, {
    y: -motion.parallax.base,
    ease: "none",
    scrollTrigger: {
      trigger: scope,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
