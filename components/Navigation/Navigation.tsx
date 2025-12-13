"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.svg";
import TextUpDown from "../animations/TextUpDown";
import { navLinks, socialLinks } from "@/lib/navigation";
import "./Navigation.css";
import {
  animateMenu,
  animateNavScroll,
  initNavBarEffects,
} from "./Navigation.anim";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      initNavBarEffects(navRef.current!);
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    animateNavScroll(navRef.current, scrolled);
  }, [scrolled]);

  useEffect(() => {
    if (!overlayRef.current) return;

    animateMenu(overlayRef.current, menuOpen, () => {
      setVisible(false);
    });
  }, [menuOpen]);

  useEffect(() => {
    if (!visible) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    document.body.style.touchAction = "none";

    return () => {
      const y =
        Math.abs(parseInt(document.body.style.top || "0", 10)) || scrollY;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";

      window.scrollTo(0, y);
    };
  }, [visible]);

  const openMenu = () => {
    setVisible(true);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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
            <Link className="mr-auto cursor-pointer" href="#hero">
              <Image
                src={Logo}
                alt="Logo"
                width={48}
                height={48}
                className=""
              />
            </Link>

            <button
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

      {visible && (
        <div
          ref={overlayRef}
          className="menu-overlay fixed inset-0 z-90 bg-black/60 backdrop-blur-3xl"
        >
          <div className="menu-overlay-inner flex h-full w-full items-center justify-center overflow-hidden">
            <div className="menu-bg-layer" />
            <div className="menu-bg-layer-2" />
            <div className="menu-vignette" />

            <nav className="relative z-10 flex flex-col items-center gap-7 text-4xl sm:gap-10 sm:text-5xl">
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
                    onClick={() => {
                      scrollTo(link.href);
                      closeMenu();
                    }}
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
      )}
    </>
  );
}
