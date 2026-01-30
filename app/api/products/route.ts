import { db } from "@/db";
import { products } from "@/db/schema";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // <--- 1. IMPORT THIS

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const result = await db.insert(products).values({
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
    });

    // <--- 2. ADD THESE LINES TO REFRESH THE SITE IMMEDIATELY
    revalidatePath("/");        // Updates the Homepage (Vault/Grid)
    revalidatePath("/admin");   // Updates your Admin List
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Insert Error:", error);
    return NextResponse.json({ error: "Failed to add masterpiece" }, { status: 500 });
  }
}