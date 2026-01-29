"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] text-white border-t border-[#C6A87C]/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TOP SECTION: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-6">
            <div className="flex flex-col">
              <p className="font-script text-[14px] text-[#C6A87C] mb-1 italic">The Essence of Heritage</p>
              <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-tighter italic text-[#E6D6A8]">
                Suvarna Mahel
              </h2>
            </div>
            <p className="text-gray-400 text-sm font-light max-w-md leading-relaxed">
              Experience the pinnacle of 1gm gold jewellery. Each piece is a masterpiece of 
              traditional artistry, crafted for those who carry heritage in their hearts.
            </p>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#C6A87C] font-bold">Join the Inner Circle</h4>
            <div className="relative flex items-center">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-[10px] tracking-widest focus:border-[#C6A87C] outline-none transition-colors uppercase"
              />
              <button className="absolute right-0 text-[#C6A87C] hover:text-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Receive exclusive previews of new collections.</p>
          </div>
        </div>

        {/* MIDDLE SECTION: LINKS & CONTACT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-20 border-b border-white/5">
          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white">Boutique</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-gray-500">
              <li><Link href="/?category=Necklace" className="hover:text-[#C6A87C] transition-colors">Necklaces</Link></li>
              <li><Link href="/?category=Earrings" className="hover:text-[#C6A87C] transition-colors">Earrings</Link></li>
              <li><Link href="/?category=Bangles" className="hover:text-[#C6A87C] transition-colors">Bangles</Link></li>
              <li><Link href="/?category=Bridal Set" className="hover:text-[#C6A87C] transition-colors">Bridal Collection</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white">Client Care</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-gray-500">
              <li><Link href="#" className="hover:text-[#C6A87C] transition-colors">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-[#C6A87C] transition-colors">Return & Exchange</Link></li>
              <li><Link href="#" className="hover:text-[#C6A87C] transition-colors">Care Instructions</Link></li>
              <li><Link href="#" className="hover:text-[#C6A87C] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white">Contact</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.1em] text-gray-500 font-light">
              <li className="flex items-center gap-3"><Phone size={12} className="text-[#C6A87C]" /> 8799282255</li>
              <li className="flex items-center gap-3 lowercase tracking-normal"><Mail size={12} className="text-[#C6A87C]" /> suvarnamaheljewellery@gmail.com</li>
              <li className="flex items-start gap-3 leading-relaxed capitalize tracking-normal"><MapPin size={12} className="text-[#C6A87C] shrink-0" /> Mumbai, Maharashtra, India</li>
            </ul>
          </div>

          {/* LOGO IMAGE IN THE CORNER */}
          <div className="flex flex-col items-end justify-start space-y-6 order-last md:order-none">
            <div className="relative w-24 h-24 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              {/* Replace with your actual logo image path */}
              <Image 
                src="/logo1.png" 
                alt="Suvarna Mahel Official Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="flex gap-6 text-[#C6A87C]/60">
              <Instagram size={18} className="hover:text-white cursor-pointer transition-colors" />
              <Facebook size={18} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-600">
            © {currentYear} Suvarna Mahel. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] text-gray-600 font-bold">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}