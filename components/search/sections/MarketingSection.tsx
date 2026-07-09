"use client";

import {
  FiSearch,
  FiShield,
  FiGlobe,
  FiZap,
} from "react-icons/fi";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Smart Property Search",
    description: "Find homes instantly with intelligent filtering across all listings.",
    icon: <FiSearch />,
  },
  {
    title: "Verified Listings",
    description: "Every property is reviewed for accuracy and legitimacy.",
    icon: <FiShield />,
  },
  {
    title: "Nationwide Coverage",
    description: "Browse thousands of homes across all major U.S. states.",
    icon: <FiGlobe />,
  },
  {
    title: "Fast & Lightweight",
    description: "Optimized experience for instant loading on all devices.",
    icon: <FiZap />,
  },
];

export default function MarketingSection() {
  return (
    <section className="py-10 bg-gray">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* HEADER */}
        <div className="mb-6 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Why search with Hitts Homes
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            A faster, smarter, and more reliable way to find properties
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-white mb-3 text-lg">
                {item.icon}
              </div>

              <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-500">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}