/*
 * CUSTOMIZATION EXAMPLE
 *
 * Want to customize this portfolio for yourself? Here's how easy it is:
 *
 * 1. Update your personal info:
 *    name: "Your Name"
 *    title: "Your Professional Title"
 *    avatar: "/path/to/your/image.jpg"
 *
 * 2. Add your skills:
 *    skills: [
 *      { name: "Python", href: "https://python.org", component: "Python" }, // Note: You'd need to create Python component
 *      { name: "React", href: "https://react.dev", component: "ReactIcon" },
 *      { name: "Node.js", href: "https://nodejs.org", component: "NodeJs" },
 *    ]
 *
 * 3. Write your description using the template:
 *    template: "I'm a **passionate developer** who loves building apps with {skills:0} and {skills:1}. I specialize in **web development** and enjoy working with {skills:2}."
 *
 * 4. Update your social links:
 *    Just change the href values to your own social media profiles
 *
 * That's it! Your portfolio will automatically update with your information.
 */
import Github from "@/components/svgs/Github";
import LinkedIn from "@/components/svgs/LinkedIn";
import Mail from "@/components/svgs/Mail";
import X from "@/components/svgs/X";
import JavaScript from "@/components/technologies/JavaScript";
import MongoDB from "@/components/technologies/MongoDB";
import NextJs from "@/components/technologies/NextJs";
import NodeJs from "@/components/technologies/NodeJs";
import PostgreSQL from "@/components/technologies/PostgreSQL";
import Prisma from "@/components/technologies/Prisma";
import ReactIcon from "@/components/technologies/ReactIcon";
// Technology Components
import TypeScript from "@/components/technologies/TypeScript";

// Component mapping for skills
export const skillComponents = {
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  NextJs: NextJs,
  PostgreSQL: PostgreSQL,
  NodeJs: NodeJs,
  MongoDB: MongoDB,
  Prisma: Prisma,
  JavaScript: JavaScript,
};

export const heroConfig = {
  // Personal Information
  name: "Aditya Rao",
  title: "A Full Stack web developer.",
  avatar: "/assets/avatar-bw.png",

  // Skills Configuration
  skills: [
    {
      name: "Typescript",
     
      component: "TypeScript",
    },
    {
      name: "React",
    
      component: "ReactIcon",
    },
    {
      name: "Next.js",
      
      component: "NextJs",
    },
    {
      name: "Node.js",

      component: "NodeJs",
    },
    {
      name: "PostgreSQL",
     
      component: "PostgreSQL",
    },
  ],

  // Description Configuration
  description: {
    template:
      "I build systems with {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4} — mostly backend, and I learn by shipping them. Curious about <b>distributed systems</b> and <b>AI tooling</b>, and happiest debugging something I have not seen before.",
  },

  // Buttons Configuration
  buttons: [
    {
      variant: "outline",
      text: "Resume / CV",
      href: "/Aditya_Kumar_Rao_Resume.pdf",
      icon: "CV",
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: "X",
    href: "https://x.com/realraoaditya",
    icon: <X />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/adityarao2003/",
    icon: <LinkedIn />,
  },
  {
    name: "Github",
    href: "https://github.com/adityarao3",
    icon: <Github />,
  },
  {
    name: "Get in touch",
    href: "mailto:adityarao9541@gmail.com",
    icon: <Mail />,
  },
];
