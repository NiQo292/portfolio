import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initNavDesktop(nav: HTMLElement, overlay: HTMLElement) {
  const sheen = nav.querySelector<HTMLElement>("[data-nav-sheen]");
  const glow = nav.querySelector<HTMLElement>("[data-nav-glow]");
  const reflection = nav.querySelector<HTMLElement>("[data-nav-reflection]");

  if (reflection) {
    gsap.fromTo(
      reflection,
      { xPercent: -30, yPercent: 20 },
      {
        xPercent: 30,
        yPercent: -20,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      },
    );
  }

  const onEnter = () => {
    if (!sheen) return;
    gsap.fromTo(
      sheen,
      { x: "-150%", opacity: 0 },
      {
        x: "150%",
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
    );
  };
  nav.addEventListener("mouseenter", onEnter);

  const apply = (scrolled: boolean) => {
    gsap.to(nav, {
      borderRadius: scrolled ? "9999px" : "0px",
      marginTop: scrolled ? 20 : 0,
      marginLeft: scrolled ? 32 : 0,
      marginRight: scrolled ? 32 : 0,
      backgroundColor: scrolled ? "rgba(255,255,255,0.05)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
      borderColor: scrolled ? "rgba(255,255,255,0.1)" : "transparent",
      duration: 0.6,
      ease: "power3.inOut",
      overwrite: "auto",
    });

    if (glow) {
      gsap.to(glow, {
        opacity: scrolled ? 1 : 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (reflection) {
      gsap.to(reflection, {
        opacity: scrolled ? 0.14 : 0.06,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  const st = ScrollTrigger.create({
    trigger: document.documentElement,
    start: "top -60",
    end: 999999,
    onEnter: () => apply(true),
    onLeaveBack: () => apply(false),
  });

  const inner = overlay.querySelector<HTMLElement>(".menu-overlay-inner");
  const items = Array.from(
    overlay.querySelectorAll<HTMLElement>("[data-menu-link]"),
  );

  gsap.set(overlay, { opacity: 0, pointerEvents: "none" });
  if (inner) gsap.set(inner, { opacity: 0, y: 40 });
  if (items.length) gsap.set(items, { opacity: 0, y: 20, filter: "blur(8px)" });

  const menuTl = gsap.timeline({ paused: true });

  menuTl.to(overlay, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.25,
  });

  if (inner) {
    menuTl.to(inner, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  }

  if (items.length) {
    menuTl.to(
      items,
      {
        opacity: 1,
        y: 0,
        filter: "none",
        duration: 0.6,
        stagger: 0.12,
        clearProps: "filter,transform",
      },
      0.12,
    );
  }

  return {
    menuTl,
    cleanup() {
      st.kill();
      nav.removeEventListener("mouseenter", onEnter);
      menuTl.kill();
    },
  };
}
