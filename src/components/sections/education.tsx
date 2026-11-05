import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { education } from "@/lib/content";
import { formatDateRange } from "@/lib/utils";

function SubsectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-4 text-sm font-medium text-muted-foreground">
      {children}
    </h3>
  );
}

export function EducationSection() {
  const { degrees, certifications, training } = education;

  return (
    <Section id="education">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-12">
          <Reveal>
            <SubsectionTitle>Degree</SubsectionTitle>
            <ul className="space-y-6">
              {degrees.map((degree) => (
                <li key={degree.id}>
                  <p className="font-mono text-xs text-muted-foreground">
                    {formatDateRange(degree.startDate, degree.endDate)}
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold">{degree.degree}</p>
                  <p className="mt-1 text-muted-foreground">{degree.institution}</p>
                  <dl className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {degree.graduationProject && (
                      <div>
                        <dt className="inline">Graduation project: </dt>
                        <dd className="inline font-medium text-foreground">
                          {degree.graduationProject}
                        </dd>
                      </div>
                    )}
                    {degree.grade && (
                      <div>
                        <dt className="inline">Graduation grade: </dt>
                        <dd className="inline font-medium text-foreground">{degree.grade}</dd>
                      </div>
                    )}
                  </dl>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <SubsectionTitle>Certifications</SubsectionTitle>
            <ul className="space-y-4">
              {certifications.map((certification) => (
                <li key={certification.id}>
                  {certification.credentialUrl ? (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold underline-offset-4 hover:text-accent hover:underline"
                    >
                      {certification.name}
                      <ArrowUpRight className="size-4" />
                    </a>
                  ) : (
                    <p className="font-semibold">{certification.name}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {certification.issuer} · {certification.date}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <SubsectionTitle>Internships & training</SubsectionTitle>
          <ul className="divide-y divide-border border-y border-border">
            {training.map((item) => (
              <li key={item.id} className="py-5">
                <p className="font-mono text-xs text-muted-foreground">
                  {formatDateRange(item.startDate, item.endDate)}
                </p>
                <p className="mt-2 font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.organization}</p>
                {item.technologies.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {item.technologies.map((technology) => (
                      <li key={technology}>
                        <Badge>{technology}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
