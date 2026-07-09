import type { MetadataRoute } from "next";

const siteUrl = "https://hittshomes.com";

const routes = [
  "",
  "/search",
  "/locations",
  "/agent",
  "/request-property",
  "/request-tour",
  "/apply",
  "/faq",
  "/why-choose-us",
  "/resources",
  "/resources/relocation",
  "/resources/guides",
  "/testimonials",
  "/accessibility",
  "/terms",
  "/privacy",
  "/avoid-scams",
  "/tools/affordability",
  "/our-process",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
