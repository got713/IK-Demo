"use client";

import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import Button from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { translations } from "@/data/translations";

export default function ContactPage() {
  const { addToast, language } = useShop();
  const t = translations[language].contact_page;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addToast(language === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields", "error");
      return;
    }
    addToast(language === "ar" ? "نشكرك. سيقوم منسق الخدمة بالتواصل معك قريباً." : "Thank you. Our concierge will contact you shortly.", "success");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-32 font-inter text-brand-off-white">
      {/* Header */}
      <div className="border-b border-brand-gold/10 pb-8 mb-16 text-center sm:text-left">
        <span className="text-[10px] tracking-[0.4em] font-medium text-brand-gold uppercase block mb-2">
          {t.subtitle}
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl tracking-wide uppercase font-semibold">
          {t.title}
        </h1>
        <p className="text-xs sm:text-base text-brand-gray font-light max-w-xl mt-3 leading-relaxed">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Contact Form (Left Column) */}
        <div className="lg:col-span-7 bg-brand-soft-black/20 border border-brand-gold/10 p-6 sm:p-8 rounded-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="font-playfair text-xl uppercase tracking-wider text-brand-gold mb-6">
              {t.form_title}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-brand-gray uppercase block font-medium">{t.name}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ibrahim Khoder"
                  className="w-full bg-brand-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-brand-gray uppercase block font-medium">{t.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-brand-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] tracking-widest text-brand-gray uppercase block font-medium">{t.phone}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 123 456 7890"
                className="w-full bg-brand-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] tracking-widest text-brand-gray uppercase block font-medium">{t.message}</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.message_placeholder}
                className="w-full bg-brand-black border border-brand-gold/15 text-xs sm:text-sm px-4 py-3 focus:border-brand-gold rounded-sm focus:ring-0 focus:outline-none resize-none"
                required
              />
            </div>

            <Button variant="primary" type="submit" className="w-full py-4 text-xs font-semibold">
              {t.submit}
            </Button>
          </form>
        </div>

        {/* Contact Details (Right Column) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
          
          {/* Atelier Info */}
          <div className="space-y-8">
            <h2 className="font-playfair text-xl uppercase tracking-wider text-brand-gold border-b border-brand-gold/10 pb-2">
              {t.atelier_title}
            </h2>

            <div className="space-y-6">
              {/* Cairo Showroom */}
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <span className="font-semibold block uppercase tracking-wider">
                    {language === "ar" ? "معرض القاهرة (مدينة نصر)" : "Cairo Showroom (Nasr City)"}
                  </span>
                  <a
                    href="https://maps.app.goo.gl/ZvC1gyHszgrxB3TM7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gray hover:text-brand-gold transition-colors font-light leading-relaxed block"
                  >
                    {language === "ar"
                      ? "٣٨ شارع حسنين هيكل، موازٍ لعباس العقاد، مدينة نصر، القاهرة"
                      : "38 Hassanein Heikil Street, parallel to Abbas Al-Akkad, Nasr City, Cairo"}
                  </a>
                </div>
              </div>

              {/* Port Said Showroom */}
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <span className="font-semibold block uppercase tracking-wider">
                    {language === "ar" ? "معرض بورسعيد" : "Port Said Showroom"}
                  </span>
                  <a
                    href="https://goo.gl/maps/32K7hJnjN7R2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gray hover:text-brand-gold transition-colors font-light leading-relaxed block"
                  >
                    {language === "ar"
                      ? "شارع طرح البحر، قرية مرحبا"
                      : "Tarh El Bahr Street, Marhaba Village"}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <span className="font-semibold block uppercase tracking-wider">{t.phone_title}</span>
                  <a
                    href="tel:01111907667"
                    className="text-brand-gray hover:text-brand-gold transition-colors font-light block"
                  >
                    011 1190 7667
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <span className="font-semibold block uppercase tracking-wider">{t.email_title}</span>
                  <span className="text-brand-gray font-light">atelier@ibrahimkhoder.com</span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <span className="font-semibold block uppercase tracking-wider">{t.hours_title}</span>
                  <span className="text-brand-gray font-light leading-relaxed whitespace-pre-line">
                    {t.hours}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Slogan */}
          <div className="border border-brand-gold/10 p-6 rounded-sm bg-brand-soft-black/20 text-center">
            <p className="font-playfair italic text-brand-gray text-xs sm:text-sm leading-relaxed">
              {t.slogan}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
