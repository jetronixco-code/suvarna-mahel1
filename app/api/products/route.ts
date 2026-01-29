import { db } from "@/db";
import { products } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Explicitly inserting values to ensure the description is captured
    const result = await db.insert(products).values({
      name: body.name,
      description: body.description, // Ensure this matches your schema
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

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Insert Error:", error);
    return NextResponse.json({ error: "Failed to add masterpiece" }, { status: 500 });
  }
}