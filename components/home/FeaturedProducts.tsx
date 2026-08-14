"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "../product/ProductCard";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<"all" | "new" | "best">("all");

  const filteredProducts = products.filter((product) => {
    if (activeTab === "new") return product.isNew;
    if (activeTab === "best") return product.rating >= 4.8;
    return true; // "all"
  }).slice(0, 4); // Show only top 4 for homepage grids

  const tabs = [
    { id: "all", label: "All Items" },
    { id: "new", label: "New Arrivals" },
    { id: "best", label: "Best Sellers" },
  ] as const;

  return (
    <section id="featured" className="py-24 bg-brand-black text-brand-off-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] font-medium text-brand-gold uppercase">
            Curated Selection
          </span>
          <h2 className="font-playfair text-2xl sm:text-4xl tracking-wide uppercase font-medium">
            Featured Collection
          </h2>
          <p className="text-xs sm:text-sm text-brand-gray font-light max-w-md mx-auto">
            Discover our carefully selected pieces designed for refined styling.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center border-b border-brand-gold/10 pb-2 gap-6 sm:gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs sm:text-sm tracking-widest uppercase pb-2.5 transition-all relative font-light ${
                activeTab === tab.id
                  ? "text-brand-gold font-medium"
                  : "text-brand-gray hover:text-brand-off-white"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-brand-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center pt-4">
          <Link href="/shop" className="inline-block">
            <Button variant="accent" size="md" className="flex items-center gap-2 group text-xs sm:text-sm font-medium">
              View Entire Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
