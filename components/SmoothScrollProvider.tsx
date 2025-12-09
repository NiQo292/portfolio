"use client";

import { useEffect } from "react";
import { initSmoothScroll, initScrollTriggerProxy } from "@/lib/smooth-scroll";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initSmoothScroll();
    initScrollTriggerProxy();
  }, []);

  return <>{children}</>;
}
