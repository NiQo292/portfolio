import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initTechStackDesktop(scope: HTMLElement) {
  const groups = gsap.utils.toArray<HTMLElement>("[data-ts-group]");

  groups.forEach((group) => {
    const heading = group.querySelector<HTMLElement>("[data-ts-heading]");
    const items = group.querySelectorAll<HTMLElement>("[data-ts-item]");

    if (!heading || !items.length) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .from(heading, {
        y: 40,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.6,
        ease: "power3.out",
        clearProps: "filter",
      })
      .from(
        items,
        {
          y: 20,
          opacity: 0,
          filter: "blur(4px)",
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.06,
          clearProps: "filter",
        },
        "-=0.35",
      );
  });

  const cards = gsap.utils.toArray<HTMLElement>("[data-ts-card]");

  cards.forEach((card) => {
    const inner = card.querySelector<HTMLElement>("[data-ts-inner]");
    const glow = card.querySelector<HTMLElement>("[data-ts-glow]");
    if (!inner) return;

    let hover = false;

    const move = (e: MouseEvent) => {
      if (!hover) return;

      const rect = inner.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rx = -(y / rect.height - 0.5) * 10;
      const ry = (x / rect.width - 0.5) * 10;

      gsap.to(card, {
        rotateX: rx,
        rotateY: ry,
        scale: 1.04,
        duration: 0.25,
        ease: "power2.out",
      });

      if (glow) {
        gsap.to(glow, {
          x: (x - rect.width / 2) * 0.4,
          y: (y - rect.height / 2) * 0.4,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    card.addEventListener("mouseenter", () => {
      hover = true;
      card.addEventListener("mousemove", move);
    });

    card.addEventListener("mouseleave", () => {
      hover = false;
      card.removeEventListener("mousemove", move);

      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });

      if (glow) {
        gsap.to(glow, {
          x: 0,
          y: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  });
}
