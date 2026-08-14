"use client";

import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { translations } from "@/data/translations";

export default function AboutPage() {
  const { language } = useShop();
  const t = translations[language].about_page;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-32 font-inter text-brand-off-white">
      {/* Editorial Header */}
      <div className="border-b border-brand-gold/10 pb-8 mb-16 text-center sm:text-left">
        <span className="text-[10px] tracking-[0.4em] font-medium text-brand-gold uppercase block mb-2">
          {t.subtitle}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl tracking-wide uppercase font-semibold">
          {t.title}
        </h1>
        <p className="text-xs sm:text-base text-brand-gray font-light max-w-xl mt-3 leading-relaxed">
          {t.desc}
        </p>
      </div>

      {/* Row 1: The Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-playfair text-xl sm:text-2xl uppercase tracking-wider text-brand-gold">
            {t.origins_title}
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
            <p>{t.origins_p1}</p>
            <p>{t.origins_p2}</p>
          </div>
        </div>
        <div className="lg:col-span-6 relative aspect-[4/3] w-full bg-brand-soft-black overflow-hidden border border-brand-gold/10">
          <Image
            src="/images/collection-women.jpg"
            alt="Atelier workspace sewing details"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Row 2: Vision & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-brand-gold/10">
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-gold uppercase block">01</span>
          <h3 className="font-playfair text-lg uppercase tracking-wide">{t.v1_title}</h3>
          <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
            {t.v1_desc}
          </p>
        </div>
        
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-gold uppercase block">02</span>
          <h3 className="font-playfair text-lg uppercase tracking-wide">{t.v2_title}</h3>
          <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
            {t.v2_desc}
          </p>
        </div>
        
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-gold uppercase block">03</span>
          <h3 className="font-playfair text-lg uppercase tracking-wide">{t.v3_title}</h3>
          <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
            {t.v3_desc}
          </p>
        </div>
      </div>
    </div>
  );
}
