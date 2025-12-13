import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAboutCards(
  section: HTMLElement,
  {
    onOpenModal,
    onCloseModal,
  }: {
    onOpenModal: () => void;
    onCloseModal: () => void;
  },
) {
  const cards = Array.from(
    section.querySelectorAll<HTMLElement>("[data-card]"),
  );

  if (!cards.length) return;

  cards.forEach((card, index) => {
    const inner = card.querySelector<HTMLElement>(".card-inner");
    if (!inner) return;

    const OFFSET = 120;
    const DURATION = 300;

    gsap.fromTo(
      inner,
      { rotateY: 0 },
      {
        rotateY: 180,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: () => `top+=${index * OFFSET} 50%`,
          end: () => `top+=${index * OFFSET + DURATION} 45%`,
          scrub: true,
        },
      },
    );
  });

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.04, duration: 0.25 });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, duration: 0.25 });
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const backdrop = section.querySelector<HTMLElement>(
        "[data-modal-backdrop]",
      );
      const modal = section.querySelector<HTMLElement>("[data-modal]");
      const modalTitle =
        section.querySelector<HTMLElement>("[data-modal-title]");
      const modalContent = section.querySelector<HTMLElement>(
        "[data-modal-content]",
      );

      if (!backdrop || !modal || !modalTitle || !modalContent) return;

      const rect = card.getBoundingClientRect();

      modalTitle.textContent = card.dataset.title ?? "";
      modalContent.textContent = card.dataset.description ?? "";

      onOpenModal();

      gsap.set(modal, {
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
        scale: 0.55,
        opacity: 0,
      });

      gsap.to(backdrop, { opacity: 1, duration: 0.25 });
      gsap.to(modal, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    });
  });

  const closeModal = () => {
    const backdrop = section.querySelector<HTMLElement>(
      "[data-modal-backdrop]",
    );
    if (!backdrop) return;

    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => onCloseModal(),
    });
  };

  section.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (
      target.matches("[data-modal-close]") ||
      target.matches("[data-modal-backdrop]")
    ) {
      closeModal();
    }
  });

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
