"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, Star, Plus, Minus, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/lib/formatCurrency";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Reset selections when the modal opens or changes products
  useEffect(() => {
    if (isOpen) {
      setSelectedColor(product.colors[0] || "");
      setSelectedSize(product.sizes[0] || "");
      setQuantity(1);
    }
  }, [isOpen, product]);

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onClose();
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="pointer-events-auto bg-brand-black border border-brand-gold/15 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm relative flex flex-col md:flex-row text-brand-off-white"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-brand-soft-black text-brand-off-white hover:text-brand-gold border border-brand-gold/5 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Gallery Section */}
              <div className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-auto md:h-inherit bg-brand-soft-black">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Product Info Section */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] tracking-widest text-brand-gray uppercase">{product.category}</span>
                  <h2 className="font-playfair text-xl sm:text-2xl tracking-wide text-brand-off-white mt-1 mb-2 font-medium">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-4">
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
                    <span className="text-xs text-brand-gray">({product.rating})</span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-lg sm:text-xl font-semibold text-brand-gold tracking-wide">
                      {formatCurrency(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs sm:text-sm text-brand-gray line-through tracking-wide">
                        {formatCurrency(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Color Selector */}
                  <div className="mb-5">
                    <span className="text-xs tracking-widest text-brand-off-white uppercase font-medium block mb-2.5">
                      Color: {selectedColor}
                    </span>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 text-xs font-inter tracking-wider border rounded-sm transition-all ${
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

                  {/* Size Selector */}
                  <div className="mb-6">
                    <span className="text-xs tracking-widest text-brand-off-white uppercase font-medium block mb-2.5">
                      Size: {selectedSize}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[40px] px-2.5 py-1.5 text-xs font-inter border rounded-sm transition-all ${
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

                {/* Footer Controls */}
                <div className="mt-6 pt-6 border-t border-brand-gold/10 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-brand-soft-black border border-brand-gold/10 rounded-sm">
                      <button
                        onClick={decrementQty}
                        className="p-2.5 text-brand-gray hover:text-brand-off-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium tracking-wide">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQty}
                        className="p-2.5 text-brand-gray hover:text-brand-off-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-3 rounded-sm border transition-all ${
                        isFavorite
                          ? "border-brand-gold bg-brand-gold/5 text-brand-gold"
                          : "border-brand-gray/30 text-brand-gray hover:border-brand-off-white hover:text-brand-off-white"
                      }`}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-brand-gold" : ""}`} />
                    </button>
                  </div>

                  {/* Add to Cart CTA */}
                  <div className="flex flex-col gap-3">
                    <Button variant="primary" onClick={handleAddToCart} className="w-full py-4 text-xs font-medium">
                      Add to Cart
                    </Button>
                    <Link
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="text-center text-xs tracking-widest text-brand-gray hover:text-brand-gold transition-colors font-inter uppercase block mt-2"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
