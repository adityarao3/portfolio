import { heroConfig, skillComponents, socialLinks } from "@/config/Hero";
import { parseTemplate } from "@/lib/hero";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";
import React from "react";

import Container from "../common/Container";
import Skill from "../common/Skill";
import { ThemeToggleButton } from "../common/ThemeSwitch";
import CV from "../svgs/CV";
import Chat from "../svgs/Chat";
import Mail from "../svgs/Mail";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { about, mySkills } from "@/config/About";

const buttonIcons = {
  CV: CV,
  Chat: Chat,
  Mail: Mail,
};

export default function Hero() {
  const { name, title, avatar, skills, description, buttons } = heroConfig;

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === "skill" && "skill" in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === "bold" && "text" in part) {
        return (
          <b key={part.key} className="text-primary whitespace-pre-wrap">
            {part.text}
          </b>
        );
      } else if (part.type === "text" && "text" in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <Container className="row-rule row-rule-wide relative mx-auto px-8 pt-6 pb-8">
      {/* Avatar row, ruled and noded like the banner cell above it. */}
      <div className="row-rule row-rule-wide relative flex items-start justify-between pb-5">
        {/* Blueprint frame: outer rule-coloured border, inner rounded square.
            A square avoids the second crop a circle imposes, so the whole
            head stays visible. */}
        <div className="relative shrink-0 rounded-[8px] border-[1.5px] border-black/30 p-[3px] dark:border-white/[0.15]">
          <div className="relative h-16 w-16 overflow-hidden rounded-[5px] bg-zinc-100 sm:h-20 sm:w-20 dark:bg-zinc-900">
            <Image
              src={avatar}
              alt="hero"
              width={240}
              height={240}
              quality={90}
              priority
              sizes="(min-width: 640px) 80px, 64px"
              className="h-full w-full object-cover object-center opacity-90 grayscale contrast-100 mix-blend-multiply dark:mix-blend-normal"
            />
          </div>
        </div>
        <ThemeToggleButton variant="circle" start="top-right" blur />
      </div>

      {/* Text Area */}
      <div className="mt-5 flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Hi, I&apos;m {name} — <span className="text-secondary">{title}</span>
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[15px] whitespace-pre-wrap text-neutral-500">
          {renderDescription()}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        {buttons.map((button, index) => {
          const IconComponent =
            buttonIcons[button.icon as keyof typeof buttonIcons];
          return (
            <Button
              key={index}
              variant={button.variant as "outline" | "default"}
              className={cn(
                button.variant === "outline" && "inset-shadow-indigo-500",
                button.variant === "default" && "inset-shadow-indigo-500",
              )}
            >
              {IconComponent && <IconComponent />}
              {/* Files and external URLs need a plain anchor; the router
                  Link is for in-app routes. */}
              {button.href.startsWith("/") && !button.href.includes(".") ? (
                <Link href={button.href}>{button.text}</Link>
              ) : (
                <a
                  href={button.href}
                  {...(button.href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {button.text}
                </a>
              )}
            </Button>
          );
        })}
      </div>

      {/* Skills Section */}
      <div className="mt-6 border border-gray-200 dark:border-gray-800 rounded-lg p-3">
        <p className="text-secondary text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Skills</p>
        <div className="flex flex-wrap gap-4">
          {mySkills.map((skill) => (
            <div key={skill.key} className="flex flex-col items-center gap-1.5">
              <div className="size-6 hover:cursor-pointer p-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors box-content">
                {skill}
              </div>
              <span className="text-muted-foreground text-[10px] font-semibold">
                {skill.key}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-3 border border-gray-200 dark:border-gray-800 rounded-lg p-3">
        <p className="text-secondary text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Connect</p>
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((link) => (
            <Tooltip key={link.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  key={link.name}
                  className="text-secondary flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="size-6">{link.icon}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </Container>
  );
}
