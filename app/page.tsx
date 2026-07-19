import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import ExploreCategories from "@/components/home/ExploreCategories";
import FeaturedListings from "@/components/home/FeaturedListings";
import RecentlyAddedListings from "@/components/home/RecentlyAddedListings";
import ExploreByState from "@/components/home/ExploreByState";
import StatsBanner from "@/components/home/StatsBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AgentSection from "@/components/home/AgentSection";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

import { prisma } from "@/lib/prisma";
import { mapProperty } from "@/lib/mappers/mapProperty";

export const dynamic = "force-dynamic";

function pickRandom<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}

async function getRecentlyAdded() {
  try {
    const properties = await prisma.property.findMany({
      where: { status: "active" },
      take: 10,
      orderBy: [
        { updatedAt: "desc" },
        { createdAt: "desc" },
      ],
    });

    return properties.map(mapProperty);
  } catch (error) {
    console.error("Recently added query failed:", error);
    return [];
  }
}

async function getFeatured() {
  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const [forSale, forRent] = await Promise.all([
        prisma.property.findMany({
          where: { status: "active", listingType: "sale" },
          take: 50,
        }),
        prisma.property.findMany({
          where: { status: "active", listingType: "rent" },
          take: 50,
        }),
      ]);
      return { forSale, forRent };
    } catch (error) {
      console.error(`DB attempt ${attempt} failed:`, error);
      if (attempt === MAX_RETRIES) return { forSale: [], forRent: [] };
      await new Promise((r) => setTimeout(r, attempt * 1000));
    }
  }
  return { forSale: [], forRent: [] };
}

async function getListedPropertyCount() {
  try {
    return await prisma.property.count({
      where: { status: "active" },
    });
  } catch (error) {
    console.error("Property count query failed:", error);
    return 0;
  }
}

export default async function Home() {
  const [{ forSale, forRent }, recentlyAdded, listedPropertyCount] = await Promise.all([
    getFeatured(),
    getRecentlyAdded(),
    getListedPropertyCount(),
  ]);

  const selected = [];
  const sale = pickRandom(forSale, 6);
  const rent = pickRandom(forRent, 6);
  for (let i = 0; i < 6; i++) {
    if (sale[i]) selected.push(sale[i]);
    if (rent[i]) selected.push(rent[i]);
  }

  const featured = selected.map(mapProperty);

  return (
    <main>
      <Header />
      <Hero />
      <ExploreCategories />
      <RecentlyAddedListings properties={recentlyAdded} />
      <FeaturedListings properties={featured} />
      <ExploreByState />
      <StatsBanner propertyCount={listedPropertyCount} />
      <WhyChooseUs />
      <AgentSection />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
