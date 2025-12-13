"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealTitle } from "@/lib/useRevealTitle";
import { useSectionBlur } from "@/lib/useSectionBlur";
import "./Project.css";

// Image Import
import Nico from "@/public/images/nico.png";
import Portfolio from "@/public/images/projects/portfolio_image.jpeg";
import { initFeaturedHover, initProjectsAnimations } from "./Project.anim";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useSectionBlur({ ref: sectionRef });
  useRevealTitle({ scopeRef: sectionRef });

  useLayoutEffect(() => {
    if (!sectionRef.current || !featuredRef.current) return;

    const ctx = gsap.context(() => {
      initProjectsAnimations(sectionRef.current!);
      const cleanupHover = initFeaturedHover(featuredRef.current!);

      return cleanupHover;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-spacing relative w-full"
      id="projects"
    >
      <div className="layout-section relative z-2 flex flex-col gap-20">
        <header className="w-full text-center">
          <h2 className="type-title section-title w-full text-center">
            My Projects
          </h2>
          <h3 className="type-subheading mt-3 opacity-80">
            A showcase of my development journey
          </h3>
        </header>

        <div data-featured-card className="project-featured-card">
          <div
            ref={featuredRef}
            data-featured-img-wrap
            className="relative h-72 w-full overflow-hidden rounded-3xl transition-transform duration-200 will-change-transform transform-3d md:h-88 lg:h-104"
          >
            <div className="project-featured-glow"></div>
            <Image
              src={Portfolio}
              alt="Featured Project Preview"
              fill
              className="absolute inset-0 z-0 object-cover"
            />
            <div className="project-featured-vignette"></div>
          </div>

          <div data-featured-content className="flex flex-col gap-6 text-left">
            <h3 data-project-title className="project-title">
              This Portfolio
            </h3>
            <p data-project-desc className="project-dec">
              A motion-driven developer portfolio built with Next.js,
              TypeScript, GSAP, TailwindCSS and a custom cinematic design system
              focused on interactivity and production-grade engineering.
            </p>

            <div data-project-tech-list className="project-tech-list">
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>GSAP</span>
              <span>Tailwind</span>
            </div>

            <a
              href="https://github.com/NiQo292/portfolio"
              target="_blank"
              className="btn-primary"
            >
              View Source
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div data-project-card-secondary className="project-secondary-card">
            <div className="relative h-56 w-full overflow-hidden rounded-2xl">
              <Image
                src={Nico}
                alt="Bookmarks Project"
                fill
                className="object-cover"
              />
            </div>

            <h4 className="font-[--font-clash] text-xl font-bold">
              Bookmark Manager (Old Project)
            </h4>
            <p className="opacity-85">
              A simple bookmark manager built early in my development journey.
            </p>

            <a
              href="https://github.com/YOUR_GITHUB"
              className="mt-2 font-semibold text-[rgba(0,255,255,0.75)]"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
