export const motion = {
  duration: {
    fast: 0.35, // UI feedback, hovers, micro-interactions
    interact: 0.55, // Larger interactions (modals, navs)
    base: 0.6, // Standard reveals (most text, cards)
    slow: 0.9, // Section headers, hero content
    xslow: 1.2, // Large editorial moments
  },

  distance: {
    xs: 8,
    sm: 14,
    md: 24,
    lg: 40,
    xl: 60,
  },

  stagger: {
    xs: 0.04, // characters, icons
    sm: 0.08, // short lists
    md: 0.14, // paragraphs, meta blocks
    lg: 0.22, // hero / editorial moments
  },

  parallax: {
    xs: 12,
    sm: 25,
    md: 35,
    lg: 50,
    base: -6,
    step: -1.2,
  },

  delay: {
    none: 0,
    xs: 0.08,
    sm: 0.15,
    md: 0.25,
    lg: 0.35,
  },

  scale: {
    hover: 1.05,
  },

  ease: {
    out: "power3.out",
    soft: "power2.out",
    inOut: "power3.inOut",
  },
};
