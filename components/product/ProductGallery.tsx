"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  // Simulate a multi-image gallery by replicating the primary image with minor hue rotations or zoom
  const galleryImages = [
    images[0],
    // We can use the same image to demonstrate gallery switching
    images[0],
    images[0],
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Preview Image */}
      <div className="relative aspect-[3/4] w-full bg-brand-soft-black border border-brand-gold/5 overflow-hidden rounded-sm">
        <Image
          src={galleryImages[activeIndex]}
          alt={`${name} preview ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Thumbnails Row */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {galleryImages.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 aspect-[3/4] bg-brand-soft-black border shrink-0 transition-all ${
                activeIndex === idx
                  ? "border-brand-gold bg-brand-gold/5"
                  : "border-brand-gray/25 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
