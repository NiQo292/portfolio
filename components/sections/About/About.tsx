"use client";

import { useEffect, useRef } from "react";
import { initAboutAnimations } from "./About.anim";
import { useSectionBlur } from "@/lib/useSectionBlur";
import gsap from "gsap";
import "./About.css";

const aboutHighlights = [
  "2+ years in Full-Stack Engineering",
  "Specialized in React, Next.js, TypeScript, GSAP, Tailwind",
  "Strong background in UI/UX + motion design",
  "Experience across e-commerce, SaaS, healthcare products",
  "Based in Germany · Open to remote opportunities",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useSectionBlur({ ref: sectionRef });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      initAboutAnimations(sectionRef.current!);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stacked-xl relative w-full overflow-hidden py-32"
      id="about"
    >
      <div className="layout-section relative z-2 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-12">
        <div className="flex justify-center md:col-span-1 md:justify-start">
          <div ref={lineRef} data-about-line className="about-accent-line" />
        </div>

        <div className="flex flex-col gap-12 md:col-span-11">
          <div>
            <h2 ref={headingRef} data-about-heading className="type-title">
              About Me
            </h2>

            <p
              ref={subRef}
              data-about-sub
              className="type-body mt-4 max-w-184 opacity-80"
            >
              A developer driven by motion-first design, modern engineering
              practices, and a love for creating interfaces that feel alive.
            </p>
          </div>

          <div
            ref={columnsRef}
            className="grid grid-cols-1 gap-12 md:grid-cols-2"
          >
            <div data-about-stagger className="flex flex-col gap-6">
              <p className="type-body text-[1.1rem] leading-relaxed opacity-90">
                I specialize in building animated, interactive web experiences
                that combine usability, performance, and visual refinement.
              </p>

              <p className="type-body text-[1.1rem] leading-relaxed opacity-90">
                My work blends strong full-stack foundations with motion-driven
                UI engineering. I enjoy solving both design and technical
                challenges to create digital experiences that feel effortless.
              </p>
            </div>

            <div data-about-stagger>
              <ul className="about-highlights flex flex-col gap-4">
                {aboutHighlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="relative pl-7 text-[1.05rem] leading-[1.65] opacity-90"
                  >
                    <span className="bullet" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
