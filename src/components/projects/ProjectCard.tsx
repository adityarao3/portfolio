"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { type Project } from "@/types/project";
import { Link } from "next-view-transitions";
import Image from "next/image";
import React from "react";

import Github from "../svgs/Github";
import Website from "../svgs/Website";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group h-full w-full overflow-hidden border-gray-100 p-0 shadow-none transition-all dark:border-gray-800">
      <CardHeader className="p-0">
        <div className="group relative aspect-video overflow-hidden">
          <Image
            className="h-full w-full object-cover"
            src={project.image}
            alt={project.title}
            width={1920}
            height={1080}
          />
        </div>
      </CardHeader>

      <CardContent className="px-6">
        <div className="space-y-4">
          {/* Project Header - Title and Icons */}
          <div className="flex items-center justify-between gap-4">
            <h3 className="group-hover:text-primary text-xl leading-tight font-semibold">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              {project.link && project.link !== "#" && (
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-colors"
                      href={project.link}
                      target="_blank"
                    >
                      <Website />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Website</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {project.github && (
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-colors"
                      href={project.github}
                      target="_blank"
                    >
                      <Github />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View GitHub</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-secondary line-clamp-3">{project.description}</p>

          {/* Technologies */}
          <div>
            <h4 className="text-secondary mb-2 text-sm font-medium">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <div className="size-6 transition-all duration-300 hover:scale-120 hover:cursor-pointer">
                      {technology.icon}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{technology.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-6 pt-0">
        <div
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
            project.isWorking
              ? "border-green-300 bg-green-500/10"
              : "border-red-300 bg-red-500/10"
          }`}
        >
          {project.isWorking ? (
            <>
              <div className="size-2 animate-pulse rounded-full bg-green-500" />
              All Systems Operational
            </>
          ) : (
            <>
              <div className="size-2 animate-pulse rounded-full bg-red-500" />
              Building
            </>
          )}
        </div>
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            className="text-secondary hover:text-primary flex items-center gap-2 text-sm underline-offset-4 transition-colors hover:underline"
          >
            Source Code
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
