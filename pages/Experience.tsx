"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/motion";

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".a-section-title", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: motion.easeOut,
        scrollTrigger: {
          trigger: ".a-section-title",
          start: "top 90%",
          scrub: 1,
        },
      });

      const blocks = gsap.utils.toArray<HTMLElement>(".a-exp");

      blocks.forEach((block) => {
        const company = block.querySelector(".a-company");
        const role = block.querySelector(".a-role");
        const bar = block.querySelector(".a-bar");
        const period = block.querySelector(".a-period");
        const items = block.querySelectorAll(".a-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Company
        if (company) {
          tl.from(company, {
            y: 40,
            opacity: 0,
            duration: motion.medium,
            ease: motion.easeOut,
          });
        }

        // Role
        if (role) {
          tl.from(
            role,
            {
              y: 35,
              opacity: 0,
              duration: motion.medium,
              ease: motion.easeOut,
            },
            "-=0.4"
          );
        }

        if (bar) {
          tl.from(
            bar,
            {
              width: "0%",
              duration: motion.slow,
              ease: motion.easeOut,
            },
            "-=0.3"
          );
        }

        // Period
        if (period) {
          tl.from(
            period,
            {
              y: 20,
              opacity: 0,
              duration: motion.medium,
              ease: motion.easeOut,
            },
            "-=0.3"
          );
        }

        // Responsibilities
        if (items.length) {
          tl.from(
            items,
            {
              y: 15,
              opacity: 0,
              duration: motion.medium,
              ease: motion.easeOut,
              stagger: motion.staggerMd,
            },
            "-=0.2"
          );
        }

        gsap.to(block, {
          yPercent: -10,
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
    <div ref={sectionRef} className="stack-xl">
      <h2 className="a-section-title type-title">My Working Experience</h2>

      {experienceData.map((exp, index) => (
        <article key={index} className="a-exp stack-md">
          <h3 className="a-company type-subheading">{exp.company}</h3>

          <div className="stack-xs">
            <h4 className="a-role type-heading relative inline-block">
              {exp.role}
              <span className="a-bar absolute left-0 -bottom-1 h-[3px] bg-[var(--cyan)] block w-full rounded-sm"></span>
            </h4>
          </div>

          <p className="a-period type-meta">{exp.period}</p>

          <ul className="type-list stack-sm list-disc pl-4">
            {exp.responsibilities.map((item, idx) => (
              <li key={idx} className="a-item">
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
