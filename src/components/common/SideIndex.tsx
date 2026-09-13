"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggleButton } from "./ThemeSwitch";

const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "achievements", label: "Achievements" },
];

const pages = [
  { href: "/work-experience", label: "Work" },
  { href: "/projects", label: "All Projects" },
];

export default function SideIndex() {
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Highlight the section nearest the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <nav
      aria-label="Page index"
      className={`pointer-events-auto fixed left-[calc(50%+400px)] z-20 hidden w-[150px] flex-col gap-3 lg:flex ${
        isHome ? "top-[22vh]" : "top-16"
      }`}
    >
      <h3 className="mb-1 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-600">
        Index
      </h3>

      {/* Section anchors only exist on the landing page. */}
      {isHome &&
        sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`flex items-center gap-3 text-[12px] font-medium tracking-[0.05em] transition-all duration-300 ease-out ${
            active === s.id
              ? "text-zinc-900 dark:text-zinc-100"
              : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
          }`}
        >
          <span
            className={`h-px transition-all duration-300 ease-out ${
              active === s.id ? "w-4 bg-current" : "w-0 bg-transparent"
            }`}
          />
          {s.label}
        </a>
      ))}

      <div
        className={`flex flex-col gap-3 ${
          isHome
            ? "mt-4 border-t border-black/10 pt-4 dark:border-white/10"
            : ""
        }`}
      >
        {!isHome && (
          <Link
            href="/"
            className="text-[12px] font-medium tracking-[0.05em] text-zinc-400 transition-colors duration-300 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
          >
            Home
          </Link>
        )}
        {pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="text-[12px] font-medium tracking-[0.05em] text-zinc-400 transition-colors duration-300 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
          >
            {p.label}
          </Link>
        ))}
      </div>

      <div className="mt-3">
        <ThemeToggleButton variant="circle" start="top-right" blur />
      </div>
    </nav>
  );
}
