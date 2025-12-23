import gsap from "gsap";

export function initFeaturedHover(card: HTMLElement) {
  const glow = card.querySelector<HTMLElement>(".project-featured-glow");
  if (!glow) return;

  let active = false;

  const onMove = (e: MouseEvent) => {
    if (!active) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    gsap.to(card, {
      rotateX: -((y - cy) / cy) * 6,
      rotateY: ((x - cx) / cx) * 6,
      scale: 1.04,
      duration: 0.25,
      ease: "power2.out",
      transformPerspective: 900,
    });

    gsap.to(glow, {
      x: ((x - cx) / cx) * rect.width * 0.2,
      y: ((y - cy) / cy) * rect.height * 0.2,
      opacity: 0.35,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const enter = () => {
    active = true;
    card.addEventListener("mousemove", onMove);
  };

  const leave = () => {
    active = false;
    card.removeEventListener("mousemove", onMove);

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });

    gsap.to(glow, {
      x: 0,
      y: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  card.addEventListener("mouseenter", enter);
  card.addEventListener("mouseleave", leave);

  return () => {
    card.removeEventListener("mouseenter", enter);
    card.removeEventListener("mouseleave", leave);
    card.removeEventListener("mousemove", onMove);
  };
}
