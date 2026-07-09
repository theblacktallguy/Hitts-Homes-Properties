"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California",
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
    "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
    "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
    "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const STATE_ABBR: Record<string, string> = {
    Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR",
    California: "CA", Colorado: "CO", Connecticut: "CT", Delaware: "DE",
    Florida: "FL", Georgia: "GA", Hawaii: "HI", Idaho: "ID",
    Illinois: "IL", Indiana: "IN", Iowa: "IA", Kansas: "KS",
    Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD",
    Massachusetts: "MA", Michigan: "MI", Minnesota: "MN", Mississippi: "MS",
    Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV",
    "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM",
    "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
    Ohio: "OH", Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA",
    "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD",
    Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT",
    Virginia: "VA", Washington: "WA", "West Virginia": "WV",
    Wisconsin: "WI", Wyoming: "WY",
};

const COLORS = [
    { base: "#DBEAFE", hover: "#1D4ED8" },
    { base: "#D1FAE5", hover: "#065F46" },
    { base: "#FEF3C7", hover: "#D97706" },
];

function getColor(state: string) {
    const sum = state.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return COLORS[sum % 3];
}

export default function ExploreByState() {
    const router = useRouter();
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleClick = (state: string) => {
        router.push(`/search?state=${encodeURIComponent(state)}`);
    };

    return (
        <section className="py-14 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* HEADER */}
                <div className="mb-6 md:mb-10 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                        Explore by State
                    </h2>
                    <p className="mt-2 text-gray-500 text-sm md:text-base">
                        Find properties in your preferred location
                    </p>
                </div>

                {/* DESKTOP — INTERACTIVE MAP */}
                <div className="hidden md:block relative">
                    {/* TOOLTIP */}
                    {hoveredState && (
                        <div
                            className="fixed z-50 bg-black text-white text-xs font-semibold px-3 py-2 rounded-lg pointer-events-none whitespace-nowrap transform -translate-x-1/2 -translate-y-full"
                            style={{ left: tooltipPos.x, top: tooltipPos.y - 8 }}
                        >
                            {hoveredState} — View Properties →
                        </div>
                    )}

                    <ComposableMap
                        projection="geoAlbersUsa"
                        className="w-full h-auto"
                    >
                        <Geographies geography={GEO_URL}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const stateName = geo.properties.name;
                                    if (!STATES.includes(stateName)) return null;
                                    const color = getColor(stateName);
                                    const isHovered = hoveredState === stateName;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={isHovered ? color.hover : color.base}
                                            stroke="white"
                                            strokeWidth={1.5}
                                            style={{
                                                default: { outline: "none", transition: "fill 0.2s" },
                                                hover: { outline: "none", cursor: "pointer" },
                                                pressed: { outline: "none" },
                                            }}
                                            onMouseEnter={(e) => {
                                                setHoveredState(stateName);
                                                setTooltipPos({ x: e.clientX, y: e.clientY });
                                            }}
                                            onMouseMove={(e) => {
                                                setTooltipPos({ x: e.clientX, y: e.clientY });
                                            }}
                                            onMouseLeave={() => setHoveredState(null)}
                                            onClick={() => handleClick(stateName)}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ComposableMap>
                </div>

                {/* MOBILE — SCROLLABLE PILL GRID */}
                <div className="md:hidden mt-6 h-56 overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex flex-wrap justify-center gap-2">
                        {STATES.map((state) => {
                            const color = getColor(state);
                            return (
                                <button
                                    key={state}
                                type="button"
                                onClick={() => handleClick(state)}
                                style={{ backgroundColor: color.base, color: color.hover }}
                                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 active:opacity-80"
                            >
                                {STATE_ABBR[state]}
                            </button>
                        );
                    })}
                </div>
                </div>

            </div>
        </section>
    );
}