import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Collections from "@/components/home/Collections";
import PromoBanner from "@/components/home/PromoBanner";
import BrandStory from "@/components/home/BrandStory";
import InstagramGrid from "@/components/home/InstagramGrid";
import Newsletter from "@/components/ui/Newsletter";

export default function Home() {
  return (
    <div className="w-full bg-brand-black">
      {/* Cinematic Hero Header */}
      <Hero />

      {/* Featured Collection Grid */}
      <FeaturedProducts />

      {/* Editorial Category Blocks */}
      <Collections />

      {/* Full-width Promotion Section */}
      <PromoBanner />

      {/* Brand Heritage Story Column */}
      <BrandStory />

      {/* VisualLookbook Instagram Feed */}
      <InstagramGrid />

      {/* Newsletter Signup Panel */}
      <Newsletter />
    </div>
  );
}
