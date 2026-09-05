import React, { useState } from "react";
import { X, Table as TableIcon, Check } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onInsertTable: (rows: number, cols: number, hasHeader: boolean) => void;
}

export const TableModal: React.FC<Props> = ({ isOpen, onClose, onInsertTable }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hoverRows, setHoverRows] = useState(3);
  const [hoverCols, setHoverCols] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);

  if (!isOpen) return null;

  const maxGrid = 8;

  const handleGridClick = (r: number, c: number) => {
    onInsertTable(r, c, hasHeader);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInsertTable(Math.max(1, rows), Math.max(1, cols), hasHeader);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
              <TableIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">Sisipkan Tabel</h3>
              <p className="text-xs text-stone-500">Pilih ukuran matriks baris & kolom</p>
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
        <div className="p-6 space-y-5">
          {/* Visual Grid Picker */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Pilihan Cepat ({hoverRows} × {hoverCols})
            </label>
            <div
              className="inline-grid gap-1.5 p-3 rounded-lg border border-stone-200 bg-stone-50/50"
              style={{
                gridTemplateColumns: `repeat(${maxGrid}, minmax(0, 1fr))`,
              }}
              onMouseLeave={() => {
                setHoverRows(rows);
                setHoverCols(cols);
              }}
            >
              {Array.from({ length: maxGrid }).map((_, rIdx) =>
                Array.from({ length: maxGrid }).map((_, cIdx) => {
                  const r = rIdx + 1;
                  const c = cIdx + 1;
                  const isHovered = r <= hoverRows && c <= hoverCols;
                  return (
                    <button
                      key={`${r}-${c}`}
                      type="button"
                      onMouseEnter={() => {
                        setHoverRows(r);
                        setHoverCols(c);
                      }}
                      onClick={() => handleGridClick(r, c)}
                      className={`h-5 w-5 rounded-xs border transition-colors ${
                        isHovered
                          ? "bg-emerald-500 border-emerald-600 shadow-2xs"
                          : "bg-white border-stone-300 hover:border-stone-400"
                      }`}
                      title={`${r} baris × ${c} kolom`}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Form manual */}
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Jumlah Baris
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={rows}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setRows(val);
                    setHoverRows(Math.min(maxGrid, val));
                  }}
                  className="w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-800 focus:border-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Jumlah Kolom
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={cols}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setCols(val);
                    setHoverCols(Math.min(maxGrid, val));
                  }}
                  className="w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-800 focus:border-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-sm text-stone-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="h-4 w-4 rounded-xs border-stone-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Sertakan baris judul / header</span>
            </label>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-stone-300 px-3.5 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 transition shadow-xs"
              >
                <Check className="h-4 w-4" />
                Sisipkan Tabel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
