import CSS from "@/components/technologies/CSS";
import ExpressJs from "@/components/technologies/ExpressJs";
import Html from "@/components/technologies/Html";
import JavaScript from "@/components/technologies/JavaScript";
import MongoDB from "@/components/technologies/MongoDB";
import NodeJs from "@/components/technologies/NodeJs";
import ReactIcon from "@/components/technologies/ReactIcon";

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
