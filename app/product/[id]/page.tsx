import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ChevronLeft, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import SuggestedProducts from "@/components/SuggestedProducts";
import ProductGallery from "@/components/ProductGallery";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) return notFound();

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!product) return notFound();

  const imageUrls = product.imageUrls?.split(",") || [];

  const whatsappNumber = "919876543210";
  const message = encodeURIComponent(
    `Namaste Suvarna Mahel,\n\nI am interested in:\n*${product.name}*\nSKU: ${product.itemCode}\nPrice: ₹${product.price}\n\nPlease share more photos and availability.`
  );

  return (
    <div className="bg-[#FAFAF9] min-h-screen pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-6">
        
        {/* Breadcrumb */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-black mb-6 transition-colors"
        >
          <ChevronLeft size={12} /> Back to Collection
        </Link>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-7 sticky top-24">
            <ProductGallery
              images={imageUrls.length ? imageUrls : ["/placeholder.jpg"]}
              alt={product.name}
            />
          </div>

          {/* RIGHT: PRODUCT DETAILS */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div className="space-y-2">
              <p className="text-[#C6A87C] font-serif italic text-lg tracking-wide">
                Handcrafted Heritage
              </p>
              <h1 className="font-serif text-4xl text-gray-900 leading-tight uppercase tracking-tighter">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-[#C6A87C] tracking-widest pt-1">
                {product.price ? `₹${product.price}` : "Price on Request"}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 italic">
                The Craftsmanship
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line font-light">
                {product.description ||
                  "Each Suvarna Mahel piece is crafted with meticulous attention to detail, featuring high-quality 1gm gold polish on premium brass."}
              </p>
            </div>

            {/* SPECIFICATIONS */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                Specifications
              </h3>
              <div className="grid grid-cols-2 text-[11px] uppercase tracking-widest gap-y-3">
                <span className="text-gray-400">Metal / Polish</span>
                <span className="text-right font-bold">
                  {product.metal} - {product.purity}
                </span>

                <span className="text-gray-400">Category</span>
                <span className="text-right font-bold">{product.category}</span>

                <span className="text-gray-400">SKU Code</span>
                <span className="text-right font-bold">{product.itemCode}</span>

                <span className="text-gray-400">Gross Weight</span>
                <span className="text-right font-bold">
                  {product.weight || "N/A"}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1a1a1a] text-[#C6A87C] py-4 flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-black transition-all shadow-xl border border-[#C6A87C]/20"
              >
                <MessageCircle size={16} /> Enquire on WhatsApp
              </a>
            </div>

            {/* TRUST MARKERS */}
            <div className="grid grid-cols-2 gap-3 pt-6">
              <div className="flex flex-col items-center p-3 border border-gray-100 gap-1 text-center bg-white">
                <ShieldCheck size={18} className="text-[#C6A87C]" />
                <span className="text-[7px] uppercase tracking-widest font-bold">
                  100% Authentic
                </span>
              </div>
              <div className="flex flex-col items-center p-3 border border-gray-100 gap-1 text-center bg-white">
                <Truck size={18} className="text-[#C6A87C]" />
                <span className="text-[7px] uppercase tracking-widest font-bold">
                  Fast Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SUGGESTED PRODUCTS */}
        <SuggestedProducts
          currentId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
}
