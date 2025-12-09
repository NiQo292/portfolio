"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

let lenis: Lenis | null = null;

export function getLenis() {
  if (typeof window === "undefined") return null;

  if (!lenis) {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });
  }

  return lenis;
}

export function initSmoothScroll() {
  const lenisInstance = getLenis();
  if (!lenisInstance) return;

  gsap.registerPlugin(ScrollTrigger);

  function raf(time: number) {
    if (lenisInstance) {
      lenisInstance.raf(time);
    }
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// GSAP proxy — browser safe
export function initScrollTriggerProxy() {
  const lenisInstance = getLenis();
  if (!lenisInstance || typeof window === "undefined") return;

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value?: number) {
      if (typeof value === "number") {
        lenisInstance.scrollTo(value);
      }
      return window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.refresh();
}
