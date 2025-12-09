"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/motion";
import { useParallaxLayers } from "@/lib/useParallaxLayers";

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title cinematic reveal
      gsap.from(".a-section-title", {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        ease: "power3.out",
        duration: 1.4,
        scrollTrigger: {
          trigger: ".a-section-title",
          start: "top 90%",
          scrub: 1,
        },
      });

      // Experience block animations (same as before)
      const blocks = gsap.utils.toArray<HTMLElement>(".a-exp");

      blocks.forEach((block, i) => {
        const company = block.querySelector(".a-company");
        const role = block.querySelector(".a-role");
        const bar = block.querySelector(".a-bar");
        const period = block.querySelector(".a-period");
        const items = block.querySelectorAll(".a-item");
        const glow = block.querySelector(".a-glow");

        // Glow animation
        if (glow) {
          gsap.fromTo(
            glow,
            { opacity: 0, scale: 0.96 },
            {
              opacity: 1,
              scale: 1,
              duration: motion.slow,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Text cascading timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.from(company, {
          y: 50,
          opacity: 0,
          filter: "blur(6px)",
          duration: motion.medium,
          ease: "back.out(1.7)",
        });

        tl.from(
          role,
          {
            y: 40,
            opacity: 0,
            filter: "blur(6px)",
            duration: motion.medium,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );

        tl.from(
          bar,
          {
            width: 0,
            duration: motion.medium,
            ease: motion.easeOut,
          },
          "-=0.4"
        );

        tl.from(
          period,
          {
            y: 25,
            opacity: 0,
            filter: "blur(4px)",
            duration: motion.medium,
            ease: motion.easeOut,
          },
          "-=0.3"
        );

        tl.from(
          items,
          {
            y: 16,
            opacity: 0,
            filter: "blur(3px)",
            duration: motion.medium,
            ease: motion.easeOut,
            stagger: motion.staggerMd,
          },
          "-=0.2"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={sectionRef} className="stack-xl relative">
        <h2 className="a-section-title type-title parallax-fg">
          My Working Experience
        </h2>

        {experienceData.map((exp, index) => (
          <article key={index} className="a-exp relative stack-md parallax-mg">
            {/* Background Glow */}
            <div className="a-glow ts-exp-glow absolute inset-0 parallax-bg"></div>

            <h3 className="a-company type-subheading relative z-10 parallax-fg">
              {exp.company}
            </h3>

            <div className="stack-xs relative z-10">
              <h4 className="a-role type-heading relative inline-block parallax-fg">
                {exp.role}
                <span className="a-bar absolute left-0 -bottom-1 h-[3px] bg-[var(--cyan)] rounded-sm block w-full"></span>
              </h4>
            </div>

            <p className="a-period type-meta relative z-10 parallax-fg">
              {exp.period}
            </p>

            <ul className="type-list stack-sm list-disc pl-4 relative z-10">
              {exp.responsibilities.map((item, idx) => (
                <li key={idx} className="a-item parallax-fg">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="a-divider w-full h-[4px] bg-[var(--cyan)] mt-20 opacity-80"></div>
    </>
  );
}
