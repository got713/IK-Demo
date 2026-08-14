"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/lib/formatCurrency";
import Button from "@/components/ui/Button";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { translations } from "@/data/translations";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, addToast, language } = useShop();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0); // discount in EGP or percentage
  const [isClient, setIsClient] = useState(false);
  const t = translations[language].cart_page;

  // Avoid SSR hydration warning
  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
  // Free shipping for orders over 5,000 EGP, otherwise 150 EGP
  const shippingCost = cartSubtotal > 5000 || cartSubtotal === 0 ? 0 : 150;
  
  // Calculate discount (10% if ELEGANCE10 is applied)
  const discountAmount = cartSubtotal * discount;
  const totalAmount = cartSubtotal - discountAmount + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "ELEGANCE10") {
      setDiscount(0.1);
      addToast(t.summary.promo_applied, "success");
    } else {
      addToast(t.summary.promo_invalid, "error");
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-32 font-inter text-brand-off-white">
      {/* Header */}
      <div className="border-b border-brand-gold/10 pb-6 mb-10">
        <h1 className="font-playfair text-3xl sm:text-4xl tracking-wide uppercase font-medium">
          {t.title}
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center space-y-6">
          <ShoppingBag className="w-16 h-16 text-brand-gray/30 mx-auto stroke-1 animate-bounce" />
          <h2 className="font-playfair text-xl text-brand-gray">{t.empty}</h2>
          <p className="text-xs sm:text-sm text-brand-gray/60 font-light max-w-xs mx-auto">
            {t.empty_desc}
          </p>
          <Link href="/shop" className="inline-block pt-2">
            <Button variant="primary">{t.btn}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Items List (Left Column) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="hidden sm:grid grid-cols-12 text-xs tracking-widest text-brand-gray uppercase font-semibold pb-4 border-b border-brand-gold/10">
              <span className="col-span-6">{t.table.product}</span>
              <span className="col-span-2 text-center">{t.table.qty}</span>
              <span className="col-span-2 text-right">{t.table.price}</span>
              <span className="col-span-2 text-right">{t.table.total}</span>
            </div>

            <div className="divide-y divide-brand-gold/5">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-6 items-center"
                >
                  {/* Product Details info */}
                  <div className="col-span-1 sm:col-span-6 flex gap-4">
                    <div className="relative w-20 h-24 bg-brand-soft-black shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="font-playfair text-sm sm:text-base font-medium hover:text-brand-gold transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <span className="text-[10px] text-brand-gray tracking-wider uppercase mt-0.5">
                        {item.product.category}
                      </span>
                      <div className="flex gap-3 text-xs text-brand-gray mt-1.5">
                        <span>{language === "ar" ? "المقاس: " : "Size: "}<strong className="text-brand-off-white font-normal">{item.selectedSize}</strong></span>
                        <span>{language === "ar" ? "اللون: " : "Color: "}<strong className="text-brand-off-white font-normal">{item.selectedColor}</strong></span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        className="sm:hidden flex items-center gap-1 text-[10px] text-red-400 hover:text-red-500 transition-colors uppercase tracking-widest mt-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> {t.table.remove}
                      </button>
                    </div>
                  </div>

                  {/* Quantity Edit */}
                  <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                    <div className="flex items-center bg-brand-soft-black border border-brand-gold/10 rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                        className="p-2 text-brand-gray hover:text-brand-off-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                        className="p-2 text-brand-gray hover:text-brand-off-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Individual Price */}
                  <div className="col-span-1 sm:col-span-2 text-left sm:text-right text-xs sm:text-sm text-brand-gray">
                    <span className="sm:hidden text-brand-gray mr-2">{t.table.price}:</span>
                    {formatCurrency(item.product.price)}
                  </div>

                  {/* Total Price */}
                  <div className="col-span-1 sm:col-span-2 text-left sm:text-right flex items-center justify-between sm:justify-end gap-4">
                    <span className="sm:hidden text-brand-gray">{t.table.total}:</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-brand-gold">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        className="hidden sm:block text-brand-gray hover:text-red-400 p-1.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back Button */}
            <div className="pt-6 border-t border-brand-gold/5">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs tracking-widest text-brand-gray hover:text-brand-gold uppercase transition-colors"
              >
                <ArrowLeft className={`w-4 h-4 ${language === "ar" ? "rotate-180" : ""}`} />
                {language === "ar" ? "الاستمرار في التسوق" : "Continue Shopping"}
              </Link>
            </div>
          </div>

          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-brand-soft-black/40 border border-brand-gold/15 p-6 sm:p-8 rounded-sm space-y-6">
              <h2 className="font-playfair text-lg tracking-wider uppercase font-semibold border-b border-brand-gold/10 pb-4">
                {t.summary.title}
              </h2>

              <div className="space-y-4 text-sm font-light">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-brand-gray">{t.summary.subtotal}</span>
                  <span className="text-brand-off-white font-medium">{formatCurrency(cartSubtotal)}</span>
                </div>

                {/* Discount */}
                {discount > 0 && (
                  <div className="flex justify-between text-brand-gold">
                    <span>{t.summary.discount}</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex justify-between">
                  <span className="text-brand-gray">{t.summary.shipping}</span>
                  <span className="text-brand-off-white font-medium">
                    {shippingCost === 0 ? t.summary.free_shipping : formatCurrency(shippingCost)}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <p className="text-[10px] text-brand-gray/60 font-light italic">
                    {t.summary.shipping_tip.replace("{amount}", formatCurrency(5000 - cartSubtotal))}
                  </p>
                )}

                {/* Total */}
                <div className="flex justify-between items-baseline pt-4 border-t border-brand-gold/10">
                  <span className="text-xs tracking-widest text-brand-off-white uppercase font-medium">{t.summary.total}</span>
                  <span className="text-xl font-bold text-brand-gold tracking-wider">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <label className="text-xs tracking-widest text-brand-gray uppercase font-medium block mb-2">
                  {t.summary.promo_lbl}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="E.g. ELEGANCE10"
                    disabled={discount > 0}
                    className="flex-1 bg-brand-black border border-brand-gold/15 text-xs uppercase tracking-wider px-3 py-2.5 rounded-sm placeholder:text-brand-gray/30 disabled:opacity-50"
                  />
                  <Button
                    variant="accent"
                    size="sm"
                    type="submit"
                    disabled={discount > 0 || !promoCode.trim()}
                    className="text-xs font-semibold py-2.5 px-4"
                  >
                    {t.summary.promo_btn}
                  </Button>
                </div>
                {discount === 0 && (
                  <p className="text-[9px] text-brand-gray/50 mt-1.5 font-light">
                    {t.summary.promo_tip}
                  </p>
                )}
              </form>

              {/* Checkout CTA */}
              <div className="pt-4">
                <Link href="/checkout">
                  <Button variant="primary" className="w-full py-4 text-xs font-semibold">
                    {t.summary.checkout_btn}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
