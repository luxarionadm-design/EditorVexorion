import React, { useState } from "react";
import { Plus, X, Pin, FileText, Check } from "lucide-react";
import { DocumentFile } from "../types";

interface Props {
  documents: DocumentFile[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onNewDoc: () => void;
  onCloseDoc: (id: string) => void;
  onTogglePinDoc: (id: string) => void;
  wordCount: number;
}

export const DocumentTabs: React.FC<Props> = ({
  documents,
  activeDocId,
  onSelectDoc,
  onNewDoc,
  onCloseDoc,
  onTogglePinDoc,
  wordCount,
}) => {
  return (
    <div className="flex items-center justify-between bg-stone-200/70 border-b border-stone-300/80 px-2 pt-1 overflow-x-auto text-xs select-none">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
        {documents.map((doc) => {
          const isActive = doc.id === activeDocId;
          return (
            <div
              key={doc.id}
              onClick={() => onSelectDoc(doc.id)}
              className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-t-lg border-t border-x cursor-pointer transition max-w-[220px] ${
                isActive
                  ? "bg-white border-stone-300 text-stone-900 font-semibold shadow-2xs"
                  : "bg-stone-100/80 border-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-800"
              }`}
            >
              <FileText
                className={`h-3.5 w-3.5 shrink-0 ${
                  isActive ? "text-blue-600" : "text-stone-400"
                }`}
              />
              <span className="truncate text-xs">{doc.title}</span>

              {/* Pin button */}
              {doc.pinned && (
                <Pin className="h-3 w-3 text-amber-500 fill-amber-500 shrink-0" />
              )}

              {/* Close tab */}
              {documents.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseDoc(doc.id);
                  }}
                  className="rounded-sm p-0.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 opacity-0 group-hover:opacity-100 transition"
                  title="Tutup Dokumen"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Add Tab Button */}
        <button
          onClick={onNewDoc}
          className="flex items-center justify-center h-7 w-7 rounded-t-md text-stone-500 hover:bg-stone-300/70 hover:text-stone-800 transition"
          title="Buka Dokumen Baru"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Right Word Count Summary Pill */}
      <div className="hidden sm:flex items-center gap-2 pl-4 py-1 text-[11px] text-stone-500 shrink-0">
        <span className="flex items-center gap-1">
          <span className="font-semibold text-stone-700">{wordCount}</span> kata
        </span>
      </div>
    </div>
  );
};
