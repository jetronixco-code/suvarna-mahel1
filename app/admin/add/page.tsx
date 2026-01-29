"use client";

import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface InputGroupProps {
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

interface SelectGroupProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
}

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
    description: "",
    category: "Necklace",
    weddingCollection: "None",
    targetAudience: "Women",
    otherCollection: "None",
    metal: "Brass",
    purity: "24 crt gold polish",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (images.length === 0) return toast.error("Please upload at least one image");

    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          imageUrls: images.join(","),
        }),
      });

      if (res.ok) {
        toast.success("Masterpiece Added Successfully!");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-black mb-10"
        >
          <ChevronLeft size={14} /> Back to Dashboard
        </Link>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-gray-100 p-8 shadow-sm">
              <UploadDropzone
                endpoint="imageUploader"
                onUploadProgress={(p) => setUploadProgress(p)}
                onClientUploadComplete={(res) => {
                  setImages((prev) => [...prev, ...res.map((f) => f.url)]);
                  setUploadProgress(0);
                  toast.success("Image uploaded");
                }}
              />

              {uploadProgress > 0 && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="h-1" />
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 mt-8">
                {images.map((url, i) => (
                  <div key={i} className="relative aspect-square border">
                    <img src={url} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 bg-black text-white p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 space-y-10 bg-white border border-gray-100 p-10 shadow-sm">
            <InputGroup
              label="Product Name"
              placeholder="e.g. Royal Antique Haram"
              onChange={(v) => setFormData({ ...formData, name: v })}
            />

            <textarea
              rows={4}
              placeholder="Describe the craftsmanship..."
              className="w-full border p-4"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-8">
              <InputGroup
                label="Price (INR)"
                onChange={(v) => setFormData({ ...formData, price: v })}
              />
              <InputGroup
                label="SKU / Item Code"
                onChange={(v) => setFormData({ ...formData, itemCode: v })}
              />
            </div>

            <SelectGroup
              label="Category"
              options={["Necklace", "Bangles", "Earrings", "Rings"]}
              onChange={(v) => setFormData({ ...formData, category: v })}
            />

            <button
              disabled={loading}
              className="w-full bg-black text-[#C6A87C] py-5 uppercase tracking-widest"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Add to Collection"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function InputGroup({ label, placeholder, onChange }: InputGroupProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase">{label}</label>
      <input
        required
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b py-3 outline-none"
      />
    </div>
  );
}

function SelectGroup({ label, options, onChange }: SelectGroupProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase">{label}</label>
      <select
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b py-3"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
