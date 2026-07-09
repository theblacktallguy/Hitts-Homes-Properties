import Link from "next/link";

export default function FinalCTA() {
    return (
        <section
            style={{
                position: "relative",
                width: "100%",
                height: "500px",
                overflow: "hidden",
            }}
            className="md:h-[600px]"
        >

            {/* BACKGROUND IMAGE */}
            <img
                src="/heros-bg/cta-bg.webp"
                alt="Luxury home"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                }}
            />

            {/* LIGHT WARM OVERLAY */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(255,248,235,0.55) 0%, rgba(255,237,200,0.75) 100%)",
                }}
            />

            {/* CONTENT */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    textAlign: "center",
                }}
            >
                {/* BADGE */}
                <div
                    style={{
                        backgroundColor: "rgba(0,0,0,0.08)",
                        borderRadius: "999px",
                        padding: "6px 16px",
                        marginBottom: "20px",
                    }}
                >
                    <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", margin: 0 }}>
                        Hitts Homes & Properties
                    </p>
                </div>

                {/* HEADLINE */}
                <h2
                    style={{
                        color: "#1a1a1a",
                        fontSize: "clamp(28px, 6vw, 56px)",
                        fontWeight: "800",
                        lineHeight: "1.15",
                        maxWidth: "700px",
                        margin: "0 0 16px",
                    }}
                >
                    Ready to Find Your Dream Home?
                </h2>

                {/* SUBTEXT */}
                <p
                    style={{
                        color: "rgba(0,0,0,0.6)",
                        fontSize: "clamp(14px, 2vw, 18px)",
                        lineHeight: "1.6",
                        maxWidth: "500px",
                        margin: "0 0 40px",
                    }}
                >
                    Search hundreds of verified properties across the US or let David Hitt find the perfect match for you.
                </p>

                {/* BUTTONS */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <Link
                        href="/#search-bar"
                        style={{
                            backgroundColor: "#1a1a1a",
                            color: "white",
                            padding: "14px 28px",
                            borderRadius: "999px",
                            fontWeight: "700",
                            fontSize: "15px",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        🔍 Search Properties
                    </Link>

                    <Link
                        href="/request-property"
                        style={{
                            backgroundColor: "white",
                            color: "#1a1a1a",
                            padding: "14px 28px",
                            borderRadius: "999px",
                            fontWeight: "700",
                            fontSize: "15px",
                            textDecoration: "none",
                            border: "2px solid rgba(0,0,0,0.15)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        🏠 Request a Property
                    </Link>
                </div>

                {/* SUBTLE TRUST LINE */}
                <p
                    style={{
                        color: "rgba(0,0,0,0.4)",
                        fontSize: "12px",
                        marginTop: "24px",
                    }}
                >
                    Free to browse · No signup required · 512+ verified listings
                </p>
            </div>

        </section>
    );
}