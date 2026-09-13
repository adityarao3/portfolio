"use client";

import { useEffect, useRef } from "react";

/**
 * A sprite that chases the cursor, replacing the oneko cat.
 *
 * Unlike oneko, which reads frames out of one 32x32 sheet, this swaps
 * between separate images: an idle pose when the cursor is still, and a
 * run cycle while chasing. The sprite flips horizontally to face the
 * direction of travel.
 */

const SPRITES = {
  idle: "/runner/idle.png",
  run: [
    "/runner/run-1.png",
    "/runner/run-2.png",
    "/runner/run-3.png",
    "/runner/run-4.png",
    "/runner/run-5.png",
    "/runner/run-6.png",
    "/runner/run-7.png",
  ],
  alert: "/runner/alert.png",
};

// oneko's motion: a fixed 10px step on a 100ms tick, ~100px/sec.
const STEP = 10;
const TICK_MS = 100;
// The 7-frame run cycle advances faster than the move tick, so a full
// stride reads as a run rather than a plod.
const FRAME_MS = 70;
const HEIGHT = 56; // rendered sprite height in px
const WIDTH = Math.round((HEIGHT * 280) / 200);
const STOP_DISTANCE = 48; // matches oneko

export default function RunnerPet() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Respect users who asked for less motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let frame = 0;
    let lastFrameAt = performance.now();
    let facingLeft = false;
    let raf: number | undefined;
    let idleSince = performance.now();

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      idleSince = performance.now();
    };

    const setSprite = (src: string) => {
      if (el.dataset.src !== src) {
        el.style.backgroundImage = `url(${src})`;
        el.dataset.src = src;
      }
    };

    let lastStepAt = performance.now();

    const tick = (now: number) => {
      const dx = targetX - x;
      const dy = targetY - y;
      const distance = Math.hypot(dx, dy);
      const chasing = distance > STOP_DISTANCE;

      // Position steps on oneko's 100ms cadence.
      if (chasing && now - lastStepAt >= TICK_MS) {
        lastStepAt = now;
        x += (dx / distance) * STEP;
        y += (dy / distance) * STEP;
        if (Math.abs(dx) > 2) facingLeft = dx < 0;
      }

      // The run cycle runs on its own, faster clock.
      if (chasing) {
        if (now - lastFrameAt >= FRAME_MS) {
          lastFrameAt = now;
          frame = (frame + 1) % SPRITES.run.length;
        }
        setSprite(SPRITES.run[frame]);
      } else {
        // Caught up: brief alert pose, then settle into idle. Reset the run
        // cycle so the next chase starts on the first frame.
        frame = 0;
        setSprite(now - idleSince > 1200 ? SPRITES.idle : SPRITES.alert);
      }

      // Sub-pixel positions keep the motion smooth; the sprite itself is
      // pixelated by imageRendering, so it stays crisp.
      el.style.transform = `translate3d(${(x - WIDTH / 2).toFixed(1)}px, ${(
        y - HEIGHT / 2
      ).toFixed(1)}px, 0) scaleX(${facingLeft ? -1 : 1})`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] bg-contain bg-center bg-no-repeat"
      style={{
        width: WIDTH,
        height: HEIGHT,
        imageRendering: "pixelated",
        willChange: "transform",
      }}
    />
  );
}
