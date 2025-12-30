"use client";

import React, { useRef } from "react";
import Image from "next/image";
import "./techstack.css";

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

const frontendBackend = [
  { name: "React", logo: ReactLogo },
  { name: "Next.js", logo: NextJSLogo },
  { name: "TypeScript", logo: TypeScriptLogo },
  { name: "Tailwind CSS", logo: TailwindLogo },
  { name: "GSAP", logo: GSAPLogo },
  { name: "Motion", logo: MotionLogo },
  { name: "Sass", logo: SassLogo },
  { name: "PHP", logo: PHPLogo },
  { name: "Node.js", logo: NodeJSLogo },
  { name: "Express.js", logo: ExpressLogo },
  { name: "Java", logo: JavaLogo },
  { name: "Spring Boot", logo: SpringLogo },
];

const databaseTools = [
  { name: "MySQL", logo: MySQLLogo },
  { name: "PostgreSQL", logo: PostgresLogo },
  { name: "Drizzle ORM", logo: DrizzleLogo },
  { name: "Git", logo: GitLogo },
  { name: "Docker", logo: DockerLogo },
  { name: "Figma", logo: FigmaLogo },
];

export default function TechStack() {
  return (
    <section className="layout-section stack-xl" id="techstack">
      <header className="section-title w-full text-center">
        <h2 className="type-title w-full text-center">My Tech-Stack</h2>
        <h3 className="type-subheading mt-3 opacity-80">
          Technologies I Use to create wonders
        </h3>
      </header>

      {/* Marquee 1: Frontend & Backend (left to right) */}
      <div className="overflow-hidden py-6">
        <div className="marquee marquee-ltr flex items-center gap-10">
          {frontendBackend.map((tech) => (
            <div key={tech.name} className="flex items-center gap-3 px-4 py-2">
              <Image
                src={tech.logo}
                alt={tech.name}
                width={32}
                height={32}
                className="h-10 w-10 object-contain"
              />
              <span className="type-body min-w-fit">{tech.name}</span>
            </div>
          ))}
          {frontendBackend.map((tech) => (
            <div
              key={tech.name + "-dup"}
              className="flex items-center gap-3 px-4 py-2"
            >
              <Image
                src={tech.logo}
                alt={tech.name}
                width={32}
                height={32}
                className="h-10 w-10 object-contain"
              />
              <span className="type-body min-w-fit">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee 2: Database & Tools (right to left) */}
      <div className="overflow-hidden py-6">
        <div className="marquee marquee-rtl flex items-center gap-10">
          {databaseTools.map((tech) => (
            <div key={tech.name} className="flex items-center gap-3 px-4 py-2">
              <Image
                src={tech.logo}
                alt={tech.name}
                width={32}
                height={32}
                className="h-10 w-10 object-contain"
              />
              <span className="type-body min-w-fit">{tech.name}</span>
            </div>
          ))}
          {databaseTools.map((tech) => (
            <div
              key={tech.name + "-dup"}
              className="flex items-center gap-3 px-4 py-2"
            >
              <Image
                src={tech.logo}
                alt={tech.name}
                width={32}
                height={32}
                className="h-10 w-10 object-contain"
              />
              <span className="type-body min-w-fit">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
