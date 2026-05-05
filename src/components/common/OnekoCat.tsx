"use client";

import { catConfig } from "@/config/Cat";
import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    onekoSwitchPet?: (spriteSrc: string, filter: string) => void;
  }
}

function AutoPetCycler() {
  const indexRef = useRef(0);

  useEffect(() => {
    // Start cycling after a short delay to let oneko.js initialize
    const startDelay = setTimeout(() => {
      // Pick a random starting index
      indexRef.current = Math.floor(Math.random() * catConfig.sprites.length);

      const interval = setInterval(() => {
        indexRef.current =
          (indexRef.current + 1) % catConfig.sprites.length;
        const pet = catConfig.sprites[indexRef.current];

        if (window.onekoSwitchPet) {
          window.onekoSwitchPet(pet.src, pet.filter);
        }
      }, catConfig.cycleInterval);

      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(startDelay);
  }, []);

  return null;
}

export default function OnekoCat() {
  if (!catConfig.enabled) {
    return null;
  }

  return (
    <>
      <Script src="./oneko/oneko.js" data-cat="./oneko/oneko.gif" />
      <AutoPetCycler />
    </>
  );
}
