"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-brand-black overflow-hidden">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/hero.jpg')]"
        style={{ backgroundPosition: "center 25%" }}
      />

      {/* Cinematic Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6 sm:space-y-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-3 sm:space-y-4"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.4em] font-medium text-brand-gold uppercase block">
            Ibrahim Khoder Atelier
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl font-light tracking-wide text-brand-off-white uppercase leading-tight">
            Timeless <br className="sm:hidden" /> Elegance
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="text-xs sm:text-base font-light text-brand-gray tracking-wide max-w-md sm:max-w-xl leading-relaxed"
        >
          Discover refined style crafted for those who appreciate the details. Luxurious fabrics, bespoke finishes, and a contemporary signature look.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/shop">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Shop Collection
            </Button>
          </Link>
          <Link href="/#collections">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Collections
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-brand-gray text-[10px] tracking-[0.2em] uppercase font-light cursor-pointer"
        onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span>Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-brand-gold/50"
        />
      </motion.div>
    </section>
  );
}
