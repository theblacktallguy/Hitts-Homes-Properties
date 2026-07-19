"use client";

import { useState } from "react";
import {
  getLocalPropertyImageUrl,
  getPropertyImageUrl,
} from "@/lib/propertyImages";

type Props = {
  imageFolder: string;
  alt: string;
  className?: string;
};

export default function PropertyImageWithFallback({
  imageFolder,
  alt,
  className,
}: Props) {
  const [useLocalFallback, setUseLocalFallback] = useState(false);

  return (
    <img
      src={
        useLocalFallback
          ? getLocalPropertyImageUrl(imageFolder)
          : getPropertyImageUrl(imageFolder)
      }
      alt={alt}
      onError={() => setUseLocalFallback(true)}
      className={className}
    />
  );
}
