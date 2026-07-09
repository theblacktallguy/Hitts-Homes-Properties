"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function numbersOnly(value: string) {
    return value.replace(/\D/g, "");
}

export default function AffordabilityCalculator() {
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [monthlyDebt, setMonthlyDebt] = useState("");
    const [estimatedUtilities, setEstimatedUtilities] = useState("");

    const results = useMemo(() => {
        const income = Number(monthlyIncome || 0);
        const debt = Number(monthlyDebt || 0);
        const utilities = Number(estimatedUtilities || 0);

        return {
            conservativeRent: Math.max(0, income * 0.28 - debt - utilities),
            flexibleRent: Math.max(0, income * 0.33 - debt - utilities),
            maxRent: Math.max(0, income * 0.36 - debt - utilities),
        };
    }, [monthlyIncome, monthlyDebt, estimatedUtilities]);

    const inputClass = `
        mt-2 block w-full rounded-2xl border border-neutral-200 bg-white
        px-5 py-4 pl-9 text-base text-neutral-800 outline-none transition
        focus:border-[#C8A45D] focus:ring-4 focus:ring-[#C8A45D]/10
    `;

    return (
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[32px] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#C8A45D]">
                    Calculator
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-[#0B1F3A]">
                    Enter your monthly numbers
                </h2>

                <div className="mt-8 space-y-6">
                    {[
                        {
                            label: "Monthly Income",
                            value: monthlyIncome,
                            setter: setMonthlyIncome,
                            placeholder: "Example: 5000",
                        },
                        {
                            label: "Monthly Debt Payments",
                            value: monthlyDebt,
                            setter: setMonthlyDebt,
                            placeholder: "Loans, credit cards, car payment...",
                        },
                        {
                            label: "Estimated Monthly Utilities",
                            value: estimatedUtilities,
                            setter: setEstimatedUtilities,
                            placeholder: "Electric, water, internet...",
                        },
                    ].map((item) => (
                        <div key={item.label}>
                            <label className="text-sm text-black">
                                {item.label}
                            </label>

                            <div className="relative">
                                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500">
                                    $
                                </span>

                                <input
                                    value={item.value}
                                    onChange={(e) =>
                                        item.setter(numbersOnly(e.target.value))
                                    }
                                    inputMode="numeric"
                                    placeholder={item.placeholder}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-[32px] bg-[#0B1F3A] p-6 text-white shadow-sm md:p-10">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#C8A45D]">
                    Estimate
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                    Suggested monthly rent range
                </h2>

                <div className="mt-8 space-y-4">
                    {[
                        ["Conservative", results.conservativeRent],
                        ["Flexible", results.flexibleRent],
                        ["Upper Range", results.maxRent],
                    ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl bg-white/10 p-5">
                            <p className="text-sm text-white/70">{label}</p>
                            <p className="mt-2 text-3xl font-semibold">
                                ${Math.round(Number(value)).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="mt-6 text-sm leading-7 text-white/70">
                    This is only a planning estimate. Actual approval depends on
                    property requirements, income review, rental history, screening,
                    and other application factors.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/request-property"
                        className="inline-flex items-center justify-center rounded-xl bg-[#C8A45D] px-6 py-3 text-sm font-semibold text-[#0B1F3A]"
                    >
                        Request Property
                    </Link>

                    <Link
                        href="/resources/guides"
                        className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white"
                    >
                        Read Guides
                    </Link>
                </div>
            </div>
        </div>
    );
}