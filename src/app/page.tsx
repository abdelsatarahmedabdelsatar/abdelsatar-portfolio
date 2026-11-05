import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { personal, socialLinks } from "@/lib/content";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: personal.role,
  email: `mailto:${personal.email}`,
  address: { "@type": "PostalAddress", streetAddress: personal.location },
  knowsAbout: personal.specialties,
  sameAs: socialLinks.map((link) => link.url),
  ...(personal.siteUrl && { url: personal.siteUrl }),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <ExperienceSection />
      <Projects />
      <Skills />
      <EducationSection />
      <Contact />
    </>
  );
}
