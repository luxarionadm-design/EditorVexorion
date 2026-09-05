import React, { useState, useEffect } from "react";
import { Menu, Undo2, Redo2, Sparkles, MoreVertical, Monitor } from "lucide-react";

interface MobileHeaderProps {
  title: string;
  onRenameTitle: (newTitle: string) => void;
  onOpenNavDrawer: () => void;
  onOpenOptionsSheet: () => void;
  onExecuteUndo: () => void;
  onExecuteRedo: () => void;
  onOpenAIModal: (action?: string) => void;
  onSwitchToPC: () => void;
  headerThemeClass?: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  onRenameTitle,
  onOpenNavDrawer,
  onOpenOptionsSheet,
  onExecuteUndo,
  onExecuteRedo,
  onOpenAIModal,
  onSwitchToPC,
  headerThemeClass = "bg-white border-stone-200 text-stone-900",
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  const handleSaveTitle = () => {
    if (editedTitle.trim()) {
      onRenameTitle(editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <>
      {/* 1. Main App Bar */}
      <header
        className={`h-14 px-3 flex items-center justify-between border-b shadow-xs z-30 shrink-0 select-none ${headerThemeClass}`}
      >
        {/* Left: Navigation Drawer Button */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenNavDrawer}
            className="p-2 rounded-lg hover:bg-black/5 active:scale-95 transition text-stone-700 dark:text-stone-300"
            title="Daftar Dokumen & Outline"
            aria-label="Buka Menu Dokumen"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Inline Editable Title */}
        <div className="flex-1 px-2 min-w-0 flex items-center justify-center">
          {isEditingTitle ? (
            <input
              type="text"
              value={editedTitle}
              autoFocus
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTitle();
                if (e.key === "Escape") setIsEditingTitle(false);
              }}
              className="w-full max-w-[200px] text-center text-sm font-semibold bg-white/70 dark:bg-stone-800/80 px-2 py-1 rounded-md border border-blue-500 focus:outline-hidden"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingTitle(true)}
              className="text-sm font-semibold truncate max-w-[180px] sm:max-w-xs text-center hover:opacity-80 py-1 px-2 rounded-md"
              title="Ketuk untuk mengubah judul dokumen"
            >
              {title}
            </button>
          )}
        </div>

        {/* Right: Quick Tools & More Menu */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onExecuteUndo}
            className="p-2 rounded-lg hover:bg-black/5 active:scale-95 transition text-stone-600 dark:text-stone-300"
            title="Urungkan (Undo)"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onExecuteRedo}
            className="p-2 rounded-lg hover:bg-black/5 active:scale-95 transition text-stone-600 dark:text-stone-300"
            title="Ulangi (Redo)"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onOpenAIModal("fix_grammar")}
            className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 active:scale-95 transition"
            title="Asisten Cerdas AI"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenOptionsSheet}
            className="p-2 rounded-lg hover:bg-black/5 active:scale-95 transition text-stone-700 dark:text-stone-300"
            title="Opsi Dokumen & Ekspor"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. Device Mode Banner & Quick Switcher */}
      <div className="bg-blue-50/80 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/50 px-3 py-1.5 flex items-center justify-between text-xs text-blue-900 dark:text-blue-200">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>Mode Ponsel (Mobile Touch)</span>
        </div>
        <button
          type="button"
          onClick={onSwitchToPC}
          className="flex items-center gap-1 text-[11px] font-semibold bg-white dark:bg-stone-800 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 shadow-2xs hover:bg-blue-50 transition active:scale-95"
        >
          <Monitor className="w-3 h-3" />
          <span>Mode PC</span>
        </button>
      </div>
    </>
  );
};
