import { withMatchMedia, media } from "@/lib/animation/media";

export function initAboutAnimations(section: HTMLElement) {
  return withMatchMedia((mm) => {
    mm.add(media.desktop, async () => {
      const { initAboutDesktop } = await import("./about.anim.desktop");
      initAboutDesktop(section);
    });

    mm.add(media.mobile, async () => {
      const { initAboutMobile } = await import("./about.anim.mobile");
      initAboutMobile(section);
    });
  });
}
