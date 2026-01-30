import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // <--- 1. IMPORT THIS

// 1. GET ONE PRODUCT (No changes needed here)
export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await db.query.products.findFirst({
      where: eq(products.id, parseInt(id))
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// 2. UPDATE PRODUCT (PATCH)
export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // Explicitly mapping the fields
    const result = await db.update(products)
      .set({
        name: body.name,
        description: body.description,
        price: body.price,
        itemCode: body.itemCode,
        weight: body.weight,
        imageUrls: body.imageUrls,
        category: body.category,
        weddingCollection: body.weddingCollection,
        targetAudience: body.targetAudience,
        otherCollection: body.otherCollection,
        metal: body.metal,
        purity: body.purity,
      })
      .where(eq(products.id, parseInt(id)));

    // <--- 3. ADD THESE LINES TO FIX VERCEL EDITING --->
    console.log(`Revalidating cache for product ${id}`);
    revalidatePath("/");                     // Updates Home/Vault
    revalidatePath("/admin");                // Updates Admin Dashboard
    revalidatePath(`/product/${id}`);        // Updates the specific Product Page
      
    return NextResponse.json(result);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}