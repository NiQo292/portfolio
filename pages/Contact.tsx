"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/motion";
import { useSectionBlur } from "@/lib/useSectionBlur";
import { useRevealTitle } from "@/lib/useRevealTitle";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "loading" | "success" | "error" | "ratelimited";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const liquidRef = useRef<HTMLDivElement | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useSectionBlur({ ref: sectionRef });
  useRevealTitle({ scopeRef: sectionRef });

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  /* -------------------------------------------
   * Opening reveal
   * ------------------------------------------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-grid", {
        y: 50,
        opacity: 0,
        filter: "blur(12px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  /* -------------------------------------------
   * Liquid blob movement
   * ------------------------------------------- */
  useEffect(() => {
    const shell = shellRef.current;
    const liquid = liquidRef.current;
    if (!shell || !liquid) return;

    const onMove = (e: MouseEvent) => {
      const rect = shell.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(liquid, {
        x: (x - rect.width / 2) * 0.12,
        y: (y - rect.height / 2) * 0.12,
        duration: 0.55,
        ease: "sine.out",
      });
    };

    shell.addEventListener("pointermove", onMove);

    return () => {
      shell.removeEventListener("pointermove", onMove);
    };
  }, []);

  /* -------------------------------------------
   * Cinematic Thank You Modal
   * ------------------------------------------- */
  const openModal = () => {
    const modal = modalRef.current;
    if (!modal) return;

    gsap
      .timeline()
      .set(modal, { pointerEvents: "auto" })
      .to(modal, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      })
      .fromTo(
        ".contact-modal-content",
        {
          y: 80,
          opacity: 0,
          filter: "blur(14px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        },
      );
  };

  const closeModal = () => {
    const modal = modalRef.current;
    if (!modal) return;

    gsap
      .timeline()
      .to(".contact-modal-content", {
        y: 60,
        opacity: 0,
        filter: "blur(14px)",
        duration: 0.45,
        ease: "power2.inOut",
      })
      .to(modal, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(modal, { pointerEvents: "none" });
        },
      });
  };

  /* -------------------------------------------
   * Button feedback animation (Morph + Glow)
   * ------------------------------------------- */
  const animateSuccessButton = () => {
    const btn = document.querySelector(".contact-submit") as HTMLElement;
    if (!btn) return;

    gsap
      .timeline()
      .to(btn, {
        scale: 1.08,
        boxShadow: "0 0 38px rgba(0,255,255,0.55)",
        duration: 0.25,
        ease: "power2.out",
      })
      .to(btn, {
        scale: 1,
        boxShadow: "0 0 0px rgba(0,255,255,0)",
        duration: 0.6,
        ease: "elastic.out(1.1,0.4)",
      });
  };

  /* -------------------------------------------
   * Form interactions
   * ------------------------------------------- */
  const triggerRipple = () => {
    gsap.fromTo(
      liquidRef.current,
      { scale: 1, opacity: 0.45 },
      {
        scale: 1.25,
        opacity: 0.25,
        duration: 0.65,
        ease: "power2.out",
      },
    );
  };

  const handleFocus = () => triggerRipple();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 429) {
        setStatus("ratelimited");
        setError("You're sending messages too quickly — please wait a moment.");
        return;
      }

      if (!res.ok) throw new Error();

      setStatus("success");
      animateSuccessButton();
      openModal();

      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again later.");
    } finally {
      // Reset back after a few seconds
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <>
      {/* SECTION */}
      <section
        ref={sectionRef}
        className="contact-section layout-section stack-xl relative"
      >
        {/* Header */}
        <header className="contact-header">
          <h2 className="type-title section-title">Let&apos;s work together</h2>
          <p className="type-body contact-sub">
            Tell me about your project, role, or idea. I reply quickly.
          </p>
        </header>

        <div className="contact-grid">
          {/* Meta */}
          <div className="contact-meta">
            <div className="contact-meta-item">
              <p className="type-meta">Primary email</p>
              <div className="contact-email-wrap">
                <a
                  href="mailto:n.haubold29@gmail.com"
                  className="contact-meta-link type-body"
                  onClick={(e) => {
                    copyEmail("n.haubold29@gmail.com");
                  }}
                >
                  n.haubold29@gmail.com
                </a>

                <div className={`contact-tooltip ${copied ? "visible" : ""}`}>
                  Copied!
                </div>
              </div>
            </div>

            <div className="contact-meta-item">
              <p className="type-meta">Based in</p>
              <p className="type-body">Germany · Open to remote</p>
            </div>

            <div className="contact-meta-item">
              <p className="type-meta">Availability</p>
              <p className="type-body">
                Open to frontend / full-stack roles & selected freelance work.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div ref={shellRef} className="contact-shell">
            <div ref={liquidRef} className="contact-liquid" />

            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="contact-field">
                <span className="contact-label type-label">Name</span>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  required
                  placeholder="How should I address you?"
                  className="contact-input type-input"
                />
              </label>

              <label className="contact-field">
                <span className="contact-label type-label">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  required
                  placeholder="Where can I reach you?"
                  className="contact-input type-input"
                />
              </label>

              <label className="contact-field contact-field--full">
                <span className="contact-label type-label">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  required
                  placeholder="Tell me more about your project, role or idea."
                  className="contact-textarea type-input"
                />
              </label>

              <div className="contact-footer">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`contact-submit contact-submit--${status}`}
                >
                  {status === "loading" && (
                    <span className="btn-inner">
                      <span className="contact-spinner" /> Sending…
                    </span>
                  )}
                  {status === "success" && (
                    <span className="btn-inner">Sent!</span>
                  )}
                  {status === "ratelimited" && (
                    <span className="btn-inner">Slow down</span>
                  )}
                  {status === "error" && (
                    <span className="btn-inner">Try again</span>
                  )}
                  {status === "idle" && "Send Message"}
                </button>

                {error && <p className="contact-error type-meta">{error}</p>}
              </div>
            </form>
          </div>
        </div>
        <div></div>
      </section>

      {/* CINEMATIC FULLSCREEN MODAL */}
      <div ref={modalRef} className="contact-modal">
        <div className="contact-modal-backdrop" onClick={closeModal} />
        <div className="contact-modal-content">
          <h3 className="type-heading">Thank you!</h3>
          <p className="type-body">
            Your message has been sent successfully. I will get back to you
            shortly.
          </p>
          <button
            className="btn-primary contact-modal-close"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
