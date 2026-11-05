import { SkillGrid } from "@/components/sections/skill-grid";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { skillGroups } from "@/lib/content";

export function Skills() {
  return (
    <Section id="skills">
      <Reveal>
        <SkillGrid groups={skillGroups} />
      </Reveal>
    </Section>
  );
}
