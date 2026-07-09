"use client";

import { useState } from "react";
import { useRouteLoading } from "@/hooks/useRouteLoading";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const { setLoading } = useRouteLoading();

    const handleSearch = (value?: string) => {
        const finalQuery = (value ?? query).trim();

        console.log("HANDLE SEARCH", finalQuery);

        if (!finalQuery) return;

        setLoading(true);
        window.location.href = `/search?q=${encodeURIComponent(finalQuery)}`;
    };

    return (
        <div className="w-full">

            {/* Search Box */}
            <form
                action="/search"
                method="GET"
                onSubmit={(e) => {
                    console.log("FORM SUBMIT", query);
                    e.preventDefault();
                    handleSearch();
                }}
                className="flex items-center bg-white rounded-2xl shadow-lg p-3 h-12 md:h-16 gap-3"
            >

                <input
                    name="q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="City, State, ZIP, or Address"
                    className="flex-1 outline-none text-black px-3 text-base"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded-xl hover:opacity-90 transition"
                >
                    Search
                </button>

            </form>

        </div>
    );
}