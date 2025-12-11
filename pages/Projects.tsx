"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealTitle } from "@/lib/useRevealTitle";

gsap.registerPlugin(ScrollTrigger);

import Portfolio from "@/public/images/projects/image.png";
import Nico from "@/public/images/nico.png";
import { useSectionBlur } from "@/lib/useSectionBlur";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionBlur({ ref: sectionRef });
  useRevealTitle({ scopeRef: sectionRef });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* ----------------------------------------
       * Featured project image reveal
       * ---------------------------------------- */
      gsap.from(".project-featured-img-wrap", {
        y: 60,
        opacity: 0,
        filter: "blur(14px)",
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".project-featured-card",
          start: "top 85%",
        },
      });

      /* Glow/vignette behind featured image */
      gsap.from(".project-featured-vignette", {
        opacity: 0,
        scale: 0.92,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".project-featured-card",
          start: "top 85%",
        },
      });

      /* Content block stagger */
      gsap.from(
        [
          ".project-title",
          ".project-desc",
          ".project-tech-list > span",
          ".project-featured-content .btn-primary",
        ],
        {
          y: 30,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.0,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".project-featured-card",
            start: "top 80%",
          },
        },
      );

      /* ----------------------------------------
       * Secondary card animations
       * ---------------------------------------- */
      const cards = gsap.utils.toArray(".project-card-secondary");

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".project-card-secondary",
          start: "top 85%",
        },
      });

      /* ----------------------------------------
       * Parallax floating for featured image
       * ---------------------------------------- */
      gsap.to(".project-featured-img-wrap", {
        y: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const card = document.querySelector(
      ".project-featured-img-wrap",
    ) as HTMLElement;
    const glow = document.querySelector(
      ".project-featured-glow",
    ) as HTMLElement;

    if (!card) return;

    let hover = false;

    const onMove = (e: MouseEvent) => {
      if (!hover) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 12; // Horizontal tilt
      const rotateX = -((y - centerY) / centerY) * 12; // Vertical tilt

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.04,
        transformPerspective: 900,
        ease: "power2.out",
        duration: 0.25,
      });

      if (glow) {
        const maxShift = rect.width * 0.2;
        gsap.to(glow, {
          x: ((x - centerX) / centerX) * maxShift,
          y: ((y - centerY) / centerY) * maxShift,
          opacity: 0.35,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    const onEnter = () => {
      hover = true;
      card.addEventListener("mousemove", onMove);
      gsap.to(card, { scale: 1.04, duration: 0.2 });
    };

    const onLeave = () => {
      hover = false;
      card.removeEventListener("mousemove", onMove);

      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
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
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="projects-section section-spacing relative w-full"
    >
      {/* Content wrapper */}
      <div className="layout-section relative z-[2] flex flex-col gap-20">
        {/* Heading */}
        <h2 className="type-title section-title">My Projects</h2>

        {/* Featured Project */}
        <div className="project-featured-card">
          <div className="project-featured-img-wrap">
            <div className="project-featured-glow"></div>
            <Image
              src={Portfolio}
              alt="Featured Project Preview"
              fill
              className="project-featured-img"
            />
            <div className="project-featured-vignette"></div>
          </div>

          <div className="project-featured-content">
            <h3 className="project-title">This Portfolio</h3>
            <p className="project-desc">
              A motion-driven developer portfolio built with Next.js,
              TypeScript, GSAP, TailwindCSS and a custom cinematic design system
              focused on interactivity and production-grade engineering.
            </p>

            <div className="project-tech-list">
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

        {/* Secondary grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="project-card-secondary">
            <div className="secondary-img-wrap">
              <Image
                src={Nico}
                alt="Bookmarks Project"
                fill
                className="secondary-img"
              />
            </div>

            <h4 className="secondary-title">Bookmark Manager (Old Project)</h4>
            <p className="secondary-desc">
              A simple bookmark manager built early in my development journey.
            </p>

            <a href="https://github.com/YOUR_GITHUB" className="secondary-link">
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
