export interface Highlight {
  value: string;
  label: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Personal {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  specialties: string[];
  headline: string;
  intro: string;
  location: string;
  email: string;
  phones: string[];
  photo: string | null;
  resumeUrl: string | null;
  siteUrl: string | null;
  about: {
    paragraphs: string[];
    highlights: Highlight[];
  };
  languages: Language[];
}

export interface SocialLink {
  platform: string;
  label: string;
  handle: string | null;
  url: string | null;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string | null;
  startDate: string;
  /** `null` means the role is ongoing. */
  endDate: string | null;
  companyUrl: string | null;
  highlights: string[];
  technologies: string[];
}

export type ProjectType = "professional" | "personal";

export interface Project {
  id: string;
  name: string;
  category: string;
  type: ProjectType;
  summary: string;
  highlights: string[];
  tags: string[];
  image: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
}

export interface SkillGroup {
  id: string;
  title: string;
  /** Featured groups stay visible under the "Core focus" filter. */
  featured: boolean;
  skills: string[];
}

export interface Degree {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  grade: string | null;
  graduationProject: string | null;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string | null;
}

export interface Training {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  technologies: string[];
}

export interface Education {
  degrees: Degree[];
  certifications: Certification[];
  training: Training[];
}

export interface SectionMeta {
  id: string;
  label: string;
  title: string;
  description: string | null;
}
