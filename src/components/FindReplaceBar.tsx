import React, { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Search, Replace, Check } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editorRef: React.RefObject<HTMLDivElement | null>;
  onContentChange: () => void;
}

export const FindReplaceBar: React.FC<Props> = ({
  isOpen,
  onClose,
  editorRef,
  onContentChange,
}) => {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!findText.trim() || !editorRef.current) {
      setMatchCount(0);
      setCurrentIndex(0);
      return;
    }

    const text = editorRef.current.innerText || "";
    const flags = matchCase ? "g" : "gi";
    try {
      const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
      const matches = text.match(regex);
      const count = matches ? matches.length : 0;
      setMatchCount(count);
      setCurrentIndex(count > 0 ? 1 : 0);
    } catch (e) {
      setMatchCount(0);
    }
  }, [findText, matchCase, editorRef]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (matchCount <= 0) return;
    setCurrentIndex((prev) => (prev >= matchCount ? 1 : prev + 1));
  };

  const handlePrev = () => {
    if (matchCount <= 0) return;
    setCurrentIndex((prev) => (prev <= 1 ? matchCount : prev - 1));
  };

  const handleReplaceOne = () => {
    if (!findText || !editorRef.current) return;
    const currentHtml = editorRef.current.innerHTML;
    const flags = matchCase ? "" : "i";
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
    editorRef.current.innerHTML = currentHtml.replace(regex, replaceText);
    onContentChange();
  };

  const handleReplaceAll = () => {
    if (!findText || !editorRef.current) return;
    const currentHtml = editorRef.current.innerHTML;
    const flags = matchCase ? "g" : "gi";
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
    editorRef.current.innerHTML = currentHtml.replace(regex, replaceText);
    onContentChange();
  };

  return (
    <div className="absolute right-6 top-24 z-40 w-80 rounded-xl bg-white p-3 shadow-2xl border border-stone-200 text-xs text-stone-800 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
      {/* Search row */}
      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Cari kata atau frasa..."
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            className="w-full pl-8 pr-16 py-1 rounded-md border border-stone-300 text-xs focus:border-blue-500 focus:outline-hidden"
            autoFocus
          />
          <span className="absolute right-2 top-1.5 text-[10px] text-stone-400">
            {matchCount > 0 ? `${currentIndex} dari ${matchCount}` : "0 hasil"}
          </span>
        </div>

        <button
          onClick={handlePrev}
          disabled={matchCount === 0}
          className="p-1 rounded-md hover:bg-stone-100 text-stone-600 disabled:opacity-30"
          title="Sebelumnya"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={handleNext}
          disabled={matchCount === 0}
          className="p-1 rounded-md hover:bg-stone-100 text-stone-600 disabled:opacity-30"
          title="Berikutnya"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-stone-100 text-stone-400 hover:text-stone-700"
          title="Tutup (Esc)"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Replace row */}
      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <Replace className="absolute left-2.5 top-2 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Ganti dengan..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            className="w-full pl-8 pr-2 py-1 rounded-md border border-stone-300 text-xs focus:border-blue-500 focus:outline-hidden"
          />
        </div>
        <button
          onClick={handleReplaceOne}
          disabled={matchCount === 0}
          className="px-2 py-1 rounded-md border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 font-medium disabled:opacity-40"
        >
          Ganti
        </button>
        <button
          onClick={handleReplaceAll}
          disabled={matchCount === 0}
          className="px-2 py-1 rounded-md border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 font-medium disabled:opacity-40"
        >
          Semua
        </button>
      </div>

      {/* Options */}
      <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[11px] text-stone-500">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={matchCase}
            onChange={(e) => setMatchCase(e.target.checked)}
            className="rounded-xs text-blue-600"
          />
          <span>Sensitif Huruf Besar/Kecil</span>
        </label>
      </div>
    </div>
  );
};
