"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);

  const categories = [
    { name: "Collection", slug: "" },
    { name: "Necklaces", slug: "Necklace" },
    { name: "Earrings", slug: "Earrings" },
    { name: "Bangles", slug: "Bangles" },
    { name: "Rings", slug: "Rings" },
    { name: "Bridal", slug: "Bridal Set" },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full bg-[#050505]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col items-center">
        
        {/* BRAND */}
        <Link href="/" className="text-center select-none">
          <p className="font-script text-[11px] text-[#C6A87C]/80 mb-1">
            Exquisite Collection
          </p>
          <h1 className="font-serif text-[28px] md:text-[32px] uppercase tracking-tight text-[#E6D6A8] leading-none">
            Suvarna Mahel
          </h1>
          <p className="text-[8px] uppercase tracking-[0.5em] text-[#C6A87C]/60 mt-1">
            Imitation Jewellery and Art
          </p>
        </Link>

        {/* NAV LINKS */}
        <div className="flex gap-8 mt-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
  href={cat.slug ? `/category/${cat.slug.toLowerCase()}` : "/"}
              onMouseEnter={() => setHovered(cat.name)}
              onMouseLeave={() => setHovered(null)}
              className="relative text-[10px] uppercase tracking-[0.35em] text-white/50 hover:text-[#C6A87C] transition-colors"
            >
              {cat.name}

              <AnimatePresence>
                {hovered === cat.name && (
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-1 left-0 h-[1px] bg-[#C6A87C]"
                  />
                )}
              </AnimatePresence>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
