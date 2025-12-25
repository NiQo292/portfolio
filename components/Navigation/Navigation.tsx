"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.svg";
import TextUpDown from "../animations/TextUpDown";
import { navLinks, socialLinks } from "@/lib/navigation";
import { initNavigation, setMenuOpen } from "./navigation.anim";
import "./navigation.css";

export default function Navigation() {
  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpenState] = useState(false);
  const [visible, setVisible] = useState(false);

  const pendingSectionRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (!navRef.current || !overlayRef.current) return;
    return initNavigation(navRef.current, overlayRef.current);
  }, []);

  useEffect(() => {
    setMenuOpen(menuOpen, () => {
      if (!menuOpen) {
        setVisible(false);
      }
    });
  }, [menuOpen]);

  useEffect(() => {
    if (visible) return;

    if (!pendingSectionRef.current) return;

    const selector = pendingSectionRef.current;
    pendingSectionRef.current = null;

    const target = document.querySelector(selector);
    if (!target) return;

    requestAnimationFrame(() => {
      const lenis = (window as any).__lenis;

      if (lenis) {
        lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, [visible]);

  useEffect(() => {
    if (visible) {
      lockInertScroll();
    } else {
      unlockInertScroll();
    }

    return () => {
      unlockInertScroll();
    };
  }, [visible]);

  const openMenu = () => {
    setVisible(true);
    setMenuOpenState(true);
  };
  const closeMenu = () => setMenuOpenState(false);

  const handleNavClick = (href: string) => {
    pendingSectionRef.current = href;
    closeMenu();
  };

  return (
    <>
      <div
        ref={navRef}
        className="backdrop-blur-0 fixed top-0 right-0 left-0 z-100 overflow-hidden border border-transparent bg-transparent transition-all"
      >
        <div data-nav-sheen className="nav-sheen" />
        <div data-nav-glow className="nav-glow-pulse" />
        <div data-nav-reflection className="nav-reflection" />
        <div className="nav-noise" />

        <nav className="flex h-20 items-center justify-center px-8">
          <div className="flex w-full max-w-480 items-center">
            <Link href="#hero" className="mr-auto cursor-pointer">
              <Image src={Logo} alt="Logo" width={48} height={48} />
            </Link>

            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="group relative flex h-9 w-9 cursor-pointer items-center justify-center"
              onClick={menuOpen ? closeMenu : openMenu}
            >
              <span
                className={`absolute h-0.75 w-8 rounded-sm bg-white transition-all duration-300 ${
                  menuOpen ? "top-4 rotate-45" : "top-2 group-hover:rotate-12"
                }`}
              />
              <span
                className={`absolute h-0.75 w-8 rounded-sm bg-white transition-all duration-300 ${
                  menuOpen ? "top-4 -rotate-45" : "top-6 group-hover:-rotate-12"
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      <div
        ref={overlayRef}
        className="menu-overlay z-90 bg-black/60 opacity-0 backdrop-blur-3xl"
        style={{ pointerEvents: "none", opacity: 0 }}
      >
        <div className="menu-overlay-inner flex h-full w-full items-center justify-center overflow-hidden">
          <div className="menu-bg-layer" />
          <div className="menu-bg-layer-2" />
          <div className="menu-vignette" />

          <nav className="font-clash menu-nav">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  data-menu-link
                >
                  <span className="menu-link-metrics">
                    <TextUpDown>{link.label}</TextUpDown>
                  </span>
                </a>
              ) : (
                <button
                  key={link.label}
                  data-menu-link
                  onClick={() => handleNavClick(link.href)}
                >
                  <span className="menu-link-metrics">
                    <TextUpDown>{link.label}</TextUpDown>
                  </span>
                </button>
              ),
            )}

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
      </div>
    </>
  );
}

let lockedScrollY = 0;
let isScrollLocked = false;

function lockInertScroll() {
  if (isScrollLocked) return;

  lockedScrollY = window.scrollY;
  isScrollLocked = true;

  document.body.style.position = "fixed";
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.touchAction = "none";
}

function unlockInertScroll() {
  if (!isScrollLocked) return;

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.style.touchAction = "";

  requestAnimationFrame(() => {
    window.scrollTo(0, lockedScrollY);
  });

  isScrollLocked = false;
}
