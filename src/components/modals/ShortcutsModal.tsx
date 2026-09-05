import React, { useState } from "react";
import { X, Keyboard, Search } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  desc: string;
  category: "Format" | "Sunting" | "Navigasi & Berkas" | "Sisipkan";
}

const shortcuts: ShortcutItem[] = [
  // Format
  { keys: ["Ctrl", "B"], desc: "Tebalkan teks (Bold)", category: "Format" },
  { keys: ["Ctrl", "I"], desc: "Miringkan teks (Italic)", category: "Format" },
  { keys: ["Ctrl", "U"], desc: "Garis bawahi teks (Underline)", category: "Format" },
  { keys: ["Ctrl", "Shift", "X"], desc: "Coret teks (Strikethrough)", category: "Format" },
  { keys: ["Ctrl", "Shift", "C"], desc: "Format kode sebaris (Inline code)", category: "Format" },
  { keys: ["Ctrl", "Alt", "1"], desc: "Ubah ke Judul 1 (Heading 1)", category: "Format" },
  { keys: ["Ctrl", "Alt", "2"], desc: "Ubah ke Judul 2 (Heading 2)", category: "Format" },
  { keys: ["Ctrl", "Alt", "0"], desc: "Ubah ke Paragraf Normal", category: "Format" },

  // Sunting
  { keys: ["Ctrl", "Z"], desc: "Urungkan perubahan (Undo)", category: "Sunting" },
  { keys: ["Ctrl", "Y"], desc: "Ulangi perubahan (Redo)", category: "Sunting" },
  { keys: ["Ctrl", "F"], desc: "Cari dan Ganti teks", category: "Sunting" },
  { keys: ["Ctrl", "A"], desc: "Pilih semua konten dokumen", category: "Sunting" },
  { keys: ["Tab"], desc: "Tambah indentasi / geser ke kanan", category: "Sunting" },
  { keys: ["Shift", "Tab"], desc: "Kurangi indentasi / geser ke kiri", category: "Sunting" },

  // Navigasi & Berkas
  { keys: ["Ctrl", "S"], desc: "Simpan dokumen ke penyimpanan lokal", category: "Navigasi & Berkas" },
  { keys: ["Ctrl", "P"], desc: "Cetak dokumen / Ekspor ke format PDF", category: "Navigasi & Berkas" },
  { keys: ["Esc"], desc: "Tutup dialog atau menu aktif", category: "Navigasi & Berkas" },

  // Sisipkan
  { keys: ["Ctrl", "K"], desc: "Sisipkan atau edit Tautan web (Hyperlink)", category: "Sisipkan" },
  { keys: ["Ctrl", "Shift", "T"], desc: "Sisipkan Tabel data baru", category: "Sisipkan" },
  { keys: ["Ctrl", "Shift", "D"], desc: "Sisipkan garis pemisah horizontal", category: "Sisipkan" },
];

export const ShortcutsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filtered = shortcuts.filter(
    (s) =>
      s.desc.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.keys.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-800 text-white shadow-xs">
              <Keyboard className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">Pintasan Keyboard</h3>
              <p className="text-xs text-stone-500">Tingkatkan efisiensi kerja dengan tombol cepat</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-stone-100 bg-stone-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Cari pintasan... (misal: simpan, tebal, cari)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-stone-300 text-sm focus:border-stone-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Table list */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="divide-y divide-stone-100 rounded-lg border border-stone-200">
            {filtered.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 hover:bg-stone-50/80 transition"
              >
                <div>
                  <p className="text-sm font-medium text-stone-800">{s.desc}</p>
                  <span className="text-[11px] text-stone-400 font-medium">{s.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  {s.keys.map((k, kIdx) => (
                    <React.Fragment key={kIdx}>
                      <kbd className="min-w-[28px] px-2 py-1 text-center text-xs font-semibold text-stone-700 bg-stone-100 border border-stone-300 rounded-md shadow-2xs">
                        {k}
                      </kbd>
                      {kIdx < s.keys.length - 1 && (
                        <span className="text-xs text-stone-400">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-8 text-center text-stone-400 text-sm">
                Tidak ada pintasan yang cocok dengan "{search}".
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-stone-200 px-6 py-3.5 bg-stone-50">
          <button
            onClick={onClose}
            className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-900 transition shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
