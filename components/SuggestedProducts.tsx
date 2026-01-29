import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, ne, eq, and } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";

export default async function SuggestedProducts({ currentId, category }: { currentId: number, category: string }) {
  const suggested = await db.query.products.findMany({
    where: and(eq(products.category, category), ne(products.id, currentId)),
    limit: 4,
    orderBy: [desc(products.createdAt)],
  });

  if (suggested.length === 0) return null;

  return (
    <section className="mt-24 border-t border-gray-100 pt-16">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl uppercase tracking-tighter">You May Also Like</h2>
        <div className="w-12 h-px bg-[#C6A87C] mx-auto mt-4"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {suggested.map((item) => {
          const img = item.imageUrls?.split(",")[0] || "/placeholder.jpg";
          return (
            <Link href={`/product/${item.id}`} key={item.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-white border border-gray-50">
                <Image src={img} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-[10px] uppercase tracking-widest font-bold">{item.name}</h3>
                <p className="text-[#C6A87C] text-xs mt-1">₹{item.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}