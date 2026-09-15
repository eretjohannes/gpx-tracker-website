(() => {
  const PREFIX = "gpx-nav-split";
  const root = document.querySelector(`[data-block="${PREFIX}"]`);
  if (!root || typeof gsap === "undefined") return;

  const bar = root.querySelector("[data-bar]");
  const brand = root.querySelector("[data-brand]");
  const get = root.querySelector("[data-get]");
  if (!bar || !brand || !get) return;
  if (root.hasAttribute("data-static")) return;

  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = window.matchMedia("(min-width: 900px)");
  const GAP = 10;

  let trigger;
  let brandX = 0;
  let getX = 0;

  function measure() {
    gsap.set([brand, get], { x: 0 });
    const barBox = bar.getBoundingClientRect();
    const brandBox = brand.getBoundingClientRect();
    const getBox = get.getBoundingClientRect();
    const cluster = brandBox.width + GAP + getBox.width;
    const clusterLeft = barBox.left + (barBox.width - cluster) / 2;
    brandX = clusterLeft - brandBox.left;
    getX = clusterLeft + brandBox.width + GAP - getBox.left;
  }

  function apply(progress) {
    const p = 1 - progress;
    gsap.set(brand, { x: brandX * p });
    gsap.set(get, { x: getX * p });
  }

  function build() {
    if (trigger) {
      trigger.kill();
      trigger = null;
    }

    gsap.set([brand, get], { clearProps: "transform" });

    if (!desktop.matches || reduced) {
      gsap.set([brand, get], { x: 0 });
      return;
    }

    measure();
    apply(0);

    trigger = ScrollTrigger.create({
      start: 0,
      end: () => Math.min(window.innerHeight * 0.55, 520),
      scrub: 0.45,
      invalidateOnRefresh: true,
      onRefresh: () => {
        const progress = trigger ? trigger.progress : 0;
        measure();
        apply(progress);
      },
      onUpdate: (self) => apply(self.progress),
    });
  }

  build();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    });
  }
  desktop.addEventListener("change", build);
  window.addEventListener("resize", () => {
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  });
})();
