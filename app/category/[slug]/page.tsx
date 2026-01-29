import { db } from "@/db";
import { products } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { desc } from "drizzle-orm";
import Footer from "@/components/Footer";

const CATEGORY_MAP: Record<string, string> = {
  necklace: "Necklace",
  earrings: "Earrings",
  bangles: "Bangles",
  rings: "Rings",
  bridal: "Bridal Set",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ FIX 1: unwrap params
  const { slug } = await params;

  // ✅ FIX 2: normalize category
  const categoryName = CATEGORY_MAP[slug.toLowerCase()];

  if (!categoryName) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center bg-[#FAFAF9]">
        <p className="font-serif text-gray-400 uppercase tracking-widest mb-4">
          Category not found
        </p>
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.3em] text-[#C6A87C]"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  // ✅ FIX 3: fetch ALL products, then filter safely
  const allProducts = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
  });

  const categoryProducts = allProducts.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="w-full bg-[#FAFAF9]">

      {/* CATEGORY HEADER */}
      <section className="bg-[#050505] py-28 text-center">
        <h1 className="font-serif text-6xl uppercase tracking-tight text-[#E6D6A8] italic">
          {categoryName}
        </h1>
        <p className="text-[#C6A87C] text-[10px] uppercase tracking-[0.4em] mt-4">
          Curated Collection
        </p>
      </section>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {categoryProducts.map((item) => (
              <Link
                href={`/product/${item.id}`}
                key={item.id}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-white border border-gray-100 transition-all duration-700 group-hover:shadow-2xl">
                  <Image
                    src={item.imageUrls?.split(",")[0] || "/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-[2500ms]"
                  />
                </div>

                <div className="mt-6 text-center space-y-1">
                  <h3 className="font-serif text-lg uppercase tracking-tight text-gray-900 group-hover:text-[#C6A87C] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[#C6A87C] font-bold text-sm">
                    ₹{item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 text-gray-300 font-serif italic uppercase tracking-widest">
            No products found
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
