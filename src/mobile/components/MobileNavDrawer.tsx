import React, { useState } from "react";
import {
  X,
  FileText,
  Plus,
  Upload,
  Pin,
  PinOff,
  Trash2,
  ChevronRight,
  Hash,
  Monitor,
} from "lucide-react";
import { DocumentFile, DocumentStats } from "../../types";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentFile[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onNewDoc: () => void;
  onImportFile: () => void;
  onDeleteDoc: (id: string) => void;
  onTogglePinDoc: (id: string) => void;
  outlineHeadings: { id: string; text: string; level: number }[];
  onJumpToHeading: (text: string) => void;
  stats: DocumentStats;
  onSwitchToPC: () => void;
  drawerThemeClass?: string;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  documents,
  activeDocId,
  onSelectDoc,
  onNewDoc,
  onImportFile,
  onDeleteDoc,
  onTogglePinDoc,
  outlineHeadings,
  onJumpToHeading,
  stats,
  onSwitchToPC,
  drawerThemeClass = "bg-white border-stone-200 text-stone-900",
}) => {
  const [activeNavTab, setActiveNavTab] = useState<"docs" | "outline" | "stats">("docs");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-in fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        className={`relative w-4/5 max-w-sm h-full flex flex-col shadow-2xl border-r animate-in slide-in-from-left duration-200 ${drawerThemeClass}`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold">DocEditor Pro</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-black/5 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (Dokumen, Outline, Statistik) */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 px-2 pt-2 gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveNavTab("docs")}
            className={`flex-1 py-2 px-2 rounded-t-lg font-semibold border-b-2 text-center transition ${
              activeNavTab === "docs"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            Dokumen ({documents.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveNavTab("outline")}
            className={`flex-1 py-2 px-2 rounded-t-lg font-semibold border-b-2 text-center transition ${
              activeNavTab === "outline"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            Outline ({outlineHeadings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveNavTab("stats")}
            className={`flex-1 py-2 px-2 rounded-t-lg font-semibold border-b-2 text-center transition ${
              activeNavTab === "stats"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            Statistik
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-3">
          {/* TAB 1: DOKUMEN */}
          {activeNavTab === "docs" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onNewDoc();
                    onClose();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:bg-blue-700 active:scale-95 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Dokumen Baru</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onImportFile();
                  }}
                  className="py-2 px-3 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-black/5 text-xs font-semibold flex items-center gap-1 transition active:scale-95"
                  title="Impor Berkas"
                >
                  <Upload className="w-4 h-4" />
                  <span>Impor</span>
                </button>
              </div>

              <div className="space-y-1 mt-2">
                {documents.map((doc) => {
                  const isActive = doc.id === activeDocId;
                  return (
                    <div
                      key={doc.id}
                      className={`group flex items-center justify-between p-2.5 rounded-xl border transition ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200"
                          : "border-transparent hover:bg-black/5"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onSelectDoc(doc.id);
                          onClose();
                        }}
                        className="flex-1 flex items-start gap-2 text-left min-w-0"
                      >
                        <FileText
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isActive ? "text-blue-600 dark:text-blue-400" : "text-stone-400"
                          }`}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-semibold truncate flex items-center gap-1">
                            {doc.pinned && <Pin className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />}
                            <span>{doc.title}</span>
                          </div>
                          <div className="text-[10px] text-stone-400 mt-0.5">
                            {doc.wordCount || 0} kata
                          </div>
                        </div>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTogglePinDoc(doc.id);
                          }}
                          className="p-1 text-stone-400 hover:text-amber-500 rounded-md"
                          title={doc.pinned ? "Lepas Sematan" : "Sematkan Dokumen"}
                        >
                          {doc.pinned ? (
                            <PinOff className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <Pin className="w-3.5 h-3.5" />
                          )}
                        </button>
                        {documents.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteDoc(doc.id);
                            }}
                            className="p-1 text-stone-400 hover:text-red-600 rounded-md"
                            title="Hapus Dokumen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: OUTLINE */}
          {activeNavTab === "outline" && (
            <div>
              {outlineHeadings.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs">
                  <Hash className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>Belum ada judul atau sub-bab.</p>
                  <p className="text-[11px] mt-1 text-stone-500">
                    Tambahkan Judul 1, Judul 2, atau Judul 3 pada teks untuk membuat daftar isi otomatis.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {outlineHeadings.map((h, i) => (
                    <button
                      key={`${h.id}-${i}`}
                      type="button"
                      onClick={() => onJumpToHeading(h.text)}
                      className={`w-full text-left py-2 px-3 rounded-lg text-xs hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition flex items-center gap-2 ${
                        h.level === 1 ? "font-bold pl-2" : h.level === 2 ? "font-medium pl-5" : "text-stone-500 pl-8"
                      }`}
                    >
                      <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{h.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STATISTIK */}
          {activeNavTab === "stats" && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border bg-stone-50 dark:bg-stone-900/50 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Total Kata:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{stats.words}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Total Karakter:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{stats.characters}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Karakter Tanpa Spasi:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{stats.charactersNoSpaces}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Jumlah Paragraf:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{stats.paragraphs}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Jumlah Kalimat:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{stats.sentences}</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center text-xs">
                  <span className="text-stone-500">Estimasi Baca:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    ~{stats.readingTimeMinutes} menit
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Tingkat Keterbacaan:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{stats.fleschGrade}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer: Switch to PC */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToPC();
            }}
            className="w-full py-2.5 px-3 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-100 transition active:scale-95"
          >
            <Monitor className="w-4 h-4" />
            <span>Buka Versi PC (Desktop) Editor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
