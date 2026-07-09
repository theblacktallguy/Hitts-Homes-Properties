import {
    FiHome,
    FiSearch,
    FiUsers,
    FiGlobe,
} from "react-icons/fi";


const reasons = [
    {
        icon: FiHome,
        title: "Nationwide Listings",
        description:
            "Explore homes, apartments, and properties across cities and states nationwide.",
    },
    {
        icon: FiSearch,
        title: "Smart Search",
        description:
            "Find properties faster with simple search tools designed around your needs.",
    },
    {
        icon: FiUsers,
        title: "Trusted Guidance",
        description:
            "Work with a trusted real estate professional throughout your property journey.",
    },
    {
        icon: FiGlobe,
        title: "Local Knowledge",
        description:
            "Discover communities and locations that fit your lifestyle.",
    },
];


export default function WhyChooseUs() {

    return (
        <section className="bg-gray-100 text-black px-5 py-16 md:px-10">

            <div className="mx-auto max-w-7xl">


                <div className="mx-auto max-w-3xl text-center">

                    <h2 className="text-3xl font-bold md:text-4xl">
                        Why Choose Hitts Homes
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Discover a better way to explore properties
                        and find the place that feels like home.
                    </p>

                </div>



                <div
                    className="
                    mt-12
                    grid
                    gap-8
                    md:grid-cols-2
                    lg:grid-cols-4
                    "
                >

                    {reasons.map((reason)=>{

                        const Icon = reason.icon;


                        return (
                            <div
                                key={reason.title}
                                className="
                                rounded-2xl
                                bg-white
                                p-6
                                text-center
                                shadow-sm
                                transition
                                hover:-translate-y-1
                                hover:shadow-md
                                "
                            >

                                <div
                                    className="
                                    mx-auto
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-gray-100
                                    "
                                >
                                    <Icon
                                        className="text-2xl"
                                    />
                                </div>



                                <h3
                                    className="
                                    mt-5
                                    text-lg
                                    font-semibold
                                    "
                                >
                                    {reason.title}
                                </h3>



                                <p
                                    className="
                                    mt-3
                                    text-sm
                                    leading-6
                                    text-gray-600
                                    "
                                >
                                    {reason.description}
                                </p>


                            </div>
                        );

                    })}


                </div>


            </div>

        </section>
    );
}