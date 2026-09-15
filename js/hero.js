(() => {
  const PREFIX = "gpx-hero-bench";
  const root = document.querySelector(`[data-block="${PREFIX}"]`);
  if (!root) return;

  const scene = root.querySelector("[data-scene]");
  const stage = root.querySelector("[data-stage]");
  const intro = root.querySelector("[data-intro]");
  const plate = root.querySelector("[data-plate]");
  const slot = root.querySelector("[data-slot]");
  const device = root.querySelector("[data-device]");
  const bezel = root.querySelector("[data-bezel]");
  const reel = root.querySelector("[data-reel]");
  const items = root.querySelectorAll("[data-reveal]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = window.matchMedia("(min-width: 900px)");

  if (reel) {
    const fitReel = () => {
      if (!bezel || !reel.videoWidth || !reel.videoHeight) return;
      bezel.style.setProperty("--gpx-reel-ratio", `${reel.videoWidth} / ${reel.videoHeight}`);
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    };

    const ready = () => {
      fitReel();
      if (reel.readyState >= 2 && bezel) {
        bezel.classList.add("is-reel");
        if (!reduced) reel.play().catch(() => {});
      }
    };

    const attach = () => {
      const src = reel.getAttribute("data-src");
      if (!src || reel.dataset.bound === "1") return;
      reel.dataset.bound = "1";
      const source = document.createElement("source");
      source.src = src;
      source.type = "video/mp4";
      reel.appendChild(source);
      reel.load();
    };

    reel.addEventListener("loadedmetadata", fitReel);
    reel.addEventListener("loadeddata", ready);
    reel.addEventListener("error", () => {
      if (bezel) bezel.classList.remove("is-reel");
    });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            attach();
            io.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      io.observe(reel);
    } else {
      attach();
    }

    fitReel();
    ready();
  }

  if (typeof gsap === "undefined") return;

  if (!stage || !slot) return;

  const pad = () =>
    Number.parseFloat(getComputedStyle(root).getPropertyValue("--px8-space-pad")) || 24;
  const radius = () => {
    const raw = Number.parseFloat(getComputedStyle(root).getPropertyValue("--px8-radius")) || 12;
    return raw * (desktop.matches ? 2 : 1.75);
  };
  const phoneH = () => (device ? device.offsetHeight : slot.offsetHeight);

  const plateTopPx = () => {
    if (!intro) return stage.clientHeight * 0.4;
    return intro.getBoundingClientRect().bottom - stage.getBoundingClientRect().top;
  };

  const overlap = () =>
    Number.parseFloat(getComputedStyle(root).getPropertyValue("--gpx-hero-overlap")) || 72;

  const startY = () => plateTopPx() - overlap();

  const centerY = () => (stage.clientHeight - phoneH()) / 2;

  const boxedClip = () => {
    const edge = pad();
    const top = (plateTopPx() / stage.clientHeight) * 100;
    const r = radius();
    return `inset(${top}% ${edge}px ${edge}px ${edge}px round ${r}px)`;
  };

  gsap.set(slot, { y: startY() });
  if (plate) gsap.set(plate, { clipPath: boxedClip() });

  if (reduced) return;

  if (items.length) {
    gsap.from(items, {
      y: 18,
      autoAlpha: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.1,
    });
  }

  if (!scene || !plate || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const openClip = () => "inset(0% 0px 0px 0px round 0px)";

  const camera = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
      invalidateOnRefresh: true,
    },
  });

  camera.addLabel("settle", 0);

  if (intro) {
    camera.to(intro, { autoAlpha: 0, y: -36, duration: 0.85 }, "settle");
  }

  camera.fromTo(
    slot,
    { y: startY, scale: 1 },
    { y: centerY, scale: 1, duration: 1 },
    "settle"
  );

  camera.fromTo(
    plate,
    { clipPath: boxedClip },
    { clipPath: openClip, duration: 1 },
    "settle"
  );

  camera.addLabel("hold", 1);
  camera.to({}, { duration: 1.2 });
})();
