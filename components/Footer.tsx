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
    <footer className="bg-black z-100">
      <div
        className="relative h-[600px]"
        style={{ clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 h-[600px] w-full">
          <div className="py-8 px-12 h-full w-full flex flex-col justify-between text-white">
            <div>
              <div className="flex shrink-0 gap-20">
                <div className="flex flex-col gap-2">
                  <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
                  {navLinks.about.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <TextUpDown>{link.name}</TextUpDown>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="mb-2 uppercase text-[#ffffff80]">Socials</h3>
                  {navLinks.socials.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <TextUpDown>{link.name}</TextUpDown>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <h1 className="text-[12vw] leading-[0.8] mt-10">Nico Haubold</h1>
              <p className="">&copy; Copyright</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
