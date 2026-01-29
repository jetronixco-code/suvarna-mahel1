"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { UploadDropzone } from "@/utils/uploadthing";

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: "", price: "", itemCode: "", weight: "",
    category: "Necklace", weddingCollection: "None",
    targetAudience: "Women", otherCollection: "None",
    metal: "Brass", purity: "24 crt gold polish",
    description: ""
  });

  // Load existing data
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData(data);
        setImages(data.imageUrls?.split(",") || []);
        setFetching(false);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...formData, imageUrls: images.join(",") }),
      });

      if (res.ok) {
        alert("Product Updated Successfully");
        router.push("/admin");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="h-screen flex items-center justify-center font-serif">Loading Piece...</div>;

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/admin" className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-10">
          <ChevronLeft size={14} /> Back to Dashboard
        </Link>
        
        <h1 className="font-serif text-4xl mb-12 uppercase tracking-tighter text-gray-900">Edit Collection</h1>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Images */}
          <div className="lg:col-span-5 space-y-6">
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => setImages([...images, ...res.map(f => f.url)])}
              className="border-2 border-dashed border-gray-200 p-10"
            />
            <div className="grid grid-cols-3 gap-4">
              {images.map((url, i) => (
                <div key={url} className="relative aspect-square border bg-white p-1">
                  <img src={url} className="object-cover w-full h-full" />
                  <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-[8px]">X</button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Details */}
          <div className="lg:col-span-7 space-y-8 bg-white p-10 shadow-sm border border-gray-100">
            <div className="space-y-6">
              <InputGroup label="Product Name" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} />
              
              {/* NEW: Description Box */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Description</label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-100 p-3 bg-gray-50 outline-none focus:border-[#C6A87C] transition-colors text-sm"
                  placeholder="Tell the story of this piece..."
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <InputGroup label="Price" value={formData.price} onChange={(v: string) => setFormData({...formData, price: v})} />
                <InputGroup label="SKU" value={formData.itemCode} onChange={(v: string) => setFormData({...formData, itemCode: v})} />
              </div>
            </div>

            <button disabled={loading} className="w-full bg-black text-[#C6A87C] py-5 uppercase tracking-[0.4em] text-[10px] font-bold">
              {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputGroup({ label, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{label}</label>
      <input 
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-gray-100 py-2 bg-transparent outline-none focus:border-[#C6A87C] text-sm"
      />
    </div>
  );
}