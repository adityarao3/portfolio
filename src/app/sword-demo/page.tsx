import type { Metadata } from "next";
import SwordScroll from "@/components/common/SwordScroll";

export const metadata: Metadata = {
  title: "Sword demo",
  robots: { index: false },
};

export default function SwordDemo() {
  return (
    <main className="min-h-screen">
      <div className="flex h-[70vh] items-center justify-center text-sm text-neutral-500">
        Scroll down
      </div>
      <SwordScroll />
      <div className="h-[80vh]" />
    </main>
  );
}
