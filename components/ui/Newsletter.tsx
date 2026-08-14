"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import Button from "./Button";
import { translations } from "@/data/translations";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { addToast, language } = useShop();
  const t = translations[language].newsletter;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      addToast(t.error, "error");
      return;
    }
    addToast(t.success, "success");
    setEmail("");
  };

  return (
    <section className="py-24 bg-brand-soft-black/30 border-t border-brand-gold/15 text-brand-off-white font-inter">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs tracking-[0.4em] font-medium text-brand-gold uppercase block">
            {t.subtitle}
          </span>
          <h2 className="font-playfair text-2xl sm:text-4xl tracking-wide uppercase font-medium">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-brand-gray font-light max-w-md mx-auto leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 px-4 py-3 bg-brand-black border border-brand-gold/15 text-brand-off-white text-xs sm:text-sm tracking-wide rounded-sm placeholder:text-brand-gray/40 focus:border-brand-gold focus:ring-0 transition-colors"
            required
          />
          <Button variant="primary" type="submit" className="px-8 py-3.5 text-xs font-semibold shrink-0">
            {t.btn}
          </Button>
        </form>

      </div>
    </section>
  );
}
