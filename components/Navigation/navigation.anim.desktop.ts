import { motion } from "@/lib/motion";
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
        duration: motion.duration.slow,
        ease: motion.ease.soft,
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
      duration: motion.duration.base,
      ease: motion.ease.out,
      overwrite: "auto",
    });

    if (glow) {
      gsap.to(glow, {
        opacity: scrolled ? 1 : 0,
        duration: motion.duration.base,
        ease: motion.ease.soft,
      });
    }

    if (reflection) {
      gsap.to(reflection, {
        opacity: scrolled ? 0.14 : 0.06,
        duration: motion.duration.base,
        ease: motion.ease.soft,
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
  if (inner) gsap.set(inner, { opacity: 0, y: motion.distance.md });
  if (items.length)
    gsap.set(items, { opacity: 0, y: motion.distance.sm, filter: "blur(8px)" });

  const menuTl = gsap.timeline({ paused: true });

  menuTl.to(overlay, {
    opacity: 1,
    pointerEvents: "auto",
    duration: motion.duration.fast,
  });

  if (inner) {
    menuTl.to(inner, {
      opacity: 1,
      y: 0,
      duration: motion.duration.base,
      ease: motion.ease.out,
    });
  }

  if (items.length) {
    menuTl.to(
      items,
      {
        opacity: 1,
        y: 0,
        filter: "none",
        duration: motion.duration.fast,
        stagger: motion.stagger.lg,
        clearProps: "filter,transform",
        ease: motion.ease.out,
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
