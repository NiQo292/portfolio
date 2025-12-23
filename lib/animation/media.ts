// lib/animation/media.ts
import gsap from "gsap";

export const media = {
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
};

export function withMatchMedia(
  setup: (mm: gsap.MatchMedia) => void | gsap.ContextFunc,
) {
  const mm = gsap.matchMedia();
  const cleanup = setup(mm);

  return () => {
    // cleanup from callbacks (optional)
    if (typeof cleanup === "function") cleanup();
    // revert GSAP matchMedia registrations
    mm.revert();
  };
}
