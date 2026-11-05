import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SocialLinks } from "@/components/shared/social-links";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { experience, personal } from "@/lib/content";

function ProfileCard() {
  const current = experience.find((job) => job.endDate === null);
  const fields: [string, string][] = [
    ["role", personal.role],
    // ...(current ? ([["company", current.company]] as [string, string][]) : []),
    ["location", personal.location],
  ];

  // Decorative summary: everything here also appears as regular text elsewhere on the page.
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-xl shadow-accent/5 backdrop-blur"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">profile.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 sm:text-sm sm:leading-7">
        <code>
          <span className="text-accent-2">const</span> engineer = {"{"}
          {"\n"}
          {fields.map(([key, value]) => (
            <span key={key}>
              {"  "}
              {key}: <span className="text-accent">&quot;{value}&quot;</span>,{"\n"}
            </span>
          ))}
          {"  "}stack: [{"\n"}
          {personal.specialties.map((skill) => (
            <span key={skill}>
              {"    "}
              <span className="text-accent">&quot;{skill}&quot;</span>,{"\n"}
            </span>
          ))}
          {"  "}],{"\n"}
          {"}"};
        </code>
      </pre>
    </div>
  );
}

function ProfilePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="size-20 shrink-0 overflow-hidden rounded-full border border-border bg-card p-1 shadow-lg shadow-accent/10 sm:size-28 lg:size-32 xl:size-36">
      <div className="size-full overflow-hidden rounded-full">
        {/* Zooms the waist-up source into a head-and-shoulders crop. */}
        <Image
          src={src}
          alt={alt}
          width={937}
          height={1058}
          sizes="(min-width: 1280px) 240px, (min-width: 640px) 200px, 140px"
          loading="eager"
          className="size-full origin-[50%_11%] scale-[1.6] object-cover object-top dark:brightness-90"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-backdrop absolute inset-0 -z-10" />
      <Container className="grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.25fr_1fr] lg:py-24">
        <div>
          <Reveal className="flex items-center gap-4 sm:gap-6">
            {personal.photo && <ProfilePhoto src={personal.photo} alt={personal.name} />}
            <div className="min-w-0">
              <p className="mb-1 text-sm font-medium text-accent sm:mb-2 sm:text-base">
                {personal.role}
              </p>
              <h1 className="font-display text-3xl leading-tight font-semibold min-[360px]:text-4xl sm:text-6xl lg:text-5xl xl:text-6xl">
                <span className="text-gradient inline-block">{personal.shortName}</span>
              </h1>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-xl leading-snug font-medium sm:text-2xl">
              {personal.headline}
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground">{personal.intro}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {personal.specialties.map((specialty) => (
                <li key={specialty}>
                  <Badge>{specialty}</Badge>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className={buttonVariants()}>
                View projects
                <ArrowRight />
              </a>
              <a href="#contact" className={buttonVariants({ variant: "outline" })}>
                Get in touch
              </a>
              {personal.resumeUrl && (
                <a
                  href={personal.resumeUrl}
                  download
                  className={buttonVariants({ variant: "outline" })}
                >
                  <Download />
                  Resume
                </a>
              )}
              <SocialLinks />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="min-w-0">
          <ProfileCard />
        </Reveal>
      </Container>
    </section>
  );
}
