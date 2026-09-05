import React from "react";
import {
  MoreVertical,
  X,
  Search,
  BookOpen,
  Monitor,
  Printer,
  Download,
  Check,
  ChevronRight,
} from "lucide-react";
import { EditorTheme, DocumentStats } from "../../types";

interface MobileOptionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  stats: DocumentStats;
  theme: EditorTheme;
  onChangeTheme: (theme: EditorTheme) => void;
  onOpenFindReplace: () => void;
  onOpenStats: () => void;
  onSwitchToPC: () => void;
  onExport: (format: "pdf" | "markdown" | "html" | "txt" | "json") => void;
  sheetThemeClass?: string;
}

export const MobileOptionsSheet: React.FC<MobileOptionsSheetProps> = ({
  isOpen,
  onClose,
  stats,
  theme,
  onChangeTheme,
  onOpenFindReplace,
  onOpenStats,
  onSwitchToPC,
  onExport,
  sheetThemeClass = "bg-white border-stone-200 text-stone-900",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div
        className={`w-full rounded-t-2xl shadow-2xl p-4 max-h-[85vh] overflow-y-auto border-t animate-in slide-in-from-bottom duration-200 ${sheetThemeClass}`}
      >
        {/* Sheet Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 mb-3">
          <div className="flex items-center gap-2">
            <MoreVertical className="w-5 h-5 text-stone-700 dark:text-stone-300" />
            <h3 className="text-sm font-bold">Opsi & Pengaturan Dokumen</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions List */}
        <div className="space-y-1 mb-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenFindReplace();
            }}
            className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between hover:bg-black/5 transition text-left active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold">Cari & Ganti Kata</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenStats();
            }}
            className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between hover:bg-black/5 transition text-left active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-xs font-semibold block">Statistik & Keterbacaan</span>
                <span className="text-[10px] text-stone-500">
                  {stats.words} kata · {stats.characters} karakter · ~{stats.readingTimeMinutes} mnt baca
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToPC();
            }}
            className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 hover:bg-blue-100 transition text-left text-blue-900 dark:text-blue-200 active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <Monitor className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div>
                <span className="text-xs font-bold block">Beralih ke Mode PC (Desktop)</span>
                <span className="text-[10px] text-blue-600/80 dark:text-blue-300">
                  Tampilan A4, ribbon menu, dan panel multi-dokumen
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-500" />
          </button>
        </div>

        {/* Theme Selector */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Tema Tampilan
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: "clean-light", name: "Putih", bg: "bg-white text-stone-900 border-stone-300" },
              { id: "obsidian", name: "Obsidian", bg: "bg-stone-950 text-stone-100 border-stone-800" },
              { id: "sepia", name: "Sepia", bg: "bg-[#fcf9f2] text-[#3d2f1f] border-[#ded4bf]" },
              { id: "mint", name: "Mint", bg: "bg-[#f7fbf9] text-[#12382a] border-[#cfe2d8]" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onChangeTheme(t.id as EditorTheme)}
                className={`py-2 px-2 rounded-lg border text-xs font-semibold text-center flex items-center justify-center gap-1 ${t.bg} ${
                  theme === t.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {theme === t.id && <Check className="w-3 h-3" />}
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Export Format Section */}
        <div>
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Ekspor Dokumen
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onExport("pdf");
              }}
              className="px-3 py-2.5 rounded-xl border flex items-center gap-2.5 hover:bg-black/5 text-left text-xs font-medium active:scale-95"
            >
              <Printer className="w-4 h-4 text-red-600" />
              <span>Cetak / PDF</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onExport("markdown");
              }}
              className="px-3 py-2.5 rounded-xl border flex items-center gap-2.5 hover:bg-black/5 text-left text-xs font-medium active:scale-95"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Markdown (.md)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onExport("html");
              }}
              className="px-3 py-2.5 rounded-xl border flex items-center gap-2.5 hover:bg-black/5 text-left text-xs font-medium active:scale-95"
            >
              <Download className="w-4 h-4 text-amber-600" />
              <span>Halaman HTML (.html)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onExport("txt");
              }}
              className="px-3 py-2.5 rounded-xl border flex items-center gap-2.5 hover:bg-black/5 text-left text-xs font-medium active:scale-95"
            >
              <Download className="w-4 h-4 text-stone-600" />
              <span>Teks Murni (.txt)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
