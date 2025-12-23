import { media } from "@/lib/animation";
import gsap from "gsap";
import { initContactMobile } from "./contact.anim.mobile";
import { initContactDesktop } from "./contact.anim.desktop";

export function initContactAnimations(
  section: HTMLElement,
  shell: HTMLElement,
  liquid: HTMLElement,
) {
  const mm = gsap.matchMedia();

  mm.add(media.desktop, async () => {
    return initContactDesktop(section, shell, liquid);
  });

  mm.add(media.mobile, async () => {
    initContactMobile(section);
  });

  return () => mm.revert();
}
