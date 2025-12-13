"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionBlur } from "@/lib/useSectionBlur";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

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
      gsap.from(lineRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
        },
      });

      gsap.from(subRef.current, {
        y: 30,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: subRef.current,
          start: "top 92%",
        },
      });

      const items = columnsRef.current?.querySelectorAll("[data-stagger-item]");

      gsap.from(items, {
        y: 28,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: columnsRef.current,
          start: "top 88%",
        },
      });
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
          <div ref={lineRef} className="about-accent-line"></div>
        </div>

        <div className="flex flex-col gap-12 md:col-span-11">
          <div>
            <h2 ref={headingRef} className="type-title">
              About Me
            </h2>

            <p ref={subRef} className="type-body mt-4 max-w-184 opacity-80">
              A developer driven by motion-first design, modern engineering
              practices, and a love for creating interfaces that feel alive.
            </p>
          </div>

          <div
            ref={columnsRef}
            className="grid grid-cols-1 gap-12 md:grid-cols-2"
          >
            <div data-stagger-item className="flex flex-col gap-6">
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

            <div data-stagger-item>
              <ul className="about-highlights flex flex-col gap-4">
                {aboutHighlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="relative pl-7 text-[1.05rem] leading-[1.65] opacity-90"
                  >
                    <span className="bullet"></span>
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
