"use client";

import { useEffect, useRef } from "react";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { navLinks, socialLinks } from "@/lib/navigation";
import TextUpDown from "../animations/TextUpDown";
import Link from "next/link";
import "./footer.css";
import { initFooterAnimations } from "./footer.anim";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const scrollTo = useSmoothScroll();

  useEffect(() => {
    if (!footerRef.current || !triggerRef.current || !nameRef.current) return;

    const cleanup = initFooterAnimations({
      footer: footerRef.current,
      trigger: triggerRef.current,
      heading: nameRef.current,
    });

    return () => cleanup?.();
  }, []);

  return (
    <>
      <div ref={triggerRef} className="pointer-events-none h-[45vh] w-full" />

      <footer
        ref={footerRef}
        className="pointer-events-none fixed bottom-0 left-0 -z-1 flex h-[65vh] w-full"
      >
        <div className="pointer-events-auto relative flex w-full flex-col justify-end px-16 py-16">
          <h1
            ref={nameRef}
            className="pointer-events-none absolute bottom-[22%] left-16 font-[--font-clash] text-[clamp(6rem,14vw,14rem)] font-bold text-white mix-blend-lighten select-none"
          >
            Nico Haubold
          </h1>

          <div className="mb-12 flex flex-col gap-8 md:flex-row md:gap-20">
            <div className="footer-col">
              <h3 className="type-heading">ABOUT</h3>

              {navLinks.map((link) =>
                link.external ? (
                  <a key={link.label} href={link.href} target="_blank">
                    <span className="footer-row">
                      <span className="footer-text-wrapper">
                        <TextUpDown className="footer-text">
                          {link.label}
                        </TextUpDown>
                      </span>
                    </span>
                  </a>
                ) : (
                  <button key={link.label} onClick={() => scrollTo(link.href)}>
                    <span className="footer-row">
                      <span className="footer-text-wrapper">
                        <TextUpDown className="footer-text">
                          {link.label}
                        </TextUpDown>
                      </span>
                    </span>
                  </button>
                ),
              )}
            </div>

            <div className="footer-col">
              <h3 className="type-heading">SOCIALS</h3>

              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} target="_blank">
                  <span className="footer-row">
                    <span className="footer-icon">{social.icon}</span>
                    <span className="footer-text-wrapper">
                      <TextUpDown className="footer-text">
                        {social.label}
                      </TextUpDown>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-4 text-[0.9rem] opacity-80">© 2025 Nico Haubold</p>
        </div>
      </footer>
    </>
  );
}
