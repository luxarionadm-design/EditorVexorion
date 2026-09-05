import React from "react";
import {
  Type,
  Bold,
  Italic,
  Underline,
  List,
  CheckSquare,
  Plus,
} from "lucide-react";

interface MobileBottomBarProps {
  isFormatSheetOpen: boolean;
  onToggleFormatSheet: () => void;
  isInsertSheetOpen: boolean;
  onToggleInsertSheet: () => void;
  onExecuteCommand: (command: string, value?: string) => void;
  onInsertChecklist: () => void;
  bottomBarClass?: string;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  isFormatSheetOpen,
  onToggleFormatSheet,
  isInsertSheetOpen,
  onToggleInsertSheet,
  onExecuteCommand,
  onInsertChecklist,
  bottomBarClass = "bg-white/95 border-stone-200 text-stone-900",
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t backdrop-blur-md px-2 py-1.5 flex items-center justify-between z-20 shadow-lg ${bottomBarClass}`}
    >
      {/* Style format sheet trigger */}
      <button
        type="button"
        onClick={onToggleFormatSheet}
        className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold transition active:scale-95 ${
          isFormatSheetOpen
            ? "bg-blue-600 text-white shadow-xs"
            : "hover:bg-black/5 text-stone-700 dark:text-stone-300"
        }`}
        title="Format Teks & Paragraf"
      >
        <Type className="w-4 h-4" />
        <span className="hidden sm:inline">Format</span>
      </button>

      <div className="h-5 w-[1px] bg-stone-300 dark:bg-stone-700 mx-0.5" />

      {/* Quick touch formatting controls */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => onExecuteCommand("bold")}
          className="p-2 rounded-lg hover:bg-black/5 active:scale-95 transition text-stone-800 dark:text-stone-200"
          title="Tebal (Bold)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onExecuteCommand("italic")}
          className="p-2 rounded-lg hover:bg-black/5 active:scale-95 transition text-stone-800 dark:text-stone-200"
          title="Miring (Italic)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onExecuteCommand("underline")}
          className="p-2 rounded-lg hover:bg-black/5 active:scale-95 transition text-stone-800 dark:text-stone-200"
          title="Garis Bawah"
        >
          <Underline className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onExecuteCommand("insertUnorderedList")}
          className="p-2 rounded-lg hover:bg-black/5 active:scale-95 transition text-stone-800 dark:text-stone-200"
          title="Daftar Poin (Bullets)"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onInsertChecklist}
          className="p-2 rounded-lg hover:bg-black/5 active:scale-95 transition text-stone-800 dark:text-stone-200"
          title="Daftar Tugas (Checklist)"
        >
          <CheckSquare className="w-4 h-4" />
        </button>
      </div>

      <div className="h-5 w-[1px] bg-stone-300 dark:bg-stone-700 mx-0.5" />

      {/* Insert Sheet (+) Trigger */}
      <button
        type="button"
        onClick={onToggleInsertSheet}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition active:scale-95 ${
          isInsertSheetOpen
            ? "bg-blue-600 text-white shadow-xs"
            : "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100"
        }`}
        title="Sisipkan Tabel, Gambar, atau Elemen"
      >
        <Plus className="w-4 h-4" />
        <span>Sisipkan</span>
      </button>
    </div>
  );
};
