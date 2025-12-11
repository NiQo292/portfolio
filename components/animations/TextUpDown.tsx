"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";

type Props = {
  children: ReactNode; // you pass plain text everywhere, so this is safe
  className?: string;
};

export default function TextUpDown({ children, className = "" }: Props) {
  const topRefs = useRef<HTMLSpanElement[]>([]);
  const bottomRefs = useRef<HTMLSpanElement[]>([]);

  const text = String(children ?? "");

  const setTopRef = (index: number) => (el: HTMLSpanElement | null) => {
    if (el) topRefs.current[index] = el;
  };

  const setBottomRef = (index: number) => (el: HTMLSpanElement | null) => {
    if (el) bottomRefs.current[index] = el;
  };

  const lift = () => {
    gsap.to(topRefs.current, {
      y: "-100%",
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
    });

    gsap.to(bottomRefs.current, {
      y: "-100%",
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
    });
  };

  const drop = () => {
    gsap.to(topRefs.current, {
      y: "0%",
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.inOut",
    });

    gsap.to(bottomRefs.current, {
      y: "0%",
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.inOut",
    });
  };

  return (
    <span
      className={`relative inline-block cursor-pointer leading-none ${className}`}
      onMouseEnter={lift}
      onMouseLeave={drop}
    >
      {text.split("").map((ch, i) => {
        if (ch === " ") {
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: "0.35em",
              }}
            >
              {"\u00A0"}
            </span>
          );
        }

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* top letter (initial visible) */}
            <span
              ref={setTopRef(i)}
              style={{
                display: "inline-block",
                position: "relative",
                transform: "translateY(0%)",
              }}
            >
              {ch}
            </span>

            {/* bottom letter (initial hidden below) */}
            <span
              ref={setBottomRef(i)}
              style={{
                display: "inline-block",
                position: "absolute",
                left: 0,
                top: "100%",
                transform: "translateY(0%)",
              }}
            >
              {ch}
            </span>
          </span>
        );
      })}
    </span>
  );
}
