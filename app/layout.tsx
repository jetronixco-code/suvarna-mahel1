import type { Metadata } from "next";
import { Playfair_Display, Lato, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import ChatButton from "@/components/ChatButton"; // Import the new component
import "@uploadthing/react/styles.css"; 
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const greatVibes = Great_Vibes({ 
  subsets: ["latin"], 
  weight: "400", 
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Suvarna Mahel | Premium 1gm Jewellery",
  description: "Exclusive imitation jewellery collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} ${greatVibes.variable} font-sans antialiased bg-[#0a0a0a]`}>
        <Navbar />
        
        {/* Main content wrapper with dark background to eliminate gaps */}
        <main className="relative min-h-screen bg-[#050505]">
          {children}
        </main>

        {/* Floating Bridal Concierge Button */}
        <ChatButton />

        {/* Global Toaster for Notifications */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}