import Link from "next/link";
import Container from "./Container";
import { footerConfig } from "@/config/Footer";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Twitter } from "lucide-react";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-12 mt-20">
      <Container>
        <div className="flex flex-col items-center gap-6">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerConfig.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {footerConfig.social.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap];
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              );
            })}
          </div>

          <Separator className="w-full max-w-xs" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {footerConfig.copyright.year} {footerConfig.copyright.author}.{" "}
            {footerConfig.copyright.text}
          </p>
        </div>
      </Container>
    </footer>
  );
}
