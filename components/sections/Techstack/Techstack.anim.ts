import { gsap } from "gsap";
import { media } from "@/lib/animation/media";
import { initTechStackDesktop } from "./techstack.anim.desktop";
import { initTechStackMobile } from "./techstack.anim.mobile";

export function initTechStackAnimations(scope: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(media.desktop, async () => {
    initTechStackDesktop(scope);
  });

  mm.add(media.mobile, async () => {
    initTechStackMobile(scope);
  });

  return () => mm.revert();
}
