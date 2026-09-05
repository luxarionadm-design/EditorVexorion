import React from "react";
import {
  Plus,
  X,
  Table as TableIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  AlertCircle,
  Code,
  Calendar,
  Minus,
  FileText,
} from "lucide-react";

interface MobileInsertSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertTable: (rows: number, cols: number, hasHeader?: boolean) => void;
  onOpenImageModal: () => void;
  onOpenLinkModal: () => void;
  onInsertCallout: (type: "info" | "warning" | "success" | "note") => void;
  onInsertCodeBlock: (lang: string) => void;
  onInsertDateTime: () => void;
  onInsertPageBreak: () => void;
  onExecuteCommand: (command: string, value?: string) => void;
  sheetThemeClass?: string;
}

export const MobileInsertSheet: React.FC<MobileInsertSheetProps> = ({
  isOpen,
  onClose,
  onInsertTable,
  onOpenImageModal,
  onOpenLinkModal,
  onInsertCallout,
  onInsertCodeBlock,
  onInsertDateTime,
  onInsertPageBreak,
  onExecuteCommand,
  sheetThemeClass = "bg-white border-stone-200 text-stone-900",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div
        className={`w-full rounded-t-2xl shadow-2xl p-4 max-h-[80vh] overflow-y-auto border-t animate-in slide-in-from-bottom duration-200 ${sheetThemeClass}`}
      >
        {/* Sheet Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 mb-3">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold">Sisipkan ke Dokumen</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {/* Insert Table Quick */}
          <button
            type="button"
            onClick={() => {
              onInsertTable(3, 3, true);
              onClose();
            }}
            className="p-3 rounded-xl border flex flex-col items-start gap-1.5 text-left hover:bg-blue-50/60 dark:hover:bg-blue-950/30 transition active:scale-95"
          >
            <TableIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="text-xs font-bold">Tabel 3×3</div>
              <div className="text-[10px] text-stone-500">Tabel data cepat</div>
            </div>
          </button>

          {/* Insert Image */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenImageModal();
            }}
            className="p-3 rounded-xl border flex flex-col items-start gap-1.5 text-left hover:bg-blue-50/60 dark:hover:bg-blue-950/30 transition active:scale-95"
          >
            <ImageIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <div className="text-xs font-bold">Gambar</div>
              <div className="text-[10px] text-stone-500">Unggah atau URL</div>
            </div>
          </button>

          {/* Insert Link */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLinkModal();
            }}
            className="p-3 rounded-xl border flex flex-col items-start gap-1.5 text-left hover:bg-blue-50/60 dark:hover:bg-blue-950/30 transition active:scale-95"
          >
            <LinkIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <div className="text-xs font-bold">Tautan Web</div>
              <div className="text-[10px] text-stone-500">Sisipkan tautan URL</div>
            </div>
          </button>

          {/* Callout Box */}
          <button
            type="button"
            onClick={() => {
              onInsertCallout("info");
              onClose();
            }}
            className="p-3 rounded-xl border flex flex-col items-start gap-1.5 text-left hover:bg-blue-50/60 dark:hover:bg-blue-950/30 transition active:scale-95"
          >
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <div className="text-xs font-bold">Kotak Catatan</div>
              <div className="text-[10px] text-stone-500">Sorotan penting</div>
            </div>
          </button>

          {/* Code Block */}
          <button
            type="button"
            onClick={() => {
              onInsertCodeBlock("typescript");
              onClose();
            }}
            className="p-3 rounded-xl border flex flex-col items-start gap-1.5 text-left hover:bg-blue-50/60 dark:hover:bg-blue-950/30 transition active:scale-95"
          >
            <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <div>
              <div className="text-xs font-bold">Blok Kode</div>
              <div className="text-[10px] text-stone-500">Format pemrograman</div>
            </div>
          </button>

          {/* Date & Time */}
          <button
            type="button"
            onClick={() => {
              onInsertDateTime();
              onClose();
            }}
            className="p-3 rounded-xl border flex flex-col items-start gap-1.5 text-left hover:bg-blue-50/60 dark:hover:bg-blue-950/30 transition active:scale-95"
          >
            <Calendar className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <div>
              <div className="text-xs font-bold">Tanggal & Jam</div>
              <div className="text-[10px] text-stone-500">Waktu saat ini</div>
            </div>
          </button>

          {/* Horizontal Divider */}
          <button
            type="button"
            onClick={() => {
              onExecuteCommand("insertHorizontalRule");
              onClose();
            }}
            className="p-3 rounded-xl border flex flex-col items-start gap-1.5 text-left hover:bg-blue-50/60 dark:hover:bg-blue-950/30 transition active:scale-95"
          >
            <Minus className="w-5 h-5 text-stone-600 dark:text-stone-400" />
            <div>
              <div className="text-xs font-bold">Garis Pemisah</div>
              <div className="text-[10px] text-stone-500">Pemisah bagian</div>
            </div>
          </button>

          {/* Page Break */}
          <button
            type="button"
            onClick={() => {
              onInsertPageBreak();
              onClose();
            }}
            className="p-3 rounded-xl border flex flex-col items-start gap-1.5 text-left hover:bg-blue-50/60 dark:hover:bg-blue-950/30 transition active:scale-95"
          >
            <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <div>
              <div className="text-xs font-bold">Pemisah Halaman</div>
              <div className="text-[10px] text-stone-500">Jeda cetak halaman</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
