"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <>
      {/* MAIN IMAGE */}
      <div className="relative h-[70vh] w-full bg-white border border-gray-100 shadow-sm overflow-hidden group">
        <Image
          src={activeImage}
          alt={alt}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-6 gap-3 mt-4">
        {images.map((url, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(url)}
            className={`relative aspect-square bg-white border overflow-hidden transition-all ${
              activeImage === url
                ? "border-[#C6A87C]"
                : "border-gray-100 hover:border-[#C6A87C]"
            }`}
          >
            <Image
              src={url}
              alt={`${alt} view ${i + 1}`}
              fill
              className="object-cover p-1"
            />
          </button>
        ))}
      </div>
    </>
  );
}
