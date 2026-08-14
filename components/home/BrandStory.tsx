import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";

export default function BrandStory() {
  return (
    <section className="py-24 bg-brand-soft-black/20 border-t border-b border-brand-gold/5 text-brand-off-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image Column */}
          <div className="lg:col-span-6 relative aspect-[4/5] w-full bg-brand-soft-black overflow-hidden border border-brand-gold/5 shadow-2xl">
            <Image
              src="/images/brand-story.jpg"
              alt="Ibrahim Khoder Atelier Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Elegant overlay frame */}
            <div className="absolute inset-6 border border-brand-gold/15 pointer-events-none" />
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs tracking-[0.3em] font-medium text-brand-gold uppercase block">
                The Heritage
              </span>
              <h2 className="font-playfair text-2xl sm:text-4xl tracking-wide uppercase font-medium">
                Crafted with Purpose
              </h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6 text-brand-gray font-light text-sm sm:text-base leading-relaxed">
              <p>
                Founded on the principles of immaculate tailoring and modern Egyptian identity, Ibrahim Khoder represents a bold synthesis of heritage craftsmanship and sleek minimalism. Every piece is an exploration of geometry, textile weight, and individual confidence.
              </p>
              <p>
                We collaborate with the region’s finest artisans, selecting only ethically sourced Egyptian cottons, luxury wools, and fine leather trims. Our design philosophy bypasses temporary trends in favor of structured silhouettes that possess a timeless, commanding presence.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/about">
                <Button variant="secondary" size="md">
                  Discover Our Story
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
