"use client";

import Image from "next/image";
import Link from "next/link";
import { FiPhone } from "react-icons/fi";

const agent = {
  name: "David Hitt",
  title: "Founder & Lead Agent",
  license: "License #01210537",
  rating: 5.0,
  image: "/agent/david-hitt.jpg",

  phone: "(248) 636-0376",
  email: "agentdavidhitt@gmail.com",

  status: "Currently taking calls",

  stats: [
    { label: "Total Deals", value: "185" },
    { label: "Sales Volume", value: "$163M" },
    { label: "Highest Sale", value: "$6.0M" },
    { label: "Neighborhood Sales", value: "19" },
  ],

  bio: "With 29 years of experience and over 300 homes sold, David Hitt guides buyers and sellers through every step of the real estate process with clarity, patience, and integrity.",
};

function Stars() {
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {"★★★★★".split("").map((s, i) => (
        <span key={i} className="text-base">
          {s}
        </span>
      ))}
    </div>
  );
}

export default function AgentSection() {
  return (
    <section className="w-full bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col gap-4">

            {/* NAME */}
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-black">
              {agent.name}
            </h2>

            {/* TITLE */}
            <p className="text-gray-600 text-center">{agent.title}</p>

            {/* RATING */}
            <div className="flex items-center gap-3 text-center">
              <Stars />
              <span className="text-sm text-gray-700 font-medium">
                {agent.rating.toFixed(1)}
              </span>
            </div>

            {/* LICENSE */}
            <p className="text-xs text-gray-500">{agent.license}</p>

            {/* STATUS */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-700">{agent.status}</span>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              {agent.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 border rounded-xl bg-gray-50"
                >
                  <p className="text-lg font-semibold text-black">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* BIO */}
            <p className="text-gray-700 text-sm leading-relaxed mt-2">
              {agent.bio}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">

              <Link
                href="/agent"
                className="bg-black text-white px-5 py-3 rounded-lg text-sm font-medium text-center hover:opacity-90"
              >
                Meet David Hitt →
              </Link>

              <a
                href={`tel:${agent.phone}`}
                className="flex items-center text-black justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg text-sm hover:bg-gray-50"
              >
                <FiPhone size={16} />
                Contact Agent
              </a>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}