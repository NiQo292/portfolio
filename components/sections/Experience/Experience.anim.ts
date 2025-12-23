import { media } from "@/lib/animation";
import gsap from "gsap";
import { initExperienceDesktop } from "./experience.anim.desktop";
import { initExperienceMobile } from "./experience.anim.mobile";

export function initExperienceAnimations(scope: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(media.desktop, async () => {
    initExperienceDesktop(scope);
  });

  mm.add(media.mobile, async () => {
    initExperienceMobile(scope);
  });

  return () => mm.revert();
}
