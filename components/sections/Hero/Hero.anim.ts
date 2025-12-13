import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimations(section: HTMLElement) {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const nameChars = section.querySelectorAll<HTMLElement>("[data-hero-char]");
  const role = section.querySelector<HTMLElement>("[data-hero-role]");
  const location = section.querySelector<HTMLElement>("[data-hero-location]");
  const textGroup = section.querySelector<HTMLElement>("[data-hero-text]");
  const photoFrame = section.querySelector<HTMLElement>(
    "[data-hero-photo-frame]",
  );
  const photoGlow = section.querySelector<HTMLElement>(
    "[data-hero-photo-glow]",
  );

  if (!prefersReduced) {
    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    intro
      .from(nameChars, {
        y: 70,
        opacity: 0,
        filter: "blur(10px)",
        stagger: 0.045,
        duration: 1.15,
        delay: 0.15,
        clearProps: "filter,transform",
      })
      .from(
        [role, location],
        {
          y: 40,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.7,
          stagger: 0.18,
          clearProps: "filter,transform",
        },
        "-=0.6",
      )
      .fromTo(
        photoGlow,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          clearProps: "transform",
        },
        "-=0.7",
      )
      .fromTo(
        photoFrame,
        { boxShadow: "0 0 0 rgba(0,255,255,0)" },
        {
          boxShadow: "0 0 40px rgba(0,255,255,0.55)",
          duration: 0.75,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        },
        "-=0.9",
      );

    gsap.to(textGroup, {
      y: -25,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(photoFrame, {
      y: -35,
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
