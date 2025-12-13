import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectsAnimations(section: HTMLElement) {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const featuredCard = section.querySelector("[data-featured-card]");
  const featuredImgWrap = section.querySelector("[data-featured-img-wrap]");
  const vignette = section.querySelector(".project-featured-vignette");

  const contentItems = section.querySelectorAll(
    "[data-project-title], [data-project-desc], [data-project-tech-list] > span, [data-featured-content] .btn-primary",
  );

  const secondaryCards = section.querySelectorAll(
    "[data-project-card-secondary]",
  );

  if (!prefersReduced) {
    gsap.from(featuredImgWrap, {
      y: 60,
      opacity: 0,
      filter: "blur(14px)",
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: featuredCard,
        start: "top 85%",
      },
    });

    gsap.from(vignette, {
      opacity: 0,
      scale: 0.92,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: featuredCard,
        start: "top 85%",
      },
    });

    gsap.from(contentItems, {
      y: 30,
      opacity: 0,
      filter: "blur(10px)",
      duration: 1.0,
      ease: "power2.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: featuredCard,
        start: "top 80%",
      },
    });

    gsap.from(secondaryCards, {
      y: 40,
      opacity: 0,
      filter: "blur(10px)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: secondaryCards[0],
        start: "top 85%",
      },
    });

    gsap.to(featuredImgWrap, {
      y: -25,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

export function initFeaturedHover(card: HTMLElement) {
  const glow = card.querySelector(".project-featured-glow");

  let hover = false;

  const onMove = (e: MouseEvent) => {
    if (!hover) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.04,
      transformPerspective: 900,
      ease: "power2.out",
      duration: 0.25,
    });

    if (glow) {
      const maxShift = rect.width * 0.2;
      gsap.to(glow, {
        x: ((x - centerX) / centerX) * maxShift,
        y: ((y - centerY) / centerY) * maxShift,
        opacity: 0.35,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const onEnter = () => {
    hover = true;
    card.addEventListener("mousemove", onMove);
    gsap.to(card, { scale: 1.04, duration: 0.2 });
  };

  const onLeave = () => {
    hover = false;
    card.removeEventListener("mousemove", onMove);

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });

    if (glow) {
      gsap.to(glow, {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  card.addEventListener("mouseenter", onEnter);
  card.addEventListener("mouseleave", onLeave);

  return () => {
    card.removeEventListener("mouseenter", onEnter);
    card.removeEventListener("mouseleave", onLeave);
    card.removeEventListener("mousemove", onMove);
  };
}
