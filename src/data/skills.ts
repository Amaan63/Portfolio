import React from "react";
import {
  FaCode,
  FaReact,
  FaDatabase,
  FaTools,
} from "react-icons/fa";

export type SkillCategory =
  | "Languages"
  | "Frameworks & Libraries"
  | "Databases"
  | "Developer Tools";

export interface Skill {
  logo: string;
  title: string;
  category: SkillCategory;
  value: number;
}

export interface SkillCategoryGroup {
  name: SkillCategory;
  skills: Skill[];
  color: string;
  icon: React.ComponentType;
}

export const skills: Skill[] = [
  // Languages
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    title: "Java",
    category: "Languages",
    value: 80
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    title: "Python",
    category: "Languages",
    value: 50
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    title: "C#",
    category: "Languages",
    value: 70
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    title: "HTML",
    category: "Languages",
    value: 85
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    title: "CSS",
    category: "Languages",
    value: 85
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    title: "JavaScript",
    category: "Languages",
    value: 75
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    title: "TypeScript",
    category: "Languages",
    value: 45
  },

  // Frameworks & Libraries
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    title: "React",
    category: "Frameworks & Libraries",
    value: 65
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    title: "Spring Boot",
    category: "Frameworks & Libraries",
    value: 70
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
    title: ".NET",
    category: "Frameworks & Libraries",
    value: 80
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg",
    title: "Hibernate",
    category: "Frameworks & Libraries",
    value: 75
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    title: "Pandas",
    category: "Frameworks & Libraries",
    value: 65
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png",
    title: "Tailwind CSS",
    category: "Frameworks & Libraries",
    value: 75
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    title: "Node.js",
    category: "Frameworks & Libraries",
    value: 70
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg",
    title: "Express",
    category: "Frameworks & Libraries",
    value: 70
  },
  // Databases
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    title: "MySQL",
    category: "Databases",
    value: 75
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    title: "PostgreSQL",
    category: "Databases",
    value: 60
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    title: "SQL Server",
    category: "Databases",
    value: 80
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    title: "MongoDB",
    category: "Databases",
    value: 75
  },

  // Developer Tools
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    title: "Git",
    category: "Developer Tools",
    value: 85
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    title: "GitHub",
    category: "Developer Tools",
    value: 88
  },
  {
    logo: "https://www.svgrepo.com/show/354202/postman-icon.svg",
    title: "Postman",
    category: "Developer Tools",
    value: 70
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    title: "VS Code",
    category: "Developer Tools",
    value: 90
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg",
    title: "Visual Studio",
    category: "Developer Tools",
    value: 85
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    title: "Docker",
    category: "Developer Tools",
    value: 40
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTVC1k-iS7Bx1ySL43nPK8EEjn-Ct3kHqj3Q&s",
    title: "n8n",
    category: "Developer Tools",
    value: 60
  },
];

export const skillCategories: SkillCategoryGroup[] = [
  {
    name: "Languages",
    skills: skills.filter((s) => s.category === "Languages"),
    color: "from-blue-400 to-cyan-400",
    icon: FaCode,
  },
  {
    name: "Frameworks & Libraries",
    skills: skills.filter((s) => s.category === "Frameworks & Libraries"),
    color: "from-green-400 to-emerald-400",
    icon: FaReact,
  },
  {
    name: "Databases",
    skills: skills.filter((s) => s.category === "Databases"),
    color: "from-purple-400 to-pink-400",
    icon: FaDatabase,
  },
  {
    name: "Developer Tools",
    skills: skills.filter((s) => s.category === "Developer Tools"),
    color: "from-orange-400 to-red-400",
    icon: FaTools,
  },
];
