"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { navLinks, socialLinks } from "@/lib/navigation";

import TextUpDown from "./animations/TextUpDown";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const triggerRef = useRef(null);
  const nameRef = useRef(null);

  const scrollTo = useSmoothScroll();

  useEffect(() => {
    if (!triggerRef.current || !nameRef.current) return;

    const nameEl = nameRef.current;

    // Split text manually
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
      opacity: 0.08, // soft watermark opacity
      y: 0,
      blur: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.04,
    });
  }, []);

  return (
    <>
      {/* This DIV scrolls normally and triggers animation */}
      <div ref={triggerRef} className="footer-trigger-zone"></div>

      {/* The actual fixed cinematic footer */}
      <footer className="footer-fixed">
        <div className="footer-inner">
          {/* Watermark Name */}
          <h1 ref={nameRef} className="footer-name">
            Nico Haubold
          </h1>

          {/* Links */}
          <div className="footer-content">
            <div className="footer-col">
              <h3 className="type-heading">ABOUT</h3>
              {/* {navLinks.about.map((link) => (
                <button
                  key={link.name}
                  className="footer-link text-left"
                  onClick={() => scrollTo(link.href)}
                >
                  <span className="footer-row">
                    <span className="footer-text-wrapper">
                      <TextUpDown className="footer-text">
                        {link.name}
                      </TextUpDown>
                    </span>
                  </span>
                </button>
              ))} */}
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    className="footer-link"
                  >
                    <span className="footer-row">
                      <span className="footer-text-wrapper">
                        <TextUpDown className="footer-text">
                          {link.label}
                        </TextUpDown>
                      </span>
                    </span>
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="footer-link"
                  >
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
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="footer-link"
                >
                  <span className="footer-row">
                    <span className="footer-icon">{social.icon}</span>

                    <span className="footer-text-wrapper">
                      <TextUpDown className="footer-text">
                        {social.label}
                      </TextUpDown>
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <p className="footer-copy">&copy; 2025 Nico Haubold</p>
        </div>
      </footer>
    </>
  );
}
