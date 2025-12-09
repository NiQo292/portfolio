"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
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

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>(".tech-group");

      groups.forEach((group) => {
        const heading = group.querySelector(".tech-heading");
        const items = group.querySelectorAll(".tech-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 85%", // element hits 85% viewport height (≈ 15% from bottom)
            toggleActions: "play none none none",
          },
        });

        if (heading) {
          tl.fromTo(
            heading,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: motion.medium, ease: motion.easeOut }
          );
        }

        if (items.length) {
          tl.fromTo(
            items,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: motion.medium,
              ease: motion.easeOut,
              stagger: motion.staggerLg,
            },
            "-=0.2"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="stack-xl">
      <h2 className="type-title">My Tech-Stack</h2>

      {techStack.map((section) => (
        <div
          key={section.category}
          className="tech-group w-full flex flex-col justify-between gap-4 md:flex-row md:gap-8"
        >
          <h3 className="type-subheading w-full md:w-2/5">
            {section.category}
          </h3>

          <ul className="flex flex-row w-full gap-5 flex-wrap justify-stretch md:w-3/5">
            {section.items.map((tech) => (
              <li
                key={tech.name}
                className="tech-item flex flex-row items-center justify-start min-w-fit text-xl md:text-2xl mr-8"
              >
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={24}
                  height={24}
                  className="w-12 h-12 mr-3"
                />
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TechStack;
