import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/common/ThemeProviders";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

import ReactLenis from "lenis/react";
import { ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Aditya Kumar Rao — Full Stack Developer",
  description:
    "Full Stack Developer and CS student. Building modern web apps with React, Next.js, Node.js, and TypeScript.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className="font-hanken-grotesk antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <ReactLenis root>
              <Navbar />
              {children}

              <Footer />
            </ReactLenis>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
