"use client";

import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = {
  imageFolder: string;
  total?: number;
};

export default function PropertyImageCarousel({
  imageFolder,
  total = 1,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const width = el.clientWidth;

    const nextIndex =
      dir === "left"
        ? activeIndex === 1
          ? total
          : activeIndex - 1
        : activeIndex === total
          ? 1
          : activeIndex + 1;

    el.scrollTo({
      left: (nextIndex - 1) * width,
      behavior: "smooth",
    });

    setActiveIndex(nextIndex);
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const index = Math.round(el.scrollLeft / el.clientWidth) + 1;
    setActiveIndex(Math.min(Math.max(index, 1), total));
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{
        height: "clamp(320px, 55vh, 520px)",
      }}
    >
      <button
        onClick={() => scroll("left")}
        className="flex absolute left-3 top-1/2 -translate-y-1/2 z-10
                   bg-gray-200 text-black hover:bg-black hover:text-white rounded-full p-2"
      >
        <FiChevronLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="flex absolute right-3 top-1/2 -translate-y-1/2 z-10
                   bg-gray-200 text-black hover:bg-black hover:text-white rounded-full p-2"
      >
        <FiChevronRight />
      </button>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="
    flex w-full overflow-x-auto scroll-smooth
    snap-x snap-mandatory
    touch-pan-x
    no-scrollbar
  "
        style={{
          height: "100%",
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-full min-w-full shrink-0 snap-center overflow-hidden"
            style={{
              height: "100%",
            }}
          >
            <img
              src={`/property-images/${imageFolder}/${i + 1}.webp`}
              className="block"
              style={{
                width: "100%",
                height: "100%",
                minHeight: "100%",
                objectFit: "cover",
                display: "block",
              }}
              alt={`property-${i + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="absolute top-3 right-3 z-30 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
        {activeIndex} / {total}
      </div>
    </div>
  );
}