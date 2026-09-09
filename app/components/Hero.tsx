"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DeviceStack from "./DeviceTilt";

gsap.registerPlugin(useGSAP);

const TITLE = ["Ride the trail", "without a signal."];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".hero-anim", { autoAlpha: 1, y: 0, filter: "none" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-kicker",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          ".hero-word",
          { autoAlpha: 0, y: 28, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.08 },
          "-=0.15"
        )
        .fromTo(
          ".hero-copy",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.45"
        )
        .fromTo(
          ".device-enter",
          { autoAlpha: 0, y: 46 },
          { autoAlpha: 1, y: 0, duration: 0.78, stagger: 0.18, ease: "power2.out" },
          "-=0.55"
        );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero">
      <div className="hero-text">
        <p className="hero-kicker hero-anim">GPX Tracker</p>
        <h1 className="hero-title">
          {TITLE.map((line) => (
            <span className="hero-line" key={line}>
              {line.split(" ").map((word) => (
                <span className="hero-word hero-anim" key={`${line}-${word}`}>
                  {word}{" "}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-copy hero-anim">
          For motorcycle enthusiasts riding the Trans Euro Trail, or following
          a GPX of their own. No account, no cloud — the map lives on the
          phone.
        </p>
      </div>

      <div className="hero-stage">
        <DeviceStack />
      </div>
    </section>
  );
}
