"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionBlur } from "@/lib/useSectionBlur";

gsap.registerPlugin(ScrollTrigger);

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
      /* Accent Line Grow */
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

      /* Heading Reveal */
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

      /* Subheading */
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

      /* Columns Stagger */
      const items = columnsRef.current?.querySelectorAll(".about-stagger-item");

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
      className="about-section stacked-xl relative w-full py-[8rem]"
    >
      {/* Constrained Content */}
      <div className="layout-section relative z-[2] grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-12">
        {/* Left Accent Column */}
        <div className="flex justify-center md:col-span-1 md:justify-start">
          <div ref={lineRef} className="about-accent-line"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-12 md:col-span-11">
          {/* Heading */}
          <div>
            <h2 ref={headingRef} className="type-title about-heading">
              About Me
            </h2>

            <p ref={subRef} className="type-body about-subheading">
              A developer driven by motion-first design, modern engineering
              practices, and a love for creating interfaces that feel alive.
            </p>
          </div>

          {/* Two Columns */}
          <div
            ref={columnsRef}
            className="grid grid-cols-1 gap-12 md:grid-cols-2"
          >
            {/* Left Column */}
            <div className="about-stagger-item flex flex-col gap-6">
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

            {/* Right Column */}
            <div className="about-stagger-item">
              <ul className="about-highlights flex flex-col gap-4">
                <li>
                  <span className="about-bullet"></span>2+ years in Full-Stack
                  Engineering
                </li>
                <li>
                  <span className="about-bullet"></span>Specialized in React,
                  Next.js, TypeScript, GSAP, Tailwind
                </li>
                <li>
                  <span className="about-bullet"></span>Strong background in
                  UI/UX + motion design
                </li>
                <li>
                  <span className="about-bullet"></span>Experience across
                  e-commerce, SaaS, healthcare products
                </li>
                <li>
                  <span className="about-bullet"></span>Based in Germany · Open
                  to remote opportunities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
