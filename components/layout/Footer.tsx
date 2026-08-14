import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-soft-black border-t border-brand-gold/10 pt-16 pb-8 text-brand-gray font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Slogan Column */}
          <div className="space-y-6">
            <Logo width={160} height={50} />
            <p className="text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Discover refined style crafted for those who appreciate the details. Timeless elegance, premium materials, and modern Egyptian design.
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
                href="https://facebook.com"
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
              Shop Collections
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm font-light">
              <li>
                <Link href="/shop?category=Suits" className="hover:text-brand-gold transition-colors">
                  Suits & Blazers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Shirts" className="hover:text-brand-gold transition-colors">
                  Premium Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Shoes" className="hover:text-brand-gold transition-colors">
                  Formal Shoes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Accessories" className="hover:text-brand-gold transition-colors">
                  Refined Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] font-medium text-brand-off-white uppercase mb-6">
              Customer Care
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm font-light">
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Showroom Info Column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] font-medium text-brand-off-white uppercase mb-6">
              The Atelier
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Zamalek Showroom, Cairo, Egypt</span>
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
            © {currentYear} Ibrahim Khoder. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[10px] sm:text-xs font-light">
            <Link href="/about" className="hover:text-brand-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-brand-gold transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
