import { gsap } from "gsap";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initNavBarEffects(nav: HTMLElement) {
  if (prefersReducedMotion) return;

  const sheen = nav.querySelector("[data-nav-sheen]");
  const reflection = nav.querySelector("[data-nav-reflection]");

  gsap.context(() => {
    gsap.fromTo(
      reflection,
      { xPercent: -30, yPercent: 20 },
      {
        xPercent: 30,
        yPercent: -20,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      },
    );
  }, nav);

  nav.addEventListener("mouseenter", () => {
    gsap.fromTo(
      sheen,
      { x: "-150%", opacity: 0 },
      {
        x: "150%",
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
    );
  });
}

export function animateNavScroll(nav: HTMLElement, scrolled: boolean) {
  const glow = nav.querySelector("[data-nav-glow]");
  const reflection = nav.querySelector("[data-nav-reflection]");

  if (prefersReducedMotion) {
    gsap.set(nav, {
      borderRadius: scrolled ? "9999px" : "0px",
      marginTop: scrolled ? 20 : 0,
      marginLeft: scrolled ? 32 : 0,
      marginRight: scrolled ? 32 : 0,
      backgroundColor: scrolled ? "rgba(255,255,255,0.05)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
      borderColor: scrolled ? "rgba(255,255,255,0.1)" : "transparent",
    });

    gsap.set(glow, { opacity: scrolled ? 1 : 0 });
    gsap.set(reflection, { opacity: scrolled ? 0.14 : 0.06 });

    return;
  }

  gsap.to(nav, {
    borderRadius: scrolled ? "9999px" : "0px",
    marginTop: scrolled ? 20 : 0,
    marginLeft: scrolled ? 32 : 0,
    marginRight: scrolled ? 32 : 0,
    backgroundColor: scrolled ? "rgba(255,255,255,0.05)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
    borderColor: scrolled ? "rgba(255,255,255,0.1)" : "transparent",
    duration: 0.6,
    ease: "power3.inOut",
  });

  gsap.to(glow, {
    opacity: scrolled ? 1 : 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(reflection, {
    opacity: scrolled ? 0.14 : 0.06,
    duration: 0.8,
    ease: "power2.out",
  });
}

export function animateMenu(
  overlay: HTMLElement,
  open: boolean,
  onCloseComplete?: () => void,
) {
  const inner = overlay.querySelector(".menu-overlay-inner");
  const items = overlay.querySelectorAll("[data-menu-link]");

  gsap.killTweensOf([inner, items]);

  if (prefersReducedMotion) {
    if (open) {
      gsap.set(inner, { opacity: 1, y: 0 });
      gsap.set(items, { opacity: 1, y: 0, filter: "none" });
    } else {
      gsap.set(inner, { opacity: 0 });
      onCloseComplete?.();
    }
    return;
  }

  if (open) {
    gsap.set(inner, { opacity: 0, y: 40 });
    gsap.set(items, { opacity: 0, y: 20, filter: "blur(8px)" });

    gsap.to(inner, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.15,
    });
  } else {
    gsap.to(items, {
      opacity: 0,
      y: -20,
      filter: "blur(8px)",
      duration: 0.3,
      ease: "power2.in",
      stagger: { each: 0.1, from: "end" },
    });

    gsap.to(inner, {
      opacity: 0,
      y: 40,
      duration: 0.4,
      ease: "power3.in",
      delay: 0.2,
      onComplete: onCloseComplete,
    });
  }
}
