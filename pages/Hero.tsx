"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/motion";
import Portrait from "@/public/images/nico.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const textGroupRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);

  const photoFrameRef = useRef<HTMLDivElement>(null);
  const photoGlowRef = useRef<HTMLDivElement>(null);

  const name = "Nico Haubold";

  // Render letters as React spans (no SplitText / no innerHTML mutation).
  const nameChars = useMemo(() => name.split(""), [name]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

      const chars = gsap.utils.toArray<HTMLElement>(".hero-name-char");

      // If for any reason spans aren't found, do nothing (but text still renders).
      if (!prefersReduced && chars.length) {
        gsap.set(chars, { opacity: 1, y: 0, filter: "blur(0px)" }); // baseline

        gsap.from(chars, {
          y: 70,
          opacity: 0,
          filter: "blur(10px)",
          stagger: 0.045,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.15,
          clearProps: "filter,transform", // prevent “stuck” styles
        });
      }

      if (!prefersReduced) {
        gsap.from([roleRef.current, locationRef.current], {
          y: 40,
          opacity: 0,
          filter: "blur(8px)",
          duration: motion.medium,
          ease: motion.easeOut,
          stagger: 0.18,
          delay: 0.25,
          clearProps: "filter,transform",
        });

        gsap.fromTo(
          photoGlowRef.current,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: motion.slow,
            ease: "power2.out",
            delay: 0.3,
            clearProps: "transform",
          },
        );

        gsap.fromTo(
          photoFrameRef.current,
          { boxShadow: "0 0 0 rgba(0,255,255,0)" },
          {
            boxShadow: "0 0 40px rgba(0,255,255,0.55)",
            duration: 0.75,
            ease: "power2.out",
            delay: 0.45,
            yoyo: true,
            repeat: 1,
          },
        );

        gsap.to(textGroupRef.current, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(photoFrameRef.current, {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero relative flex min-h-screen w-full items-center overflow-hidden pt-[var(--nav-height)] lg:pt-0"
      id="hero"
    >
      <div className="layout-section hero-inner relative z-[2] grid grid-cols-1 items-center gap-x-10 gap-y-14 md:grid-cols-12">
        {/* TEXT */}
        <div ref={textGroupRef} className="flex flex-col gap-6 md:col-span-7">
          <p className="hero-kicker type-meta tracking-[0.25em] uppercase">
            Full-Stack Developer · Germany
          </p>

          {/* H1 now always renders (no DOM replacement), GSAP only animates spans */}
          <h1 className="hero-name type-display">
            {nameChars.map((ch, i) => (
              <span key={`${ch}-${i}`} className="hero-name-char inline-block">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>

          <p ref={roleRef} className="hero-role type-heading">
            I build animated, experience-driven web interfaces with
            production-grade full-stack foundations.
          </p>

          <p ref={locationRef} className="hero-location type-meta">
            <span className="hero-location-dot" />
            Based in Germany • Available for Frontend / Full-Stack roles
          </p>
        </div>

        {/* PORTRAIT */}
        <div className="flex justify-center md:col-span-5 md:justify-end">
          <div ref={photoFrameRef} className="hero-photo-frame">
            <div ref={photoGlowRef} className="hero-photo-glow" />

            <div className="hero-photo">
              <Image
                src={Portrait}
                alt="Portrait of Nico Haubold"
                fill
                priority
                className="hero-photo-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
