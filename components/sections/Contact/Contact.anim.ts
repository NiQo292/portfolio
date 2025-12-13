import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initContactReveal(section: HTMLElement) {
  if (prefersReducedMotion()) return;

  gsap.from(section.querySelector("[data-contact-grid]"), {
    y: 50,
    opacity: 0,
    filter: "blur(12px)",
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
  });
}

export function initContactLiquid(shell: HTMLElement, liquid: HTMLElement) {
  if (prefersReducedMotion()) return;

  const onMove = (e: PointerEvent) => {
    const rect = shell.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(liquid, {
      x: (x - rect.width / 2) * 0.12,
      y: (y - rect.height / 2) * 0.12,
      duration: 0.55,
      ease: "sine.out",
    });
  };

  shell.addEventListener("pointermove", onMove);

  return () => {
    shell.removeEventListener("pointermove", onMove);
  };
}

export function openContactModal(modal: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(modal, { opacity: 1, pointerEvents: "auto" });
    return;
  }

  gsap
    .timeline()
    .set(modal, { pointerEvents: "auto" })
    .to(modal, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    })
    .fromTo(
      modal.querySelector("[data-modal-content]"),
      {
        y: 80,
        opacity: 0,
        filter: "blur(14px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power3.out",
      },
    );
}

export function closeContactModal(modal: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(modal, { opacity: 0, pointerEvents: "none" });
    return;
  }

  gsap
    .timeline()
    .to(modal.querySelector("[data-modal-content]"), {
      y: 60,
      opacity: 0,
      filter: "blur(14px)",
      duration: 0.45,
      ease: "power2.inOut",
    })
    .to(modal, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(modal, { pointerEvents: "none" });
      },
    });
}

export function animateSubmitSuccess(btn: HTMLElement) {
  if (prefersReducedMotion()) return;

  gsap
    .timeline()
    .to(btn, {
      scale: 1.08,
      boxShadow: "0 0 38px rgba(0,255,255,0.55)",
      duration: 0.25,
      ease: "power2.out",
    })
    .to(btn, {
      scale: 1,
      boxShadow: "0 0 0px rgba(0,255,255,0)",
      duration: 0.6,
      ease: "elastic.out(1.1,0.4)",
    });
}

export function rippleLiquid(liquid: HTMLElement) {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    liquid,
    { scale: 1, opacity: 0.45 },
    {
      scale: 1.25,
      opacity: 0.25,
      duration: 0.65,
      ease: "power2.out",
    },
  );
}
