"use client";

import { useEffect, useRef } from "react";

type Phone = {
  className: string;
  src: string;
  alt: string;
  fan: number;
  intensity: number;
  lag: number;
  lift: number;
  yawBias: number;
};

const PHONES: Phone[] = [
  {
    className: "device-back device-left",
    src: "/images/screen-tracks.png",
    alt: "",
    fan: -10,
    intensity: 1.45,
    lag: 0.08,
    lift: -56,
    yawBias: -7,
  },
  {
    className: "device-back device-right",
    src: "/images/screen-offline.png",
    alt: "",
    fan: 10,
    intensity: 1.35,
    lag: 0.13,
    lift: -56,
    yawBias: 7,
  },
  {
    className: "device-front",
    src: "/images/screen-navigate.jpg",
    alt: "GPX Tracker showing the Trans Euro Trail across Finland",
    fan: 0,
    intensity: 0.75,
    lag: 0.2,
    lift: 40,
    yawBias: 0,
  },
];

const MAX_TILT = 10;

export default function DeviceStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currents = useRef(PHONES.map(() => ({ x: 0, y: 0 })));
  const target = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tick = () => {
      const cards = cardRefs.current;
      cards.forEach((card, index) => {
        if (!card) return;
        const phone = PHONES[index];
        const current = currents.current[index];
        current.x += (target.current.x - current.x) * phone.lag;
        current.y += (target.current.y - current.y) * phone.lag;
        const x = current.x * phone.intensity;
        const y = current.y * phone.intensity;
        const rotateY = x * MAX_TILT * 2 + phone.yawBias;
        const rotateX = -y * MAX_TILT * 2;
        card.style.transform = [
          `translateZ(${phone.lift}px)`,
          `rotateX(${rotateX}deg)`,
          `rotateY(${rotateY}deg)`,
          `rotateZ(${phone.fan}deg)`,
        ].join(" ");
        card.style.setProperty("--shadow-x", `${-x * 40}px`);
        card.style.setProperty("--shadow-y", `${22 + y * 22}px`);
      });
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const stack = stackRef.current;
      if (!stack) return;
      const hero = stack.closest(".hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) {
        target.current.x = 0;
        target.current.y = 0;
        return;
      }
      target.current.x = (event.clientX - rect.left) / rect.width - 0.5;
      target.current.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={stackRef} className="device-stack">
      {PHONES.map((phone, index) => (
        <div key={phone.src} className={`device-slot ${phone.className}`}>
          <div className="device-enter">
            <div
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="device-tilt-card"
              style={{
                transform: `translateZ(${phone.lift}px) rotateZ(${phone.fan}deg)`,
              }}
            >
              <figure className="device">
                <img src={phone.src} alt={phone.alt} />
              </figure>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
