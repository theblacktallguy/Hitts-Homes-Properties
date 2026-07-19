"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TESTIMONIALS = [
    {
        id: 1,
        quote: "David made the entire home buying process feel effortless. He was patient, knowledgeable, and always available to answer our questions. We found our dream home in just three weeks!",
        name: "Sarah Mitchell",
        location: "Los Angeles, CA",
        photo: "/testimonials/client-1.webp",
        rating: 5,
    },
    {
        id: 2,
        quote: "As a first-time buyer, I was terrified. David walked me through every single step with clarity and never made me feel rushed. I couldn't have done this without him.",
        name: "James Okonkwo",
        location: "Sherman Oaks, CA",
        photo: "/testimonials/client-2.webp",
        rating: 5,
    },
    {
        id: 3,
        quote: "We were relocating from out of state and David handled everything remotely. Professional, responsive and got us a great deal. Highly recommend to anyone moving to the area.",
        name: "Emily & Tom Reyes",
        location: "Studio City, CA",
        photo: "/testimonials/client-3.webp",
        rating: 5,
    },
    {
        id: 4,
        quote: "David sold our family home of 22 years during a really emotional time. His sensitivity and professionalism made all the difference. We got above asking price in just 6 days.",
        name: "Margaret Thompson",
        location: "Encino, CA",
        photo: "/testimonials/client-4.webp",
        rating: 5,
    },
    {
        id: 5,
        quote: "I've worked with several agents over the years and David is by far the best. His market knowledge is unmatched and he truly puts his clients first every single time.",
        name: "Robert Kim",
        location: "Porter Ranch, CA",
        photo: "/testimonials/client-5.webp",
        rating: 5,
    },
    {
        id: 6,
        quote: "David helped us find a pet-friendly rental when we were in a tight spot. He went above and beyond what any agent would typically do. Forever grateful for his help.",
        name: "Aisha Johnson",
        location: "Northridge, CA",
        photo: "/testimonials/client-6.webp",
        rating: 5,
    },
    {
        id: 7,
        quote: "As a military family we move often and finding trustworthy agents is hard. David understood our timeline, our budget and our needs perfectly. Outstanding experience.",
        name: "Sgt. Marcus Davis",
        location: "Granada Hills, CA",
        photo: "/testimonials/client-7.webp",
        rating: 5,
    },
    {
        id: 8,
        quote: "We were downsizing after 30 years and David made it feel like a celebration rather than a loss. He found us the perfect condo and handled every detail with care.",
        name: "Patricia & Harold Burns",
        location: "Woodland Hills, CA",
        photo: "/testimonials/client-8.webp",
        rating: 5,
    },
    {
        id: 9,
        quote: "David's negotiation skills saved us over $40,000 on our purchase price. He knew exactly when to push and when to hold back. Absolutely brilliant agent.",
        name: "Daniel Nguyen",
        location: "Burbank, CA",
        photo: "/testimonials/client-9.webp",
        rating: 5,
    },
    {
        id: 10,
        quote: "From our first call to closing day, David was exceptional. He kept us informed every step of the way and made what could have been stressful feel completely smooth.",
        name: "Olivia Hernandez",
        location: "Canoga Park, CA",
        photo: "/testimonials/client-10.webp",
        rating: 5,
    },
];

function StarRating({ count }: { count: number }) {
    return (
        <div style={{ display: "flex", gap: "3px" }}>
            {Array.from({ length: count }).map((_, i) => (
                <span key={i} style={{ color: "#facc15", fontSize: "14px" }}>★</span>
            ))}
        </div>
    );
}

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [visible, setVisible] = useState(true);
    const [animating, setAnimating] = useState(false);
    const mobileScrollRef = useRef<HTMLDivElement>(null);

    const goTo = useCallback((index: number) => {
        if (animating) return;
        setAnimating(true);
        setVisible(false);
        setTimeout(() => {
            setCurrent(index);
            setVisible(true);
            setAnimating(false);
        }, 350);
    }, [animating]);

    const next = useCallback(() => {
        goTo(current === TESTIMONIALS.length - 1 ? 0 : current + 1);
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo(current === 0 ? TESTIMONIALS.length - 1 : current - 1);
    }, [current, goTo]);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const t = TESTIMONIALS[current];

    return (
        <section style={{ width: "100%", background: "linear-gradient(to bottom, #f3f4f6 0%, #2d2010 40%, #1a1200 100%)", paddingTop: "64px", paddingBottom: "64px", overflow: "hidden" }}>

            {/* HEADER */}
            <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}>
                <h2 style={{ color: "#1a1a1a", fontSize: "28px", fontWeight: "700", margin: 0 }}>
                    What Our Clients Say
                </h2>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "14px", marginTop: "8px", margin: "8px 0 0" }}>
                    Real stories from real homeowners
                </p>
            </div>

            {/* DESKTOP — fade carousel */}
            <div
                className="hidden md:block"
                style={{ maxWidth: "768px", margin: "0 auto", padding: "0 24px" }}
            >
                <div
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0px)" : "translateY(10px)",
                        transition: "opacity 0.35s ease, transform 0.35s ease",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: "80px", color: "white", lineHeight: "1", fontFamily: "Georgia, serif", marginBottom: "8px" }}>
                        &ldquo;
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px", lineHeight: "1.7", fontWeight: "300", margin: "0 auto", maxWidth: "600px" }}>
                        {t.quote}
                    </p>
                    <div style={{ marginTop: "36px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "64px", height: "64px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.2)" }}>
                            <img src={t.photo} alt={t.name} style={{ width: "64px", height: "64px", objectFit: "cover", display: "block" }} />
                        </div>
                        <StarRating count={t.rating} />
                        <p style={{ color: "white", fontWeight: "600", fontSize: "15px", margin: 0 }}>{t.name}</p>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 }}>{t.location}</p>
                    </div>
                </div>

                {/* DESKTOP CONTROLS */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "48px" }}>
                    <button type="button" onClick={prev} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <FiChevronLeft size={18} />
                    </button>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {TESTIMONIALS.map((_, i) => (
                            <button key={i} type="button" onClick={() => goTo(i)} style={{ width: i === current ? "24px" : "6px", height: "6px", borderRadius: "999px", backgroundColor: i === current ? "white" : "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
                        ))}
                    </div>
                    <button type="button" onClick={next} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <FiChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* MOBILE — horizontal scroll cards */}
            <div className="md:hidden">
                <div
                    ref={mobileScrollRef}
                    style={{
                        display: "flex",
                        gap: "16px",
                        overflowX: "auto",
                        paddingLeft: "24px",
                        paddingRight: "24px",
                        paddingBottom: "8px",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    {TESTIMONIALS.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            style={{
                                flexShrink: 0,
                                width: "80vw",
                                backgroundColor: "rgba(255,255,255,0.06)",
                                borderRadius: "16px",
                                padding: "20px",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            {/* QUOTE MARK */}
                            <div style={{ fontSize: "40px", color: "white", fontFamily: "Georgia, serif", lineHeight: "1", marginBottom: "8px", alignItems: "center", display: "flex", justifyContent: "center" }}>
                                &ldquo;
                            </div>

                            {/* QUOTE TEXT */}
                            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", lineHeight: "1.7", fontWeight: "300", margin: 0, textAlign: "center" }}>
                                {testimonial.quote}
                            </p>

                            {/* CLIENT */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
                                {/* PHOTO */}
                                <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.2)", flexShrink: 0 }}>
                                    <img
                                        src={testimonial.photo}
                                        alt={testimonial.name}
                                        style={{ width: "44px", height: "44px", objectFit: "cover", display: "block" }}
                                    />
                                </div>

                                {/* NAME + LOCATION + STARS */}
                                <div>
                                    <p style={{ color: "white", fontWeight: "600", fontSize: "13px", margin: 0, }}>
                                        {testimonial.name}
                                    </p>
                                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", margin: "2px 0 4px" }}>
                                        {testimonial.location}
                                    </p>
                                    <StarRating count={testimonial.rating} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
