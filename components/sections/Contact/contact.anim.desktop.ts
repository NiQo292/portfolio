import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initContactDesktop(
  section: HTMLElement,
  shell: HTMLElement,
  liquid: HTMLElement,
) {
  const grid = section.querySelector<HTMLElement>("[data-contact-grid]");

  if (grid) {
    gsap.from(grid, {
      y: 50,
      opacity: 0,
      filter: "blur(12px)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });
  }

  const onMove = (e: PointerEvent) => {
    const rect = shell.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(liquid, {
      x: (x - rect.width / 2) * 0.12,
      y: (y - rect.height / 2) * 0.12,
      duration: 0.55,
      ease: "sine.out",
    });
  };

  shell.addEventListener("pointermove", onMove);

  return () => {
    shell.removeEventListener("pointermove", onMove);
  };
}
