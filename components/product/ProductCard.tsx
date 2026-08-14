"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/formatCurrency";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { toggleWishlist, isInWishlist, addToCart } = useShop();

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to first color and size
    const defaultColor = product.colors[0] || "Default";
    const defaultSize = product.sizes[0] || "One Size";
    addToCart(product, 1, defaultColor, defaultSize);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div
        className="group relative flex flex-col w-full bg-brand-soft-black/20 border border-brand-gold/5 overflow-hidden transition-all duration-300 hover:border-brand-gold/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image and Overlay Wrapper */}
        <Link href={`/product/${product.id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-brand-soft-black">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Badge (Sale / New) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && (
              <span className="bg-brand-gold text-brand-black text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm">
                New
              </span>
            )}
            {product.isSale && (
              <span className="bg-white text-brand-black text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm">
                Sale
              </span>
            )}
          </div>

          {/* Quick Actions (Desktop Hover Overlay) */}
          <div className="hidden md:flex absolute inset-0 bg-brand-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-3">
            <button
              onClick={handleQuickView}
              className="bg-brand-black/80 hover:bg-brand-gold hover:text-brand-black text-brand-off-white p-3 rounded-full transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg border border-brand-gold/10"
              title="Quick View"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-brand-black/80 hover:bg-brand-gold hover:text-brand-black text-brand-off-white p-3 rounded-full transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75 shadow-lg border border-brand-gold/10"
              title="Add to Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Direct Add-to-cart button overlay (Visible on mobile only) */}
          <div className="md:hidden absolute bottom-3 right-3 z-10 flex gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-brand-black/80 text-brand-gold p-2 rounded-full border border-brand-gold/25"
              aria-label="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full border transition-all duration-300 ${
              isFavorite
                ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                : "bg-brand-black/40 border-transparent text-brand-off-white hover:text-brand-gold hover:border-brand-gold/20"
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-brand-gold" : ""}`} />
          </button>
        </Link>

        {/* Product Meta Details */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-[10px] tracking-widest text-brand-gray uppercase mb-1">{product.category}</p>
          <Link href={`/product/${product.id}`} className="hover:text-brand-gold transition-colors">
            <h3 className="font-playfair text-sm sm:text-base tracking-wide text-brand-off-white line-clamp-1 mb-2 font-medium">
              {product.name}
            </h3>
          </Link>
          <div className="mt-auto flex items-center gap-2">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-brand-gold">
              {formatCurrency(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[10px] sm:text-xs text-brand-gray line-through tracking-wider">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal product={product} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </>
  );
}
