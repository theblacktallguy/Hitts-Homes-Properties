"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const REASONS = [
  {
    number: "01",
    icon: "🗺️",
    title: "Neighborhood Intelligence",
    description: "We don't just show homes, we show you the community around them. Get a real feel for the area before you even step foot inside.",
    image: "/why-choose/neighborhood.webp",
  },
  {
    number: "02",
    icon: "📸",
    title: "Multi-Photo Listings",
    description: "Every property has up to 20 real photos, no stock images. See exactly what you're getting before you make a move.",
    image: "/why-choose/photos.webp",
  },
  {
    number: "03",
    icon: "🏷️",
    title: "Transparent Pricing",
    description: "No bait-and-switch, what you see is the real price. No hidden fees, no surprise charges — just honest numbers.",
    image: "/why-choose/pricing.webp",
  },
  {
    number: "04",
    icon: "⚡",
    title: "Instant Results",
    description: "No loading spinners, results appear as you filter. Our platform is built for speed so you spend less time waiting.",
    image: "/why-choose/instant.webp",
  },
  {
    number: "05",
    icon: "🔄",
    title: "Always Fresh",
    description: "Listings updated regularly, no stale or sold properties shown. Every listing you see is available right now.",
    image: "/why-choose/fresh.webp",
  },
  {
    number: "06",
    icon: "🎯",
    title: "Precision Filtering",
    description: "Filter by state, city, type, price range and listing type simultaneously. Find exactly what you need in seconds.",
    image: "/why-choose/filtering.webp",
  },
  {
    number: "07",
    icon: "📞",
    title: "Direct Agent Access",
    description: "Skip the middleman and contact the agent directly from any listing. Real conversations, real results.",
    image: "/why-choose/agent.webp",
  },
  {
    number: "08",
    icon: "🏠",
    title: "Every Property Type",
    description: "From land lots to luxury condos, one platform covers it all. No need to jump between sites.",
    image: "/why-choose/property-types.webp",
  },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scrollContainer =
      document.querySelector(".scroll-container") ?? window;

    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        setInView(true);
      }
    };

    check();
    scrollContainer.addEventListener("scroll", check, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", check);
  }, []);

  return { ref, inView };
}

// DESKTOP ROW
function ReasonRow({
  reason,
  index,
}: {
  reason: (typeof REASONS)[0];
  index: number;
}) {
  const { ref, inView } = useInView();
  const isEven = index % 2 === 0;
  const tilt = isEven ? "-2deg" : "2deg";

  return (
    <div
      ref={ref}
      className={`hidden md:flex items-center gap-0 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0)"
          : isEven
          ? "translateX(-40px)"
          : "translateX(40px)",
        transition: "all 0.7s ease",
      }}
    >
      {/* TEXT SIDE */}
      <div className="flex-1 py-10 px-8">
        <div
          className={`flex flex-col ${
            isEven ? "items-start" : "items-end text-right"
          }`}
        >
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
            {reason.number}
          </span>
          <span className="text-3xl mb-3">{reason.icon}</span>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {reason.title}
          </h3>
          <p className="text-gray-500 text-base leading-relaxed max-w-sm">
            {reason.description}
          </p>
        </div>
      </div>

      {/* ANIMATED DIVIDER */}
      <div className="relative flex flex-col items-center self-stretch py-4">
        <div className="w-px flex-1 bg-gray-200 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-black"
            style={{
              height: inView ? "100%" : "0%",
              transition: "height 0.8s ease 0.2s",
            }}
          />
        </div>
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white z-10 my-2 shrink-0"
          style={{
            borderColor: inView ? "black" : "#e5e7eb",
            transition: "border-color 0.4s ease 0.6s",
          }}
        >
          <span className="text-lg">{reason.icon}</span>
        </div>
        <div className="w-px flex-1 bg-gray-200 relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 w-full bg-black"
            style={{
              height: inView ? "100%" : "0%",
              transition: "height 0.8s ease 0.2s",
            }}
          />
        </div>
      </div>

      {/* IMAGE SIDE */}
      <div className="flex-1 py-10 px-8 flex items-center justify-center">
        <div
          style={{
            transform: inView
              ? `rotate(${tilt})`
              : "rotate(0deg) scale(0.9)",
            transition: "transform 0.7s ease 0.2s, opacity 0.7s ease 0.2s",
            opacity: inView ? 1 : 0,
          }}
          className="relative w-full max-w-xs"
        >
          <div
            className="absolute inset-0 rounded-2xl bg-black/10 shadow-xl"
            style={{
              transform: `rotate(${isEven ? "2deg" : "-2deg"})`,
            }}
          />
          <img
            src={reason.image}
            alt={reason.title}
            className="relative w-full h-56 object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-black shadow-lg">
            {reason.number}
          </div>
        </div>
      </div>
    </div>
  );
}

// MOBILE CARD
function MobileCard({ reason }: { reason: (typeof REASONS)[0] }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* IMAGE */}
      <div className="relative w-full h-40">
        <img
          src={reason.image}
          alt={reason.title}
          className="w-full h-full object-cover"
        />
        {/* NUMBER BADGE */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-black">
          {reason.number}
        </div>
        {/* ICON BADGE */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-base shadow">
          {reason.icon}
        </div>
      </div>

      {/* TEXT */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-1">
          {reason.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {reason.description}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gray-100 py-14">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Why Choose Hitts Homes & Properties?
          </h2>
          <p className="mt-2 text-gray-500 text-sm md:text-base">
            We do things differently — here's how
          </p>
        </div>

        {/* DESKTOP — alternating split layout */}
        <div className="hidden md:block">
          {REASONS.map((reason, index) => (
            <ReasonRow key={reason.number} reason={reason} index={index} />
          ))}
        </div>

        {/* MOBILE — stacked cards */}
        <div className="md:hidden flex flex-col gap-4 pb-2">
          {REASONS.map((reason) => (
            <MobileCard key={reason.number} reason={reason} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-9 md:mt-20 text-center">
          <Link
            href="/why-choose-us"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition"
          >
            Learn More About Us →
          </Link>
        </div>

      </div>
    </section>
  );
}