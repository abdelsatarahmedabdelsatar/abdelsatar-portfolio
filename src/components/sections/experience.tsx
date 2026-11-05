import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/content";
import { formatDateRange } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <Section id="experience">
      <ol className="relative space-y-12 border-l border-border pl-6 md:pl-10">
        {experience.map((job) => (
          <li key={job.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[29px] size-2.5 rounded-full bg-accent ring-4 ring-background md:-left-[45px]"
            />
            <Reveal>
              <p className="font-mono text-xs text-muted-foreground">
                {formatDateRange(job.startDate, job.endDate)}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{job.role}</h3>
              <p className="text-muted-foreground">
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-accent hover:underline"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
                {job.location && ` · ${job.location}`}
              </p>

              <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-4 text-muted-foreground marker:text-accent">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              {job.technologies.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.technologies.map((technology) => (
                    <li key={technology}>
                      <Badge>{technology}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
