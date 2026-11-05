import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { personal } from "@/lib/content";

export function About() {
  const { about, languages } = personal;

  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="divide-y divide-border border-y border-border">
            {about.highlights.map(({ value, label }) => (
              <div key={label} className="flex flex-col py-4">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="order-first font-display text-3xl font-semibold">{value}</dd>
              </div>
            ))}
            <div className="py-4">
              <dt className="text-sm text-muted-foreground">Languages</dt>
              <dd className="mt-1 font-medium">
                {languages.map(({ name: language, level }) => `${language}: ${level}`).join(" · ")}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
