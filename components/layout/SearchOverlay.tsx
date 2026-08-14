"use client";

import { useState, useEffect, useRef } from "react";
import { useShop } from "@/context/ShopContext";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatCurrency";

export default function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearchOpen]);

  // Filter products based on search term
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const queryLower = query.toLowerCase().trim();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(queryLower) ||
        p.category.toLowerCase().includes(queryLower) ||
        p.description.toLowerCase().includes(queryLower)
    );
    setResults(filtered.slice(0, 5)); // Limit to 5 quick results
  }, [query]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-md flex flex-col justify-start text-brand-off-white"
        >
          {/* Header */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex justify-end">
            <button
              onClick={() => setSearchOpen(false)}
              className="text-brand-gray hover:text-brand-off-white transition-colors p-2 flex items-center gap-2 border border-transparent hover:border-brand-gold/15 rounded-sm"
            >
              <span className="text-xs uppercase tracking-widest hidden sm:inline">Close</span>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Area */}
          <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 flex flex-col justify-start pt-12 sm:pt-24 space-y-12">
            <div className="relative border-b border-brand-gold/25 pb-4 flex items-center">
              <Search className="w-6 h-6 text-brand-gold mr-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="bg-transparent border-0 text-xl sm:text-3xl font-playfair tracking-wide text-brand-off-white placeholder:text-brand-gray/40 w-full focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Results Section */}
            <div className="flex-1">
              <AnimatePresence mode="popLayout">
                {query.trim() && results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xs tracking-[0.2em] font-medium text-brand-gray uppercase mb-4">
                      Search Results
                    </h3>
                    <div className="space-y-4">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-4 p-3 bg-brand-soft-black/20 hover:bg-brand-soft-black/60 border border-transparent hover:border-brand-gold/10 transition-all rounded-sm group"
                        >
                          <div className="relative w-12 h-16 bg-brand-soft-black shrink-0 overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-[9px] tracking-widest text-brand-gray uppercase">
                              {product.category}
                            </span>
                            <h4 className="font-playfair text-sm sm:text-base font-medium text-brand-off-white group-hover:text-brand-gold transition-colors">
                              {product.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-3 text-right">
                            <span className="text-xs sm:text-sm font-semibold text-brand-gold">
                              {formatCurrency(product.price)}
                            </span>
                            <ArrowRight className="w-4 h-4 text-brand-gray/40 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="pt-4 text-center">
                      <Link
                        href={`/shop?search=${encodeURIComponent(query)}`}
                        onClick={() => setSearchOpen(false)}
                        className="text-xs tracking-widest text-brand-gold hover:text-brand-gold-light uppercase font-semibold transition-colors flex items-center justify-center gap-2 group"
                      >
                        See All Matching Products
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )}

                {query.trim() && results.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-3"
                  >
                    <p className="font-playfair text-brand-gray text-lg">No products found for &ldquo;{query}&rdquo;</p>
                    <p className="text-xs text-brand-gray/60 font-light">Try searching for other terms like &ldquo;Suit&rdquo;, &ldquo;Shirt&rdquo;, or &ldquo;Leather&rdquo;.</p>
                  </motion.div>
                )}

                {!query.trim() && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left"
                  >
                    <div>
                      <h4 className="text-xs tracking-[0.2em] font-medium text-brand-gray uppercase mb-4">
                        Popular Suggestions
                      </h4>
                      <div className="flex flex-col gap-3 text-sm sm:text-base">
                        {["Tailored Suit", "Linen Shirt", "Leather Oxford Shoes", "Chronograph Watch"].map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="text-left text-brand-off-white hover:text-brand-gold transition-colors font-playfair py-1"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs tracking-[0.2em] font-medium text-brand-gray uppercase mb-4">
                        Browse by Category
                      </h4>
                      <div className="flex flex-col gap-3 text-sm sm:text-base">
                        {["Suits", "Shirts", "Shoes", "Accessories"].map((cat) => (
                          <Link
                            key={cat}
                            href={`/shop?category=${cat}`}
                            onClick={() => setSearchOpen(false)}
                            className="text-brand-off-white hover:text-brand-gold transition-colors font-playfair py-1"
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
