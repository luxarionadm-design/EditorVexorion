import React from "react";
import {
  FileText,
  Clock,
  Eye,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Columns,
  Code,
  FileSpreadsheet,
} from "lucide-react";
import { ViewMode, PageSetup } from "../types";

interface Props {
  words: number;
  characters: number;
  readingTimeMinutes: number;
  fleschGrade: string;
  zoom: number;
  onChangeZoom: (zoom: number) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  pageSetup: PageSetup;
  onOpenPageSetup: () => void;
  onOpenStats: () => void;
}

export const StatusBar: React.FC<Props> = ({
  words,
  characters,
  readingTimeMinutes,
  fleschGrade,
  zoom,
  onChangeZoom,
  viewMode,
  onChangeViewMode,
  pageSetup,
  onOpenPageSetup,
  onOpenStats,
}) => {
  return (
    <div className="bg-stone-100 border-t border-stone-200 px-4 py-1.5 flex items-center justify-between text-xs text-stone-600 select-none shrink-0">
      {/* Left stats & saving indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenStats}
          className="flex items-center gap-1.5 hover:text-stone-900 transition font-medium"
          title="Klik untuk melihat statistik detail"
        >
          <FileText className="h-3.5 w-3.5 text-stone-400" />
          <span>
            <strong>{words}</strong> kata
          </span>
          <span className="text-stone-300">•</span>
          <span>{characters} karakter</span>
        </button>

        <span className="text-stone-300 hidden sm:inline">•</span>

        <span className="hidden md:flex items-center gap-1 text-[11px] text-stone-500">
          <Clock className="h-3 w-3 text-stone-400" />
          ~{readingTimeMinutes} mnt baca
        </span>

        <span className="text-stone-300 hidden lg:inline">•</span>

        <button
          onClick={onOpenPageSetup}
          className="hidden lg:flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 transition"
          title="Ubah Pengaturan Kertas"
        >
          <FileSpreadsheet className="h-3 w-3 text-stone-400" />
          {pageSetup.paperSize} ({pageSetup.orientation === "portrait" ? "Potret" : "Lanskap"})
        </button>

        <span className="text-stone-300 hidden sm:inline">•</span>

        <div className="flex items-center gap-1 text-emerald-700 font-medium text-[11px]">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          <span className="hidden sm:inline">Tersimpan</span>
        </div>
      </div>

      {/* Right View Mode and Zoom controls */}
      <div className="flex items-center gap-3">
        {/* Layout Mode Toggles */}
        <div className="flex items-center rounded-md bg-stone-200/60 p-0.5">
          <button
            onClick={() => onChangeViewMode("page")}
            className={`p-1 rounded-xs transition ${
              viewMode === "page"
                ? "bg-white text-blue-600 shadow-2xs font-semibold"
                : "text-stone-500 hover:text-stone-800"
            }`}
            title="Tampilan Halaman (A4 Page)"
          >
            <FileText className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onChangeViewMode("continuous")}
            className={`p-1 rounded-xs transition ${
              viewMode === "continuous"
                ? "bg-white text-blue-600 shadow-2xs font-semibold"
                : "text-stone-500 hover:text-stone-800"
            }`}
            title="Tampilan Kontinu (Web Canvas)"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onChangeViewMode("markdown")}
            className={`p-1 rounded-xs transition ${
              viewMode === "markdown"
                ? "bg-white text-blue-600 shadow-2xs font-semibold"
                : "text-stone-500 hover:text-stone-800"
            }`}
            title="Mode Markdown (Source Code)"
          >
            <Code className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onChangeViewMode("split")}
            className={`p-1 rounded-xs transition ${
              viewMode === "split"
                ? "bg-white text-blue-600 shadow-2xs font-semibold"
                : "text-stone-500 hover:text-stone-800"
            }`}
            title="Tampilan Terpisah (Split Preview)"
          >
            <Columns className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Zoom Slider */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-stone-200">
          <button
            onClick={() => onChangeZoom(Math.max(50, zoom - 10))}
            className="text-stone-500 hover:text-stone-800 transition"
            title="Perkecil"
          >
            <ZoomOut className="h-3 w-3" />
          </button>

          <input
            type="range"
            min="50"
            max="200"
            step="5"
            value={zoom}
            onChange={(e) => onChangeZoom(parseInt(e.target.value))}
            className="w-16 h-1 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-stone-700 hidden sm:inline-block"
          />

          <button
            onClick={() => onChangeZoom(Math.min(200, zoom + 10))}
            className="text-stone-500 hover:text-stone-800 transition"
            title="Perbesar"
          >
            <ZoomIn className="h-3 w-3" />
          </button>

          <span className="w-8 text-right font-medium text-[11px] text-stone-700">
            {zoom}%
          </span>
        </div>
      </div>
    </div>
  );
};
