import { FaGithub, FaLinkedin } from "react-icons/fa";

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type SocialItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const navLinks: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Download CV", href: "/CV.pdf", external: true },
];

export const socialLinks: SocialItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/NiQo292",
    icon: <FaGithub />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nico-haubold-440939225/",
    icon: <FaLinkedin />,
  },
];
