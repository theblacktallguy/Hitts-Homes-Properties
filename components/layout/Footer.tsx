"use client";

import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";



const FOOTER_LINKS = [
    {
        title: "Search",
        links: [
            { label: "Home", href: "/" },
            { label: "For Rent", href: "/search?status=rent" },
            { label: "For Sale", href: "/search?status=sale" },
            { label: "Browse States", href: "/locations" },
            { label: "All Listings", href: "/search" },
            { label: "Pet Friendly Homes", href: "/search?petFriendly=true" },
        ],
    },
    {
        title: "Services",
        links: [
            { label: "Request a Property", href: "/request-property" },
            { label: "Request a Tour", href: "/request-tour" },
            { label: "Apply Now", href: "/apply" },
            { label: "Affordability Tool", href: "/tools/affordability" },
            { label: "Relocation Help", href: "/resources/relocation" },
            { label: "Buyer & Renter Guides", href: "/resources/guides" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "Meet The Agent", href: "/agent" },
            { label: "Contact Agent", href: "/agent#contact-agent" },
            { label: "Why Choose Us", href: "/why-choose-us" },
            { label: "Our Process", href: "/our-process" },
            { label: "Testimonials", href: "/testimonials" },
            { label: "Resources", href: "/resources" },
        ],
    },
    {
        title: "Help & Legal",
        links: [
            { label: "FAQ", href: "/faq" },
            { label: "Avoid Scams", href: "/avoid-scams" },
            { label: "Accessibility", href: "/accessibility" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ],
    },
];

const SOCIAL = [
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61591402871028", label: "Facebook" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaXTwitter, href: "#", label: "X (Twitter)" },
];

export default function Footer() {
    return (
        <footer
            style={{
                width: "100%",
                backgroundColor: "#111111",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* WATERMARK */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "clamp(40px, 8vw, 100px)",
                    fontWeight: "900",
                    color: "rgba(255,255,255,0.03)",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    userSelect: "none",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                }}
            >
                HITTS HOMES & PROPERTIES
            </div>

            {/* MAIN CONTENT */}
            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "64px 32px 0",
                    position: "relative",
                    zIndex: 1,
                }}
            >

                {/* TOP — LOGO + TAGLINE */}
                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: "40px", marginBottom: "48px", flexWrap: "wrap" }}>

                    {/* LEFT — LOGO + BRAND */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                        <img
                            src="/logo/logobg.png"
                            alt="Hitts Homes"
                            style={{ width: "80px", height: "80px", objectFit: "contain" }}
                        />
                        <span
                            style={{
                                color: "white",
                                fontSize: "clamp(18px, 2.5vw, 24px)",
                                fontWeight: "800",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            Hitts Homes & Properties
                        </span>
                    </div>

                    {/* RIGHT — TAGLINE + CONTACT */}
                    <div style={{ flex: 1, minWidth: "260px" }}>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: "1.6", margin: "0 0 16px", textAlign: "right" }}>
                            Your trusted partner in finding the perfect home across all 50 states. Verified listings, dedicated agent, zero hidden fees.
                        </p>
                        <div style={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "24px" }}>

                            <a
                                href="tel:(248) 636-0376"
                                style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
                            >
                                📞 (248) 636-0376
                            </a>
                            <a
                                href="mailto:agentdavidhitt@gmail.com"
                                style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
                            >
                                ✉️ agentdavidhitt@gmail.com
                            </a>
                        </div>
                    </div>

                </div>

                {/* DIVIDER */}
                <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.08)", marginBottom: "48px" }} />

                {/* LINKS GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: "40px",
                        marginBottom: "48px",
                    }}
                >
                    {FOOTER_LINKS.map((col) => (
                        <div key={col.title}>
                            <p
                                style={{
                                    color: "white",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    marginBottom: "16px",
                                    margin: "0 0 16px",
                                }}
                            >
                                {col.title}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {col.links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        style={{
                                            color: "rgba(255,255,255,0.45)",
                                            fontSize: "13px",
                                            textDecoration: "none",
                                            transition: "color 0.2s ease",
                                            display: "inline-block",
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.target as HTMLElement).style.color = "white";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* DIVIDER */}
                <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />

                {/* BOTTOM BAR */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "16px",
                        paddingBottom: "32px",
                    }}
                >
                    {/* COPYRIGHT */}
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>
                        © {new Date().getFullYear()} Hitts Homes & Properties. All rights reserved.
                    </p>

                    {/* SOCIAL ICONS */}
                    <div style={{ display: "flex", gap: "12px" }}>
                        {SOCIAL.map(({ icon: Icon, href, label }) => (

                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "rgba(255,255,255,0.5)",
                                    textDecoration: "none",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
                                    (e.currentTarget as HTMLElement).style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                                }}
                            >
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}