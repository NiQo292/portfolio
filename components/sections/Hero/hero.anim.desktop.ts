import { motion } from "@/lib/motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHeroDesktop(section: HTMLElement) {
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

  const intro = gsap.timeline({
    defaults: { ease: motion.ease.out },
  });

  intro
    .from(nameChars, {
      y: motion.distance.sm,
      opacity: 0,
      filter: "blur(10px)",
      stagger: motion.stagger.sm,
      duration: motion.duration.slow,
      delay: motion.delay.sm,
      clearProps: "filter,transform",
    })
    .from(
      [role, location],
      {
        y: motion.distance.md,
        opacity: 0,
        filter: "blur(8px)",
        duration: motion.duration.base,
        stagger: motion.stagger.sm,
        clearProps: "filter,transform",
      },
      "-=0.55",
    )
    .fromTo(
      photoGlow,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: motion.duration.slow,
        ease: motion.ease.soft,
        clearProps: "transform",
      },
      "-=0.65",
    )
    .fromTo(
      photoFrame,
      { boxShadow: "0 0 0 rgba(0,255,255,0)" },
      {
        boxShadow: "0 0 40px rgba(0,255,255,0.55)",
        duration: motion.duration.base,
        ease: motion.ease.soft,
        yoyo: true,
        repeat: 1,
      },
      "-=0.85",
    );

  gsap.to(textGroup, {
    y: -motion.parallax.base,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.to(photoFrame, {
    y: -motion.parallax.base * 1.4,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
