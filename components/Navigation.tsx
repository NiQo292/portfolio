"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.svg";
import TextUpDown from "./animations/TextUpDown";
import { navLinks, socialLinks } from "@/lib/navigation";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // ─────────────────────────────────────────────
  // SCROLL STATE
  // ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─────────────────────────────────────────────
  // NAVBAR MORPH + GLOW + REFLECTION INTENSITY
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      borderRadius: scrolled ? "9999px" : "0px",
      marginTop: scrolled ? 20 : 0,
      marginLeft: scrolled ? 32 : 0,
      marginRight: scrolled ? 32 : 0,
      backgroundColor: scrolled ? "rgba(255,255,255,0.05)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
      borderColor: scrolled ? "rgba(255,255,255,0.1)" : "transparent",
      duration: 0.6,
      ease: "power3.inOut",
    });

    gsap.to(glowRef.current, {
      opacity: scrolled ? 1 : 0,
      duration: 1,
      ease: "power2.out",
    });

    // reflection stronger in pill mode, softer when full width
    gsap.to(reflectionRef.current, {
      opacity: scrolled ? 0.14 : 0.06,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [scrolled]);

  // ─────────────────────────────────────────────
  // MICRO SHEEN ON HOVER
  // ─────────────────────────────────────────────
  useEffect(() => {
    const sheen = sheenRef.current;
    const nav = navRef.current;
    if (!sheen || !nav) return;

    const onHover = () => {
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

    nav.addEventListener("mouseenter", onHover);
    return () => nav.removeEventListener("mouseenter", onHover);
  }, []);

  // ─────────────────────────────────────────────
  // DIAGONAL REFLECTION WIPE (LOOP)
  // ─────────────────────────────────────────────
  useEffect(() => {
    const layer = reflectionRef.current;
    if (!layer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer,
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
    }, layer);

    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────────
  // MENU TOGGLE LOGIC
  // ─────────────────────────────────────────────
  const openMenu = () => {
    setVisible(true); // mount overlay immediately
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    // unmount happens after GSAP reverse animation
  };

  const toggleMenu = () => {
    menuOpen ? closeMenu() : openMenu();
  };

  const handleMenuNavigate = (href: string) => {
    setPendingHref(href);
    closeMenu();
  };

  // ─────────────────────────────────────────────
  // MENU OPEN / CLOSE ANIMATION (STAGGER + REVERSE)
  // ─────────────────────────────────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const items = overlay.querySelectorAll(".menu-link");

    if (menuOpen) {
      // initial states
      gsap.set(overlay, { opacity: 0, y: "-4%" });
      gsap.set(items, {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
      });

      // overlay fade-in
      gsap.to(overlay, {
        opacity: 1,
        y: "0%",
        duration: 0.45,
        ease: "power3.out",
      });

      // stagger in
      gsap.to(items, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    } else {
      // reverse stagger out
      gsap.to(items, {
        opacity: 0,
        y: -20,
        filter: "blur(8px)",
        duration: 0.3,
        ease: "power2.in",
        stagger: {
          each: 0.1,
          from: "end",
        },
        onComplete: () => {
          // then overlay fade-out
          gsap.to(overlay, {
            opacity: 0,
            y: "-4%",
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => {
              setVisible(false);

              if (pendingHref) {
                // Handle anchor links (same page)
                if (pendingHref.startsWith("#")) {
                  const el = document.querySelector(pendingHref);
                  el?.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.href = pendingHref;
                }

                setPendingHref(null);
              }
            },
          });
        },
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!visible) return;

    const layer1 = overlayRef.current?.querySelector(".menu-bg-layer");
    const layer2 = overlayRef.current?.querySelector(".menu-bg-layer-2");
    if (!layer1 || !layer2) return;

    // Parallax: layer 1 (cyan glow)
    gsap.fromTo(
      layer1,
      { xPercent: -10, yPercent: -8, opacity: 0.4 },
      {
        xPercent: 10,
        yPercent: 8,
        opacity: 0.55,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
    );

    // Parallax: layer 2 (dark haze)
    gsap.fromTo(
      layer2,
      { xPercent: 5, yPercent: -5, opacity: 0.25 },
      {
        xPercent: -5,
        yPercent: 5,
        opacity: 0.32,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
    );
  }, [visible]);

  return (
    <>
      <div
        ref={navRef}
        className="backdrop-blur-0 fixed top-0 right-0 left-0 z-[100] overflow-hidden border border-transparent bg-transparent transition-all"
      >
        {/* layered FX */}
        <div ref={sheenRef} className="nav-sheen" />
        <div ref={glowRef} className="nav-glow-pulse" />
        <div ref={reflectionRef} className="nav-reflection" />
        <div className="nav-noise" />

        <nav className="flex h-20 items-center justify-center px-8">
          <div className="flex w-full max-w-[1920px] items-center">
            <Link className="mr-auto cursor-pointer" href="#hero">
              <Image
                src={Logo}
                alt="Logo"
                width={48}
                height={48}
                className=""
              />
            </Link>

            {/* Hamburger */}
            <button
              className="group relative flex h-9 w-9 cursor-pointer items-center justify-center"
              onClick={toggleMenu}
            >
              <span
                className={`absolute h-[3px] w-8 rounded-sm bg-white transition-all duration-300 ${
                  menuOpen ? "top-4 rotate-45" : "top-2 group-hover:rotate-12"
                }`}
              />
              <span
                className={`absolute h-[3px] w-8 rounded-sm bg-white transition-all duration-300 ${
                  menuOpen ? "top-4 -rotate-45" : "top-6 group-hover:-rotate-12"
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* FULLSCREEN OVERLAY */}
      {visible && (
        <div
          ref={overlayRef}
          className="menu-overlay fixed top-0 left-0 z-[90] flex h-screen w-full items-center justify-center bg-black/60 backdrop-blur-3xl"
        >
          {/* PARALLAX BACKGROUND LAYERS */}
          <div className="menu-bg-layer"></div>
          <div className="menu-bg-layer-2"></div>
          <div className="menu-vignette"></div>

          <nav className="relative z-[5] flex flex-col items-center gap-10 text-5xl">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="menu-link"
                >
                  <TextUpDown>{link.label}</TextUpDown>
                </a>
              ) : (
                <button
                  key={link.label}
                  className="menu-link"
                  onClick={() => {
                    scrollTo(link.href);
                    closeMenu(); // important
                  }}
                >
                  <TextUpDown>{link.label}</TextUpDown>
                </button>
              ),
            )}

            {/* Socials inside nav menu */}
            <div className="mt-10 flex gap-6 text-2xl opacity-80">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="transition hover:opacity-100"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
