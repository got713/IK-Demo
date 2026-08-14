"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Collections() {
  const collectionCards = [
    {
      title: "Men",
      subtitle: "Tailored Modernity",
      image: "/images/collection-men.jpg",
      href: "/shop?category=Suits",
    },
    {
      title: "Women",
      subtitle: "Elegant Minimalism",
      image: "/images/collection-women.jpg",
      href: "/shop?category=Shirts",
    },
    {
      title: "New Arrivals",
      subtitle: "Season 2026 Collection",
      image: "/images/collection-new.jpg",
      href: "/shop?filter=new",
    },
  ];

  return (
    <section id="collections" className="py-24 bg-brand-black text-brand-off-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] font-medium text-brand-gold uppercase">
            Curated Categories
          </span>
          <h2 className="font-playfair text-2xl sm:text-4xl tracking-wide uppercase font-medium">
            Explore Collections
          </h2>
          <p className="text-xs sm:text-sm text-brand-gray font-light max-w-md mx-auto">
            Discover bespoke ranges designed to match your individual style.
          </p>
        </div>

        {/* Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {collectionCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative block aspect-[3/4] overflow-hidden bg-brand-soft-black border border-brand-gold/5"
            >
              {/* Image */}
              <Image
                src={card.image}
                alt={`${card.title} Collection`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-brand-black/40 group-hover:via-brand-black/40 transition-colors duration-300" />

              {/* Gold Border Frame (Transitions on Hover) */}
              <div className="absolute inset-4 border border-brand-gold/0 scale-95 group-hover:border-brand-gold/20 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none" />

              {/* Content Panel */}
              <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col justify-end space-y-1.5">
                <span className="text-[10px] tracking-[0.2em] font-light text-brand-gold uppercase">
                  {card.subtitle}
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl tracking-wider text-brand-off-white uppercase font-medium">
                  {card.title}
                </h3>
                
                {/* Explore CTA (Appears on Hover) */}
                <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-brand-gold uppercase pt-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
