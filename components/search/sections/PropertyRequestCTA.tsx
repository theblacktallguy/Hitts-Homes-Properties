"use client";

import Link from "next/link";
import { FiSearch, FiHome } from "react-icons/fi";

export default function PropertyRequestCTA() {
  return (
    <section className="px-4 md:px-8 py-8">
      <div
        className="
          max-w-7xl mx-auto
          bg-white
          border border-gray-200
          rounded-3xl
          p-6 md:p-10
          flex flex-col md:flex-row
          items-center
          justify-between
          gap-6
          shadow-sm
        "
      >

        {/* TEXT */}
        <div className="flex items-start gap-4">

          <div
            className="
              hidden sm:flex
              w-14 h-14
              rounded-2xl
              bg-blue-50
              items-center
              justify-center
              shrink-0
            "
          >
            <FiHome className="text-2xl text-blue-600" />
          </div>


          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Can't find what you're looking for?
            </h2>

            <p className="mt-2 text-sm md:text-base text-gray-500 max-w-xl">
              Tell us what type of property you need and our team will help
              you find available homes that match your preferences.
            </p>
          </div>

        </div>


        {/* BUTTON */}
        <Link
          href="/request-property"
          className="
            w-full md:w-auto
            px-6 py-3
            rounded-xl
            bg-blue-600
            text-white
            font-semibold
            text-center
            hover:bg-blue-700
            transition
            flex
            items-center
            justify-center
            gap-2
            whitespace-nowrap
          "
        >
          <FiSearch />
          Request a Property
        </Link>


      </div>
    </section>
  );
}