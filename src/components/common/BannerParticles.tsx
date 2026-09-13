"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface BannerParticlesProps {
  /** Number of petals on screen at once. */
  count?: number;
  /** Petal size range in px. */
  minSize?: number;
  maxSize?: number;
  /** Horizontal drift speed range in px/frame. */
  minWind?: number;
  maxWind?: number;
  /** Petal fill and vein/outline colors. */
  fill?: string;
  stroke?: string;
  /** Petal colors used when the dark theme is active. */
  darkFill?: string;
  darkStroke?: string;
  /** Overall petal opacity. */
  opacity?: number;
}

/** Rotate a unit vector through X, Y then Z so petals tumble in 3D. */
function rotate(
  x: number,
  y: number,
  z: number,
  ax: number,
  ay: number,
  az: number,
) {
  const cz = Math.cos(az);
  const sz = Math.sin(az);
  const x1 = x * cz - y * sz;
  const y1 = x * sz + y * cz;

  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  const x2 = x1 * cy + z * sy;
  const z1 = -x1 * sy + z * cy;

  const cx = Math.cos(ax);
  const sx = Math.sin(ax);

  return { x: x2, y: y1 * cx - z1 * sx, z: y1 * sx + z1 * cx };
}

/** Draw the petal once into an offscreen canvas so each frame is just drawImage. */
function createPetalSprite(fill: string, stroke: string) {
  if (typeof document === "undefined") return null;

  const sprite = document.createElement("canvas");
  sprite.width = 128;
  sprite.height = 128;

  const ctx = sprite.getContext("2d");
  if (!ctx) return null;

  ctx.scale(2, 2);
  ctx.beginPath();
  ctx.moveTo(32, 5);
  ctx.quadraticCurveTo(5, 32, 32, 59);
  ctx.quadraticCurveTo(59, 32, 32, 5);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.stroke();

  // center vein
  ctx.beginPath();
  ctx.moveTo(32, 5);
  ctx.lineTo(32, 59);
  ctx.stroke();

  const img = new Image();
  img.src = sprite.toDataURL();
  return img;
}

export default function BannerParticles({
  count = 40,
  minSize = 6,
  maxSize = 18,
  minWind = 0.5,
  maxWind = 3,
  fill = "#bfdbfe",
  stroke = "#60a5fa",
  darkFill = "#dbeafe",
  darkStroke = "#93c5fd",
  opacity = 0.45,
}: BannerParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme === "dark";
    const sprite = createPetalSprite(
      isDark ? darkFill : fill,
      isDark ? darkStroke : stroke,
    );
    if (!sprite) return;

    // Respect users who asked for less motion.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let stopped = false;
    let frame: number | undefined;

    class Petal {
      x = 0;
      y = 0;
      size = 0;
      windFactor = 0;
      vx = 0;
      vy = 0;
      waveOffset = 0;
      angleX = 0;
      angleY = 0;
      angleZ = 0;
      spinX = 0;
      spinY = 0;

      constructor(onScreen = false) {
        this.reset(onScreen);
      }

      reset(onScreen = false) {
        this.size = minSize + Math.random() * (maxSize - minSize);

        // Spread vertically across the banner, biased toward the middle.
        const center = height * 0.2;
        const spread = height * 0.9;
        this.y = center - spread / 2 + Math.random() * spread;

        // Start off the left edge unless seeding the first frame.
        this.x = onScreen
          ? Math.random() * width
          : -this.size - Math.random() * width;

        // Smaller petals catch more wind.
        const sizeRatio = (this.size - minSize) / (maxSize - minSize || 1);
        this.windFactor = Math.max(
          0.1,
          Math.min(1, 1 - (0.5 * sizeRatio + 0.5 * Math.random())),
        );

        this.vx = 0;
        this.vy = 0;
        this.waveOffset = Math.random() * Math.PI * 2;
        this.angleZ = Math.random() * Math.PI * 2;
        this.angleX = 0;
        this.angleY = 0;
        this.spinX = (Math.random() - 0.5) * 0.1;
        this.spinY = (Math.random() - 0.5) * 0.1;
      }

      update() {
        // Ease horizontal speed toward this petal's target wind.
        const targetWind = minWind + (maxWind - minWind) * this.windFactor;
        this.vx += (targetWind - this.vx) * 0.1;
        this.x += this.vx;

        // Light gravity, plus a sine sway so they bob as they cross.
        this.vy += 0.015 * (1.5 - this.windFactor);
        this.vy += Math.sin(this.x * 0.01 + this.waveOffset) * 0.025;
        this.vy *= 0.98;
        this.y += this.vy;

        this.angleZ += this.vx * 0.002;
        this.angleX += this.spinX * 0.3;
        this.angleY += this.spinY * 0.3;

        if (this.x > width + 200 || this.y > height + 200 || this.y < -200) {
          this.reset(false);
        }
      }

      draw() {
        if (!ctx || !sprite) return;

        const u = rotate(1, 0, 0, this.angleX, this.angleY, this.angleZ);
        const v = rotate(0, 1, 0, this.angleX, this.angleY, this.angleZ);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.transform(u.x, u.y, v.x, v.y, 0, 0);
        ctx.globalAlpha = opacity;
        ctx.drawImage(
          sprite,
          -this.size / 2,
          -this.size / 2,
          this.size,
          this.size,
        );
        ctx.restore();
      }
    }

    let petals: Petal[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    const loop = () => {
      if (stopped) return;
      ctx.clearRect(0, 0, width, height);
      for (const petal of petals) {
        petal.update();
        petal.draw();
      }
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (stopped) return;
      resize();
      petals = Array.from({ length: count }, () => new Petal(true));

      if (reduceMotion) {
        // Draw a single static frame instead of animating.
        for (const petal of petals) petal.draw();
        return;
      }
      loop();
    };

    // Wait for the sprite so the first frame isn't blank.
    if (sprite.complete) start();
    else sprite.onload = start;

    window.addEventListener("resize", resize);

    return () => {
      stopped = true;
      window.removeEventListener("resize", resize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [
    count,
    minSize,
    maxSize,
    minWind,
    maxWind,
    fill,
    stroke,
    darkFill,
    darkStroke,
    opacity,
    resolvedTheme,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
    />
  );
}
