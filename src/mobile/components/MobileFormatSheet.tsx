import React from "react";
import {
  Type,
  X,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

interface MobileFormatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSetHeading: (tag: string) => void;
  onExecuteCommand: (command: string, value?: string) => void;
  onSetTextColor: (color: string) => void;
  onSetHighlightColor: (color: string) => void;
  onSetLineSpacing: (spacing: string) => void;
  sheetThemeClass?: string;
}

const textColors = [
  { name: "Hitam", value: "#1c1917" },
  { name: "Abu", value: "#64748b" },
  { name: "Biru", value: "#2563eb" },
  { name: "Merah", value: "#dc2626" },
  { name: "Hijau", value: "#16a34a" },
  { name: "Ungu", value: "#9333ea" },
  { name: "Kuning", value: "#d97706" },
];

const highlightColors = [
  { name: "Hapus", value: "transparent" },
  { name: "Kuning", value: "#fef08a" },
  { name: "Hijau", value: "#bbf7d0" },
  { name: "Biru", value: "#bfdbfe" },
  { name: "Merah Muda", value: "#fbcfe8" },
  { name: "Oranye", value: "#fed7aa" },
];

export const MobileFormatSheet: React.FC<MobileFormatSheetProps> = ({
  isOpen,
  onClose,
  onSetHeading,
  onExecuteCommand,
  onSetTextColor,
  onSetHighlightColor,
  onSetLineSpacing,
  sheetThemeClass = "bg-white border-stone-200 text-stone-900",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div
        className={`w-full rounded-t-2xl shadow-2xl p-4 max-h-[80vh] overflow-y-auto border-t animate-in slide-in-from-bottom duration-200 ${sheetThemeClass}`}
      >
        {/* Sheet Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 mb-4">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold">Format Teks & Paragraf</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paragraph Styles (Headings) */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Gaya Paragraf
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                onSetHeading("P");
                onClose();
              }}
              className="px-3 py-2 rounded-lg border text-xs font-medium text-center hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/40"
            >
              Teks Normal
            </button>
            <button
              type="button"
              onClick={() => {
                onSetHeading("H1");
                onClose();
              }}
              className="px-3 py-2 rounded-lg border text-xs font-bold text-center hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/40"
            >
              Judul 1 (H1)
            </button>
            <button
              type="button"
              onClick={() => {
                onSetHeading("H2");
                onClose();
              }}
              className="px-3 py-2 rounded-lg border text-xs font-semibold text-center hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/40"
            >
              Judul 2 (H2)
            </button>
            <button
              type="button"
              onClick={() => {
                onSetHeading("H3");
                onClose();
              }}
              className="px-3 py-2 rounded-lg border text-xs font-semibold text-center hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/40"
            >
              Judul 3 (H3)
            </button>
            <button
              type="button"
              onClick={() => {
                onSetHeading("BLOCKQUOTE");
                onClose();
              }}
              className="px-3 py-2 rounded-lg border text-xs italic text-center hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/40"
            >
              Kutipan Blok
            </button>
          </div>
        </div>

        {/* Formatting styles */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Gaya Karakter
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => onExecuteCommand("bold")}
              className="p-2.5 rounded-lg border flex flex-col items-center justify-center gap-1 hover:bg-black/5"
            >
              <Bold className="w-4 h-4" />
              <span className="text-[10px]">Tebal</span>
            </button>
            <button
              type="button"
              onClick={() => onExecuteCommand("italic")}
              className="p-2.5 rounded-lg border flex flex-col items-center justify-center gap-1 hover:bg-black/5"
            >
              <Italic className="w-4 h-4" />
              <span className="text-[10px]">Miring</span>
            </button>
            <button
              type="button"
              onClick={() => onExecuteCommand("underline")}
              className="p-2.5 rounded-lg border flex flex-col items-center justify-center gap-1 hover:bg-black/5"
            >
              <Underline className="w-4 h-4" />
              <span className="text-[10px]">Garis Bawah</span>
            </button>
            <button
              type="button"
              onClick={() => onExecuteCommand("strikeThrough")}
              className="p-2.5 rounded-lg border flex flex-col items-center justify-center gap-1 hover:bg-black/5"
            >
              <Strikethrough className="w-4 h-4" />
              <span className="text-[10px]">Coret</span>
            </button>
          </div>
        </div>

        {/* Alignment */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Perataan Paragraf
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => onExecuteCommand("justifyLeft")}
              className="p-2 rounded-lg border flex items-center justify-center hover:bg-black/5"
              title="Rata Kiri"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onExecuteCommand("justifyCenter")}
              className="p-2 rounded-lg border flex items-center justify-center hover:bg-black/5"
              title="Rata Tengah"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onExecuteCommand("justifyRight")}
              className="p-2 rounded-lg border flex items-center justify-center hover:bg-black/5"
              title="Rata Kanan"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onExecuteCommand("justifyFull")}
              className="p-2 rounded-lg border flex items-center justify-center hover:bg-black/5"
              title="Rata Kiri-Kanan"
            >
              <AlignJustify className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Text Color Swatches */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Warna Teks
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {textColors.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onSetTextColor(c.value)}
                className="w-8 h-8 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center shadow-2xs active:scale-95"
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Highlight Color Swatches */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Warna Stabilo (Highlight)
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {highlightColors.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onSetHighlightColor(c.value)}
                className="w-8 h-8 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center shadow-2xs active:scale-95"
                style={{ backgroundColor: c.value === "transparent" ? "#fff" : c.value }}
                title={c.name}
              >
                {c.value === "transparent" && <span className="text-[10px] text-red-500 font-bold">✕</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Line Spacing */}
        <div>
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Jarak Baris (Spasi)
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["1.0", "1.15", "1.5", "2.0"].map((spacing) => (
              <button
                key={spacing}
                type="button"
                onClick={() => onSetLineSpacing(spacing)}
                className="py-1.5 px-3 rounded-lg border text-xs font-medium text-center hover:bg-black/5"
              >
                {spacing}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
