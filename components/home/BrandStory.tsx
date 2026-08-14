"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import { useShop } from "@/context/ShopContext";
import { translations } from "@/data/translations";

export default function BrandStory() {
  const { language } = useShop();
  const t = translations[language].story;

  return (
    <section className="py-24 bg-brand-soft-black/20 border-t border-b border-brand-gold/5 text-brand-off-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image Column */}
          <div className="lg:col-span-6 relative aspect-[4/5] w-full bg-brand-soft-black overflow-hidden border border-brand-gold/5 shadow-2xl">
            <Image
              src="/images/brand-story.jpg"
              alt="Ibrahim Khoder Atelier Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Elegant overlay frame */}
            <div className="absolute inset-6 border border-brand-gold/15 pointer-events-none" />
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs tracking-[0.3em] font-medium text-brand-gold uppercase block">
                {t.subtitle}
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl tracking-wide uppercase font-medium">
                {t.title}
              </h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6 text-brand-gray font-light text-sm sm:text-base leading-relaxed">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>

            <div className="pt-4">
              <Link href="/about">
                <Button variant="secondary" size="md">
                  {t.btn}
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
