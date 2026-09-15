(() => {
  const PREFIX = "gpx-legal-copy";
  const root = document.querySelector(`[data-block="${PREFIX}"]`);
  if (!root || typeof gsap === "undefined") return;

  const title = root.querySelector(".gpx-legal-copy-title");
  const card = root.querySelector(".gpx-legal-copy-card");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || (!title && !card)) return;

  gsap.from([title, card].filter(Boolean), {
    y: 16,
    autoAlpha: 0,
    duration: 1,
    ease: "power4.out",
    stagger: 0.1,
  });
})();
