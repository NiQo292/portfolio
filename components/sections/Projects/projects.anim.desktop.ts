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
    y: 60,
    opacity: 0,
    filter: "blur(14px)",
    duration: 1.2,
    ease: "power3.out",
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
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: featuredCard,
        start: "top 85%",
      },
    });
  }

  gsap.from(content, {
    y: 30,
    opacity: 0,
    filter: "blur(10px)",
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: featuredCard,
      start: "top 80%",
    },
    clearProps: "filter",
  });

  if (secondaryCards.length) {
    gsap.from(secondaryCards, {
      y: 40,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: secondaryCards[0],
        start: "top 85%",
      },
      clearProps: "filter",
    });
  }

  gsap.to(featuredImg, {
    y: -25,
    ease: "none",
    scrollTrigger: {
      trigger: scope,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
