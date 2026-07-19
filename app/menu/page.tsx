import Header from "@/components/layout/Header";
import MobileMenuHero from "@/components/menu/MobileMenuHero";
import MobileMenuSection from "@/components/menu/MobileMenuSection";

const menuSections = [
    {
        title: "Search Properties",
        links: [
            {
                label: "For Rent",
                href: "/search?status=rent",
                icon: "🏠",
            },
            {
                label: "For Sale",
                href: "/search?status=sale",
                icon: "🔑",
            },
            {
                label: "Premium Homes",
                href: "/search?type=Single%20Family%20Residence",
                icon: "⭐",
            },
            {
                label: "Pet Friendly Homes",
                href: "/search?petFriendly=true",
                icon: "🐾",
            },
        ],
    },

    {
        title: "Explore Locations",
        links: [
            {
                label: "Browse States",
                href: "/locations",
                icon: "📍",
            },
            {
                label: "Popular Cities",
                href: "/locations",
                icon: "🏙️",
            },
            {
                label: "Popular Areas",
                href: "/locations",
                icon: "🌎",
            },
            {
                label: "Relocation Resources",
                href: "/resources/relocation",
                icon: "🧭",
            },
        ],
    },

    {
        title: "Work With Agent",
        links: [
            {
                label: "Meet David Hitt",
                href: "/agent",
                icon: "👤",
            },
            {
                label: "Why Choose Us",
                href: "/why-choose-us",
                icon: "⭐",
            },
            {
                label: "Our Process",
                href: "/our-process",
                icon: "💬",
            },
            {
                label: "Testimonials",
                href: "/testimonials",
                icon: "💛",
            },
            {
                label: "Contact Agent",
                href: "/agent#contact-agent",
                icon: "📞",
            },
        ],
    },

    {
        title: "Need Help Finding A Home?",
        links: [
            {
                label: "Find Me A Property",
                href: "/request-property",
                icon: "🏡",
            },
            {
                label: "Request A Tour",
                href: "/request-tour",
                icon: "🚪",
            },
            {
                label: "Apply Now",
                href: "/apply",
                icon: "📝",
            },
            {
                label: "Affordability Tool",
                href: "/tools/affordability",
                icon: "💵",
            },
        ],
    },

    {
        title: "Resources",
        links: [
            {
                label: "Resource Center",
                href: "/resources",
                icon: "📚",
            },
            {
                label: "Buyer & Renter Guides",
                href: "/resources/guides",
                icon: "📖",
            },
            {
                label: "FAQ",
                href: "/faq",
                icon: "❓",
            },
            {
                label: "Avoid Scams",
                href: "/avoid-scams",
                icon: "🛡️",
            },
        ],
    },

    {
        title: "Legal & Support",
        links: [
            {
                label: "Privacy Policy",
                href: "/privacy",
                icon: "🔒",
            },
            {
                label: "Terms of Use",
                href: "/terms",
                icon: "📄",
            },
            {
                label: "Accessibility",
                href: "/accessibility",
                icon: "♿",
            },
        ],
    },
];


export default function MenuPage() {
    return (
        <main className="min-h-screen bg-gray-50 md:hidden">
            <Header />


            <MobileMenuHero />

            <div className="px-4 py-4 space-y-4">

                {menuSections.map((section) => (
                    <MobileMenuSection
                        key={section.title}
                        title={section.title}
                        links={section.links}
                    />
                ))}

            </div>

        </main>
    );
}