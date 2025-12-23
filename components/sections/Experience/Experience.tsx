"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./experience.css";
import { useRevealTitle } from "@/lib/useRevealTitle";
import { initExperienceAnimations } from "./experience.anim";
import { useSectionBlur } from "@/lib/useSectionBlur";

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    company: "impact code GmbH",
    role: "Software Developer (Full-Stack)",
    period: "Mar 2025 - Present",
    responsibilities: [
      "Development of web applications in the health sector using Next.js, Angular, Tailwind CSS, PHP and MySQL",
      "Implementation of the company website from given designs",
      "Use of Docker for containerization",
    ],
  },
  {
    company: "Brüder Schlau GmbH",
    role: "Software Development Apprenticeship (Full-Stack)",
    period: "Aug 2022 - Jan 2025",
    responsibilities: [
      "Optimization and Expansion of the E-Commerce platform written in JSP and SAP Hybris",
      "Development of internal tools using React.js",
      "Maintenance of existing applications",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useRevealTitle({ scopeRef: sectionRef });
  useSectionBlur({ ref: sectionRef });

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const cleanup = initExperienceAnimations(sectionRef.current!);

    return () => cleanup();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="layout-section stack-xl relative"
        id="experience"
      >
        <header className="section-title w-full text-center">
          <h2 className="type-title w-full text-center">
            My Working Experience
          </h2>
          <h3 className="type-subheading mt-3 opacity-80">
            Where I&apos;ve honed my skills
          </h3>
        </header>

        {experienceData.map((exp, index) => (
          <article
            key={index}
            data-exp-block
            className="stack-md parallax-mg relative"
          >
            <div
              data-exp-glow
              className="exp-glow parallax-bg absolute inset-0"
            ></div>

            <h3
              data-exp-company
              className="type-subheading parallax-fg relative z-10"
            >
              {exp.company}
            </h3>

            <div className="stack-xs relative z-10">
              <h4
                data-exp-role
                className="type-heading parallax-fg relative inline-block"
              >
                {exp.role}
                <span
                  data-exp-bar
                  className="absolute -bottom-1 left-0 block h-0.75 w-full rounded-sm bg-(--cyan)"
                ></span>
              </h4>
            </div>

            <p data-exp-period className="type-meta parallax-fg relative z-10">
              {exp.period}
            </p>

            <ul data-exp-list className="stack-sm relative z-10">
              {exp.responsibilities.map((item, idx) => (
                <li
                  data-exp-item
                  key={idx}
                  className="parallax-fg relative pl-7 text-[1.05rem] leading-[1.65] opacity-90"
                >
                  <span className="bullet"></span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
