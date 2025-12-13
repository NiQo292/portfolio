"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { navLinks, socialLinks } from "@/lib/navigation";
import TextUpDown from "../animations/TextUpDown";
import "./Footer.css";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const triggerRef = useRef(null);
  const nameRef = useRef(null);

  const scrollTo = useSmoothScroll();

  useEffect(() => {
    if (!triggerRef.current || !nameRef.current) return;

    const nameEl = nameRef.current;

    const letters = nameEl.innerText.split("");
    nameEl.innerHTML = letters
      .map((l) => `<span class="footer-letter">${l}</span>`)
      .join("");

    gsap.set(".footer-letter", { opacity: 0, y: 20, blur: 6 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });

    tl.to(".footer-letter", {
      opacity: 0.08,
      y: 0,
      blur: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.04,
    });
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        className="pointer-events-none h-[40vh] w-full"
      ></div>

      <footer className="pointer-events-none fixed bottom-0 left-0 -z-1 flex h-[65vh] w-full items-end">
        <div className="pointer-events-auto relative flex w-full flex-col justify-end px-16 py-12">
          <h1
            ref={nameRef}
            className="pointer-events-none absolute bottom-[20%] left-16 font-[--font-clash] text-[clamp(6rem,14vw,14rem)] font-bold text-white opacity-100 mix-blend-lighten select-none"
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

          <p className="mt-4 text-[0.9rem] opacity-80">
            &copy; 2025 Nico Haubold
          </p>
        </div>
      </footer>
    </>
  );
}
