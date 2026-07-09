import InHeader from "@/components/layout/InHeader";
import LocationHero from "@/components/locations/LocationHero";
import StateExplorer from "@/components/locations/StateExplorer";
import WhyChooseUs from "@/components/locations/WhyChooseUs";
import LocationCTA from "@/components/locations/LocationCTA";

export default function LocationsPage() {
    return (
        <main className="min-h-screen bg-white">
            <InHeader />

            <LocationHero />

            <StateExplorer />

            <LocationCTA />

            <WhyChooseUs />



        </main>
    );
}