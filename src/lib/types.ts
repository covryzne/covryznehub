import { navLinks } from "@/lib/data";

export type SectionName = (typeof navLinks)[number]["name"];

export type Project = {
  video?: string;
  image?: string;
  title: string;
  description: string;
  technologies: string[];
  links: {
    preview: string;
    github: string;
    githubApi: string;
  };
};

export type Experience = {
  title: string;
  company: string;
  description: string;
  period: string;
  technologies: string[];
};

export type Certification = {
  image?: string;
  pdf?: string;
  title: string;
  description: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl: string;
  details?: string[];
};

export type NavName =
  | "Home"
  | "About"
  | "Experience"
  | "Projects"
  | "Certifications"
  | "Contact";

export type NavLink = {
  name: NavName;
  href: string;
};

export type Skill = {
  name: string;
  icon: React.ReactNode;
};
