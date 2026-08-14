"use client";

import { use, useState } from "react";
import LinkStandard from "next/link";
import { products } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/lib/formatCurrency";
import ProductGallery from "@/components/product/ProductGallery";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import { Heart, Star, Plus, Minus, ChevronDown, ShoppingBag, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { translations } from "@/data/translations";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { addToCart, toggleWishlist, isInWishlist, language } = useShop();
  const t = translations[language].product_page;

  // Find product
  const product = products.find((p) => p.id === id);

  // States
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("details");

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-black text-brand-off-white flex flex-col items-center justify-center pt-24 space-y-4">
        <h1 className="font-playfair text-3xl">{t.not_found}</h1>
        <p className="text-brand-gray font-light text-sm">{t.not_found_desc}</p>
        <LinkStandard href="/shop">
          <Button variant="primary">{t.back}</Button>
        </LinkStandard>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push("/checkout");
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleAccordion = (section: string) => {
    setActiveAccordion((prev) => (prev === section ? null : section));
  };

  // Get 4 related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-32 font-inter text-brand-off-white">
      {/* Back to Shop Link */}
      <LinkStandard
        href="/shop"
        className="inline-flex items-center gap-2 text-xs tracking-widest text-brand-gray hover:text-brand-gold uppercase transition-colors mb-10 group"
      >
        <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${language === "ar" ? "rotate-180" : ""}`} />
        {t.back}
      </LinkStandard>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Right Column: Info */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] tracking-widest text-brand-gray uppercase font-semibold">
              {product.category}
            </span>
            <h1 className="font-playfair text-2xl sm:text-4xl tracking-wide uppercase font-medium">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? "fill-brand-gold" : "text-brand-gray/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-brand-gray">({product.rating} / 5.0)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4">
            <span className="text-xl sm:text-2xl font-semibold tracking-wider text-brand-gold">
              {formatCurrency(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-sm sm:text-base text-brand-gray line-through tracking-wider">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
            {product.description}
          </p>

          {/* Interactive selectors */}
          <div className="space-y-6 pt-4 border-t border-brand-gold/10">
            {/* Colors */}
            <div className="space-y-3">
              <span className="text-xs tracking-widest text-brand-off-white uppercase font-medium block">
                {t.color_lbl}: {selectedColor}
              </span>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-xs tracking-wider border rounded-sm transition-all ${
                      selectedColor === color
                        ? "border-brand-gold text-brand-gold bg-brand-gold/5"
                        : "border-brand-gray/30 text-brand-gray hover:border-brand-off-white/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <span className="text-xs tracking-widest text-brand-off-white uppercase font-medium block">
                {t.size_lbl}: {selectedSize}
              </span>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[42px] px-3 py-1.5 text-xs border rounded-sm transition-all ${
                      selectedSize === size
                        ? "border-brand-gold text-brand-gold bg-brand-gold/5"
                        : "border-brand-gray/30 text-brand-gray hover:border-brand-off-white/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity & Action Buttons */}
          <div className="space-y-4 pt-6 border-t border-brand-gold/10">
            <div className="flex items-center gap-4">
              {/* Qty Counter */}
              <div className="flex items-center bg-brand-soft-black border border-brand-gold/10 rounded-sm">
                <button
                  onClick={decrementQty}
                  className="p-3 text-brand-gray hover:text-brand-off-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold tracking-wide">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  className="p-3 text-brand-gray hover:text-brand-off-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-sm border transition-all flex-1 md:flex-initial flex items-center justify-center gap-2 ${
                  isFavorite
                    ? "border-brand-gold bg-brand-gold/5 text-brand-gold"
                    : "border-brand-gray/30 text-brand-gray hover:border-brand-off-white hover:text-brand-off-white"
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-brand-gold" : ""}`} />
                <span className="text-xs uppercase tracking-widest sm:hidden">{translations[language].nav.wishlist}</span>
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="primary"
                onClick={handleAddToCart}
                className="flex-1 py-4 text-xs font-semibold"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {t.add_to_cart}
              </Button>
              <Button
                variant="secondary"
                onClick={handleBuyNow}
                className="flex-1 py-4 text-xs font-semibold"
              >
                {t.buy_now}
              </Button>
            </div>
          </div>

          {/* Product Details Accordions */}
          <div className="pt-8 border-t border-brand-gold/10 space-y-4">
            {/* Details Accordion */}
            <div className="border-b border-brand-gold/5 pb-4">
              <button
                onClick={() => toggleAccordion("details")}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-xs tracking-widest text-brand-off-white uppercase font-medium">
                  {t.accordion.details_title}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-gold transition-transform duration-300 ${
                    activeAccordion === "details" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeAccordion === "details" && (
                <div className="pt-3 text-xs sm:text-sm text-brand-gray font-light leading-relaxed space-y-2">
                  <p>{t.accordion.details_p1}</p>
                  <p>{t.accordion.details_p2}</p>
                  <p>{t.accordion.details_p3}</p>
                </div>
              )}
            </div>

            {/* Shipping Accordion */}
            <div className="border-b border-brand-gold/5 pb-4">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-xs tracking-widest text-brand-off-white uppercase font-medium">
                  {t.accordion.shipping_title}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-gold transition-transform duration-300 ${
                    activeAccordion === "shipping" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeAccordion === "shipping" && (
                <div className="pt-3 text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
                  {t.accordion.shipping_desc}
                </div>
              )}
            </div>

            {/* Returns Accordion */}
            <div className="pb-4">
              <button
                onClick={() => toggleAccordion("returns")}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-xs tracking-widest text-brand-off-white uppercase font-medium">
                  {t.accordion.returns_title}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-gold transition-transform duration-300 ${
                    activeAccordion === "returns" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeAccordion === "returns" && (
                <div className="pt-3 text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
                  {t.accordion.returns_desc}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-brand-gold/15 pt-20 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-[0.3em] font-medium text-brand-gold uppercase">
              {t.related_sub}
            </span>
            <h2 className="font-playfair text-xl sm:text-3xl tracking-wide uppercase font-medium">
              {t.related_title}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
