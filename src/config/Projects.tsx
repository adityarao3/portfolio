import NextJs from "@/components/technologies/NextJs";
import PostgreSQL from "@/components/technologies/PostgreSQL";
import Prisma from "@/components/technologies/Prisma";
import ReactIcon from "@/components/technologies/ReactIcon";
import TypeScript from "@/components/technologies/TypeScript";
import Vercel from "@/components/technologies/Vercel";
import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Buildr.ai",
    description:
      "AI-powered website generator that enables full-site creation from natural-language prompts, with a scalable backend using Prisma ORM, PostgreSQL, and role-based access control.",
    image: "/project/buildr.png",
    link: "https://buildr-delta.vercel.app/",
    technologies: [
      { name: "Next.js", icon: <NextJs key="nextjs" /> },
      { name: "React", icon: <ReactIcon key="react" /> },
      { name: "TypeScript", icon: <TypeScript key="typescript" /> },
      { name: "Prisma", icon: <Prisma key="prisma" /> },
      { name: "PostgreSQL", icon: <PostgreSQL key="postgresql" /> },
      { name: "Vercel", icon: <Vercel key="vercel" /> },
    ],
    github: "https://github.com/adityarao3/FAQForge.git",
    live: "https://buildr-delta.vercel.app/",
    details: false,
    projectDetailsPageSlug: "#",
    isWorking: true,
  },
  {
    title: "Meet.ai — AI Meeting Assistant",
    description:
      "Full-stack AI platform with AI agents that join video calls via Stream SDK and OpenAI Realtime API for live interaction, GPT-4o powered transcription and summarization with real-time monitoring.",
    image: "/project/meetai.svg",
    link: "#",
    technologies: [
      { name: "Next.js", icon: <NextJs key="nextjs" /> },
      { name: "React", icon: <ReactIcon key="react" /> },
      { name: "TypeScript", icon: <TypeScript key="typescript" /> },
      { name: "PostgreSQL", icon: <PostgreSQL key="postgresql" /> },
      { name: "Prisma", icon: <Prisma key="prisma" /> },
    ],
    github: "https://github.com/berserk3142-max/Meet.ai",
    live: "#",
    details: false,
    projectDetailsPageSlug: "#",
    isWorking: true,
  },
  {
    title: "Drone Survey Management System",
    description:
      "Full-stack drone fleet management platform with real-time telemetry visualization, Google Maps API integration, mission state machine for flight planning, execution, and monitoring with SSR.",
    image: "/project/drone.svg",
    link: "https://drone-management-system-ten.vercel.app/",
    technologies: [
      { name: "Next.js", icon: <NextJs key="nextjs" /> },
      { name: "React", icon: <ReactIcon key="react" /> },
      { name: "Prisma", icon: <Prisma key="prisma" /> },
      { name: "PostgreSQL", icon: <PostgreSQL key="postgresql" /> },
      { name: "Vercel", icon: <Vercel key="vercel" /> },
    ],
    github: "https://github.com/adityarao3/DroneManagement-System",
    live: "https://drone-management-system-ten.vercel.app/",
    details: false,
    projectDetailsPageSlug: "#",
    isWorking: true,
  },
];
