import InHeader from "@/components/layout/InHeader";
import LocationHero from "@/components/locations/LocationHero";
import StateExplorer from "@/components/locations/StateExplorer";
import WhyChooseUs from "@/components/locations/WhyChooseUs";
import LocationCTA from "@/components/locations/LocationCTA";
import { prisma } from "@/lib/prisma";
import type { LocationGroup } from "@/lib/locationData";

async function getLocationGroups(): Promise<LocationGroup[]> {
    const properties = await prisma.property.findMany({
        where: {
            status: "active",
        },
        select: {
            city: true,
            state: true,
        },
    });

    const grouped: Record<string, Record<string, number>> = {};

    properties.forEach((property) => {
        const state = property.state?.trim();
        const city = property.city?.trim();

        if (!state || !city) return;

        grouped[state] ??= {};
        grouped[state][city] = (grouped[state][city] || 0) + 1;
    });

    return Object.entries(grouped)
        .map(([state, cities]) => {
            const cityList = Object.entries(cities)
                .map(([city, propertyCount]) => ({
                    city,
                    propertyCount,
                }))
                .sort((a, b) => a.city.localeCompare(b.city));

            return {
                state,
                propertyCount: cityList.reduce(
                    (total, city) => total + city.propertyCount,
                    0
                ),
                cities: cityList,
            };
        })
        .sort((a, b) => a.state.localeCompare(b.state));
}

export default async function LocationsPage() {
    const locations = await getLocationGroups();

    return (
        <main className="min-h-screen bg-white">
            <InHeader />

            <LocationHero />

            <StateExplorer locations={locations} />

            <LocationCTA />

            <WhyChooseUs />



        </main>
    );
}
