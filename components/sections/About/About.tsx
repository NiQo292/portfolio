"use client";

import { useLayoutEffect, useRef } from "react";
import { useRevealTitle } from "@/lib/useRevealTitle";
import "./about.css";
import { initAboutAnimations } from "./about.anim";
import { gsap } from "gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useRevealTitle({ scopeRef: sectionRef });

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      initAboutAnimations(sectionRef.current!);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="layout-section stack-xl relative"
    >
      {/* Header */}
      <header className="section-title w-full text-center">
        <h2 className="type-title">ABOUT</h2>
        <h3 className="type-subheading mt-3 opacity-80">
          Design-driven interfaces, built with production discipline
        </h3>
      </header>

      {/* Content */}
      <div className="about-grid">
        {/* Left — Editorial philosophy */}
        <div data-about-editorial className="about-editorial stack-md">
          <h3 className="type-heading">
            I build interfaces where motion carries meaning.
          </h3>

          <p data-about-paragraph className="type-body opacity-90">
            I’m a full-stack developer based in Germany with a strong focus on
            motion-driven user interfaces.
          </p>

          <p data-about-paragraph className="type-body opacity-85">
            I care deeply about how software feels — how it responds, how it
            guides attention, and how clearly it communicates intent. For me,
            motion is not decoration; it’s a structural tool that reinforces
            hierarchy, feedback, and flow.
          </p>

          <p data-about-paragraph className="type-body opacity-85">
            I work at the intersection of design and engineering, translating
            visual intent into systems that are performant, accessible, and
            maintainable in real production environments.
          </p>
        </div>

        <div className="about-divider" data-about-divider aria-hidden="true" />

        {/* Right — Credibility blocks */}
        <div className="about-meta stack-lg">
          <div className="about-meta-block">
            <p className="type-meta">Experience</p>
            <p className="type-body opacity-85">
              2+ years building real-world applications across SaaS, e-commerce,
              and healthcare — used by real users, not demos.
            </p>
          </div>

          <div className="about-meta-block">
            <p className="type-meta">Engineering focus</p>
            <p className="type-body opacity-85">
              Performance, accessibility, scalability, and long-term
              maintainability. Animations are implemented with the same
              discipline as application logic.
            </p>
          </div>

          <div className="about-meta-block">
            <p className="type-meta">Tooling</p>
            <p className="type-body opacity-85">
              React, Next.js, TypeScript, Tailwind CSS, GSAP — with backend
              experience across PHP, Node.js, SQL, and containerized workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
