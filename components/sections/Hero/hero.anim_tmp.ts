import { gsap } from "gsap";
import { initHeroDesktop } from "./hero.anim.desktop";
import { initHeroMobile } from "./hero.anim.mobile";
import { media } from "@/lib/animation/media";

export function initHeroAnimations(section: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(media.desktop, async () => {
    initHeroDesktop(section);
  });

  mm.add(media.mobile, async () => {
    initHeroMobile(section);
  });

  return () => mm.revert();
}
