"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { motion } from "@/lib/motion";
import Portrait from "@/public/images/nico.jpeg";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const textGroupRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);

  const photoFrameRef = useRef<HTMLDivElement>(null);
  const photoGlowRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let splitName: SplitText | null = null;

    const ctx = gsap.context(() => {
      /* ------------------------------------------------------
       * NAME SPLIT REVEAL
       * ------------------------------------------------------ */
      if (nameRef.current) {
        splitName = new SplitText(nameRef.current, { type: "chars" });

        gsap.from(splitName.chars, {
          y: 70,
          opacity: 0,
          filter: "blur(10px)",
          stagger: 0.045,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.15,
        });
      }

      /* ------------------------------------------------------
       * ROLE + LOCATION
       * ------------------------------------------------------ */
      gsap.from([roleRef.current, locationRef.current], {
        y: 40,
        opacity: 0,
        filter: "blur(8px)",
        duration: motion.medium,
        ease: motion.easeOut,
        stagger: 0.18,
        delay: 0.25,
      });

      /* ------------------------------------------------------
       * PHOTO GLOW — ONE-TIME INTRO
       * ------------------------------------------------------ */
      gsap.fromTo(
        photoGlowRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: motion.slow,
          ease: "power2.out",
          delay: 0.3,
        },
      );

      /* ------------------------------------------------------
       * FRAME CYAN EDGE PULSE
       * ------------------------------------------------------ */
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

      /* ------------------------------------------------------
       * PARALLAX — TEXT + PHOTO
       * ------------------------------------------------------ */
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
    });

    return () => {
      ctx.revert();
      splitName?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero relative flex min-h-screen w-full items-center overflow-hidden pt-[var(--nav-height)] lg:pt-0"
    >
      {/* Constrained content */}
      <div className="layout-section hero-inner relative z-[2] grid grid-cols-1 items-center gap-x-10 gap-y-14 md:grid-cols-12">
        {/* TEXT */}
        <div ref={textGroupRef} className="flex flex-col gap-6 md:col-span-7">
          <p className="hero-kicker type-meta tracking-[0.25em] uppercase">
            Full-Stack Developer · Germany
          </p>

          <h1 ref={nameRef} className="hero-name type-display">
            Nico&nbsp;Haubold
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
            <div ref={photoGlowRef} className="hero-photo-glow"></div>

            <div ref={photoRef} className="hero-photo">
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
