"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRevealTitle } from "@/lib/useRevealTitle";
import "./contact.css";
import { gsap } from "gsap";
import {
  openContactModal,
  closeContactModal,
  animateSubmitSuccess,
  rippleLiquid,
} from "./contact.anim.shared";
import { initContactAnimations } from "./contact.anim";

type Status = "idle" | "loading" | "success" | "error" | "ratelimited";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const liquidRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useRevealTitle({ scopeRef: sectionRef });

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  useLayoutEffect(() => {
    if (!sectionRef.current || !shellRef.current || !liquidRef.current) return;

    let cleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      cleanup = initContactAnimations(
        sectionRef.current!,
        shellRef.current!,
        liquidRef.current!,
      );
    }, sectionRef);

    return () => {
      cleanup?.();
      ctx.revert();
    };
  }, []);

  const handleFocus = () => {
    if (liquidRef.current) {
      rippleLiquid(liquidRef.current);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

      if (submitBtnRef.current) {
        animateSubmitSuccess(submitBtnRef.current);
      }

      if (modalRef.current) {
        openContactModal(modalRef.current);
      }

      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again later.");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      closeContactModal(modalRef.current);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="layout-section stack-xl relative mb-40"
        id="contact"
      >
        <header className="section-title w-full text-center">
          <h2 className="type-title w-full text-center">
            Let&apos;s work together
          </h2>
          <h3 className="type-subheading mt-3 opacity-80">
            Tell me about your project, role, or idea. I reply quickly.
          </h3>
        </header>

        <div data-contact-grid className="contact-grid">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-[0.4rem]">
              <p className="type-meta">Primary email</p>
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => copyEmail("n.haubold29@gmail.com")}
                  className="contact-meta-link type-body"
                >
                  n.haubold29@gmail.com
                </button>

                <div className={`contact-tooltip ${copied ? "visible" : ""}`}>
                  Copied!
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[0.4rem]">
              <p className="type-meta">Based in</p>
              <p className="type-body">Germany · Open to remote</p>
            </div>

            <div className="flex flex-col gap-[0.4rem]">
              <p className="type-meta">Availability</p>
              <p className="type-body">Open to Frontend / Full-Stack roles</p>
            </div>
          </div>

          <div ref={shellRef} className="contact-shell">
            <div ref={liquidRef} className="contact-liquid" />

            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="contact-field">
                <span className="type-label">Name</span>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  required
                  placeholder="How should I call you?"
                  className="contact-input type-input"
                />
              </label>

              <label className="contact-field">
                <span className="type-label">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  required
                  placeholder="How can I reach you?"
                  className="contact-input type-input"
                />
              </label>

              <label className="contact-field contact-field--full">
                <span className="type-label">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  required
                  placeholder="Write your message here…"
                  className="contact-textarea type-input"
                />
              </label>

              <div className="contact-footer">
                <button
                  ref={submitBtnRef}
                  type="submit"
                  disabled={status === "loading"}
                  data-submit
                  className={`contact-submit contact-submit--${status}`}
                >
                  {status === "loading" && (
                    <span className="btn-inner">
                      <span className="contact-spinner" />
                      Sending…
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

                {error && (
                  <p className="type-meta text-[rgba(255,140,140,0.9)]">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <div
        ref={modalRef}
        className="pointer-events-none fixed inset-0 z-999 grid place-items-center opacity-0"
      >
        <div className="contact-modal-backdrop" onClick={handleCloseModal} />
        <div data-modal-content className="contact-modal-content">
          <h3 className="type-heading">Thank you!</h3>
          <p className="type-body">
            Your message has been sent successfully. I will get back to you
            shortly.
          </p>
          <button className="btn-primary mt-6" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
