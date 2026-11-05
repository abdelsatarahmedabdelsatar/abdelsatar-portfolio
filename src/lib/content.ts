import educationData from "@/data/education.json";
import experienceData from "@/data/experience.json";
import personalData from "@/data/personal.json";
import projectsData from "@/data/projects.json";
import sectionsData from "@/data/sections.json";
import skillsData from "@/data/skills.json";
import socialData from "@/data/social.json";
import type {
  Education,
  Experience,
  Personal,
  Project,
  SectionMeta,
  SkillGroup,
  SocialLink,
} from "@/types/content";

export const personal = personalData as Personal;
export const experience = experienceData as Experience[];
export const projects = projectsData as Project[];
export const skillGroups = skillsData as SkillGroup[];
export const education = educationData as Education;
export const sections = sectionsData as SectionMeta[];

/** Links without a URL yet stay in the JSON but are not rendered. */
export const socialLinks = (socialData as SocialLink[]).filter((link) => link.url);

export function getSection(id: string): SectionMeta {
  const section = sections.find((item) => item.id === id);
  if (!section) throw new Error(`Missing section "${id}" in sections.json`);
  return section;
}
