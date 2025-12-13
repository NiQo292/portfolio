"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/motion";
import "./Techstack.css";

// Brand Logos import
import ReactLogo from "@/public/images/techstack/react.svg";
import NextJSLogo from "@/public/images/techstack/next.svg";
import TypeScriptLogo from "@/public/images/techstack/typescript.svg";
import TailwindLogo from "@/public/images/techstack/tailwind.svg";
import GSAPLogo from "@/public/images/techstack/gsap.png";
import SassLogo from "@/public/images/techstack/sass.svg";
import MotionLogo from "@/public/images/techstack/motion.svg";
import PHPLogo from "@/public/images/techstack/php.svg";
import NodeJSLogo from "@/public/images/techstack/node.svg";
import ExpressLogo from "@/public/images/techstack/express.svg";
import JavaLogo from "@/public/images/techstack/java.svg";
import SpringLogo from "@/public/images/techstack/spring.svg";
import MySQLLogo from "@/public/images/techstack/mysql.svg";
import PostgresLogo from "@/public/images/techstack/postgres.svg";
import DrizzleLogo from "@/public/images/techstack/drizzle.svg";
import GitLogo from "@/public/images/techstack/git.svg";
import DockerLogo from "@/public/images/techstack/docker.svg";
import FigmaLogo from "@/public/images/techstack/figma.svg";
import { useSectionBlur } from "@/lib/useSectionBlur";
import { useRevealTitle } from "@/lib/useRevealTitle";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    category: "Frontend",
    items: [
      { name: "React", logo: ReactLogo },
      { name: "Next.js", logo: NextJSLogo },
      { name: "TypeScript", logo: TypeScriptLogo },
      { name: "Tailwind CSS", logo: TailwindLogo },
      { name: "GSAP", logo: GSAPLogo },
      { name: "Motion", logo: MotionLogo },
      { name: "Sass", logo: SassLogo },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "PHP", logo: PHPLogo },
      { name: "Node.js", logo: NodeJSLogo },
      { name: "Express.js", logo: ExpressLogo },
      { name: "Java", logo: JavaLogo },
      { name: "Spring Boot", logo: SpringLogo },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", logo: MySQLLogo },
      { name: "PostgreSQL", logo: PostgresLogo },
      { name: "Drizzle ORM", logo: DrizzleLogo },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", logo: GitLogo },
      { name: "Docker", logo: DockerLogo },
      { name: "Figma", logo: FigmaLogo },
    ],
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useSectionBlur({ ref: sectionRef });
  useRevealTitle({ scopeRef: sectionRef });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>("[data-ts-group]");

      groups.forEach((group) => {
        const heading = group.querySelector("[data-ts-heading]");
        const icons = group.querySelectorAll("[data-ts-item]");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.from(heading, {
          y: 40,
          opacity: 0,
          filter: "blur(6px)",
          duration: motion.medium,
          ease: motion.easeOut,
        });

        tl.from(
          icons,
          {
            y: 20,
            opacity: 0,
            filter: "blur(4px)",
            duration: motion.medium,
            ease: motion.easeOut,
            stagger: motion.staggerMd,
          },
          "-=0.4",
        );
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-ts-card]");

      cards.forEach((card) => {
        const glow = card.querySelector("[data-ts-glow]") as HTMLElement;
        const inner = card.querySelector("[data-ts-inner]") as HTMLElement;
        let hover = false;

        const onMove = (e: MouseEvent) => {
          if (!hover) return;

          const rect = inner.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateY = ((x - centerX) / centerX) * 10;
          const rotateX = -((y - centerY) / centerY) * 10;

          gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.02,
            transformPerspective: 800,
            ease: "power2.out",
            duration: 0.3,
          });

          if (glow) {
            const glowX = ((x - centerX) / centerX) * 40;
            const glowY = ((y - centerY) / centerY) * 40;

            gsap.to(glow, {
              x: glowX,
              y: glowY,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        card.addEventListener("mouseenter", () => {
          hover = true;
          card.addEventListener("mousemove", onMove);
          gsap.to(card, { scale: 1.04, duration: 0.2 });
        });

        card.addEventListener("mouseleave", () => {
          hover = false;
          card.removeEventListener("mousemove", onMove);

          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
          });

          if (glow) {
            gsap.to(glow, {
              x: 0,
              y: 0,
              opacity: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="layout-section stack-xl"
      id="techstack"
    >
      <h2 className="section-title type-title">My Tech-Stack</h2>

      <div className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-12">
        {techStack.map((section) => (
          <div
            key={section.category}
            data-ts-group
            className="grid grid-cols-1 gap-x-10 gap-y-10 md:col-span-12 md:grid-cols-12"
          >
            <h3 className="type-subheading md:col-span-4" data-ts-heading>
              {section.category}
            </h3>

            <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:col-span-8 lg:grid-cols-3">
              {section.items.map((tech) => (
                <li
                  key={tech.name}
                  data-ts-item
                  data-ts-card
                  className="relative flex items-center gap-3 px-2 py-1 perspective-[1000px] transform-3d"
                >
                  <div
                    className="relative z-2 flex items-center gap-3 transform-3d"
                    data-ts-inner
                  >
                    <div data-ts-glow className="ts-glow" />

                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      width={32}
                      height={32}
                      className="mr-3 h-10 w-10 object-contain"
                    />

                    <p className="type-body min-w-fit">{tech.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
