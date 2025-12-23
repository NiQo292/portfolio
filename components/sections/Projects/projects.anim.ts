import gsap from "gsap";
import { media } from "@/lib/animation/media";
import { initProjectsDesktop } from "./projects.anim.desktop";
import { initProjectsMobile } from "./projects.anim.mobile";

export function initProjectsAnimations(scope: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(media.desktop, async () => {
    initProjectsDesktop(scope);
  });

  mm.add(media.mobile, async () => {
    initProjectsMobile(scope);
  });

  return () => mm.revert();
}
