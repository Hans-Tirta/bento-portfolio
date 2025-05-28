import {
  SiHtml5,
  SiCss3,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiDotnet,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiFigma,
  SiDocker,
  SiPostman,
  SiVite,
  SiPrisma,
  SiJsonwebtokens,
  SiVercel,
} from "react-icons/si";

import { BiLogoVisualStudio } from "react-icons/bi";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      {
        name: "HTML",
        icon: SiHtml5,
        description: "Markup language for web pages",
      },
      {
        name: "CSS",
        icon: SiCss3,
        description: "Style sheet language for web design",
      },
      {
        name: "React",
        icon: SiReact,
        description: "Component-based UI library",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        description: "Utility-first CSS framework",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        description: "Dynamic web scripting",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        description: "Typed superset of JavaScript",
      },
      {
        name: "Vite",
        icon: SiVite,
        description: "Fast frontend build tool",
      },
      {
        name: "Framer Motion",
        icon: SiFramer,
        description: "React animation library",
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        description: "JavaScript runtime backend",
      },
      {
        name: "Express",
        icon: SiExpress,
        description: "Minimal web framework",
      },
      {
        name: ".NET",
        icon: SiDotnet,
        description: "Cross-platform backend framework",
      },
      {
        name: "JWT (jsonwebtoken)",
        icon: SiJsonwebtokens,
        description: "Token-based authentication",
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        description: "Advanced SQL database",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        description: "NoSQL document database",
      },
      {
        name: "Prisma",
        icon: SiPrisma,
        description: "Type-safe ORM for Node.js",
      },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Figma", icon: SiFigma, description: "UI/UX design tool" },
      { name: "Git", icon: SiGit, description: "Version control system" },
      {
        name: "Visual Studio Code",
        icon: BiLogoVisualStudio,
        description: "Code editor with extensions",
      },
      { name: "Postman", icon: SiPostman, description: "API testing tool" },
      {
        name: "Docker",
        icon: SiDocker,
        description: "Containerization platform",
      },
      {
        name: "Vercel",
        icon: SiVercel,
        description: "Frontend deployment platform",
      },
    ],
  },
];

export default skillCategories;
