"use client";

import { useEffect, useRef, useState } from "react";
import { FiHome, FiMap, FiShield, FiSearch } from "react-icons/fi";

const getStats = (propertyCount: number) => [
    {
        icon: FiHome,
        value: propertyCount,
        suffix: "",
        label: "Properties Listed",
        description: "Verified homes across the US",
    },
    {
        icon: FiMap,
        value: 50,
        suffix: "",
        label: "States Covered",
        description: "From coast to coast",
    },
    {
        icon: FiShield,
        value: 100,
        suffix: "%",
        label: "Verified Listings",
        description: "Every property is verified",
    },
    {
        icon: FiSearch,
        value: 0,
        suffix: "",
        label: "Free to Search",
        description: "No signup required",
    },
];

function useCountUp(target: number, duration: number, start: boolean) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start || target === 0) {
            return;
        }

        let startTime: number | null = null;
        let frameId: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) frameId = requestAnimationFrame(step);
        };

        frameId = requestAnimationFrame(step);

        return () => {
            if (frameId !== null) cancelAnimationFrame(frameId);
        };
    }, [start, target, duration]);

    return count;
}

function StatCard({
    stat,
    index,
    animate,
}: {
    stat: ReturnType<typeof getStats>[number];
    index: number;
    animate: boolean;
}) {
    const count = useCountUp(stat.value, 1800, animate);
    const Icon = stat.icon;

    return (
        <div
            className="flex flex-col items-center text-center px-6 py-8 transition-all duration-700"
            style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(32px)",
                transitionDelay: `${index * 150}ms`,
            }}
        >
            {/* ICON */}
            <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <Icon className="text-xl text-black" />
            </div>

            {/* NUMBER */}
            <p className="text-5xl md:text-7xl font-black text-gray-900 leading-none tracking-tight">
                {stat.value === 0 ? "Free" : count.toLocaleString()}
                {stat.suffix}
            </p>

            {/* LABEL */}
            <p className="mt-3 text-base md:text-lg font-semibold text-gray-800">
                {stat.label}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-1 text-sm text-gray-500">
                {stat.description}
            </p>
        </div>
    );
}

export default function StatsBanner({ propertyCount }: { propertyCount: number }) {
    const stats = getStats(propertyCount);
    const ref = useRef<HTMLDivElement>(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const scrollContainer = document.querySelector(".scroll-container");

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                    observer.disconnect();
                }
            },
            {
                root: scrollContainer,
                threshold: 0.1,
            }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="w-full bg-gray-100 py-10">

            <div ref={ref} className="max-w-7xl mx-auto px-4 md:px-8">

                {/* HEADER */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                        Trusted by thousands
                    </h2>
                    <p className="mt-2 text-gray-500 text-sm md:text-base">
                        Real numbers from a real platform
                    </p>
                </div>

                {/* STATS GRID */}
                {/* DESKTOP — 4 columns with dividers */}
                <div className="hidden md:grid grid-cols-4 divide-x divide-gray-200">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={stat.label}
                            stat={stat}
                            index={index}
                            animate={animate}
                        />
                    ))}
                </div>

                {/* MOBILE — zigzag, always visible */}
                <div className="md:hidden flex flex-col gap-3 text-center ">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            style={{
                                display: "flex",
                                justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                            }}
                        >
                            <div
                                style={{
                                    width: "72%",
                                    backgroundColor: "rgba(18, 19, 31, 0.6)",
                                    borderRadius: "16px",
                                    padding: "16px",
                                }}
                            >
                                <p style={{ color: "white", fontWeight: "bold", fontSize: "24px" }}>
                                    {stat.value === 0 ? "Free" : stat.value.toLocaleString()}{stat.suffix}
                                </p>
                                <p style={{ color: "white", fontSize: "14px" }}>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
