"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealTitle } from "@/lib/useRevealTitle";
import { useSectionBlur } from "@/lib/useSectionBlur";
import "./Project.css";

// Image Import
import Nico from "@/public/images/nico.png";
import Portfolio from "@/public/images/projects/image.png";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionBlur({ ref: sectionRef });
  useRevealTitle({ scopeRef: sectionRef });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-featured-img-wrap]", {
        y: 60,
        opacity: 0,
        filter: "blur(14px)",
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-featured-card]",
          start: "top 85%",
        },
      });

      gsap.from(".project-featured-vignette", {
        opacity: 0,
        scale: 0.92,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-featured-card]",
          start: "top 85%",
        },
      });

      gsap.from(
        [
          "[data-project-title]",
          "[data-project-desc]",
          "[data-project-tech-list] > span",
          "[data-featured-content] .btn-primary",
        ],
        {
          y: 30,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.0,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: "[data-featured-card]",
            start: "top 80%",
          },
        },
      );

      const cards = gsap.utils.toArray("[data-project-card-secondary]");

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "[data-project-card-secondary]",
          start: "top 85%",
        },
      });

      gsap.to("[data-featured-img-wrap]", {
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
      "[data-featured-img-wrap]",
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

      const rotateY = ((x - centerX) / centerX) * 12;
      const rotateX = -((y - centerY) / centerY) * 12;

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
      className="section-spacing relative w-full"
      id="projects"
    >
      <div className="layout-section relative z-2 flex flex-col gap-20">
        <h2 className="type-title section-title">My Projects</h2>

        <div data-featured-card className="project-featured-card">
          <div
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
