"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Asta's Demon-Slayer sword, driven by scroll.
 *
 * The section pins while the sword is drawn in from the left, the
 * anti-magic cracks flare, and the blade swings off to the right. The
 * asset is a transparent 4096x1024 WebP, so it sits on any background.
 */
export default function SwordScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const swordRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Idle hover so the sword never looks frozen mid-scroll.
      gsap.to(swordRef.current, {
        y: -10,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        swordRef.current,
        { xPercent: -115, rotate: -8, scale: 0.85, filter: "brightness(0.4)" },
        { xPercent: 0, rotate: 0, scale: 1, filter: "brightness(1)", ease: "power3.out", duration: 1 },
      )
        .fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1.1, ease: "power2.out", duration: 0.5 },
          0.7,
        )
        .fromTo(captionRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.8)
        .to({}, { duration: 0.6 }) // hold
        .to(swordRef.current, {
          xPercent: 120,
          rotate: 6,
          ease: "power2.in",
          duration: 1,
        })
        .to([glowRef.current, captionRef.current], { opacity: 0, duration: 0.5 }, "<");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(200,20,20,0.35), transparent)" }}
      />
      <div ref={swordRef} className="relative w-[min(1400px,96vw)] will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/sword/demon-slayer-sword-4k.webp"
          srcSet="/assets/sword/demon-slayer-sword-2k.webp 2048w, /assets/sword/demon-slayer-sword-4k.webp 4096w"
          sizes="(max-width: 1400px) 96vw, 1400px"
          alt="Asta's Demon-Slayer sword"
          width={4096}
          height={1024}
          className="h-auto w-full select-none"
          draggable={false}
        />
      </div>
      <p
        ref={captionRef}
        className="absolute bottom-[14vh] text-sm tracking-[0.3em] text-neutral-500 uppercase opacity-0"
      >
        Surpass your limits
      </p>
    </section>
  );
}
