import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// 1. GET ONE PRODUCT
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
    
    // Explicitly mapping the fields ensures 'description' and others are updated correctly
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
      
    return NextResponse.json(result);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}