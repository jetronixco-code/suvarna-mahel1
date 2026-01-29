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
      
      {/* 1. CINEMATIC SPOTLIGHT (Matches Black Navbar) */}
<div className="bg-[#050505]">
        {latestProduct && (
          <section className="relative h-[80vh] w-full overflow-hidden bg-[#050505]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
            >
              <source src="/hero-jewelry.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

            <div className="relative max-w-7xl mx-auto h-full px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
<div className="relative h-[60vh] md:h-[72vh] w-full group overflow-hidden border border-[#C6A87C]/20 shadow-2xl z-10 bg-black">
                <Image
                  src={latestProduct.imageUrls?.split(",")[0] || "/placeholder.jpg"}
                  alt={latestProduct.name}
                  fill
                  className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                />
              </div>

              <div className="text-white space-y-6 z-10">
                <p className="text-[#C6A87C] font-script text-3xl italic">Newest Arrival</p>
                <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-tighter leading-none italic">
                  {latestProduct.name}
                </h2>
                <p className="text-gray-400 text-sm font-light max-w-md leading-relaxed border-l border-[#C6A87C]/30 pl-6">
                  {latestProduct.description || "Discover the pinnacle of heritage craftsmanship in our latest 1gm gold masterpiece."}
                </p>
                <div className="pt-6 flex items-center gap-8">
                  <Link
                    href={`/product/${latestProduct.id}`}
                    className="inline-flex items-center gap-4 bg-[#C6A87C] text-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all shadow-lg"
                  >
                    View Masterpiece <ChevronRight size={14} />
                  </Link>
                  <p className="text-2xl font-serif text-[#C6A87C]/80">₹{latestProduct.price}</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 opacity-5 select-none pointer-events-none z-0">
              <h2 className="text-[20vw] font-serif uppercase leading-none -mb-10 text-white italic">
                {latestProduct.category}
              </h2>
            </div>
          </section>
        )}
      </div>

      {/* 2. THE BRAND PROMISE (Heritage Pillars) */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <ShieldCheck className="mx-auto text-[#C6A87C]" size={24} strokeWidth={1} />
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900">1gm Gold Polish</h4>
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

      {/* 3. NEW EDITS (Horizontal Boutique Scroll) */}
      {featuredProducts.length > 0 && (
        <section className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="font-serif text-4xl uppercase tracking-tighter text-gray-900 leading-none">The New Edit</h3>
              <p className="text-[#C6A87C] text-[9px] uppercase tracking-[0.4em]">Latest arrivals to the Suvarna vault</p>
            </div>
            <p className="text-[8px] uppercase tracking-widest text-gray-300 font-bold mb-2">Swipe to discover →</p>
          </div>

          <div className="flex gap-10 overflow-x-auto no-scrollbar px-6 md:px-20 pb-10">
            {featuredProducts.map((item) => (
              <Link href={`/product/${item.id}`} key={item.id} className="min-w-[300px] md:min-w-[400px] group">
                <div className="relative aspect-[4/5] overflow-hidden bg-white border border-gray-100 transition-all duration-700 group-hover:shadow-2xl">
                  <Image src={item.imageUrls?.split(",")[0] || "/placeholder.jpg"} alt={item.name} fill className="object-cover group-hover:scale-105 transition-all duration-[2000ms]" />
                </div>
                <div className="mt-6 space-y-1">
                  <p className="text-[#C6A87C] text-[8px] uppercase tracking-[0.3em] font-bold">{item.category}</p>
                  <h4 className="font-serif text-xl uppercase tracking-tight text-gray-900">{item.name}</h4>
                  <p className="text-[#C6A87C] font-bold">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 4. THE COLLECTION VAULT (Main Catalog Grid) */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="font-serif text-5xl uppercase tracking-tighter text-gray-900 leading-none italic">The Vault</h2>
          <div className="w-16 h-px bg-[#C6A87C] mt-6"></div>
          <p className="text-[#C6A87C] text-[10px] uppercase tracking-[0.5em] mt-6 font-bold">Heritage Catalog</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
         {vaultProducts.map((item) => {
  const priceNumber = Number(item.price) || 0;
const isLimited = priceNumber > 5000;

  return (
    <Link href={`/product/${item.id}`} key={item.id} className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-sm border border-gray-100 transition-all duration-1000 group-hover:shadow-2xl">
        {isLimited && (
          <div className="absolute top-0 right-0 z-20 bg-[#C6A87C] text-black text-[7px] md:text-[8px] uppercase tracking-[0.3em] font-bold px-3 py-1.5">
            Limited Edition
          </div>
        )}
        <Image
          src={item.imageUrls?.split(",")[0] || "/placeholder.jpg"}
          alt={item.name}
          fill
          className="object-cover"
        />
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