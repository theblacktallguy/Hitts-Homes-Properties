"use client";

import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import {
  getLocalPropertyImageUrl,
  getPropertyImageUrl,
} from "@/lib/propertyImages";

type Props = {
  imageFolder: string;
  listingType: string;
  total?: number;
};

export default function PropertyImageCarousel({
  imageFolder,
  listingType,
  total = 1,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const [activeIndex, setActiveIndex] = useState(1);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const isRent = listingType === "rent";

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

  const changeViewerImage = (direction: "left" | "right") => {
    setViewerIndex((currentIndex) => {
      if (!currentIndex) return 1;

      if (direction === "left") {
        return currentIndex === 1 ? total : currentIndex - 1;
      }

      return currentIndex === total ? 1 : currentIndex + 1;
    });
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{
        height: "clamp(320px, 55vh, 520px)",
      }}
    >
      <span
        className={`absolute left-4 top-4 z-30 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm ${
          isRent
            ? "border-blue-200 bg-blue-50/90 text-blue-800"
            : "border-emerald-200 bg-emerald-50/90 text-emerald-800"
        }`}
      >
        {isRent ? "For Rent" : "For Sale"}
      </span>

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
          <button
            type="button"
            key={i}
            className="w-full min-w-full shrink-0 snap-center overflow-hidden"
            onClick={() => setViewerIndex(i + 1)}
            aria-label={`Open property image ${i + 1}`}
            style={{
              height: "100%",
            }}
          >
            <img
              src={getPropertyImageUrl(imageFolder, i + 1)}
              onError={(event) => {
                event.currentTarget.src = getLocalPropertyImageUrl(
                  imageFolder,
                  i + 1
                );
              }}
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
          </button>
        ))}
      </div>

      <div className="absolute top-3 right-3 z-30 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
        {activeIndex} / {total}
      </div>

      {viewerIndex && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Property image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setViewerIndex(null)}
        >
          <button
            type="button"
            onClick={() => setViewerIndex(null)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            aria-label="Close image viewer"
          >
            <FiX className="text-2xl" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              changeViewerImage("left");
            }}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 md:left-8"
            aria-label="Previous image"
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              const difference = touchStartX.current - event.changedTouches[0].clientX;

              if (Math.abs(difference) > 40) {
                changeViewerImage(difference > 0 ? "right" : "left");
              }
            }}
          >
            <img
              src={getPropertyImageUrl(imageFolder, viewerIndex)}
              onError={(event) => {
                event.currentTarget.src = getLocalPropertyImageUrl(
                  imageFolder,
                  viewerIndex
                );
              }}
              alt={`Property image ${viewerIndex} of ${total}`}
              className="max-h-full max-w-full object-contain"
            />

            <span className="absolute bottom-5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
              {viewerIndex} / {total}
            </span>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              changeViewerImage("right");
            }}
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 md:right-8"
            aria-label="Next image"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
}
