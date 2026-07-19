import Link from "next/link";


type LinkItem = {
    label: string;
    href: string;
    icon: string;
};


export default function MobileMenuSection({
    title,
    links,
}: {
    title: string;
    links: LinkItem[];
}) {


    return (

        <section>

            <h2 className="text-sm font-bold text-gray-900 mb-3">
                {title}
            </h2>


            <div className="bg-white rounded-2xl shadow-sm border divide-y">

                {
                    links.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-4 p-4 active:bg-gray-100"
                        >

                            <span className="text-xl">
                                {item.icon}
                            </span>


                            <span className="text-sm font-medium text-gray-800">
                                {item.label}
                            </span>


                        </Link>
                    ))
                }


            </div>


        </section>

    );

}