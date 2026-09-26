"use client";

import { Link } from "next-view-transitions";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const sections = [
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
      className={`pointer-events-auto z-20 gap-3 max-[1179px]:sticky max-[1179px]:top-0 max-[1179px]:flex max-[1179px]:overflow-x-auto max-[1179px]:border-b max-[1179px]:border-black/10 max-[1179px]:bg-[var(--background)]/90 max-[1179px]:px-4 max-[1179px]:py-3 max-[1179px]:backdrop-blur-sm min-[1180px]:fixed min-[1180px]:left-[calc(50%+400px)] min-[1180px]:flex min-[1180px]:w-[150px] min-[1180px]:flex-col min-[1180px]:border-0 min-[1180px]:bg-transparent min-[1180px]:px-0 min-[1180px]:py-0 dark:max-[1179px]:border-white/10 ${
        isHome ? "min-[1180px]:top-[22vh]" : "min-[1180px]:top-16"
      }`}
    >
      <h3 className="mb-1 hidden text-[10px] font-bold tracking-[0.2em] text-red-600 uppercase min-[1180px]:block dark:text-red-500">
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
            className={`hidden h-px transition-all duration-300 ease-out min-[1180px]:block ${
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
