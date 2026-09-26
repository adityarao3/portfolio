"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sections } from "./SideIndex";

gsap.registerPlugin(ScrollTrigger);

/**
 * Asta's Demon-Slayer sword, standing in the left margin as a scroll meter.
 *
 * The sword image is horizontal (hilt left), so it is rotated 90deg to
 * stand hilt-up. As the page scrolls, the crimson crack layer is revealed
 * from hilt to tip; passing a section flares the cracks, and reaching the
 * bottom leaves the whole blade pulsing. The sword itself never moves.
 */

// Where the blade runs along the image, as % of its width (hilt -> tip).
const BLADE_START = 22;
const BLADE_END = 97.5;

export default function SwordRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLImageElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const front = frontRef.current;
    const glow = glowRef.current;
    const bloom = bloomRef.current;
    if (!fill || !front || !glow || !bloom) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { p: 0 };
    let marks: { p: number; passed: boolean }[] = [];
    let fullTween: gsap.core.Timeline | null = null;

    const restingBloom = () => 0.2 + 0.6 * state.p;

    // Scroll progress at which each section's heading reaches mid-screen.
    const layoutMarks = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      marks = sections.flatMap(({ id }) => {
        const el = document.getElementById(id);
        if (!el || max <= 0) return [];
        const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45;
        return [{ p: Math.min(1, Math.max(0, top / max)), passed: false }];
      });
    };

    const pulse = (strength = 1) => {
      if (reduced) return;
      gsap.fromTo(
        glow,
        { filter: `brightness(${1 + 1.4 * strength}) saturate(1.3)` },
        { filter: "brightness(1) saturate(1)", duration: 0.9, ease: "power2.out", overwrite: true },
      );
      gsap.fromTo(bloom, { opacity: 1 }, { opacity: restingBloom, duration: 1, ease: "power2.out", overwrite: true });
    };

    const setFull = (on: boolean) => {
      if (on === Boolean(fullTween) || reduced) return;
      if (on) {
        pulse(1.6);
        fullTween = gsap
          .timeline({ repeat: -1, yoyo: true })
          .to(glow, { filter: "brightness(1.6) saturate(1.2)", duration: 0.6, ease: "sine.inOut" }, 0)
          .to(bloom, { opacity: 1, duration: 0.6, ease: "sine.inOut" }, 0);
      } else if (fullTween) {
        fullTween.kill();
        fullTween = null;
        gsap.to(glow, { filter: "brightness(1) saturate(1)", duration: 0.3 });
      }
    };

    const render = (p: number) => {
      const at = BLADE_START + (BLADE_END - BLADE_START) * p;
      fill.style.clipPath = `inset(0 ${100 - at}% 0 0)`;
      front.style.left = `${at}%`;
      front.style.opacity = p > 0.002 && p < 0.995 ? "1" : "0";
      if (!fullTween) bloom.style.opacity = String(restingBloom());
      for (const m of marks) {
        const passed = p >= m.p - 0.001;
        if (passed && !m.passed) pulse();
        m.passed = passed;
      }
      setFull(p >= 0.995);
    };

    layoutMarks();
    // Ease toward the scroll position so the anti-magic pours rather than snaps.
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (st) =>
        gsap.to(state, {
          p: st.progress,
          duration: reduced ? 0 : 0.5,
          ease: "power2.out",
          overwrite: true,
          onUpdate: () => render(state.p),
        }),
      onRefresh: (st) => {
        layoutMarks();
        state.p = st.progress;
        render(state.p);
      },
    });
    render(0);

    return () => {
      trigger.kill();
      fullTween?.kill();
      gsap.killTweensOf([state, glow, bloom]);
    };
  }, []);

  return (
    <aside className="sword-rail" aria-hidden="true">
      <div ref={bloomRef} className="sword-bloom" />
      <div className="sword-spin">
        {/* eslint-disable @next/next/no-img-element */}
        <img className="sword-smoke" src="/assets/sword/sword-smoke-2k.webp" alt="" draggable={false} />
        <img className="sword-base" src="/assets/sword/sword-base-2k.webp" alt="" draggable={false} />
        <div ref={fillRef} className="sword-fill">
          <img ref={glowRef} src="/assets/sword/sword-glow-2k.webp" alt="" draggable={false} />
        </div>
        {/* eslint-enable @next/next/no-img-element */}
        <div ref={frontRef} className="sword-front" />
      </div>
    </aside>
  );
}
