import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MotionProvider } from "@/components/shared/motion-provider";
import { personal, sections } from "@/lib/content";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${personal.name} | ${personal.role}`;
const description = personal.intro;

export const metadata: Metadata = {
  ...(personal.siteUrl && { metadataBase: new URL(personal.siteUrl) }),
  title,
  description,
  authors: [{ name: personal.name }],
  keywords: [personal.role, ...personal.specialties],
  openGraph: { title, description, type: "profile", siteName: personal.name },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1419" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body id="top" className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-60 rounded-full bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header
            initials={personal.initials}
            homeLabel={`${personal.shortName}, back to top`}
            links={sections.map(({ id, label }) => ({ id, label }))}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
