"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import "./hero.css";
import Portrait from "@/public/images/nico.jpeg";
import { initHeroAnimations } from "./hero.anim";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const name = "Nico Haubold";
  const nameChars = useMemo(() => name.split(""), [name]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const cleanup = initHeroAnimations(sectionRef.current);

    return () => cleanup?.();
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden pt-(--nav-height) lg:pt-0"
      id="hero"
    >
      <div className="layout-section relative z-2 grid grid-cols-1 items-center gap-x-10 gap-y-14 md:grid-cols-12">
        <div data-hero-text className="flex flex-col gap-6 md:col-span-7">
          <p className="type-meta tracking-[0.25em] uppercase">
            Full-Stack Developer · Germany
          </p>

          <h1 className="type-display">
            {nameChars.map((ch, i) => (
              <span key={`${ch}-${i}`} data-hero-char className="inline-block">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>

          <p data-hero-role className="type-heading max-w-160">
            I build animated, experience-driven web interfaces with
            production-grade full-stack foundations.
          </p>

          <p
            data-hero-location
            className="type-meta flex items-center gap-[0.65rem]"
          >
            <span className="hero-location-dot" />
            Based in Germany • Available for Frontend / Full-Stack roles
          </p>
        </div>

        <div className="flex justify-center md:col-span-5 md:justify-end">
          <div data-hero-photo-frame className="hero-photo-frame">
            <div data-hero-photo-glow className="hero-photo-glow" />

            <div className="absolute inset-0 h-full w-full overflow-hidden rounded-full">
              <Image
                src={Portrait}
                alt="Portrait of Nico Haubold"
                fill
                priority
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
