"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealTitle } from "@/lib/useRevealTitle";
import { useSectionBlur } from "@/lib/useSectionBlur";
import "./projects.css";

// Image Import
import Nico from "@/public/images/nico.png";
import Portfolio from "@/public/images/projects/portfolio_image.jpeg";
import Apple from "@/public/images/projects/apple.png";
import { initProjectsAnimations } from "./projects.anim";
import { initFeaturedHover } from "./projects.hover.desktop";
import { media, withMatchMedia } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useSectionBlur({ ref: sectionRef });
  useRevealTitle({ scopeRef: sectionRef });

  useLayoutEffect(() => {
    if (!sectionRef.current || !featuredRef.current) return;

    let cleanupHover: (() => void) | undefined;

    const cleanupMM = withMatchMedia((mm) => {
      mm.add(media.desktop, () => {
        cleanupHover = initFeaturedHover(featuredRef.current!);
      });
    });

    const ctx = gsap.context(() => {
      initProjectsAnimations(sectionRef.current!);
    }, sectionRef);

    return () => {
      cleanupHover?.();
      cleanupMM();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-spacing relative w-full"
      id="projects"
    >
      <div className="layout-section relative z-2 flex flex-col gap-20">
        <header className="section-title w-full text-center">
          <h2 className="type-title w-full text-center">My Projects</h2>
          <h3 className="type-subheading mt-3 opacity-80">
            A showcase of my development journey
          </h3>
        </header>

        <div data-featured-card className="project-featured-card">
          <div
            ref={featuredRef}
            data-featured-img-wrap
            className="relative h-72 w-full overflow-hidden rounded-3xl will-change-transform transform-3d md:h-88 lg:h-104"
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
          {/* <div
            data-project-card-secondary
            className="project-secondary-card flex flex-col gap-6"
          >
            <div data-project-media className="project-media-frame">
              <Image
                src={Apple}
                alt="Apple iPhone 15 Website Clone"
                fill
                className="object-cover"
              />
            </div>

            <h4 className="text-xl font-(--font-clash)">
              Apple iPhone 15 Website Clone
            </h4>
            <p className="opacity-85">
              A pixel-perfect clone of the Apple iPhone 15 product page,
              recreated using Next.js and TailwindCSS to demonstrate the
              integration of 3D models and responsive design principles.
            </p>

            <a
              href="https://apple-clone-tawny-three.vercel.app/"
              target="_blank"
              className="mt-2 font-semibold text-[rgba(0,255,255,0.75)]"
            >
              View Site →
            </a>
          </div> */}

          <div
            data-project-card-secondary
            className="project-secondary-card flex flex-col gap-6"
          >
            <div data-project-media className="project-media-frame">
              <video
                src="/images/projects/apple.webm"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="metadata"
                className="project-media"
              />
            </div>

            <h4 className="font-clash text-xl font-bold">
              Apple iPhone 15 Website Clone
            </h4>

            <p className="opacity-85">
              A pixel-perfect clone of the Apple iPhone 15 product page,
              recreated using Next.js and TailwindCSS to demonstrate the
              integration of 3D models and responsive design principles.
            </p>

            <a
              href="https://apple-clone-tawny-three.vercel.app/"
              target="_blank"
              className="mt-2 font-semibold text-[rgba(0,255,255,0.75)]"
            >
              View Site →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
