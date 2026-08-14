"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/lib/formatCurrency";
import Button from "@/components/ui/Button";
import { AlertCircle, CreditCard, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { translations } from "@/data/translations";

export default function CheckoutPage() {
  const { cart, clearCart, addToast, language } = useShop();
  const t = translations[language].checkout_page;
  const tc = translations[language].common;

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");

  // Credit card mockup inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [isClient, setIsClient] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Standard shipping cost (free over 5,000 EGP, else 150 EGP). Express is 300 EGP.
  const shippingCost =
    shippingMethod === "express"
      ? 300
      : cartSubtotal > 5000 || cartSubtotal === 0
      ? 0
      : 150;

  const totalAmount = cartSubtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      addToast(language === "ar" ? "حقيبة التسوق فارغة" : "Your shopping bag is empty", "error");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        addToast(language === "ar" ? "يرجى تعبئة بيانات البطاقة" : "Please fill in card details", "error");
        return;
      }
    }

    // Generate a random order number
    const ordNum = "IK-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(ordNum);
    
    // Trigger Success Overlay
    setIsSuccess(true);
    
    // Clear shopping cart
    clearCart();
    
    addToast(language === "ar" ? "تم إرسال الطلب بنجاح (محاكاة تجريبية)!" : "Order placed successfully (Demo Simulation)!", "success");
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If order was successfully submitted, show success state
  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 pt-32 sm:pt-40 font-inter text-brand-off-white text-center space-y-8">
        <div className="bg-brand-soft-black/40 border border-brand-gold/20 p-8 sm:p-12 rounded-sm space-y-6 flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-brand-gold stroke-1 animate-pulse" />
          
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.4em] font-medium text-brand-gold uppercase block">
              {t.success.subtitle}
            </span>
            <h1 className="font-playfair text-2xl sm:text-3xl tracking-wide uppercase font-semibold">
              {t.success.title}
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed max-w-sm">
            {t.success.desc}
          </p>

          <div className="border-t border-b border-brand-gold/10 py-4 w-full text-left space-y-2 text-xs sm:text-sm" dir="ltr">
            <div className="flex justify-between">
              <span className="text-brand-gray">{t.success.ref}</span>
              <span className="font-semibold text-brand-gold tracking-wide">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-gray">{t.success.email_lbl}</span>
              <span className="text-brand-off-white">{email || "demo@example.com"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-gray">{t.success.amount_lbl}</span>
              <span className="font-semibold text-brand-gold">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <div className="pt-4 w-full">
            <Link href="/shop" className="block">
              <Button variant="primary" className="w-full py-4 text-xs font-semibold">
                {t.success.btn}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-32 font-inter text-brand-off-white">
      {/* Demo Warning Banner */}
      <div className="bg-brand-gold/10 border border-brand-gold/30 p-4 sm:p-5 flex items-start gap-3.5 mb-10 rounded-sm">
        <AlertCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h2 className="text-xs sm:text-sm font-bold tracking-widest text-brand-gold uppercase">
            {tc.demo_warning}
          </h2>
          <p className="text-[10px] sm:text-xs text-brand-gray font-light">
            {tc.demo_sub}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Checkout Form (Left Column) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="font-playfair text-lg sm:text-xl tracking-wider uppercase font-semibold border-b border-brand-gold/10 pb-2">
              {t.contact_title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-brand-gray uppercase">{t.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-brand-soft-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-brand-gray uppercase">{t.phone}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 123 456 7890"
                  className="w-full bg-brand-soft-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h2 className="font-playfair text-lg sm:text-xl tracking-wider uppercase font-semibold border-b border-brand-gold/10 pb-2">
              {t.shipping_title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-brand-gray uppercase">{t.first_name}</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ibrahim"
                  className="w-full bg-brand-soft-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-brand-gray uppercase">{t.last_name}</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Khoder"
                  className="w-full bg-brand-soft-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs tracking-wider text-brand-gray uppercase">{t.street}</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t.street_placeholder}
                className="w-full bg-brand-soft-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-brand-gray uppercase">{t.city}</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Zamalek, Cairo"
                  className="w-full bg-brand-soft-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-brand-gray uppercase">{t.country}</label>
                <select
                  className="w-full bg-brand-soft-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none cursor-pointer"
                  required
                >
                  <option value="EG">{language === "ar" ? "مصر" : "Egypt"}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Shipping Methods */}
          <div className="space-y-4">
            <h2 className="font-playfair text-lg sm:text-xl tracking-wider uppercase font-semibold border-b border-brand-gold/10 pb-2">
              {t.delivery_title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Standard */}
              <label
                className={`flex justify-between items-center p-4 border rounded-sm cursor-pointer transition-all ${
                  shippingMethod === "standard"
                    ? "border-brand-gold bg-brand-gold/5"
                    : "border-brand-gold/10 bg-brand-soft-black/20 hover:border-brand-off-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "standard"}
                    onChange={() => setShippingMethod("standard")}
                    className="text-brand-gold focus:ring-0 bg-transparent border-brand-gold/30"
                  />
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-semibold tracking-wide block">{t.standard_courier}</span>
                    <span className="text-[10px] text-brand-gray font-light">{t.standard_time}</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-brand-gold font-medium">
                  {cartSubtotal > 5000 ? (language === "ar" ? "مجاني" : "Free") : "150 EGP"}
                </span>
              </label>

              {/* Express */}
              <label
                className={`flex justify-between items-center p-4 border rounded-sm cursor-pointer transition-all ${
                  shippingMethod === "express"
                    ? "border-brand-gold bg-brand-gold/5"
                    : "border-brand-gold/10 bg-brand-soft-black/20 hover:border-brand-off-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="text-brand-gold focus:ring-0 bg-transparent border-brand-gold/30"
                  />
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-semibold tracking-wide block">{t.express_courier}</span>
                    <span className="text-[10px] text-brand-gray font-light">{t.express_time}</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-brand-gold font-medium">300 EGP</span>
              </label>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h2 className="font-playfair text-lg sm:text-xl tracking-wider uppercase font-semibold border-b border-brand-gold/10 pb-2">
              {t.payment_title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Credit Card */}
              <label
                className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-brand-gold bg-brand-gold/5"
                    : "border-brand-gold/10 bg-brand-soft-black/20 hover:border-brand-off-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="text-brand-gold focus:ring-0 bg-transparent border-brand-gold/30"
                />
                <CreditCard className="w-4 h-4 text-brand-gold" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide">{t.credit_card}</span>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-brand-gold bg-brand-gold/5"
                    : "border-brand-gold/10 bg-brand-soft-black/20 hover:border-brand-off-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="text-brand-gold focus:ring-0 bg-transparent border-brand-gold/30"
                />
                <DollarSign className="w-4 h-4 text-brand-gold" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide">{t.cod}</span>
              </label>
            </div>

            {/* Credit Card Input Subform */}
            {paymentMethod === "card" && (
              <div className="p-4 sm:p-6 bg-brand-soft-black/30 border border-brand-gold/10 rounded-sm space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider text-brand-gray uppercase">{t.cardholder}</label>
                  <input
                    type="text"
                    placeholder="Ibrahim Khoder"
                    className="w-full bg-brand-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none"
                    required={paymentMethod === "card"}
                  />
                </div>
                <div className="space-y-2" dir="ltr">
                  <label className="text-[10px] tracking-wider text-brand-gray uppercase text-left block">{t.card_number}</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    className="w-full bg-brand-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none font-mono"
                    required={paymentMethod === "card"}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4" dir="ltr">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider text-brand-gray uppercase text-center block">{t.expiry}</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full bg-brand-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none text-center"
                      required={paymentMethod === "card"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider text-brand-gray uppercase text-center block">{t.cvv}</label>
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      maxLength={3}
                      className="w-full bg-brand-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none text-center"
                      required={paymentMethod === "card"}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Place Order CTA */}
          <div className="pt-4">
            <Button
              variant="primary"
              type="submit"
              disabled={cart.length === 0}
              className="w-full py-4 text-xs font-semibold"
            >
              {t.confirm_btn.replace("{amount}", formatCurrency(totalAmount))}
            </Button>
          </div>
        </form>

        {/* Order Details Panel (Right Column) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-soft-black/40 border border-brand-gold/15 p-6 sm:p-8 rounded-sm space-y-6">
            <h2 className="font-playfair text-lg tracking-wider uppercase font-semibold border-b border-brand-gold/10 pb-4">
              {t.summary_title}
            </h2>

            {cart.length === 0 ? (
              <p className="text-xs text-brand-gray py-4">
                {language === "ar" ? "لا توجد قطع في سلتك." : "No items in cart."}
              </p>
            ) : (
              <div className="divide-y divide-brand-gold/5 max-h-[300px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-4 py-3 items-center justify-between first:pt-0"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="relative w-10 h-12 bg-brand-soft-black shrink-0 overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="font-playfair text-xs font-semibold line-clamp-1">{item.product.name}</h4>
                        <span className="text-[9px] text-brand-gray uppercase" dir="ltr">
                          {t.qty_lbl}: {item.quantity} | {item.selectedSize} | {item.selectedColor}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-brand-gold">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm font-light pt-6 border-t border-brand-gold/10">
              <div className="flex justify-between">
                <span className="text-brand-gray">{translations[language].cart_page.summary.subtotal}</span>
                <span>{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-gray">{translations[language].cart_page.summary.shipping}</span>
                <span>{shippingCost === 0 ? (language === "ar" ? "مجاني" : "Free") : `${shippingCost} EGP`}</span>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-brand-gold/10 text-sm">
                <span className="text-xs tracking-widest text-brand-off-white uppercase font-medium">{t.total_due}</span>
                <span className="text-base font-bold text-brand-gold tracking-wider">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
