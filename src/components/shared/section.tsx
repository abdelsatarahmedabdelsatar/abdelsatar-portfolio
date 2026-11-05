import type { ReactNode } from "react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { getSection } from "@/lib/content";

interface SectionProps {
  id: string;
  children: ReactNode;
}

export function Section({ id, children }: SectionProps) {
  const { label, title, description } = getSection(id);
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      className="scroll-mt-(--header-height) pt-8 pb-24 outline-none last:min-h-[calc(100svh-var(--header-height))] md:pt-10 md:pb-32"
    >
      <Container>
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-2 text-sm font-medium text-accent">{label}</p>
          <h2 id={titleId} className="font-display text-3xl font-semibold md:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
