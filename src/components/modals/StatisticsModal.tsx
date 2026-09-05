import React from "react";
import { X, BarChart3, Clock, Mic, FileText, CheckCircle2 } from "lucide-react";
import { DocumentStats } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stats: DocumentStats;
  docTitle: string;
}

export const StatisticsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  stats,
  docTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
              <BarChart3 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">
                Statistik & Analisis Dokumen
              </h3>
              <p className="text-xs text-stone-500 truncate max-w-xs">{docTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 text-center">
              <span className="text-2xl font-bold text-stone-900">{stats.words}</span>
              <p className="text-xs font-medium text-stone-500 mt-0.5">Jumlah Kata</p>
            </div>
            <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 text-center">
              <span className="text-2xl font-bold text-stone-900">{stats.characters}</span>
              <p className="text-xs font-medium text-stone-500 mt-0.5">Total Karakter</p>
            </div>
            <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 text-center">
              <span className="text-2xl font-bold text-stone-900">{stats.sentences}</span>
              <p className="text-xs font-medium text-stone-500 mt-0.5">Kalimat</p>
            </div>
            <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 text-center">
              <span className="text-2xl font-bold text-stone-900">{stats.paragraphs}</span>
              <p className="text-xs font-medium text-stone-500 mt-0.5">Paragraf</p>
            </div>
          </div>

          {/* Detailed breakdown */}
          <div className="space-y-2.5 rounded-lg border border-stone-200 p-4 bg-white text-sm">
            <div className="flex justify-between items-center py-1 border-b border-stone-100">
              <span className="text-stone-600 flex items-center gap-2">
                <FileText className="h-4 w-4 text-stone-400" />
                Karakter tanpa spasi
              </span>
              <span className="font-semibold text-stone-800">{stats.charactersNoSpaces}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-stone-100">
              <span className="text-stone-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                Estimasi waktu baca
              </span>
              <span className="font-semibold text-stone-800">~{stats.readingTimeMinutes} menit</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-stone-100">
              <span className="text-stone-600 flex items-center gap-2">
                <Mic className="h-4 w-4 text-emerald-500" />
                Estimasi waktu pidato / bicara
              </span>
              <span className="font-semibold text-stone-800">~{stats.speakingTimeMinutes} menit</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-stone-600 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                Tingkat Keterbacaan (Flesch)
              </span>
              <div className="text-right">
                <span className="font-semibold text-stone-900">{stats.fleschScore}/100</span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                  {stats.fleschGrade}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-stone-200 px-6 py-3.5 bg-stone-50">
          <button
            onClick={onClose}
            className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-900 transition shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
