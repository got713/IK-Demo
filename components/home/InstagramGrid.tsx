"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { translations } from "@/data/translations";

export default function InstagramGrid() {
  const { language } = useShop();
  const t = translations[language].social;

  const instagramPosts = [
    { id: 1, image: "/images/collection-men.jpg" },
    { id: 2, image: "/images/products/suit.jpg" },
    { id: 3, image: "/images/collection-women.jpg" },
    { id: 4, image: "/images/products/watch.jpg" },
    { id: 5, image: "/images/collection-new.jpg" },
    { id: 6, image: "/images/products/shoes.jpg" },
  ];

  return (
    <section className="py-24 bg-brand-black text-brand-off-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] font-medium text-brand-gold uppercase">
            {t.subtitle}
          </span>
          <h2 className="font-playfair text-2xl sm:text-4xl tracking-wide uppercase font-medium">
            {t.title}
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-brand-gold hover:text-brand-gold-light transition-colors font-light tracking-widest lowercase flex items-center justify-center gap-1.5 mt-1"
          >
            <Instagram className="w-3.5 h-3.5" />
            @ibrahimkhoder
          </a>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square bg-brand-soft-black overflow-hidden border border-brand-gold/5"
            >
              {/* Image */}
              <Image
                src={post.image}
                alt={`Instagram lookbook frame ${post.id}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Hover Dark overlay */}
              <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none" />

              {/* Hover Instagram Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                <Instagram className="w-6 h-6 text-brand-gold" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
