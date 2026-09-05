import React, { useState } from "react";
import { X, Sparkles, Check, RefreshCw, Copy, ArrowRight, Wand2, Languages } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  onApplyResult: (newText: string) => void;
  initialAction?: string;
}

export const AIAssistantModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedText,
  onApplyResult,
  initialAction,
}) => {
  const [inputText, setInputText] = useState(selectedText || "");
  const [action, setAction] = useState(initialAction || "fix_grammar");
  const [instructions, setInstructions] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Inggris");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      setInputText(selectedText || "");
      if (initialAction) setAction(initialAction);
      setResult("");
      setErrorMsg("");
    }
  }, [isOpen, selectedText, initialAction]);

  if (!isOpen) return null;

  const handleProcess = async () => {
    if (!inputText.trim() && action !== "generate") {
      setErrorMsg("Silakan masukkan atau pilih teks terlebih dahulu.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/ai/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          text: inputText,
          instructions,
          targetLanguage,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gagal memproses permintaan AI");
      }
      setResult(data.result || "");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Gagal terhubung ke layanan AI");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (result) {
      onApplyResult(result);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">
                Asisten Penulisan Cerdas AI
              </h3>
              <p className="text-xs text-stone-500">
                Penyempurnaan tata bahasa, peringkasan, terjemahan, dan eksplorasi ide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Action buttons */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Pilih Tindakan Cerdas
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "fix_grammar", label: "Perbaiki Ejaan & Tata Bahasa", icon: Wand2 },
                { id: "summarize", label: "Ringkas Isi Teks", icon: RefreshCw },
                { id: "expand", label: "Perluas & Elaborasi", icon: ArrowRight },
                { id: "formal_tone", label: "Ubah ke Nada Formal", icon: Check },
                { id: "bullet_points", label: "Ekstrak Poin-Poin", icon: Sparkles },
                { id: "translate", label: "Terjemahkan Bahasa", icon: Languages },
              ].map((act) => {
                const Icon = act.icon;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setAction(act.id)}
                    className={`flex items-center gap-2 p-2.5 text-xs font-medium rounded-lg border text-left transition ${
                      action === act.id
                        ? "border-blue-600 bg-blue-50/80 text-blue-900 font-semibold shadow-2xs"
                        : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${action === act.id ? "text-blue-600" : "text-stone-400"}`} />
                    <span className="truncate">{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional extra controls */}
          {action === "translate" && (
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-200">
              <label className="text-xs font-medium text-stone-700 whitespace-nowrap">
                Bahasa Target:
              </label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="rounded-md border border-stone-300 bg-white px-3 py-1 text-xs text-stone-800 focus:border-blue-500 focus:outline-hidden"
              >
                <option value="Inggris">Bahasa Inggris (English)</option>
                <option value="Indonesia">Bahasa Indonesia</option>
                <option value="Jepang">Bahasa Jepang (日本語)</option>
                <option value="Mandarin">Bahasa Mandarin (中文)</option>
                <option value="Jerman">Bahasa Jerman (Deutsch)</option>
                <option value="Arab">Bahasa Arab (العربية)</option>
                <option value="Perancis">Bahasa Perancis (Français)</option>
              </select>
            </div>
          )}

          {/* Source text area */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-stone-700">
                Teks Sumber
              </label>
              <span className="text-[11px] text-stone-400">
                {inputText.length} karakter
              </span>
            </div>
            <textarea
              rows={3}
              placeholder="Ketik atau tempel teks yang ingin diproses di sini..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full rounded-lg border border-stone-300 p-3 text-xs text-stone-800 leading-relaxed focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Process trigger button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleProcess}
              disabled={loading || (!inputText.trim() && action !== "generate")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Memproses dengan AI...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  Jalankan Transformasi
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Result Output */}
          {result && (
            <div className="rounded-lg border border-stone-200 bg-stone-50/60 p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" />
                  Hasil Penyempurnaan AI:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-stone-600 hover:bg-white border border-transparent hover:border-stone-200 transition"
                  >
                    <Copy className="h-3 w-3" />
                    {copied ? "Tersalin!" : "Salin"}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-white rounded-md border border-stone-200 text-xs text-stone-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                {result}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-stone-200 px-6 py-3.5 bg-stone-50">
          <button
            onClick={onClose}
            className="rounded-lg border border-stone-300 px-3.5 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100 transition"
          >
            Tutup
          </button>
          <button
            onClick={handleApply}
            disabled={!result}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="h-3.5 w-3.5" />
            Terapkan ke Dokumen
          </button>
        </div>
      </div>
    </div>
  );
};
