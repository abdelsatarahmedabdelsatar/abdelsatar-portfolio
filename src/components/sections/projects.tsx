import { ProjectGrid } from "@/components/sections/project-grid";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <Section id="projects">
      <Reveal>
        <ProjectGrid projects={projects} />
      </Reveal>
    </Section>
  );
}
