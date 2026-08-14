"use client";

import Link from "next/link";
import Button from "../ui/Button";

export default function PromoBanner() {
  return (
    <section className="relative py-32 sm:py-48 w-full flex items-center justify-center bg-brand-black overflow-hidden border-t border-b border-brand-gold/10">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/promo-banner.jpg')] opacity-40 grayscale"
        style={{ backgroundPosition: "center 40%", backgroundAttachment: "fixed" }}
      />

      {/* Cinematic Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/50 to-brand-black/90" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-6 sm:space-y-8 flex flex-col items-center">
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs tracking-[0.4em] font-medium text-brand-gold uppercase block">
            Limited Release
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl tracking-wide uppercase text-brand-off-white font-medium">
            The New Collection
          </h2>
          <p className="text-xs sm:text-base font-light text-brand-gray tracking-wide max-w-md sm:max-w-lg leading-relaxed mx-auto">
            Designed for the modern lifestyle. Melding structured architectural silhouettes with absolute comfort.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/shop">
            <Button variant="primary" size="md">
              Discover More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
