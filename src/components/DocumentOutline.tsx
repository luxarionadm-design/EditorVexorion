import React, { useState, useEffect } from "react";
import {
  ListTree,
  FileText,
  History,
  ChevronRight,
  Plus,
  Trash2,
  Bookmark,
  RotateCcw,
  X,
} from "lucide-react";
import { DocumentFile, DocumentSnapshot } from "../types";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  editorContent: string;
  documents: DocumentFile[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onNewDoc: () => void;
  onDeleteDoc: (id: string) => void;
  onRestoreSnapshot: (content: string) => void;
  onClose?: () => void;
}

interface OutlineItem {
  id: string;
  text: string;
  level: number;
}

export const DocumentOutline: React.FC<Props> = ({
  isOpen,
  onToggle,
  editorContent,
  documents,
  activeDocId,
  onSelectDoc,
  onNewDoc,
  onDeleteDoc,
  onRestoreSnapshot,
  onClose,
}) => {
  const [tab, setTab] = useState<"outline" | "files" | "history">("outline");
  const [headings, setHeadings] = useState<OutlineItem[]>([]);
  const [snapshots, setSnapshots] = useState<DocumentSnapshot[]>([]);

  // Parse headings from editorContent
  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editorContent;
    const elements = tempDiv.querySelectorAll("h1, h2, h3");
    const items: OutlineItem[] = [];

    elements.forEach((el, idx) => {
      const text = el.textContent?.trim() || `Bagian ${idx + 1}`;
      const level = parseInt(el.tagName.replace("H", "")) || 1;
      items.push({
        id: `heading-${idx}`,
        text,
        level,
      });
    });

    setHeadings(items);
  }, [editorContent]);

  // Load snapshots from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`doc_snapshots_${activeDocId}`);
      if (saved) {
        setSnapshots(JSON.parse(saved));
      } else {
        setSnapshots([]);
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeDocId]);

  const handleTakeSnapshot = () => {
    const newSnapshot: DocumentSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      name: `Versi Cadangan #${snapshots.length + 1}`,
      content: editorContent,
    };
    const updated = [newSnapshot, ...snapshots];
    setSnapshots(updated);
    try {
      localStorage.setItem(`doc_snapshots_${activeDocId}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleHeadingClick = (text: string) => {
    // Find heading element in real DOM and scroll to it
    const editor = document.getElementById("editor-canvas-container");
    if (!editor) return;

    const headings = editor.querySelectorAll("h1, h2, h3");
    for (const h of Array.from(headings)) {
      if (h.textContent?.trim() === text) {
        h.scrollIntoView({ behavior: "smooth", block: "center" });
        h.classList.add("bg-blue-100/50");
        setTimeout(() => h.classList.remove("bg-blue-100/50"), 1200);
        break;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <aside className="w-64 sm:w-72 max-w-[80vw] border-r border-stone-200 bg-stone-50 flex flex-col shrink-0 select-none text-xs text-stone-700 h-full z-20 shadow-xs">
      {/* Top Header with title and close button */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-stone-200 bg-white">
        <span className="font-semibold text-stone-800 tracking-tight">Panel Navigasi</span>
        <button
          onClick={onClose || onToggle}
          className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          title="Tutup Panel"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-stone-100/70 p-1 gap-1">
        <button
          onClick={() => setTab("outline")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-semibold transition ${
            tab === "outline"
              ? "bg-white text-blue-700 shadow-2xs"
              : "text-stone-500 hover:text-stone-800"
          }`}
          title="Daftar Isi Otomatis"
        >
          <ListTree className="h-3.5 w-3.5" />
          <span>Outline</span>
        </button>
        <button
          onClick={() => setTab("files")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-semibold transition ${
            tab === "files"
              ? "bg-white text-blue-700 shadow-2xs"
              : "text-stone-500 hover:text-stone-800"
          }`}
          title="Daftar Berkas"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Berkas</span>
        </button>
        <button
          onClick={() => setTab("history")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-semibold transition ${
            tab === "history"
              ? "bg-white text-blue-700 shadow-2xs"
              : "text-stone-500 hover:text-stone-800"
          }`}
          title="Riwayat Versi"
        >
          <History className="h-3.5 w-3.5" />
          <span>Versi</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* OUTLINE TAB */}
        {tab === "outline" && (
          <div>
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                Struktur Bab &amp; Judul
              </span>
              <span className="text-[10px] text-stone-400 font-medium">
                {headings.length} bagian
              </span>
            </div>

            {headings.length > 0 ? (
              <div className="space-y-1">
                {headings.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => handleHeadingClick(h.text)}
                    className="w-full text-left py-1.5 px-2 rounded-md hover:bg-stone-200/70 hover:text-blue-700 transition flex items-center gap-1.5 group truncate"
                    style={{
                      paddingLeft: `${(h.level - 1) * 12 + 8}px`,
                    }}
                  >
                    <ChevronRight className="h-3 w-3 text-stone-400 group-hover:text-blue-500 shrink-0" />
                    <span
                      className={`truncate ${
                        h.level === 1
                          ? "font-semibold text-stone-900"
                          : h.level === 2
                          ? "font-medium text-stone-700"
                          : "text-stone-600"
                      }`}
                    >
                      {h.text}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg border border-dashed border-stone-300 text-center text-stone-400">
                <p>Belum ada heading.</p>
                <p className="text-[11px] mt-1">
                  Tambahkan Judul 1 atau 2 untuk membuat outline dokumen otomatis.
                </p>
              </div>
            )}
          </div>
        )}

        {/* FILES TAB */}
        {tab === "files" && (
          <div>
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                Dokumen Tersimpan
              </span>
              <button
                onClick={onNewDoc}
                className="p-1 rounded-md text-blue-600 hover:bg-blue-50 transition"
                title="Dokumen Baru"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-1">
              {documents.map((doc) => {
                const isActive = doc.id === activeDocId;
                return (
                  <div
                    key={doc.id}
                    onClick={() => onSelectDoc(doc.id)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                      isActive
                        ? "bg-blue-50 text-blue-900 border border-blue-200/80 font-semibold"
                        : "hover:bg-stone-200/60 text-stone-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText
                        className={`h-4 w-4 shrink-0 ${
                          isActive ? "text-blue-600" : "text-stone-400"
                        }`}
                      />
                      <div className="truncate">
                        <p className="truncate text-xs">{doc.title}</p>
                        <p className="text-[10px] text-stone-400 font-normal">
                          {doc.wordCount || 0} kata
                        </p>
                      </div>
                    </div>

                    {documents.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDoc(doc.id);
                        }}
                        className="rounded-md p-1 text-stone-400 hover:bg-red-50 hover:text-red-600 transition"
                        title="Hapus Dokumen"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* HISTORY / SNAPSHOTS TAB */}
        {tab === "history" && (
          <div>
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                Riwayat Snapshot
              </span>
              <button
                onClick={handleTakeSnapshot}
                className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800"
              >
                <Bookmark className="h-3.5 w-3.5" />
                Simpan Versi
              </button>
            </div>

            {snapshots.length > 0 ? (
              <div className="space-y-1.5">
                {snapshots.map((snap) => (
                  <div
                    key={snap.id}
                    className="p-2.5 rounded-lg border border-stone-200 bg-white hover:border-stone-300 transition space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-stone-800 text-xs truncate">
                        {snap.name}
                      </span>
                      <span className="text-[10px] text-stone-400">{snap.timestamp}</span>
                    </div>
                    <button
                      onClick={() => onRestoreSnapshot(snap.content)}
                      className="w-full flex items-center justify-center gap-1 py-1 rounded-md bg-stone-100 hover:bg-blue-50 hover:text-blue-700 text-stone-600 text-[11px] font-medium transition"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Pulihkan Versi Ini
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg border border-dashed border-stone-300 text-center text-stone-400">
                <p>Belum ada snapshot tersimpan.</p>
                <button
                  onClick={handleTakeSnapshot}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                >
                  + Buat Snapshot Pertama
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
