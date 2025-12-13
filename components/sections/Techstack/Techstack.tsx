"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Techstack.css";
import { useSectionBlur } from "@/lib/useSectionBlur";
import { useRevealTitle } from "@/lib/useRevealTitle";
import { initTechStackHover, initTechStackReveal } from "./Techstack.anim";

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
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      initTechStackReveal(sectionRef.current!);
      initTechStackHover(sectionRef.current!);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="layout-section stack-xl"
      id="techstack"
    >
      <header className="section-title w-full text-center">
        <h2 className="type-title w-full text-center">My Tech-Stack</h2>
        <h3 className="type-subheading mt-3 opacity-80">
          Technologies I Use to create wonders
        </h3>
      </header>

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
