import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  const { name, category, type, summary, highlights, tags, image, liveUrl, repoUrl } = project;
  const links = [
    { label: "Live site", url: liveUrl },
    { label: "Source code", url: repoUrl },
  ].filter((link) => link.url);

  return (
    <SpotlightCard className="flex flex-col">
      {image && (
        <Image
          src={image}
          alt={`${name} screenshot`}
          width={960}
          height={540}
          className="aspect-video w-full border-b border-border object-cover"
        />
      )}

      <div className="relative flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold transition-colors duration-200 group-hover:text-accent">
              {name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{category}</p>
          </div>
          {type === "personal" && <Badge className="shrink-0">Personal</Badge>}
        </div>

        <p className="mt-4">{summary}</p>

        {highlights.length > 0 && (
          <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-muted-foreground marker:text-accent">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {links.map(({ label, url }) => (
              <a
                key={label}
                href={url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label}: ${name}`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {label}
                <ArrowUpRight />
              </a>
            ))}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
