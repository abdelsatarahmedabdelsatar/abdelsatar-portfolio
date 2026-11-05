import type { MetadataRoute } from "next";
import { personal } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(personal.siteUrl && { sitemap: `${personal.siteUrl}/sitemap.xml` }),
  };
}
