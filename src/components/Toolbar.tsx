import React, { useState } from "react";
import {
  Undo2,
  Redo2,
  Printer,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  CheckSquare,
  Outdent,
  Indent,
  Link2,
  Image as ImageIcon,
  Table as TableIcon,
  AlertCircle,
  Code2,
  Minus,
  RemoveFormatting,
  Search,
  Sparkles,
  ChevronDown,
  Highlighter,
  Baseline,
} from "lucide-react";

interface Props {
  onUndo: () => void;
  onRedo: () => void;
  onPrint: () => void;
  onExecuteCommand: (cmd: string, val?: string) => void;
  onSetHeading: (tag: string) => void;
  onSetLineSpacing: (spacing: string) => void;
  onSetTextColor: (color: string) => void;
  onSetHighlightColor: (color: string) => void;
  onOpenTableModal: () => void;
  onOpenImageModal: () => void;
  onOpenLinkModal: () => void;
  onInsertCallout: (type: "info" | "warning" | "success" | "note") => void;
  onInsertCodeBlock: (lang: string) => void;
  onInsertChecklist: () => void;
  onToggleFindReplace: () => void;
  onOpenAIModal: () => void;
}

const colorPalette = [
  "#1e293b", // Slate
  "#dc2626", // Red
  "#ea580c", // Orange
  "#d97706", // Amber
  "#16a34a", // Green
  "#0284c7", // Sky
  "#2563eb", // Blue
  "#7c3aed", // Violet
  "#db2777", // Pink
];

const highlightPalette = [
  "transparent",
  "#fef08a", // Yellow
  "#bbf7d0", // Green
  "#bfdbfe", // Blue
  "#fbcfe8", // Pink
  "#fed7aa", // Orange
  "#e2e8f0", // Gray
];

export const Toolbar: React.FC<Props> = ({
  onUndo,
  onRedo,
  onPrint,
  onExecuteCommand,
  onSetHeading,
  onSetLineSpacing,
  onSetTextColor,
  onSetHighlightColor,
  onOpenTableModal,
  onOpenImageModal,
  onOpenLinkModal,
  onInsertCallout,
  onInsertCodeBlock,
  onInsertChecklist,
  onToggleFindReplace,
  onOpenAIModal,
}) => {
  const [fontSize, setFontSize] = useState(14);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showCalloutPicker, setShowCalloutPicker] = useState(false);

  const handleFontSizeChange = (delta: number) => {
    const newSize = Math.max(8, Math.min(72, fontSize + delta));
    setFontSize(newSize);
    onExecuteCommand("fontSize", "3"); // Use standard or CSS
  };

  return (
    <div className="bg-stone-50 border-b border-stone-200 px-3 py-1.5 flex items-center gap-1 overflow-x-auto select-none text-stone-700 text-xs">
      {/* Undo & Redo */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={onUndo}
          title="Urungkan (Ctrl+Z)"
          className="p-1.5 rounded-md hover:bg-stone-200 hover:text-stone-900 transition"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          onClick={onRedo}
          title="Ulangi (Ctrl+Y)"
          className="p-1.5 rounded-md hover:bg-stone-200 hover:text-stone-900 transition"
        >
          <Redo2 className="h-4 w-4" />
        </button>
        <button
          onClick={onPrint}
          title="Cetak (Ctrl+P)"
          className="p-1.5 rounded-md hover:bg-stone-200 hover:text-stone-900 transition"
        >
          <Printer className="h-4 w-4" />
        </button>
      </div>

      <div className="h-4 w-px bg-stone-300 mx-1" />

      {/* Heading Selector */}
      <select
        onChange={(e) => onSetHeading(e.target.value)}
        className="rounded-md border border-stone-300 bg-white px-2 py-1 text-xs text-stone-800 focus:outline-hidden focus:border-blue-500 font-medium cursor-pointer"
        defaultValue="P"
      >
        <option value="P">Teks Normal</option>
        <option value="H1">Judul 1 (H1)</option>
        <option value="H2">Judul 2 (H2)</option>
        <option value="H3">Judul 3 (H3)</option>
        <option value="BLOCKQUOTE">Kutipan (Quote)</option>
      </select>

      {/* Font Family */}
      <select
        onChange={(e) => onExecuteCommand("fontName", e.target.value)}
        className="rounded-md border border-stone-300 bg-white px-2 py-1 text-xs text-stone-800 focus:outline-hidden focus:border-blue-500 hidden sm:inline-block font-medium cursor-pointer"
        defaultValue="Plus Jakarta Sans"
      >
        <option value="Plus Jakarta Sans">Sans-Serif (Modern)</option>
        <option value="Lora, serif">Serif (Buku / Editorial)</option>
        <option value="Fira Code, monospace">Monospace (Kode)</option>
        <option value="Arial, sans-serif">Arial Standar</option>
        <option value="Georgia, serif">Georgia</option>
      </select>

      {/* Font Size */}
      <div className="flex items-center rounded-md border border-stone-300 bg-white px-1">
        <button
          onClick={() => handleFontSizeChange(-1)}
          className="px-1 text-xs hover:text-blue-600 font-bold"
        >
          -
        </button>
        <span className="w-5 text-center text-xs font-semibold">{fontSize}</span>
        <button
          onClick={() => handleFontSizeChange(1)}
          className="px-1 text-xs hover:text-blue-600 font-bold"
        >
          +
        </button>
      </div>

      <div className="h-4 w-px bg-stone-300 mx-1" />

      {/* Basic Text Formatting */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onExecuteCommand("bold")}
          title="Tebal (Ctrl+B)"
          className="p-1.5 rounded-md hover:bg-stone-200 hover:text-stone-900 transition font-bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          onClick={() => onExecuteCommand("italic")}
          title="Miring (Ctrl+I)"
          className="p-1.5 rounded-md hover:bg-stone-200 hover:text-stone-900 transition italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          onClick={() => onExecuteCommand("underline")}
          title="Garis Bawah (Ctrl+U)"
          className="p-1.5 rounded-md hover:bg-stone-200 hover:text-stone-900 transition underline"
        >
          <Underline className="h-4 w-4" />
        </button>
        <button
          onClick={() => onExecuteCommand("strikeThrough")}
          title="Coret"
          className="p-1.5 rounded-md hover:bg-stone-200 hover:text-stone-900 transition"
        >
          <Strikethrough className="h-4 w-4" />
        </button>

        {/* Text Color Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowTextColorPicker(!showTextColorPicker);
              setShowHighlightPicker(false);
            }}
            title="Warna Teks"
            className="p-1.5 rounded-md hover:bg-stone-200 hover:text-stone-900 transition flex items-center gap-0.5"
          >
            <Baseline className="h-4 w-4 text-blue-600" />
            <ChevronDown className="h-2.5 w-2.5 text-stone-400" />
          </button>

          {showTextColorPicker && (
            <div className="absolute left-0 top-full mt-1 p-2 rounded-lg bg-white shadow-lg border border-stone-200 z-50 grid grid-cols-3 gap-1.5 w-28">
              {colorPalette.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    onSetTextColor(color);
                    setShowTextColorPicker(false);
                  }}
                  style={{ backgroundColor: color }}
                  className="h-6 w-6 rounded-md border border-stone-200 transition hover:scale-110"
                />
              ))}
            </div>
          )}
        </div>

        {/* Highlight Color Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowHighlightPicker(!showHighlightPicker);
              setShowTextColorPicker(false);
            }}
            title="Warna Stabilo"
            className="p-1.5 rounded-md hover:bg-stone-200 hover:text-stone-900 transition flex items-center gap-0.5"
          >
            <Highlighter className="h-4 w-4 text-amber-500" />
            <ChevronDown className="h-2.5 w-2.5 text-stone-400" />
          </button>

          {showHighlightPicker && (
            <div className="absolute left-0 top-full mt-1 p-2 rounded-lg bg-white shadow-lg border border-stone-200 z-50 grid grid-cols-3 gap-1.5 w-28">
              {highlightPalette.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    onSetHighlightColor(color);
                    setShowHighlightPicker(false);
                  }}
                  style={{ backgroundColor: color === "transparent" ? "#ffffff" : color }}
                  className="h-6 w-6 rounded-md border border-stone-300 transition hover:scale-110 flex items-center justify-center text-[9px] text-stone-500"
                  title={color === "transparent" ? "Hapus Stabilo" : color}
                >
                  {color === "transparent" && "✕"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-4 w-px bg-stone-300 mx-1" />

      {/* Alignments */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onExecuteCommand("justifyLeft")}
          title="Rata Kiri"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onExecuteCommand("justifyCenter")}
          title="Rata Tengah"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button
          onClick={() => onExecuteCommand("justifyRight")}
          title="Rata Kanan"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <AlignRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => onExecuteCommand("justifyFull")}
          title="Rata Kanan-Kiri (Justify)"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <AlignJustify className="h-4 w-4" />
        </button>
      </div>

      <div className="h-4 w-px bg-stone-300 mx-1" />

      {/* Lists & Indentation */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onExecuteCommand("insertUnorderedList")}
          title="Daftar Poin"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          onClick={() => onExecuteCommand("insertOrderedList")}
          title="Daftar Nomor"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          onClick={onInsertChecklist}
          title="Daftar Periksa (Checklist)"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <CheckSquare className="h-4 w-4 text-emerald-600" />
        </button>
        <button
          onClick={() => onExecuteCommand("outdent")}
          title="Kurangi Indentasi"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <Outdent className="h-4 w-4" />
        </button>
        <button
          onClick={() => onExecuteCommand("indent")}
          title="Tambah Indentasi"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <Indent className="h-4 w-4" />
        </button>
      </div>

      <div className="h-4 w-px bg-stone-300 mx-1" />

      {/* Inserters */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={onOpenLinkModal}
          title="Sisipkan Tautan (Ctrl+K)"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <Link2 className="h-4 w-4" />
        </button>
        <button
          onClick={onOpenImageModal}
          title="Sisipkan Gambar"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <button
          onClick={onOpenTableModal}
          title="Sisipkan Tabel"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <TableIcon className="h-4 w-4" />
        </button>

        {/* Callout button with dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCalloutPicker(!showCalloutPicker)}
            title="Kotak Sorotan (Callout)"
            className="p-1.5 rounded-md hover:bg-stone-200 transition flex items-center"
          >
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </button>

          {showCalloutPicker && (
            <div className="absolute left-0 top-full mt-1 p-1 rounded-lg bg-white shadow-lg border border-stone-200 z-50 w-36">
              <button
                onClick={() => {
                  onInsertCallout("info");
                  setShowCalloutPicker(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-blue-700 hover:bg-blue-50 rounded-md font-medium"
              >
                Informasi (Biru)
              </button>
              <button
                onClick={() => {
                  onInsertCallout("warning");
                  setShowCalloutPicker(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-amber-700 hover:bg-amber-50 rounded-md font-medium"
              >
                Peringatan (Kuning)
              </button>
              <button
                onClick={() => {
                  onInsertCallout("success");
                  setShowCalloutPicker(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-emerald-700 hover:bg-emerald-50 rounded-md font-medium"
              >
                Sukses (Hijau)
              </button>
              <button
                onClick={() => {
                  onInsertCallout("note");
                  setShowCalloutPicker(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs text-stone-700 hover:bg-stone-100 rounded-md font-medium"
              >
                Catatan (Abu)
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => onInsertCodeBlock("TypeScript")}
          title="Blok Kode"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <Code2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onExecuteCommand("insertHorizontalRule")}
          title="Garis Pemisah"
          className="p-1.5 rounded-md hover:bg-stone-200 transition"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      <div className="h-4 w-px bg-stone-300 mx-1" />

      {/* Clean & Search */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onExecuteCommand("removeFormat")}
          title="Hapus Format Seleksi"
          className="p-1.5 rounded-md hover:bg-stone-200 text-stone-600 hover:text-red-600 transition"
        >
          <RemoveFormatting className="h-4 w-4" />
        </button>
        <button
          onClick={onToggleFindReplace}
          title="Cari & Ganti (Ctrl+F)"
          className="p-1.5 rounded-md hover:bg-stone-200 text-stone-600 transition"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          onClick={onOpenAIModal}
          title="Asisten Cerdas AI"
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-2xs"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden xl:inline text-xs">AI</span>
        </button>
      </div>
    </div>
  );
};
