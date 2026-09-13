import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/common/ThemeProviders";
import SideIndex from "@/components/common/SideIndex";
import Footer from "@/components/common/Footer";
import OnekoCat from "@/components/common/OnekoCat";
import ReactLenis from "lenis/react";
import { ViewTransitions } from "next-view-transitions";

const siteUrl = "https://aditya-rao.dev";
const siteTitle = "Aditya Kumar Rao — Full Stack Developer";
const siteDescription =
  "Full Stack Developer and CS student. Building modern web apps with React, Next.js, Node.js, and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Aditya Kumar Rao",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
        <body className="font-hanken-grotesk dotted-bg antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <ReactLenis root>
              {/* Blueprint rules: dotted verticals flanking the content
                  column, with solid nodes where they meet the banner edge. */}
              <div
                aria-hidden="true"
                className="page-rule left-1/2 hidden -translate-x-[384px] md:block"
              />
              <div
                aria-hidden="true"
                className="page-rule left-1/2 hidden translate-x-[384px] md:block"
              />
              <div
                aria-hidden="true"
                className="rule-node left-1/2 hidden -translate-x-[385px] md:block"
                style={{ top: "calc(22vh - 1px)" }}
              />
              <div
                aria-hidden="true"
                className="rule-node left-1/2 hidden translate-x-[383px] md:block"
                style={{ top: "calc(22vh - 1px)" }}
              />

              <SideIndex />
              {children}

              <Footer />
            </ReactLenis>
          </ThemeProvider>
          <OnekoCat />
        </body>
      </html>
    </ViewTransitions>
  );
}
