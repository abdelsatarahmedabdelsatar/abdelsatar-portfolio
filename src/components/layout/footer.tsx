import { Container } from "@/components/shared/container";
import { SocialLinks } from "@/components/shared/social-links";
import { personal } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          {personal.name} · {personal.role}
        </p>
        <SocialLinks />
      </Container>
    </footer>
  );
}
