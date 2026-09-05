import React, { useState, useRef } from "react";
import { X, Image as ImageIcon, Upload, Globe, Check } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onInsertImage: (url: string, caption: string, widthPercent: number) => void;
}

export const ImageModal: React.FC<Props> = ({ isOpen, onClose, onInsertImage }) => {
  const [tab, setTab] = useState<"url" | "upload">("url");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [width, setWidth] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Silakan pilih file gambar yang valid (JPG, PNG, WebP, SVG, GIF)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setUrl(e.target.result);
        if (!caption) {
          setCaption(file.name.replace(/\.[^/.]+$/, ""));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onInsertImage(url.trim(), caption.trim(), width);
    onClose();
    setUrl("");
    setCaption("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white shadow-xs">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">Sisipkan Gambar</h3>
              <p className="text-xs text-stone-500">Tambahkan gambar dari web atau komputer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50/50 px-6">
          <button
            type="button"
            onClick={() => setTab("url")}
            className={`flex items-center gap-2 py-2.5 px-3 text-xs font-semibold border-b-2 transition ${
              tab === "url"
                ? "border-violet-600 text-violet-700"
                : "border-transparent text-stone-500 hover:text-stone-700"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            Tautan Web (URL)
          </button>
          <button
            type="button"
            onClick={() => setTab("upload")}
            className={`flex items-center gap-2 py-2.5 px-3 text-xs font-semibold border-b-2 transition ${
              tab === "upload"
                ? "border-violet-600 text-violet-700"
                : "border-transparent text-stone-500 hover:text-stone-700"
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            Unggah Berkas
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {tab === "url" ? (
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Alamat Gambar (URL)
              </label>
              <input
                type="url"
                placeholder="https://contoh.com/gambar.jpg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-800 placeholder-stone-400 focus:border-violet-500 focus:outline-hidden focus:ring-1 focus:ring-violet-500"
                required={tab === "url"}
              />
            </div>
          ) : (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFile(e.target.files[0]);
                }}
              />
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed cursor-pointer transition ${
                  isDragging
                    ? "border-violet-500 bg-violet-50/50"
                    : "border-stone-300 hover:border-stone-400 bg-stone-50/50"
                }`}
              >
                <Upload className="h-8 w-8 text-stone-400 mb-2" />
                <p className="text-xs font-medium text-stone-700 text-center">
                  Seret gambar ke sini, atau <span className="text-violet-600">pilih dari file</span>
                </p>
                <p className="text-[11px] text-stone-400 mt-1">PNG, JPG, WebP, SVG, GIF</p>
              </div>
            </div>
          )}

          {/* Preview if url available */}
          {url && (
            <div className="rounded-lg border border-stone-200 p-2 bg-stone-50 flex items-center justify-center max-h-36 overflow-hidden">
              <img
                src={url}
                alt="Pratinjau"
                className="max-h-32 rounded-sm object-contain"
                onError={() => alert("Gagal memuat pratinjau gambar.")}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Keterangan Gambar / Teks Alternatif (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Diagram Alur Proses Bisnis"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-800 placeholder-stone-400 focus:border-violet-500 focus:outline-hidden focus:ring-1 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Lebar Gambar: {width}%
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="25"
                max="100"
                step="5"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                className="w-full accent-violet-600"
              />
              <span className="text-xs font-semibold text-stone-600 w-12 text-right">{width}%</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stone-300 px-3.5 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!url}
              className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="h-4 w-4" />
              Sisipkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
