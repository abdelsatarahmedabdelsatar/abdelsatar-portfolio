import type { MetadataRoute } from "next";
import { personal } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return personal.siteUrl ? [{ url: personal.siteUrl }] : [];
}
