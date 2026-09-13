import Image from "next/image";

import BannerParticles from "./BannerParticles";

export default function Banner() {
  return (
    // Sits flush to the top and slightly wider than the text column, so the
    // whole composition stays visible instead of cropping to the viewport.
    // Negative insets cancel the Container's padding so the art meets the
    // column edges and sits flush against the top of the page.
    // bg-background + z-10 keeps the page rules from showing through the art;
    // they should only be visible below the banner.
    <div className="bg-background relative z-10 -mx-4 mb-10 h-[32vh] max-h-[340px] min-h-[200px] overflow-hidden sm:-mx-6 lg:-mx-8">
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

      {/* Dissolve the edges into the page instead of cutting them hard.
          Dark mode fades lighter, since the night art needs less masking. */}
      <div className="from-background/90 dark:from-background/50 pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-10 bg-gradient-to-t to-transparent dark:to-transparent" />
      <div className="from-background/90 dark:from-background/40 pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-12 bg-gradient-to-r to-transparent dark:to-transparent" />
      <div className="from-background/90 dark:from-background/40 pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-12 bg-gradient-to-l to-transparent dark:to-transparent" />
    </div>
  );
}
