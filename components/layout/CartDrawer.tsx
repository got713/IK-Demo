"use client";

import { useShop } from "@/context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";
import Button from "../ui/Button";
import { translations } from "@/data/translations";

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart, language } = useShop();
  const t = translations[language].cart_page;

  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:max-w-md bg-brand-black border-l border-brand-gold/15 flex flex-col justify-between text-brand-off-white"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-gold/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-brand-gold" />
                <h2 className="font-playfair text-lg tracking-wider uppercase font-medium">{t.title}</h2>
                <span className="text-xs text-brand-gray bg-brand-soft-black border border-brand-gold/5 px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="text-brand-gray hover:text-brand-off-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content (Scrollable Items) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-10 h-10 text-brand-gray/40 stroke-1" />
                  <p className="font-playfair tracking-wide text-brand-gray">{t.empty}</p>
                  <Link href="/shop" onClick={() => setCartOpen(false)}>
                    <Button variant="accent" size="sm">
                      {t.btn}
                    </Button>
                  </Link>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-4 pb-6 border-b border-brand-gold/5 last:border-0 last:pb-0"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-24 bg-brand-soft-black shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-playfair tracking-wide font-medium line-clamp-1">
                            <Link
                              href={`/product/${item.product.id}`}
                              onClick={() => setCartOpen(false)}
                              className="hover:text-brand-gold transition-colors"
                            >
                              {item.product.name}
                            </Link>
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                            className="text-brand-gray hover:text-red-400 transition-colors p-1 shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-brand-gray tracking-wide uppercase mt-0.5">
                          {item.product.category}
                        </p>
                        <div className="flex gap-3 text-xs text-brand-gray mt-1">
                          <span>{language === "ar" ? "المقاس: " : "Size: "}<strong className="text-brand-off-white font-normal">{item.selectedSize}</strong></span>
                          <span>{language === "ar" ? "اللون: " : "Color: "}<strong className="text-brand-off-white font-normal">{item.selectedColor}</strong></span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        {/* Qty edit */}
                        <div className="flex items-center bg-brand-soft-black border border-brand-gold/10 rounded-sm scale-90 origin-left">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                            className="p-1.5 text-brand-gray hover:text-brand-off-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                            className="p-1.5 text-brand-gray hover:text-brand-off-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs sm:text-sm font-semibold text-brand-gold tracking-wide">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-gold/10 bg-brand-soft-black/40 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs tracking-widest text-brand-gray uppercase">{t.summary.subtotal}</span>
                  <span className="text-lg font-semibold text-brand-gold tracking-wider">
                    {formatCurrency(cartSubtotal)}
                  </span>
                </div>
                <p className="text-[10px] text-brand-gray font-light">
                  {language === "ar" ? "يتم احتساب رسوم الشحن عند الدفع." : "Shipping and taxes calculated at checkout."}
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <Link href="/checkout" onClick={() => setCartOpen(false)}>
                    <Button variant="primary" className="w-full py-4 text-xs font-semibold">
                      {t.summary.checkout_btn}
                    </Button>
                  </Link>
                  <Link href="/cart" onClick={() => setCartOpen(false)}>
                    <Button variant="secondary" className="w-full py-4 text-xs font-semibold">
                      {language === "ar" ? "عرض تفاصيل السلة" : "View Cart Details"}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
