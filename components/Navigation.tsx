"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Button from "./Button";
import TextUpDown from "./animations/TextUpDown";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import Link from "next/link";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    if (!menuOpen) setShowMenuOverlay(true);
    setMenuOpen((open) => !open);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    if (scrolled) {
      gsap.to(navRef.current, {
        borderRadius: "9999px",
        marginTop: "16px",
        marginLeft: "32px",
        marginRight: "32px",
        duration: 0.6,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(navRef.current, {
        borderRadius: "0px",
        marginTop: "0px",
        marginLeft: "0px",
        marginRight: "0px",
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [scrolled]);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { y: "-100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }
    if (!menuOpen && menuRef.current) {
      gsap.to(menuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => setShowMenuOverlay(false),
      });
    }
  }, [menuOpen]);

  return (
    <>
      <div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 shadow-lg backdrop-blur"
      >
        <nav className="h-20 flex w-full items-center justify-center gap-20 px-8">
          <div className="w-full max-w-[1920px] flex flex-row items-center">
            <Image
              src={Logo}
              alt="Logo"
              width={50}
              height={50}
              className="mr-auto"
            />
            <div
              className="relative w-8 h-8 flex flex-col justify-center items-center cursor-pointer ml-4 z-50 group"
              onClick={handleMenuToggle}
            >
              <span
                className={`block absolute w-8 h-1 bg-white transition-all duration-300 ${
                  !menuOpen ? "group-hover:rotate-12" : ""
                } ${menuOpen ? "rotate-45 top-3.5" : "top-2"}`}
              />
              <span
                className={`block absolute w-8 h-1 bg-white transition-all duration-300 ${
                  !menuOpen ? "group-hover:-rotate-12" : ""
                } ${menuOpen ? "-rotate-45 top-3.5" : "top-6"}`}
              />
            </div>
          </div>
        </nav>
      </div>
      {showMenuOverlay && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center z-40"
        >
          <nav className="flex flex-col gap-8 text-white text-5xl ">
            <TextUpDown>
              <Link href="/">Home</Link>
            </TextUpDown>
            <TextUpDown>
              <Link href="/about">About</Link>
            </TextUpDown>
            <TextUpDown>
              <Link href="/work">Work</Link>
            </TextUpDown>
            <TextUpDown>
              <Link href="/contact">Contact</Link>
            </TextUpDown>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;
