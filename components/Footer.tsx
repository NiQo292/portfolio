import Link from "next/link";
import React from "react";
import TextUpDown from "./animations/TextUpDown";

const navLinks = {
  about: [
    { name: "Home", href: "" },
    { name: "Projects", href: "" },
    { name: "Contact Me", href: "" },
    { name: "Download CV", href: "" },
  ],
  socials: [
    { name: "Github", href: "" },
    { name: "LinkedIn", href: "" },
  ],
};

const Footer = () => {
  return (
    <footer className="z-100 bg-black">
      <div
        className="relative h-[600px]"
        style={{ clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 h-[600px] w-full">
          <div className="flex h-full w-full flex-col justify-between px-12 py-8 text-white">
            <div>
              <div className="flex shrink-0 gap-20">
                <div className="flex flex-col gap-2">
                  <h3 className="mb-2 text-[#ffffff80] uppercase">About</h3>
                  {navLinks.about.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <TextUpDown>{link.name}</TextUpDown>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="mb-2 text-[#ffffff80] uppercase">Socials</h3>
                  {navLinks.socials.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <TextUpDown>{link.name}</TextUpDown>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h1 className="mt-10 text-[12vw] leading-[0.8]">Nico Haubold</h1>
              <p className="">&copy; Copyright</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
