import CSS from "@/components/technologies/CSS";
import ExpressJs from "@/components/technologies/ExpressJs";
import Html from "@/components/technologies/Html";
import JavaScript from "@/components/technologies/JavaScript";
import MongoDB from "@/components/technologies/MongoDB";
import NodeJs from "@/components/technologies/NodeJs";
import ReactIcon from "@/components/technologies/ReactIcon";
import NestJs from "@/components/technologies/NestJs";
import TypeScript from "@/components/technologies/TypeScript";
import Redis from "@/components/technologies/Redis";
import BullMQ from "@/components/technologies/BullMQ";
import AWS from "@/components/technologies/AWS";
import Python from "@/components/technologies/Python";

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    company: "The Ninja Studio",
    position: "Backend Developer Intern",
    location: "Remote",
    image: "/company/ninjastudio.png",
    description: [
      "Migrated *7 AWS Lambda microservices* into a unified *NestJS monolith*, reducing deployment pipelines by *60%* and eliminating cold-start latency.",
      "Built an end-to-end auth flow — OTP signup, email verification, company auto-provisioning and role assignment — replacing *3 Cognito triggers* and cutting onboarding time by *40%*.",
      "Developed *BullMQ*-powered shipment tracking polling *4 carrier APIs* in real time, achieving *100%* in-transit coverage and improving status accuracy by *35%*.",
      "Wrote *Python* scripts for data migration, log analysis and bulk MongoDB operations, reducing manual ops effort by *70%*.",
      "Resolved *40+ production bugs* across billing, notifications and quoting, shipping *46 PRs* and improving platform stability by *20%*.",
    ],
    startDate: "May 2026",
    endDate: "Present",
    website: "https://www.theninjastudio.com/",
    technologies: [
      { name: "NestJS", href: "https://nestjs.com", icon: <NestJs /> },
      { name: "TypeScript", href: "https://www.typescriptlang.org", icon: <TypeScript /> },
      { name: "Node.js", href: "https://nodejs.org", icon: <NodeJs /> },
      { name: "MongoDB", href: "https://www.mongodb.com", icon: <MongoDB /> },
      { name: "Redis", href: "https://redis.io", icon: <Redis /> },
      { name: "BullMQ", href: "https://bullmq.io", icon: <BullMQ /> },
      { name: "AWS", href: "https://aws.amazon.com", icon: <AWS /> },
      { name: "Python", href: "https://www.python.org", icon: <Python /> },
    ],
  },
  {
    isCurrent: false,
    company: "TCIL",
    position: "Intern — Full Stack Developer",
    location: "Chandigarh, Punjab (On-Site)",
    image: "/company/tcil.svg",
    description: [
      "Built and optimized full-stack web applications using the *MERN stack* (MongoDB, Express.js, React.js, Node.js), improving overall application performance by *25%*.",
      "Designed and implemented *RESTful APIs* with Node.js and Express.js, reducing API response time by *30%* through efficient routing and optimized MongoDB queries.",
      "Refactored React.js components and improved state management, enhancing UI responsiveness and code reusability by *20%*.",
      "Collaborated with cross-functional teams in an *Agile environment*, resolving bugs and feature requests, leading to a *15%* reduction in reported issues.",
    ],
    startDate: "June 2024",
    endDate: "November 2024",
    technologies: [
      {
        name: "React",
        href: "https://react.dev/",
        icon: <ReactIcon />,
      },
      {
        name: "Node.js",
        href: "https://nodejs.org/",
        icon: <NodeJs />,
      },
      {
        name: "Express",
        href: "https://expressjs.com/",
        icon: <ExpressJs />,
      },
      {
        name: "MongoDB",
        href: "https://mongodb.com/",
        icon: <MongoDB />,
      },
      {
        name: "JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        icon: <JavaScript />,
      },
      {
        name: "HTML",
        href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        icon: <Html />,
      },
      {
        name: "CSS",
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        icon: <CSS />,
      },
    ],
    website: "#",
    linkedin: "https://www.linkedin.com/in/adityarao2003/",
  },
];
