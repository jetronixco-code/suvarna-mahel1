import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ExternalLink, Plus, Edit } from "lucide-react"; 
import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteButton from "@/components/DeleteButton"; // Import the client component

export default async function AdminDashboard() {
  const allProducts = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
  });

  async function deleteProduct(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await db.delete(products).where(eq(products.id, parseInt(id)));
    revalidatePath("/admin");
    revalidatePath("/");
  }

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="font-serif text-4xl">Inventory Manager</h1>
            <p className="text-[#C6A87C] text-xs uppercase tracking-widest mt-2">Suvarna Mahel Dashboard</p>
          </div>
          <Link 
            href="/admin/add" 
            className="bg-black text-[#C6A87C] px-6 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-lg"
          >
            <Plus size={14} /> Add New Piece
          </Link>
        </div>

        <div className="border border-gray-100 rounded-sm overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                <th className="p-4 font-bold">Product</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Price</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {allProducts.map((item) => {
                const firstImage = item.imageUrls?.split(",")[0] || "/placeholder.jpg";
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gray-100 relative overflow-hidden">
                          <img src={firstImage} alt={item.name} className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">SKU: {item.itemCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-xs uppercase tracking-widest text-gray-500 font-medium">
                      {item.category}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-900">
                      ₹{item.price || "On Request"}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end items-center gap-3">
                        <Link href={`/product/${item.id}`} className="p-2 text-gray-400 hover:text-black transition-colors">
                          <ExternalLink size={16} />
                        </Link>
                        <Link href={`/admin/edit/${item.id}`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit size={16} />
                        </Link>
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={item.id} />
                          {/* Use the Client Component here */}
                          <DeleteButton />
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {allProducts.length === 0 && (
            <div className="p-24 text-center">
              <p className="font-serif text-xl text-gray-300 italic">The vault is empty.</p>
              <Link href="/admin/add" className="text-[#C6A87C] text-[10px] uppercase tracking-[0.2em] mt-4 block hover:underline">
                Add your first masterpiece
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}