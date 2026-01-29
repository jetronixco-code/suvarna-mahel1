"use client";

import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, X, CheckCircle2, ImagePlus } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner"; // Assuming you have sonner set up

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: "", 
    price: "", 
    itemCode: "", 
    weight: "",
    description: "", // Added description to state
    category: "Necklace", 
    weddingCollection: "None",
    targetAudience: "Women", 
    otherCollection: "None",
    metal: "Brass", 
    purity: "24 crt gold polish"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return toast.error("Please upload at least one image");
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({ ...formData, imageUrls: images.join(",") }),
      });

      if (res.ok) {
        toast.success("Masterpiece Added Successfully!");
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/admin" className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-black mb-10 transition-colors">
          <ChevronLeft size={14} /> Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h1 className="font-serif text-5xl text-[#1a1a1a]">Inventory</h1>
            <p className="text-[#C6A87C] font-script text-2xl mt-2">Add a new masterpiece</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: Image Upload & Preview */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-gray-100 p-8 shadow-sm">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 block mb-6">Visual Gallery</label>
              
              <UploadDropzone
                endpoint="imageUploader"
                onUploadProgress={(p) => setUploadProgress(p)}
                onClientUploadComplete={(res) => {
                  setImages([...images, ...res.map(f => f.url)]);
                  setUploadProgress(0);
                  toast.success("Image uploaded");
                }}
                className="ut-label:text-[#C6A87C] ut-button:bg-black ut-button:text-[#C6A87C] border-2 border-dashed border-gray-100 p-12 hover:border-[#C6A87C] transition-all"
              />

              {uploadProgress > 0 && (
                <div className="mt-4 space-y-2">
                  <Progress value={uploadProgress} className="h-1 bg-gray-100" />
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 mt-8">
                {images.map((url, i) => (
                  <div key={i} className="group relative aspect-square bg-gray-50 border border-gray-100 overflow-hidden">
                    <img src={url} className="object-cover w-full h-full" />
                    <button 
                      type="button"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))} 
                      className="absolute top-1 right-1 bg-black text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="lg:col-span-7 space-y-10 bg-white border border-gray-100 p-10 shadow-sm">
            <div className="grid grid-cols-1 gap-8">
              <InputGroup label="Product Name" placeholder="e.g. Royal Antique Haram" onChange={(v) => setFormData({...formData, name: v})} />
              
              {/* NEW: Description Textarea */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Product Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe the craftsmanship, history, or style of this piece..."
                  className="w-full border border-gray-100 p-4 bg-gray-50 outline-none focus:border-[#C6A87C] transition-colors text-sm placeholder:text-gray-300"
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <InputGroup label="Price (INR)" placeholder="e.g. 4500" onChange={(v) => setFormData({...formData, price: v})} />
                <InputGroup label="SKU / Item Code" placeholder="SM-JH-001" onChange={(v) => setFormData({...formData, itemCode: v})} />
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-50">
                <SelectGroup label="Category" options={["Necklace", "Bangles", "Earrings", "Rings", "Jhumka", "Chain"]} onChange={(v) => setFormData({...formData, category: v})} />
                <SelectGroup label="Wedding" options={["None", "Bridal Set", "Mangalsutra", "Engagement"]} onChange={(v) => setFormData({...formData, weddingCollection: v})} />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <SelectGroup label="Target For" options={["Women", "Men", "Kids", "Bride"]} onChange={(v) => setFormData({...formData, targetAudience: v})} />
                <SelectGroup label="Artistic Style" options={["None", "Temple", "Antique", "Kundan"]} onChange={(v) => setFormData({...formData, otherCollection: v})} />
              </div>
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-black text-[#C6A87C] py-5 mt-6 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-[#111] transition-all flex justify-center items-center disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <CheckCircle2 className="mr-2" size={14} />}
              {loading ? "Publishing..." : "Add to Collection"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Sub-components
function InputGroup({ label, placeholder, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{label}</label>
      <input 
        required
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-gray-100 py-3 bg-transparent outline-none focus:border-[#C6A87C] transition-colors placeholder:text-gray-200 text-sm"
      />
    </div>
  );
}

function SelectGroup({ label, options, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{label}</label>
      <select 
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-gray-100 py-3 bg-transparent outline-none focus:border-[#C6A87C] transition-colors text-sm uppercase tracking-widest cursor-pointer"
      >
        {options.map((o: any) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}