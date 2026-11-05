# Abdelsatar Ahmed: Portfolio

A personal portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. All content lives in JSON, so you can update it without touching any UI code.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

| File | Controls |
| --- | --- |
| `src/data/personal.json` | Name, headline, about text, contact details, photo, resume, site URL |
| `src/data/social.json` | Social links |
| `src/data/experience.json` | Work history |
| `src/data/projects.json` | Project cards |
| `src/data/skills.json` | Skill groups (`featured` groups appear under the "Core focus" filter) |
| `src/data/education.json` | Degrees, certifications, training |
| `src/data/sections.json` | Navigation labels and section headings |

Types for all of these are in `src/types/content.ts`.

### Filling in `null` values

Anything set to `null` is hidden until you give it a value. There are no placeholders.

| Field | Once set |
| --- | --- |
| `personal.photo` | Shows your photo next to your name in the hero. Put the file in `public/` and use a path like `/me.jpeg` |
| `personal.resumeUrl` | Adds a Resume download button to the hero, for example `/resume.pdf` |
| `personal.siteUrl` | Sets absolute social-preview URLs and adds the site to `sitemap.xml` and `robots.txt`. Set it before deploying, with no trailing slash |
| `projects[].image` | Adds a screenshot to the project card |
| `projects[].liveUrl`, `projects[].repoUrl` | Adds link buttons to the project card |
| `experience[].companyUrl` | Links the company name |
| `experience[].endDate` | `null` means the role is ongoing and displays "Present" |
| `certifications[].credentialUrl` | Links the certification name |

To remove an item, delete its entry from the JSON array. To add a new type of social link, add an entry to `social.json`. GitHub and LinkedIn have their own icons, and other platforms get a generic globe icon.

## Project structure

```
src/
  app/                 Layout, page, metadata routes (robots, sitemap, Open Graph image)
  components/
    layout/            Header, footer, theme toggle
    sections/          One component per page section, plus its interactive parts
    shared/            Reusable building blocks (Section, Reveal, SpotlightCard, ...)
    ui/                shadcn/ui-style primitives (Button, Badge)
  data/                Portfolio content (JSON)
  hooks/               Active-section tracking for the navigation
  lib/                 Typed content access, theme helpers, utilities
  types/               Content types
```

## Contact form

The form posts to `src/app/api/contact/route.ts`, which validates the message again on the server and emails it to `personal.email` through [Resend](https://resend.com). Replying to the email goes to the visitor's address.

To enable sending:

1. Create a Resend account using the same address as `personal.email`, then create an API key. Resend's test sender only delivers to the account owner's address.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`.
3. Restart the dev server. When deploying, add the same variable on your host.

Until the key is set, the form shows an error with your email address instead of sending. The route needs a server, so the site can't be deployed as a static export.
