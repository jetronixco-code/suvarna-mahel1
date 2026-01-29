import { db } from "@/db";
import { products } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";
import { desc } from "drizzle-orm";
import { ChevronRight, Sparkles, ShieldCheck, Trophy } from "lucide-react";
import Footer from "@/components/Footer";

export default async function Home() {
  const allProducts = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
  });

  // Dynamic Content Logic
  const latestProduct = allProducts[0];
  const featuredProducts = allProducts.length > 1 ? allProducts.slice(1, 6) : [];
  const vaultProducts = allProducts;

  return (
    <div className="w-full bg-[#FAFAF9]">
      
      {/* 1. CINEMATIC SPOTLIGHT */}
      <div className="bg-[#050505]">
        {latestProduct && (
          <section className="relative min-h-[90vh] md:h-[80vh] w-full overflow-hidden bg-[#050505] flex flex-col justify-center">
            
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
            >
              <source src="/hero-jewelry.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

            {/* Content Grid */}
            <div className="relative max-w-7xl mx-auto h-full px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12 py-20 md:py-0">
              
              {/* === FIX IS HERE: Removed 'hidden md:block' === */}
              {/* Now it just says 'block' so it shows on ALL screens */}
<div className="relative min-h-[320px] h-[45vh] md:h-[60vh] lg:h-[72vh] w-full group overflow-hidden border border-[#C6A87C]/20 shadow-2xl z-10 bg-black block">
                <Image
                  src={latestProduct.imageUrls?.split(",")[0] || "/placeholder.jpg"}
                  alt={latestProduct.name}
                  fill
                  className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
<div className="text-white md:text-white space-y-4 md:space-y-6 z-10">
                <p className="text-white md:text-[#C6A87C] font-script text-2xl md:text-3xl italic">
Newest Arrival</p>
                
<h2 className="font-serif text-white md:text-white text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter leading-none italic drop-shadow-lg">
                  {latestProduct.name}
                </h2>
                
<p className="text-gray-200 md:text-gray-400 text-xs md:text-sm font-light max-w-md leading-relaxed border-l border-white/40 md:border-[#C6A87C]/30 pl-4 md:pl-6">
                  {latestProduct.description || "Discover the pinnacle of heritage craftsmanship in our latest 1gm gold masterpiece."}
                </p>
                
                <div className="pt-4 md:pt-6 flex items-center gap-6 md:gap-8">
                  <Link
                    href={`/product/${latestProduct.id}`}
                    className="inline-flex items-center gap-3 md:gap-4 bg-[#C6A87C] text-black px-6 py-3 md:px-10 md:py-4 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all shadow-lg"
                  >
                    View Piece <ChevronRight size={14} />
                  </Link>
                  <p className="text-xl md:text-2xl font-serif text-white md:text-[#C6A87C]/80">
₹{latestProduct.price}</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 opacity-5 select-none pointer-events-none z-0 hidden md:block">
              <h2 className="text-[20vw] font-serif uppercase leading-none -mb-10 text-white italic">
                {latestProduct.category}
              </h2>
            </div>
          </section>
        )}
      </div>

      {/* 2. THE BRAND PROMISE */}
      <section className="bg-white border-b border-gray-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          <div className="space-y-2">
            <ShieldCheck className="mx-auto text-[#C6A87C]" size={24} strokeWidth={1} />
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900">24 crt Gold Polish</h4>
            <p className="text-[10px] text-gray-400 font-light">Authentic 24k gold look</p>
          </div>
          <div className="space-y-2 md:border-x md:border-gray-100">
            <Trophy className="mx-auto text-[#C6A87C]" size={24} strokeWidth={1} />
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900">Artisan Crafted</h4>
            <p className="text-[10px] text-gray-400 font-light">Traditional heritage</p>
          </div>
          <div className="space-y-2">
            <Sparkles className="mx-auto text-[#C6A87C]" size={24} strokeWidth={1} />
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900">Boutique Quality</h4>
            <p className="text-[10px] text-gray-400 font-light">Curated for excellence</p>
          </div>
        </div>
      </section>

      {/* 3. NEW EDITS */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl md:text-4xl uppercase tracking-tighter text-gray-900 leading-none">The New Edit</h3>
              <p className="text-[#C6A87C] text-[8px] md:text-[9px] uppercase tracking-[0.4em]">Latest arrivals</p>
            </div>
            <p className="text-[8px] uppercase tracking-widest text-gray-300 font-bold mb-2">Swipe →</p>
          </div>

          <div className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar px-6 md:px-20 pb-10">
            {featuredProducts.map((item) => (
              <Link href={`/product/${item.id}`} key={item.id} className="min-w-[200px] md:min-w-[400px] group">
                <div className="relative aspect-[4/5] overflow-hidden bg-white border border-gray-100 transition-all duration-700 group-hover:shadow-2xl">
                  <Image src={item.imageUrls?.split(",")[0] || "/placeholder.jpg"} alt={item.name} fill className="object-cover group-hover:scale-105 transition-all duration-[2000ms]" />
                </div>
                <div className="mt-4 md:mt-6 space-y-1 text-center">
                  <p className="text-[#C6A87C] text-[7px] md:text-[8px] uppercase tracking-[0.3em] font-bold">{item.category}</p>
                  <h4 className="font-serif text-sm md:text-xl uppercase tracking-tight text-gray-900">{item.name}</h4>
                  <p className="text-[#C6A87C] font-bold text-xs md:text-base">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 4. THE VAULT */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 border-t border-gray-100">
        <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
          <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-gray-900 leading-none italic">The Vault</h2>
          <div className="w-16 h-px bg-[#C6A87C] mt-6"></div>
          <p className="text-[#C6A87C] text-[9px] md:text-[10px] uppercase tracking-[0.5em] mt-6 font-bold">Heritage Catalog</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-12 md:gap-y-16">
          {vaultProducts.map((item) => {
            const priceNumber = Number(item.price) || 0;
            const isLimited = priceNumber > 5000;

            return (
              <Link href={`/product/${item.id}`} key={item.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-sm border border-gray-100 transition-all duration-1000 group-hover:shadow-2xl">
                  {isLimited && (
                    <div className="absolute top-0 right-0 z-20 bg-[#C6A87C] text-black text-[6px] md:text-[8px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold px-2 py-1 md:px-3 md:py-1.5">
                      Limited
                    </div>
                  )}
                  <Image
                    src={item.imageUrls?.split(",")[0] || "/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[2500ms]"
                  />
                </div>

                <div className="mt-4 md:mt-6 text-center space-y-1 md:space-y-2">
                  <h3 className="font-serif text-xs md:text-sm uppercase tracking-wide text-gray-900 group-hover:text-[#C6A87C] transition-colors truncate px-1">
                    {item.name}
                  </h3>

                  <p className="text-[#C6A87C] font-bold text-xs md:text-sm">
                    ₹{priceNumber.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}