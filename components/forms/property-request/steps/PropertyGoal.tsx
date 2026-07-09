"use client";

import { motion } from "framer-motion";
import { PropertyStepProps } from "../types";

type GoalValue = "rent" | "buy";

const options: {
    id: GoalValue;
    icon: string;
    title: string;
    description: string;
}[] = [
    {
        id: "buy",
        icon: "🏡",
        title: "Buy a Home",
        description: "Find a property to purchase and call your own.",
    },
    {
        id: "rent",
        icon: "🔑",
        title: "Rent a Property",
        description: "Discover the perfect place to live.",
    },
];

export default function PropertyGoal({
    formData,
    errors,
    onChange,
}: PropertyStepProps) {
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {options.map((option) => {
                    const selected = formData.lookingFor === option.id;

                    return (
                        <motion.button
                            key={option.id}
                            type="button"
                            onClick={() => onChange("lookingFor", option.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                text-left
                                rounded-[28px]
                                border
                                p-8
                                transition-all
                                duration-300
                                ${selected
                                    ? "border-[#C8A45D] bg-[#0B1F3A] text-white shadow-xl"
                                    : "border-neutral-200 bg-white text-[#0B1F3A] hover:border-[#C8A45D]"
                                }
                            `}
                        >
                            <div className="mb-5 text-4xl">
                                {option.icon}
                            </div>

                            <h3 className="text-xl font-semibold">
                                {option.title}
                            </h3>

                            <p
                                className={`
                                    mt-3
                                    text-sm
                                    ${selected ? "text-white/80" : "text-neutral-500"}
                                `}
                            >
                                {option.description}
                            </p>
                        </motion.button>
                    );
                })}
            </div>

            {errors.lookingFor && (
                <p className="text-sm text-red-600">
                    {errors.lookingFor}
                </p>
            )}
        </div>
    );
}