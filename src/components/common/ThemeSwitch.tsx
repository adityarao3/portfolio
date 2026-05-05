"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";

import Moon from "../svgs/Moon";
import Sun from "../svgs/Sun";
import { Button } from "../ui/button";

export const useThemeToggle = ({
  variant = "circle",
  start = "center",
  blur = false,
}: {
  variant?: "circle" | "rectangle";
  start?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  blur?: boolean;
} = {}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const styleId = "theme-transition-styles";

  const updateStyles = useCallback((css: string) => {
    if (typeof window === "undefined") return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);

    const getClipPosition = (
      pos: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
    ) => {
      switch (pos) {
        case "top-left":
          return "0% 0%";
        case "top-right":
          return "100% 0%";
        case "bottom-left":
          return "0% 100%";
        case "bottom-right":
          return "100% 100%";
        default:
          return "50% 50%";
      }
    };

    const clipPosition = getClipPosition(start);
    const radius = start === "center" ? "100.0%" : "150.0%";

    const css = `
      ::view-transition-group(root) {
        animation-duration: ${start === "center" ? "0.7s" : "1s"};
        animation-timing-function: var(--expo-out);
      }
      
      ::view-transition-new(root) {
        animation-name: reveal-light${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark${blur ? "-blur" : ""} {
        from {
          clip-path: circle(0% at ${clipPosition});
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(${radius} at ${clipPosition});
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light${blur ? "-blur" : ""} {
        from {
          clip-path: circle(0% at ${clipPosition});
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(${radius} at ${clipPosition});
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
    `;

    updateStyles(css);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    if (
      !document.startViewTransition ||
      typeof document.startViewTransition !== "function"
    ) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [theme, setTheme, start, blur, updateStyles, isDark, setIsDark]);

  return { isDark, toggleTheme };
};

export const ThemeToggleButton = ({
  className = "",
  variant = "circle",
  start = "center",
  blur = false,
}: {
  className?: string;
  variant?: "circle" | "rectangle";
  start?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  blur?: boolean;
}) => {
  const { isDark, toggleTheme } = useThemeToggle({ variant, start, blur });

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "size-10 cursor-pointer p-0 transition-all duration-300 active:scale-95",
        className
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
};

export default ThemeToggleButton;
