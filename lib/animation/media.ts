import gsap from "gsap";

export const media = {
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
};

export function withMatchMedia(
  setup: (mm: gsap.MatchMedia) => void | (() => void),
) {
  const mm = gsap.matchMedia();
  const cleanup = setup(mm);

  return () => {
    if (typeof cleanup === "function") cleanup();

    mm.revert();
  };
}
