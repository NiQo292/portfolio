"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function TextUpDown({ children }: { children: ReactNode }) {
  const wordRef = useRef<HTMLSpanElement | null>(null);
  const topChars = useRef<HTMLSpanElement[]>([]);
  const bottomChars = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const split = new SplitText(wordRef.current!, { type: "chars" });

    const wrappers = split.chars.map((charEl) => {
      const char = charEl.textContent;

      if (char === " ") {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        charEl.parentNode?.replaceChild(space, charEl);
        return null;
      }
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.position = "relative";

      const top = document.createElement("span");
      top.textContent = char;
      top.style.display = "inline-block";
      top.style.position = "relative";

      const bottom = document.createElement("span");
      bottom.textContent = char;
      bottom.style.display = "inline-block";
      bottom.style.position = "absolute";
      bottom.style.left = "0";
      bottom.style.top = "100%";

      wrapper.appendChild(top);
      wrapper.appendChild(bottom);

      if (charEl.parentNode) {
        charEl.parentNode.replaceChild(wrapper, charEl);
      }

      return { wrapper, top, bottom };
    });

    const realWrappers = wrappers.filter(Boolean) as {
      wrapper: HTMLSpanElement;
      top: HTMLSpanElement;
      bottom: HTMLSpanElement;
    }[];

    topChars.current = realWrappers.map((w) => w.top);
    bottomChars.current = realWrappers.map((w) => w.bottom);

    return () => split.revert();
  }, []);

  const lift = () => {
    gsap.to(topChars.current, {
      y: "-100%",
      stagger: 0.02,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(bottomChars.current, {
      y: "-100%",
      stagger: 0.02,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const drop = () => {
    gsap.to(topChars.current, {
      y: "0%",
      stagger: 0.02,
      duration: 0.4,
      ease: "power2.inOut",
    });

    gsap.to(bottomChars.current, {
      y: "0%",
      stagger: 0.02,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  return (
    <span
      ref={wordRef}
      onMouseEnter={lift}
      onMouseLeave={drop}
      className="cursor-pointer w-fit leading-none"
    >
      {children}
    </span>
  );
}
