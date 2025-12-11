"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextUpDown from "./animations/TextUpDown";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const navLinks = {
  about: [
    { name: "Home", href: "#hero" },
    { name: "Projects", href: "#projects" },
    { name: "Contact Me", href: "#contact" },
    { name: "Download CV", href: "/CV.pdf" },
  ],
  socials: [
    { name: "Github", icon: <FaGithub />, href: "https://github.com/NiQo292" },
    { name: "LinkedIn", icon: <FaLinkedin />, href: "https://linkedin.com" },
  ],
};

export default function Footer() {
  const triggerRef = useRef(null);
  const nameRef = useRef(null);

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
              {navLinks.about.map((link) => (
                <Link key={link.name} href={link.href} className="footer-link">
                  <span className="footer-row">
                    <span className="footer-text-wrapper">
                      <TextUpDown className="footer-text">
                        {link.name}
                      </TextUpDown>
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            <div className="footer-col">
              <h3 className="type-heading">SOCIALS</h3>
              {navLinks.socials.map((link) => (
                <Link key={link.name} href={link.href} className="footer-link">
                  <span className="footer-row">
                    <span className="footer-icon">{link.icon}</span>

                    <span className="footer-text-wrapper">
                      <TextUpDown className="footer-text">
                        {link.name}
                      </TextUpDown>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <p className="footer-copy">&copy; 2025 Nico Haubold</p>
        </div>
      </footer>
    </>
  );
}
