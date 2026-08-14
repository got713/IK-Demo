"use client";

import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import { useShop } from "@/context/ShopContext";
import { translations } from "@/data/translations";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useShop();
  const t = translations[language];

  return (
    <footer className="bg-brand-soft-black border-t border-brand-gold/10 pt-16 pb-8 text-brand-gray font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Slogan Column */}
          <div className="space-y-6">
            <Logo width={160} height={50} variant="dark" />
            <p className="text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gray hover:text-brand-gold transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/IbrahimKhodergroup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gray hover:text-brand-gold transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] font-medium text-brand-off-white uppercase mb-6">
              {t.footer.shop_title}
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm font-light">
              <li>
                <Link href="/shop?category=Suits" className="hover:text-brand-gold transition-colors">
                  {language === "ar" ? "البليزرات والبدل" : "Suits & Blazers"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Shirts" className="hover:text-brand-gold transition-colors">
                  {language === "ar" ? "القمصان الفاخرة" : "Premium Shirts"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Shoes" className="hover:text-brand-gold transition-colors">
                  {language === "ar" ? "الأحذية الكلاسيكية" : "Formal Shoes"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Accessories" className="hover:text-brand-gold transition-colors">
                  {language === "ar" ? "الإكسسوارات الراقية" : "Refined Accessories"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] font-medium text-brand-off-white uppercase mb-6">
              {t.footer.customer_title}
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm font-light">
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  {t.product_page.accordion.shipping_title}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  {t.product_page.accordion.returns_title}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Showroom Info Column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] font-medium text-brand-off-white uppercase mb-6">
              {t.footer.atelier_title}
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+20 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>atelier@ibrahimkhoder.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-gold/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs font-light tracking-wide">
            © {currentYear} Ibrahim Khoder. {t.footer.rights}
          </p>
          <div className="flex gap-6 text-[10px] sm:text-xs font-light">
            <Link href="/about" className="hover:text-brand-gold transition-colors">
              {t.footer.policy}
            </Link>
            <Link href="/about" className="hover:text-brand-gold transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
