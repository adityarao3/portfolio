"use client";

import { Link } from "next-view-transitions";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "achievements", label: "Achievements" },
];


export default function SideIndex() {
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lenis = useLenis();

  // Lenis owns the scroll, so a native anchor jump fights it. Hand the
  // target to Lenis instead and let it animate there.
  const scrollTo = (event: React.MouseEvent, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    setActive(id);
    if (lenis) lenis.scrollTo(target, { offset: -90, duration: 1 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

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
      className={`pointer-events-auto z-20 gap-3 max-lg:sticky max-lg:top-0 max-lg:flex max-lg:overflow-x-auto max-lg:border-b max-lg:border-black/10 max-lg:bg-[var(--background)]/90 max-lg:px-4 max-lg:py-3 max-lg:backdrop-blur-sm lg:fixed lg:left-[calc(50%+400px)] lg:flex lg:w-[150px] lg:flex-col lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 dark:max-lg:border-white/10 ${
        isHome ? "lg:top-[22vh]" : "lg:top-16"
      }`}
    >
      <h3 className="mb-1 hidden text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase lg:block dark:text-zinc-600">
        Index
      </h3>

      {/* Section anchors only exist on the landing page. */}
      {isHome &&
        sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={(event) => scrollTo(event, s.id)}
          className={`flex shrink-0 items-center gap-3 text-[12px] font-medium tracking-[0.05em] whitespace-nowrap transition-all duration-300 ease-out ${
            active === s.id
              ? "text-zinc-900 dark:text-zinc-100"
              : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
          }`}
        >
          <span
            className={`hidden h-px transition-all duration-300 ease-out lg:block ${
              active === s.id ? "w-4 bg-current" : "w-0 bg-transparent"
            }`}
          />
          {s.label}
        </a>
      ))}

      {/* Off the landing page there are no section anchors, so offer a way back. */}
      {!isHome && (
        <Link
          href="/"
          className="text-[12px] font-medium tracking-[0.05em] text-zinc-400 transition-colors duration-300 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
        >
          Home
        </Link>
      )}

    </nav>
  );
}
