import { heroConfig, skillComponents, socialLinks } from "@/config/Hero";
import { parseTemplate } from "@/lib/hero";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";
import React from "react";

import Container from "../common/Container";
import Skill from "../common/Skill";
import CV from "../svgs/CV";
import Chat from "../svgs/Chat";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { about, mySkills } from "@/config/About";

const buttonIcons = {
  CV: CV,
  Chat: Chat,
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
    <Container className="row-rule row-rule-wide mx-auto px-8 pt-6 pb-8">
      {/* Image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-blue-300 dark:bg-yellow-300">
        <Image
          src={avatar}
          alt="hero"
          fill
          sizes="80px"
          className="origin-center scale-[1.08] object-cover object-center"
        />
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
              <Link href={button.href}>{button.text}</Link>
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
