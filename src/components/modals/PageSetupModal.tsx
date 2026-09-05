import React from "react";
import { X, FileSpreadsheet, Check } from "lucide-react";
import { PageSetup } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pageSetup: PageSetup;
  onChangePageSetup: (setup: PageSetup) => void;
}

export const PageSetupModal: React.FC<Props> = ({
  isOpen,
  onClose,
  pageSetup,
  onChangePageSetup,
}) => {
  const [localSetup, setLocalSetup] = React.useState<PageSetup>(pageSetup);

  React.useEffect(() => {
    if (isOpen) {
      setLocalSetup(pageSetup);
    }
  }, [isOpen, pageSetup]);

  if (!isOpen) return null;

  const handleSave = () => {
    onChangePageSetup(localSetup);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-700 text-white shadow-xs">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">Pengaturan Halaman</h3>
              <p className="text-xs text-stone-500">Konfigurasi tata letak cetak dan margin</p>
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
        <div className="p-6 space-y-4">
          {/* Paper Size */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Ukuran Kertas
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["A4", "Letter", "Legal"] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setLocalSetup({ ...localSetup, paperSize: size })}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition text-center ${
                    localSetup.paperSize === size
                      ? "border-stone-800 bg-stone-800 text-white shadow-xs"
                      : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Orientation */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Orientasi Halaman
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLocalSetup({ ...localSetup, orientation: "portrait" })}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition text-center ${
                  localSetup.orientation === "portrait"
                    ? "border-stone-800 bg-stone-800 text-white shadow-xs"
                    : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                Potret (Tinggi)
              </button>
              <button
                type="button"
                onClick={() => setLocalSetup({ ...localSetup, orientation: "landscape" })}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition text-center ${
                  localSetup.orientation === "landscape"
                    ? "border-stone-800 bg-stone-800 text-white shadow-xs"
                    : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                Lanskap (Lebar)
              </button>
            </div>
          </div>

          {/* Margins */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Jarak Margin
            </label>
            <div className="space-y-2">
              {[
                { id: "normal", label: "Standar (2.54 cm)", desc: "Cocok untuk dokumen formal, laporan & skripsi" },
                { id: "narrow", label: "Sempit (1.27 cm)", desc: "Memaksimalkan ruang cetak teks" },
                { id: "wide", label: "Lebar (3.81 cm)", desc: "Tampilan bernafas lapang, format buku atau esai" },
              ].map((m) => (
                <label
                  key={m.id}
                  onClick={() => setLocalSetup({ ...localSetup, margin: m.id as any })}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition ${
                    localSetup.margin === m.id
                      ? "border-stone-800 bg-stone-50"
                      : "border-stone-200 hover:bg-stone-50/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="margin"
                    checked={localSetup.margin === m.id}
                    onChange={() => {}}
                    className="mt-0.5 text-stone-800 focus:ring-stone-800"
                  />
                  <div>
                    <p className="text-xs font-semibold text-stone-900">{m.label}</p>
                    <p className="text-[11px] text-stone-500">{m.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-stone-200 px-6 py-3.5 bg-stone-50">
          <button
            onClick={onClose}
            className="rounded-lg border border-stone-300 px-3.5 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 transition"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-lg bg-stone-800 px-4 py-1.5 text-sm font-medium text-white hover:bg-stone-900 transition shadow-xs"
          >
            <Check className="h-4 w-4" />
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
};
