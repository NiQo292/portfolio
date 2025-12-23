// Navigation/navigation.anim.mobile.ts
import gsap from "gsap";

export function initNavMobile(_nav: HTMLElement, overlay: HTMLElement) {
  gsap.set(overlay, { opacity: 0, pointerEvents: "none" });

  const tl = gsap.timeline({ paused: true });
  tl.to(overlay, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.2,
    ease: "power2.out",
  });

  return {
    menuTl: tl,
    cleanup() {
      tl.kill();
    },
  };
}
