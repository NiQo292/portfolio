// Navigation/navigation.anim.ts
import gsap from "gsap";
import { media } from "@/lib/animation/media";
import { initNavDesktop } from "./navigation.anim.desktop";
import { initNavMobile } from "./navigation.anim.mobile";

let desktopTl: gsap.core.Timeline | null = null;
let mobileTl: gsap.core.Timeline | null = null;
let cleanupDesktop: (() => void) | null = null;
let cleanupMobile: (() => void) | null = null;

export function initNavigation(nav: HTMLElement, overlay: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(media.desktop, () => {
    const { menuTl, cleanup } = initNavDesktop(nav, overlay);
    desktopTl = menuTl;
    cleanupDesktop = cleanup;
    return () => cleanup();
  });

  mm.add(media.mobile, () => {
    const { menuTl, cleanup } = initNavMobile(nav, overlay);
    mobileTl = menuTl;
    cleanupMobile = cleanup;
    return () => cleanup();
  });

  return () => {
    mm.revert();
    cleanupDesktop?.();
    cleanupMobile?.();
    desktopTl = null;
    mobileTl = null;
  };
}

export function setMenuOpen(open: boolean, onCloseComplete?: () => void) {
  const tl = desktopTl || mobileTl;
  if (!tl) return;

  if (open) {
    tl.play(0);
  } else {
    tl.reverse().eventCallback("onReverseComplete", onCloseComplete || null);
  }
}
