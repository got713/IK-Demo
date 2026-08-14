import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-32 font-inter text-brand-off-white">
      {/* Editorial Header */}
      <div className="border-b border-brand-gold/10 pb-8 mb-16 text-center sm:text-left">
        <span className="text-[10px] tracking-[0.4em] font-medium text-brand-gold uppercase block mb-2">
          The Journal
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl tracking-wide uppercase font-semibold">
          Crafted With Purpose
        </h1>
        <p className="text-xs sm:text-base text-brand-gray font-light max-w-xl mt-3 leading-relaxed">
          Behind the seams of Ibrahim Khoder: an Egyptian fashion house merging structure with quiet luxury.
        </p>
      </div>

      {/* Row 1: The Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-playfair text-xl sm:text-2xl uppercase tracking-wider text-brand-gold">
            Our Origins
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
            <p>
              Ibrahim Khoder was founded in Cairo with a clear ambition: to create garments that serve as armor for the modern individual. We rejected the model of fast, disposable fashion, focusing instead on the precision of traditional bespoke tailoring.
            </p>
            <p>
              Our flagship atelier in Zamalek remains the heart of our operations. It is here that we drape, sketch, and inspect every design prototype. We draw heavy inspiration from Cairo&apos;s rich textures—the geometric masonry of its historic gates, the soft light of the Nile, and the dynamic tempo of its streets.
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 relative aspect-[4/3] w-full bg-brand-soft-black overflow-hidden border border-brand-gold/10">
          <Image
            src="/images/collection-women.jpg"
            alt="Atelier workspace sewing details"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Row 2: Vision & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-brand-gold/10">
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-gold uppercase block">01</span>
          <h3 className="font-playfair text-lg uppercase tracking-wide">Timeless Precision</h3>
          <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
            We prioritize silhouettes that do not age. Our coats, blazers, and shirts are engineered to look as relevant in a decade as they do today, maintaining structure and poise.
          </p>
        </div>
        
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-gold uppercase block">02</span>
          <h3 className="font-playfair text-lg uppercase tracking-wide">Noble Textiles</h3>
          <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
            We source our materials from premium mills. From organic linen grown on the banks of the Nile to Italian merino wools, our fabrics speak before you do.
          </p>
        </div>
        
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-gold uppercase block">03</span>
          <h3 className="font-playfair text-lg uppercase tracking-wide">Bespoke Heritage</h3>
          <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed">
            Every buttonhole, cuff-link placement, and shoulder pad is deliberated. We maintain tight production runs to ensure quality control stays at an absolute peak.
          </p>
        </div>
      </div>
    </div>
  );
}
