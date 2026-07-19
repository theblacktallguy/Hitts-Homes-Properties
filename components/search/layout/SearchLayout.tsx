import SearchHeader from "../../layout/SearchHeader";
import FilterBar from "../sections/FilterBar";
import ResultsContextHeader from "../sections/ResultsContextHeader";
import ListingsSection from "../sections/ListingsSection";
import BudgetSidebar from "../sections/BudgetSidebar";
import PropertyRequestCTA from "../sections/PropertyRequestCTA";
import RecommendationsSection from "../sections/RecommendationsSection";
import MarketingSection from "../sections/MarketingSection";
import { Property } from "@/lib/searchTypes";

type SearchLayoutProps = {
  properties: Property[];
  nearbyBaseState?: string;
};

export default function SearchLayout({
  properties,
  nearbyBaseState = "",
}: SearchLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <SearchHeader />

      {/* FILTER BAR */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <FilterBar />
      </div>

      {/* RESULTS HEADER */}
      <ResultsContextHeader total={properties.length} />

      {/* MAIN */}
      <div className="flex gap-6 px-4 md:px-6 py-8 max-w-7xl mx-auto">

        {/* LEFT — LISTINGS */}
        <div className="flex-1 min-w-0">
          <ListingsSection properties={properties} />
        </div>

        {/* RIGHT — desktop only */}
        <div className="hidden md:flex flex-col gap-6 w-72 shrink-0">
          <BudgetSidebar />
        </div>

      </div>

      {/* REQUEST PROPERTY CTA */}
      <PropertyRequestCTA />


      {/* RECOMMENDATIONS — full width below on both mobile and desktop */}
      <div className="max-w-7xl mx-auto pb-8">
        <RecommendationsSection baseState={nearbyBaseState} />
      </div>
      <MarketingSection />

    </div>
  );
}
