export function useSmoothScroll() {
  return (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };
}
