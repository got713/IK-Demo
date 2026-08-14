"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart, wishlist, setCartOpen, setSearchOpen } = useShop();

  const isHomepage = pathname === "/";

  // Check scroll position to alter navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Trigger on mount in case page is loaded scrolled down
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/#collections" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled || !isHomepage
            ? "bg-brand-black/90 backdrop-blur-md border-b border-brand-gold/15 py-3 sm:py-4"
            : "bg-transparent border-b border-transparent py-5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo (Left) */}
          <div className="flex-1 lg:flex-none">
            <Logo width={isScrolled ? 130 : 155} height={isScrolled ? 42 : 50} variant="light" className="transition-all duration-500" />
          </div>

          {/* Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs xl:text-sm tracking-widest text-brand-off-white hover:text-brand-gold transition-colors font-inter uppercase relative group"
              >
                {link.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Utilities/Icons (Right) */}
          <div className="flex-1 lg:flex-none flex items-center justify-end gap-3 sm:gap-5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-brand-off-white hover:text-brand-gold transition-colors p-1.5"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </button>

            {/* Account */}
            <Link
              href="/checkout"
              className="hidden sm:block text-brand-off-white hover:text-brand-gold transition-colors p-1.5"
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/shop?filter=wishlist"
              className="relative text-brand-off-white hover:text-brand-gold transition-colors p-1.5"
              aria-label="Wishlist"
            >
              <Heart className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-brand-gold rounded-full" />
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-brand-off-white hover:text-brand-gold transition-colors p-1.5"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu (Mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="block lg:hidden text-brand-off-white hover:text-brand-gold transition-colors p-1.5"
              aria-label="Menu"
            >
              <Menu className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
