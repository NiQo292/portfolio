"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/motion";

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ts-title", {
        y: 70,
        opacity: 0,
        filter: "blur(10px)",
        ease: "power3.out",
        duration: 1.4,
        scrollTrigger: {
          trigger: ".ts-title",
          start: "top 95%",
          scrub: 1,
        },
      });

      const groups = gsap.utils.toArray<HTMLElement>(".ts-group");

      groups.forEach((group) => {
        const heading = group.querySelector(".ts-heading");
        const icons = group.querySelectorAll(".ts-item");

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
          "-=0.4"
        );
      });

      const cards = gsap.utils.toArray<HTMLElement>(".ts-card");

      cards.forEach((card) => {
        const glow = card.querySelector(".ts-glow") as HTMLElement;
        const inner = card.querySelector(".ts-inner") as HTMLElement;

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
    <section ref={sectionRef} className="layout-section stack-xl">
      <h2 className="ts-title type-title ">My Tech-Stack</h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
        {techStack.map((section) => (
          <div
            key={section.category}
            className="ts-group md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-10 "
          >
            <h3 className="ts-heading type-subheading md:col-span-4 ">
              {section.category}
            </h3>

            <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
              {section.items.map((tech) => (
                <li
                  key={tech.name}
                  className="ts-item ts-card flex items-center gap-3 type-list-item  relative"
                >
                  {/* Glow layer */}
                  <div className="ts-inner">
                    <div className="ts-glow"></div>

                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      width={32}
                      height={32}
                      className="ts-icon w-10 h-10 object-contain"
                    />

                    {tech.name}
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
