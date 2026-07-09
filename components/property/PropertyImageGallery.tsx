"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PropertyImageGallery({
  propertyId,
}: {
  propertyId: string;
}) {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      const found: string[] = [];

      for (let i = 1; i <= 20; i++) {
        const path = `/property-images/${propertyId}/${i}.webp`;

        const exists = await new Promise<boolean>((resolve) => {
          const img = new window.Image();
          img.src = path;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });

        if (!exists) break;
        found.push(path);
      }

      setImages(found);
    };

    load();
  }, [propertyId]);

  if (!images.length) return null;

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      <Image
        src={images[index]}
        alt="Property image"
        fill
        className="object-cover"
      />

      <button
        onClick={() => setIndex((p) => Math.max(p - 1, 0))}
        className="absolute left-3 top-1/2 bg-black/40 text-white px-3 py-1 rounded"
      >
        ‹
      </button>

      <button
        onClick={() =>
          setIndex((p) => Math.min(p + 1, images.length - 1))
        }
        className="absolute right-3 top-1/2 bg-black/40 text-white px-3 py-1 rounded"
      >
        ›
      </button>
    </div>
  );
}