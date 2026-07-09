import InHeader from "@/components/layout/InHeader";
import AffordabilityCalculator from "@/components/tools/AffordabilityCalculator";

export const metadata = {
    title: "Affordability Tool | Hitts Homes & Properties",
    description:
        "Estimate a comfortable monthly housing budget before renting or applying.",
};

export default function AffordabilityPage() {
    return (
        <main>
            <InHeader />

            <section className="
            bg-gradient-to-br
            from-[#07182F]
            via-[#0B1F3A]
            to-[#C8A45D]
            px-5
            py-24
            text-white
            md:px-10
            md:py-32
            ">
                <div className="mx-auto max-w-6xl">
                    <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#F3D27A]">
                        Affordability Tool
                    </p>

                    <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                        Estimate a comfortable monthly housing budget.
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                        Use this simple estimator to think through income, debts,
                        utilities, and a reasonable rent range before you apply.
                    </p>
                </div>
            </section>

            <section className="bg-[#F8F7F4] px-5 py-20 md:px-10">
                <AffordabilityCalculator />
            </section>
        </main>
    );
}