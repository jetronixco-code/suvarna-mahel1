import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  
  // 1. Basic Info
  description: text("description"),
  name: varchar("name", { length: 255 }).notNull(),
  price: varchar("price", { length: 50 }), // String to allow "On Request"
  itemCode: varchar("item_code", { length: 50 }), // SKU
  
  // 2. Specifications
  metal: varchar("metal", { length: 50 }).default('Brass'),
  purity: varchar("purity", { length: 50 }).default('24 crt gold polish'),
  weight: varchar("weight", { length: 50 }), // Gross Weight
  
  // 3. Images (Stored as a comma-separated string because Arrays can be tricky in simple setups)
  // We will split this string by "," when we display them.
  imageUrls: text("image_urls"), 

  // 4. Filters (The 4 Columns you asked for)
  category: varchar("category", { length: 100 }).notNull(), // Necklace, Bangles...
  weddingCollection: varchar("wedding_collection", { length: 100 }), // Bridal Set...
  targetAudience: varchar("target_audience", { length: 100 }), // Women, Kids...
  otherCollection: varchar("other_collection", { length: 100 }), // Temple, Antique...

  createdAt: timestamp("created_at").defaultNow(),
});