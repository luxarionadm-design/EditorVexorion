import React, { useState, useEffect } from "react";
import { X, Link2, Check } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  onInsertLink: (url: string, text: string, newTab: boolean) => void;
}

export const LinkModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedText,
  onInsertLink,
}) => {
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");
  const [newTab, setNewTab] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setText(selectedText || "");
      setUrl("https://");
    }
  }, [isOpen, selectedText]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onInsertLink(url.trim(), text.trim() || url.trim(), newTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
              <Link2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">Sisipkan Tautan (Hyperlink)</h3>
              <p className="text-xs text-stone-500">Tautkan teks ke halaman web atau sumber daya</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Teks Tampilan
            </label>
            <input
              type="text"
              placeholder="Contoh: Kunjungi Situs Web Resmi"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-800 placeholder-stone-400 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Alamat Web (URL)
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-800 placeholder-stone-400 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <label className="flex items-center gap-2.5 text-sm text-stone-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={newTab}
              onChange={(e) => setNewTab(e.target.checked)}
              className="h-4 w-4 rounded-xs border-stone-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Buka di tab baru (target="_blank")</span>
          </label>

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
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition shadow-xs"
            >
              <Check className="h-4 w-4" />
              Terapkan Tautan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
