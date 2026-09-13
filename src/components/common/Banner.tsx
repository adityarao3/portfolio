import Image from "next/image";

import BannerParticles from "./BannerParticles";

export default function Banner() {
  return (
    // Sits flush to the top and slightly wider than the text column, so the
    // whole composition stays visible instead of cropping to the viewport.
    <div className="relative mb-10 h-[22vh] max-h-[240px] min-h-[150px] w-full overflow-hidden">
      {/* Day / night art swap, following the active theme. */}
      <Image
        src="/assets/banner.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover object-[30%_center] dark:hidden"
      />
      <Image
        src="/assets/banner-dark.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 768px"
        className="hidden object-cover object-[30%_center] dark:block"
      />

      <BannerParticles />

      {/* Dissolve the bottom edge into the page instead of cutting it hard. */}
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-24 bg-gradient-to-t to-transparent" />
    </div>
  );
}
