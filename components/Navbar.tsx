"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const categories = [
    { name: "Collection", slug: "" },
    { name: "Necklaces", slug: "necklace" },
    { name: "Earrings", slug: "earrings" },
    { name: "Bangles", slug: "bangles" },
    { name: "Rings", slug: "rings" },
    { name: "Bridal", slug: "bridal-set" },
  ];

  return (
    <>
      {/* MAIN NAVBAR (Desktop + Mobile SAME) */}
      <nav className="sticky top-0 z-[100] w-full bg-[#050505]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          
          {/* LOGO — untouched */}
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

          {/* HAMBURGER — visible on ALL sizes */}
          <button
            onClick={() => setOpen(true)}
            className="text-[#C6A87C] text-xl tracking-widest"
            aria-label="Open Menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* DRAWER (Mobile-style, reused everywhere) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black"
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-[#C6A87C] text-xs uppercase tracking-widest"
            >
              Close ✕
            </button>

            {/* Links */}
            <div className="flex flex-col items-center gap-10 pt-28">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.slug ? `/category/${cat.slug}` : "/"}
                  onClick={() => setOpen(false)}
                  className="text-[#C6A87C] uppercase tracking-[0.35em] text-sm hover:opacity-80 transition"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
