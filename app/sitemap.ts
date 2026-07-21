import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

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
  "/menu",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
  const properties = await prisma.property.findMany({
    where: { status: "active" },
    select: { propertyId: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  return [
    ...staticRoutes,
    ...properties.map((property) => ({
      url: `${siteUrl}/property/${property.propertyId}`,
      lastModified: property.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
