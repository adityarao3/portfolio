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
    title: "CueHire — AI Voice Interview Platform",
    description:
      "AI voice screening platform conducting real-time candidate interviews via VAPI WebRTC and Deepgram STT, with a GPT-4o assessment pipeline producing type-safe scoring across 5 dimensions and an admin dashboard for bulk screening and pipeline tracking.",
    image: "/project/cuehire.webp",
    link: "https://cue-hire.vercel.app",
    technologies: [
      { name: "Next.js", icon: <NextJs key="nextjs" /> },
      { name: "React", icon: <ReactIcon key="react" /> },
      { name: "TypeScript", icon: <TypeScript key="typescript" /> },
      { name: "Vercel", icon: <Vercel key="vercel" /> },
    ],
    github: "https://github.com/adityarao3/CueHire",
    live: "https://cue-hire.vercel.app",
    details: false,
    projectDetailsPageSlug: "#",
    isWorking: true,
  },
  {
    title: "Drone Survey Management System",
    description:
      "Full-stack drone fleet management platform with real-time telemetry visualization, Google Maps API integration, mission state machine for flight planning, execution, and monitoring with SSR.",
    image: "/project/drone.webp",
    link: "https://drone-survey-management-system-pink.vercel.app/",
    technologies: [
      { name: "Next.js", icon: <NextJs key="nextjs" /> },
      { name: "React", icon: <ReactIcon key="react" /> },
      { name: "Prisma", icon: <Prisma key="prisma" /> },
      { name: "PostgreSQL", icon: <PostgreSQL key="postgresql" /> },
      { name: "Vercel", icon: <Vercel key="vercel" /> },
    ],
    github: "https://github.com/adityarao3/DroneManagement-System",
    live: "https://drone-survey-management-system-pink.vercel.app/",
    details: false,
    projectDetailsPageSlug: "#",
    isWorking: true,
  },
  {
    title: "Seedhe Maut",
    description:
      "A music streaming site for the hip-hop duo Seedhe Maut, featuring a YouTube-powered player with animated CD artwork, scrubbing controls, a live listener count and a looping video backdrop.",
    image: "/project/seedhemaut.webp",
    link: "https://seedhe-maut-mu.vercel.app/",
    technologies: [
      { name: "React", icon: <ReactIcon key="react" /> },
      { name: "TypeScript", icon: <TypeScript key="typescript" /> },
      { name: "Vercel", icon: <Vercel key="vercel" /> },
    ],
    github: "https://github.com/ankurkharb/SeedheMaut",
    live: "https://seedhe-maut-mu.vercel.app/",
    details: false,
    projectDetailsPageSlug: "#",
    isWorking: true,
  },
];
