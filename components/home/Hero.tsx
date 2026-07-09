"use client";

import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section
      className="
        relative w-full overflow-hidden
        h-[15.125rem] md:h-[37.75rem]
      "
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/heros-bg/hero-bg4.jpg"
          alt="Luxury homes"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/25" />

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-6 text-white">

        <h1 className="text-xl md:text-5xl font-bold leading-tight">
          Find your next home with confidence
        </h1>

        <p className="mt-2 md:mt-4 text-sm md:text-lg text-white/80">
          Search thousands of verified listings instantly.
        </p>

        <div id="search-bar" className="mt-3 md:mt-8 w-full px-4 md:px-0 flex justify-center">
          <div className="w-full max-w-[22rem] md:max-w-3xl">
            <SearchBar />
          </div>
        </div>

      </div>
    </section>
  );
}