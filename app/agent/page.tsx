"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiPhone, FiMail, FiStar, FiMapPin, FiAward, FiCheckCircle } from "react-icons/fi";
import SearchHeader from "@/components/layout/SearchHeader";
import { formatPhoneNumber } from "@/lib/formatPhoneNumber";


const AGENT = {
    name: "David Hitt",
    title: "Founder & Lead Agent",
    license: "License #01210537",
    rating: 5.0,
    reviews: 12,
    status: "Currently taking calls",
    phone: "(248) 636-0376",
    email: "agentdavidhitt@gmail.com",
    redfin: "https://www.redfin.com/real-estate-agents/david-hitt/reviews",
    images: {
        headshot: "/agent/david-hitt.jpg",
        hero: "/agent/david-hero.jpg",
        photo2: "/agent/david-2.jpg",
        photo3: "/agent/david-3.jpg",
    },
    stats: [
        { label: "Total Deals", value: "185" },
        { label: "Sales Volume", value: "$163M" },
        { label: "Highest Sale", value: "$6.0M" },
        { label: "Years Experience", value: "29" },
    ],
    bio: [
        "With 29 years of experience and over 300 homes sold, David Hitt guides buyers and sellers through every step of the real estate process with clarity, patience, and integrity.",
        "A longtime San Fernando Valley resident, he brings deep local market knowledge and a steady, supportive approach to every transaction.",
        "Whether you're a first-time buyer, military, senior, investor, or selling a family home during a major life transition, David provides the sensitivity and guidance you need.",
        "Outside of real estate, David enjoys pickleball, Orangetheory, yoga, traveling, and walking his dog.",
    ],
    specialties: [
        "First-Time Buyers",
        "Military Buyers & Sellers",
        "Seniors & Downsizers",
        "Real Estate Investors",
        "Family Home Transitions",
        "Luxury Properties",
        "Relocation Services",
        "Short Sales & Foreclosures",
    ],
    areas: [
        "Sherman Oaks", "Studio City", "Encino", "Porter Ranch",
        "Northridge", "West Hills", "Granada Hills", "Woodland Hills",
        "Burbank", "Los Angeles", "Van Nuys", "North Hills",
        "North Hollywood", "Canoga Park", "Chatsworth", "Reseda",
    ],
};

function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.message) return;
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", phone: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
                Send David a Message
            </h3>

            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                            Full Name *
                        </label>
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your name"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                            Email *
                        </label>
                        <input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="your@email.com"
                            type="email"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                        Phone (optional)
                    </label>
                    <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
                        placeholder="(000) 000-0000"
                        type="tel"
                        inputMode="numeric"
                        maxLength={14}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                    />
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                        Message *
                    </label>
                    <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell David what you're looking for..."
                        rows={5}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition resize-none"
                    />
                </div>

                {status === "success" && (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                        <FiCheckCircle />
                        Message sent! David will get back to you shortly.
                    </div>
                )}

                {status === "error" && (
                    <p className="text-red-500 text-sm">
                        Something went wrong. Please try again or call directly.
                    </p>
                )}

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    className="bg-black text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition disabled:opacity-50"
                >
                    {status === "sending" ? "Sending..." : "Send Message"}
                </button>
            </div>
        </div>
    );
}

export default function AgentPage() {
    return (
        <main className="bg-gray-50 min-h-screen">
            <SearchHeader />

            {/* HERO — DESKTOP */}
            <div className="hidden md:block relative w-full h-[60vh] overflow-hidden">
                <Image
                    src={AGENT.images.hero}
                    alt="David Hitt"
                    fill
                    className="object-cover object-top"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-12">
                    <div className="max-w-6xl mx-auto flex items-end gap-6">
                        <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl shrink-0">
                            <Image
                                src={AGENT.images.headshot}
                                alt={AGENT.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="pb-1">
                            <h1 className="text-5xl font-bold text-white">{AGENT.name}</h1>
                            <p className="text-white/80 text-base mt-1">
                                {AGENT.title} · {AGENT.license}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <FiStar key={s} className="text-yellow-400 fill-yellow-400 text-sm" />
                                    ))}
                                </div>
                                <span className="text-white text-sm font-medium">
                                    {AGENT.rating.toFixed(1)}
                                </span>

                                <a
                                    href={AGENT.redfin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 text-sm underline hover:text-white"
                                >
                                    ({AGENT.reviews} reviews)
                                </a>
                                <span className="flex items-center gap-1.5 text-green-400 text-sm">
                                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                                    {AGENT.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HERO — MOBILE */}
            <div className="md:hidden">
                <div
                    className="w-full overflow-hidden relative"
                    style={{ height: "280px" }}
                >
                    {/* HERO BACKGROUND */}
                    <img
                        src="/agent/david-hero.jpg"
                        alt="David Hitt hero"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                        }}
                    />

                    {/* GRADIENT OVERLAY */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                        }}
                    />

                    {/* PROFILE CONTENT INSIDE HERO */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: "16px",
                            display: "flex",
                            alignItems: "flex-end",
                            gap: "12px",
                        }}
                    >
                        {/* HEADSHOT */}
                        <div
                            style={{
                                position: "relative",
                                width: "72px",
                                height: "72px",
                                borderRadius: "12px",
                                overflow: "hidden",
                                border: "3px solid white",
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src="/agent/david-hitt.jpg"
                                alt={AGENT.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>

                        {/* TEXT */}
                        <div style={{ flex: 1, paddingBottom: "4px" }}>
                            <h1 style={{ color: "white", fontSize: "22px", fontWeight: "700", margin: 0 }}>
                                {AGENT.name}
                            </h1>
                            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", margin: "2px 0 0" }}>
                                {AGENT.title} · {AGENT.license}
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", flexWrap: "wrap" }}>
                                <span style={{ color: "#facc15", fontSize: "13px", letterSpacing: "2px" }}>★★★★★</span>
                                <span style={{ color: "white", fontSize: "12px", fontWeight: "600" }}>
                                    {AGENT.rating.toFixed(1)}
                                </span>

                                <a href={AGENT.redfin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}
                                >
                                    ({AGENT.reviews} reviews)
                                </a>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#4ade80", display: "inline-block" }} />
                                <span style={{ color: "#4ade80", fontSize: "11px" }}>{AGENT.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS BAR */}
            <div className="hidden md:block bg-black text-white">
                <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-4 gap-4">
                    {AGENT.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl font-black">{stat.value}</p>
                            <p className="text-white/60 text-xs mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* STATS — MOBILE */}
            <div className="md:hidden mx-4 -mt-5 py-8 relative z-10 mb-6">
                <div className="bg-white rounded-2xl shadow-lg grid grid-cols-2 gap-0 overflow-hidden border border-gray-100">
                    {AGENT.stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`text-center py-4 px-2 ${index % 2 === 0 ? "border-r border-gray-100" : ""
                                } ${index < 2 ? "border-b border-gray-100" : ""}`}
                        >
                            <p className="text-xl font-black text-gray-900">{stat.value}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 ">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* LEFT — main content */}
                    <div className="md:col-span-2 flex flex-col gap-8">

                        {/* ABOUT */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FiAward className="text-black" />
                                About David
                            </h2>
                            <div className="flex flex-col gap-3">
                                {AGENT.bio.map((para, i) => (
                                    <p key={i} className="text-gray-600 text-sm leading-relaxed">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* PHOTOS */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-sm">
                                <Image
                                    src={AGENT.images.photo2}
                                    alt="David Hitt"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-sm">
                                <Image
                                    src={AGENT.images.photo3}
                                    alt="David Hitt"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* SPECIALTIES */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Specialties
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {AGENT.specialties.map((s) => (
                                    <span
                                        key={s}
                                        className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* AREAS */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FiMapPin className="text-black" />
                                Areas Served
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {AGENT.areas.map((area) => (
                                    <span
                                        key={area}
                                        className="border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full"
                                    >
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CONTACT FORM */}
                        <section id="contact-agent" className="text-gray-900">
                            <ContactForm />
                        </section>

                    </div>

                    {/* RIGHT — sidebar */}
                    <div className="flex flex-col gap-4">

                        {/* CONTACT CARD */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                            <h3 className="text-base font-bold text-gray-900 mb-4">
                                Contact David
                            </h3>

                            <div className="flex flex-col mb-6 gap-3">

                                <a href={`tel:${AGENT.phone}`}
                                    className="flex items-center gap-3 bg-black text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
                                >
                                    <FiPhone />
                                    {AGENT.phone}
                                </a>


                                <a href={`mailto:${AGENT.email}`}
                                    className="flex items-center gap-3 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                                >
                                    <FiMail />
                                    {AGENT.email}
                                </a>

                                <div className="flex items-center gap-2 text-green-600 text-xs font-medium pt-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    {AGENT.status}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 mb-6 mt-5 pt-5">
                                <p className="text-xs text-gray-500 mb-3">Verified on Redfin Agents</p>

                                <a href={AGENT.redfin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:underline"
                                >
                                    ⭐ View Redfin Reviews {" →"}
                                </a>
                            </div>

                            <div className="border-t border-gray-100 mt-5 pt-5">
                                <Link
                                    href="/search"
                                    className="block text-center bg-gray-100 text-gray-800 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
                                >
                                    Browse Properties {" →"}
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div >

        </main >
    );
}
