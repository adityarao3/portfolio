"use client";

import { useEffect, useState } from "react";
import Container from "./Container";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Track unique visitors using sessionStorage + localStorage
    const STORAGE_KEY = "adityarao-visitor-count";
    const SESSION_KEY = "adityarao-session-counted";

    try {
      // Check if this session was already counted
      const alreadyCounted = sessionStorage.getItem(SESSION_KEY);
      const storedCount = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

      if (!alreadyCounted) {
        // New session — increment count
        const newCount = storedCount + 1;
        localStorage.setItem(STORAGE_KEY, String(newCount));
        sessionStorage.setItem(SESSION_KEY, "true");
        setVisitorCount(newCount);
      } else {
        setVisitorCount(storedCount);
      }
    } catch {
      setVisitorCount(null);
    }
  }, []);

  return (
    <Container className="py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Visitor Count */}
        {visitorCount !== null && visitorCount > 0 && (
          <div className="rounded-lg border border-gray-200 px-6 py-3 dark:border-gray-800">
            <p className="text-center">
              <span className="text-foreground text-xl font-bold tabular-nums">
                {visitorCount.toLocaleString()}
              </span>{" "}
              <span className="text-muted-foreground text-sm">visitors</span>
            </p>
          </div>
        )}

        {/* Copyright */}
        <p className="text-secondary text-center text-sm">
          Built by <b>Aditya Rao</b> <br /> &copy;{" "}
          {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </Container>
  );
}
