"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/motion";
import "./Experience.css";
import { useParallaxLayers } from "@/lib/useParallaxLayers";
import { useSectionBlur } from "@/lib/useSectionBlur";
import { useRevealTitle } from "@/lib/useRevealTitle";

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

  useParallaxLayers();

  useSectionBlur({ ref: sectionRef });

  useRevealTitle({ scopeRef: sectionRef });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>("[data-exp-block]");

      blocks.forEach((block, index) => {
        const company = block.querySelector("[data-exp-company]");
        const role = block.querySelector("[data-exp-role]");
        const bar = block.querySelector("[data-exp-bar]");
        const period = block.querySelector("[data-exp-period]");
        const items = block.querySelectorAll("[data-exp-item]");
        const glow = block.querySelector("[data-exp-glow]");

        if (glow) {
          gsap.fromTo(
            glow,
            { opacity: 0, scale: 0.93 },
            {
              opacity: 1,
              scale: 1,
              duration: motion.slow,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
              },
            },
          );
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          },
        });

        if (company) {
          tl.from(company, {
            y: 45,
            opacity: 0,
            filter: "blur(6px)",
            duration: motion.medium,
            ease: "back.out(1.6)",
          });
        }

        if (role) {
          tl.from(
            role,
            {
              y: 35,
              opacity: 0,
              filter: "blur(6px)",
              duration: motion.medium,
              ease: "back.out(1.6)",
            },
            "-=0.45",
          );
        }

        if (bar) {
          tl.from(
            bar,
            {
              width: 0,
              duration: motion.medium,
              ease: motion.easeOut,
            },
            "-=0.35",
          );
        }

        if (period) {
          tl.from(
            period,
            {
              y: 20,
              opacity: 0,
              filter: "blur(4px)",
              duration: motion.medium,
              ease: motion.easeOut,
            },
            "-=0.3",
          );
        }

        if (items.length) {
          tl.from(
            items,
            {
              y: 14,
              opacity: 0,
              filter: "blur(3px)",
              duration: motion.medium,
              ease: motion.easeOut,
              stagger: motion.staggerMd,
            },
            "-=0.2",
          );
        }

        gsap.to(block, {
          yPercent: -6 - index * 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="layout-section stack-xl relative"
        id="experience"
      >
        <h2 className="section-title type-title parallax-fg">
          My Working Experience
        </h2>

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
