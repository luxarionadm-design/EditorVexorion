import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onInsertChar: (char: string) => void;
}

const symbolCategories = [
  {
    name: "Matematika",
    chars: [
      "±", "×", "÷", "≠", "≈", "≤", "≥", "√", "∑", "∏", "π", "∞", "∫", "∂", "∆", "µ", "°", "‰", "½", "¼", "¾", "¹", "²", "³"
    ],
  },
  {
    name: "Panah",
    chars: [
      "←", "→", "↑", "↓", "↔", "↕", "↖", "↗", "↘", "↙", "⇐", "⇒", "⇑", "⇓", "⇔", "➔", "➜", "↳", "↵", "➤", "◄", "►"
    ],
  },
  {
    name: "Mata Uang",
    chars: [
      "Rp", "$", "€", "£", "¥", "₹", "₩", "฿", "¢", "₿", "₽", "₺", "₫", "₱"
    ],
  },
  {
    name: "Tipografi",
    chars: [
      "—", "–", "…", "•", "“", "”", "‘", "’", "«", "»", "©", "®", "™", "§", "¶", "†", "‡", "№", "※", "§"
    ],
  },
  {
    name: "Tanda & Bentuk",
    chars: [
      "✓", "✔", "✗", "✘", "★", "☆", "✦", "✧", "◆", "◇", "●", "○", "■", "□", "▲", "▼", "⚙", "✉", "✎", "📌", "💡", "🚀"
    ],
  },
];

export const SpecialCharModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onInsertChar,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">Karakter Khusus & Simbol</h3>
              <p className="text-xs text-stone-500">Klik simbol untuk langsung menyisipkan ke dokumen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex border-b border-stone-200 bg-stone-50/50 px-4 overflow-x-auto">
          {symbolCategories.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(idx)}
              className={`py-2 px-3 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                activeTab === idx
                  ? "border-amber-600 text-amber-700"
                  : "border-transparent text-stone-500 hover:text-stone-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Char grid */}
        <div className="p-6">
          <div className="grid grid-cols-6 gap-2">
            {symbolCategories[activeTab].chars.map((char, cIdx) => (
              <button
                key={cIdx}
                type="button"
                onClick={() => {
                  onInsertChar(char);
                  onClose();
                }}
                className="flex items-center justify-center h-11 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-800 text-lg font-medium text-stone-800 transition active:scale-95"
                title={`Sisipkan ${char}`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-stone-200 px-6 py-3 bg-stone-50">
          <button
            onClick={onClose}
            className="rounded-lg border border-stone-300 px-4 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
