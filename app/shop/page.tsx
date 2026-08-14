"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { useShop } from "@/context/ShopContext";
import { X, SlidersHorizontal, Search, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { translations } from "@/data/translations";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { wishlist, language } = useShop();
  const t = translations[language].shop_page;

  // Local state for filters
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state with URL search parameters
  useEffect(() => {
    const cat = searchParams.get("category");
    const filter = searchParams.get("filter");
    const search = searchParams.get("search");

    if (cat) {
      setSelectedCategory(cat);
    } else if (filter === "new") {
      setSelectedCategory("All");
      setSortBy("newest");
    } else if (filter === "wishlist") {
      setSelectedCategory("Wishlist");
    } else {
      setSelectedCategory("All");
    }

    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery("");
    }
  }, [searchParams]);

  // Categories list
  const categories = ["All", "Suits", "Shirts", "Shoes", "Accessories", "Wishlist"];

  // Price ranges
  const priceRanges = [
    { label: t.price_ranges.all, value: "All" },
    { label: t.price_ranges.under, value: "under-2000" },
    { label: t.price_ranges.between, value: "2000-5000" },
    { label: t.price_ranges.over, value: "over-5000" },
  ];

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    // 2. Category
    if (selectedCategory === "Wishlist") {
      if (!wishlist.includes(product.id)) return false;
    } else if (selectedCategory !== "All") {
      if (product.category !== selectedCategory) return false;
    }

    // 3. Price Range
    if (selectedPriceRange !== "All") {
      if (selectedPriceRange === "under-2000" && product.price >= 2000) return false;
      if (
        selectedPriceRange === "2000-5000" &&
        (product.price < 2000 || product.price > 5000)
      )
        return false;
      if (selectedPriceRange === "over-5000" && product.price <= 5000) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") {
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
    return 0;
  });

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("All");
    setSortBy("default");
    setSearchQuery("");
    router.push("/shop");
  };

  const getTranslatedCategoryLabel = (cat: string) => {
    if (cat === "All") return language === "ar" ? "الكل" : "All";
    if (cat === "Suits") return language === "ar" ? "البدل" : "Suits";
    if (cat === "Shirts") return language === "ar" ? "القمصان" : "Shirts";
    if (cat === "Shoes") return language === "ar" ? "الأحذية" : "Shoes";
    if (cat === "Accessories") return language === "ar" ? "الإكسسوارات" : "Accessories";
    if (cat === "Wishlist") return t.wishlist_title;
    return cat;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-32 font-inter text-brand-off-white">
      {/* Page Header */}
      <div className="border-b border-brand-gold/10 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] font-medium text-brand-gold uppercase block mb-1">
            {t.subtitle}
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl tracking-wide uppercase font-medium">
            {selectedCategory === "Wishlist" ? t.wishlist_title : `${getTranslatedCategoryLabel(selectedCategory)}`}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-brand-gray font-light">
          {t.showing.replace("{count}", sortedProducts.length.toString())}
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 pr-4">
          {/* Search bar */}
          <div className="space-y-2">
            <h3 className="text-xs tracking-widest text-brand-off-white uppercase font-semibold">{t.search_lbl}</h3>
            <div className="relative flex items-center bg-brand-soft-black border border-brand-gold/15 focus-within:border-brand-gold rounded-sm px-3 py-2">
              <Search className="w-4 h-4 text-brand-gray mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search_placeholder}
                className="bg-transparent border-0 text-sm placeholder:text-brand-gray/40 w-full focus:ring-0 focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-brand-gray hover:text-brand-off-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-xs tracking-widest text-brand-off-white uppercase font-semibold">{t.categories_lbl}</h3>
            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left text-sm transition-colors py-0.5 ${
                    selectedCategory === cat
                      ? "text-brand-gold font-medium"
                      : "text-brand-gray hover:text-brand-off-white"
                  }`}
                >
                  {getTranslatedCategoryLabel(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filters */}
          <div className="space-y-3">
            <h3 className="text-xs tracking-widest text-brand-off-white uppercase font-semibold">{t.price_lbl}</h3>
            <div className="flex flex-col gap-2.5">
              {priceRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setSelectedPriceRange(range.value)}
                  className={`text-left text-sm transition-colors py-0.5 ${
                    selectedPriceRange === range.value
                      ? "text-brand-gold font-medium"
                      : "text-brand-gray hover:text-brand-off-white"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Button */}
          {(selectedCategory !== "All" || selectedPriceRange !== "All" || searchQuery || sortBy !== "default") && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 border border-brand-gold/25 text-brand-gold hover:bg-brand-gold hover:text-brand-black text-xs tracking-widest uppercase font-medium py-3 px-4 w-full transition-all rounded-sm cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {t.reset_btn}
            </button>
          )}
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar (Mobile toggle + Desktop sort) */}
          <div className="flex items-center justify-between border-b border-brand-gold/5 pb-4 mb-6 gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2.5 bg-brand-soft-black border border-brand-gold/15 px-4 py-2.5 text-xs tracking-widest uppercase font-medium hover:border-brand-gold transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              {t.filter_btn}
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="hidden sm:inline text-xs tracking-widest text-brand-gray uppercase">{t.sort_lbl}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-brand-soft-black border border-brand-gold/15 text-xs tracking-wide px-3 py-2 rounded-sm focus:border-brand-gold focus:ring-0 cursor-pointer"
              >
                <option value="default">{t.sort_default}</option>
                <option value="price-low">{t.sort_low}</option>
                <option value="price-high">{t.sort_high}</option>
                <option value="rating">{t.sort_rating}</option>
                <option value="newest">{t.sort_newest}</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          {sortedProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <SlidersHorizontal className="w-10 h-10 text-brand-gray/30 mx-auto stroke-1 animate-pulse" />
              <p className="font-playfair text-brand-gray text-lg">{t.no_match}</p>
              <p className="text-xs text-brand-gray/60 font-light max-w-sm mx-auto">
                {t.no_match_desc}
              </p>
              <Button variant="accent" size="sm" onClick={clearFilters}>
                {t.reset_btn}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="relative ml-0 mr-auto flex h-full w-[280px] sm:w-[320px] flex-col bg-brand-black border-r border-brand-gold/15 p-6 shadow-xl z-10 text-brand-off-white overflow-y-auto">
            <div className="flex items-center justify-between border-b border-brand-gold/10 pb-4 mb-6">
              <h2 className="font-playfair text-lg tracking-wider uppercase font-medium">{t.mobile_filter_title}</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8 flex-1">
              {/* Search */}
              <div className="space-y-2.5">
                <h3 className="text-xs tracking-widest text-brand-off-white uppercase font-semibold">{t.search_lbl}</h3>
                <div className="relative flex items-center bg-brand-soft-black border border-brand-gold/15 rounded-sm px-3 py-2">
                  <Search className="w-4 h-4 text-brand-gray mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.search_placeholder}
                    className="bg-transparent border-0 text-xs w-full focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3.5">
                <h3 className="text-xs tracking-widest text-brand-off-white uppercase font-semibold">{t.categories_lbl}</h3>
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`text-left text-sm transition-colors py-0.5 ${
                        selectedCategory === cat
                          ? "text-brand-gold font-medium"
                          : "text-brand-gray"
                      }`}
                    >
                      {getTranslatedCategoryLabel(cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div className="space-y-3.5">
                <h3 className="text-xs tracking-widest text-brand-off-white uppercase font-semibold">{t.price_lbl}</h3>
                <div className="flex flex-col gap-3">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => {
                        setSelectedPriceRange(range.value);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`text-left text-sm transition-colors py-0.5 ${
                        selectedPriceRange === range.value
                          ? "text-brand-gold font-medium"
                          : "text-brand-gray"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Clear */}
            {(selectedCategory !== "All" || selectedPriceRange !== "All" || searchQuery) && (
              <div className="pt-6 border-t border-brand-gold/10 mt-6">
                <button
                  onClick={() => {
                    clearFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 border border-brand-gold/20 text-brand-gold py-3 px-4 w-full text-xs tracking-widest uppercase font-medium rounded-sm cursor-pointer"
                >
                  {t.reset_btn}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
