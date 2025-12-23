"use client";

import { useEffect, useRef, useState } from "react";
import { initAboutCards } from "./About.anim";
import "./about.css";
import { useRevealTitle } from "@/lib/useRevealTitle";

const CARDS = [
  {
    id: "card-1",
    index: "01",
    title: "Motion-Driven Developer",
    preview: "( 01 )",
    description: `
I’m a 25-year-old Full-Stack Developer based in Germany, driven by a passion for motion-first interfaces and modern engineering practices.

I care deeply about how software feels — not just how it functions. For me, motion is a communication tool: it guides attention, reinforces hierarchy, and makes digital products feel alive instead of mechanical.

I enjoy working at the intersection of design and engineering, where creative intent meets technical execution.
`,
  },
  {
    id: "card-2",
    index: "02",
    title: "Design + Engineering",
    preview: "( 02 )",
    description: `
I bridge UI/UX thinking with production-grade engineering to turn complex problems into clear, scalable systems.

My work is rooted in motion-first design, accessibility, and performance. Animations are never decorative — they exist to improve clarity, feedback, and usability.

I build with React, Next.js, TypeScript, Tailwind, and GSAP, focusing on clean architecture, maintainable code, and thoughtful interaction design.
`,
  },
  {
    id: "card-3",
    index: "03",
    title: "Real Product Experience",
    preview: "( 03 )",
    description: `
I have over 2+ years of professional experience building real-world products across SaaS, e-commerce, and healthcare.

I’ve shipped production applications used by real users, collaborating closely with designers, product managers, and backend teams.

My focus is always on performance, accessibility, and long-term maintainability — building things that scale, not just demos that look good.
`,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalHidden, setModalHidden] = useState(true);

  useRevealTitle({ scopeRef: sectionRef });

  useEffect(() => {
    if (!sectionRef.current) return;

    const cleanup = initAboutCards(sectionRef.current, {
      onOpenModal: () => setModalHidden(false),
      onCloseModal: () => setModalHidden(true),
    });

    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="layout-section stack-xl about-section"
    >
      <header className="w-full text-center">
        <h2 className="type-title section-title">ABOUT</h2>
        <h3 className="type-heading opacity mt-3 opacity-80">
          Three pillars, one purpose
        </h3>
      </header>

      <div className="about-cards">
        {CARDS.map((card) => (
          <button
            key={card.id}
            className="about-card"
            data-card
            data-card-id={card.id}
            data-title={card.title}
            data-description={card.description}
            aria-label={card.title}
          >
            <div className="card-inner">
              <div className="card-face card-front">
                <span className="card-index">{card.preview}</span>
              </div>

              <div className="card-face card-back">
                <h3>{card.title}</h3>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div
        data-modal-backdrop
        className="about-modal-backdrop"
        hidden={modalHidden}
      >
        <div data-modal className="about-modal">
          <button
            data-modal-close
            className="about-modal-close"
            aria-label="Close"
          >
            ×
          </button>

          <h3 data-modal-title className="type-heading" />
          <div className="about-modal-divider" />
          <p data-modal-content className="type-body" />
        </div>
      </div>
    </section>
  );
}
