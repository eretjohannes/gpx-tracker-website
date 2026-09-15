(() => {
  const PREFIX = "gpx-features";
  const root = document.querySelector(`[data-block="${PREFIX}"]`);
  if (!root || typeof gsap === "undefined") return;

  const title = root.querySelector(".gpx-features-title");
  const cards = root.querySelectorAll(".gpx-features-item");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || (!title && !cards.length)) return;

  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  const enter = gsap.timeline({
    defaults: { ease: "power4.out", duration: 1 },
    scrollTrigger: {
      trigger: root,
      start: "top 78%",
      once: true,
    },
  });

  if (title) {
    enter.from(title, { y: 16, autoAlpha: 0 }, 0);
  }

  if (cards.length) {
    enter.from(cards, { y: 28, autoAlpha: 0, stagger: 0.08 }, 0.12);
  }
})();
