import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  ChevronRight,
  Printer,
  FileCode,
  FolderOpen,
  Save,
  Clock,
  Download,
  Sliders,
  Undo2,
  Redo2,
  Scissors,
  Copy,
  Clipboard,
  Search,
  BarChart2,
  Sparkles,
  Eye,
  Maximize,
  ZoomIn,
  Palette,
  Table as TableIcon,
  Image as ImageIcon,
  Link2,
  Minus,
  AlertCircle,
  Code2,
  CheckSquare,
  Calendar,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Subscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Indent,
  Outdent,
  HelpCircle,
  BookOpen,
  FilePlus2,
  Trash2,
  Plus,
  Smartphone,
} from "lucide-react";
import { ViewMode, EditorTheme } from "../types";

interface Props {
  documentTitle: string;
  onRenameTitle: (newTitle: string) => void;
  onNewDocument: (template?: string) => void;
  onImportFile: () => void;
  onSave: () => void;
  onExport: (format: "pdf" | "md" | "html" | "txt" | "json") => void;
  onOpenPageSetup: () => void;
  onPrint: () => void;
  // Edit
  onUndo: () => void;
  onRedo: () => void;
  onExecuteCommand: (cmd: string, val?: string) => void;
  onFindReplace: () => void;
  onOpenStats: () => void;
  // View
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  theme: EditorTheme;
  onChangeTheme: (theme: EditorTheme) => void;
  zoom: number;
  onChangeZoom: (zoom: number) => void;
  showRuler: boolean;
  onToggleRuler: () => void;
  showOutline: boolean;
  onToggleOutline: () => void;
  showStatusBar: boolean;
  onToggleStatusBar: () => void;
  isZenMode: boolean;
  onToggleZenMode: () => void;
  // Insert
  onOpenTableModal: () => void;
  onQuickInsertTable: (rows: number, cols: number) => void;
  onOpenImageModal: () => void;
  onOpenLinkModal: () => void;
  onInsertCallout: (type: "info" | "warning" | "success" | "note") => void;
  onInsertCodeBlock: (lang: string) => void;
  onOpenSpecialCharModal: () => void;
  onInsertChecklist: () => void;
  onInsertDateTime: () => void;
  onInsertPageBreak: () => void;
  // Format
  onSetHeading: (tag: string) => void;
  onSetLineSpacing: (spacing: string) => void;
  onSetTextColor: (color: string) => void;
  onSetHighlightColor: (color: string) => void;
  // Tools
  onOpenAIModal: (action?: string) => void;
  onTransformCase: (type: "upper" | "lower" | "title" | "sentence" | "slug") => void;
  onCleanText: (action: "spaces" | "lines" | "quotes") => void;
  // Table
  onTableAction: (action: "addRowAbove" | "addRowBelow" | "deleteRow" | "addColLeft" | "addColRight" | "deleteCol" | "deleteTable") => void;
  // Help
  onOpenShortcuts: () => void;
  onSwitchToMobile?: () => void;
}

export const MenuBar: React.FC<Props> = ({
  documentTitle,
  onRenameTitle,
  onNewDocument,
  onImportFile,
  onSave,
  onExport,
  onOpenPageSetup,
  onPrint,
  onUndo,
  onRedo,
  onExecuteCommand,
  onFindReplace,
  onOpenStats,
  viewMode,
  onChangeViewMode,
  theme,
  onChangeTheme,
  zoom,
  onChangeZoom,
  showRuler,
  onToggleRuler,
  showOutline,
  onToggleOutline,
  showStatusBar,
  onToggleStatusBar,
  isZenMode,
  onToggleZenMode,
  onOpenTableModal,
  onQuickInsertTable,
  onOpenImageModal,
  onOpenLinkModal,
  onInsertCallout,
  onInsertCodeBlock,
  onOpenSpecialCharModal,
  onInsertChecklist,
  onInsertDateTime,
  onInsertPageBreak,
  onSetHeading,
  onSetLineSpacing,
  onSetTextColor,
  onSetHighlightColor,
  onOpenAIModal,
  onTransformCase,
  onCleanText,
  onTableAction,
  onOpenShortcuts,
  onSwitchToMobile,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(documentTitle);
  const menuBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempTitle(documentTitle);
  }, [documentTitle]);

  // Handle outside click to close menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (menuName: string) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
      setActiveSubmenu(null);
    } else {
      setActiveMenu(menuName);
      setActiveSubmenu(null);
    }
  };

  const closeMenu = () => {
    setActiveMenu(null);
    setActiveSubmenu(null);
  };

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (tempTitle.trim() && tempTitle !== documentTitle) {
      onRenameTitle(tempTitle.trim());
    } else {
      setTempTitle(documentTitle);
    }
  };

  return (
    <div
      ref={menuBarRef}
      className="bg-white border-b border-stone-200 select-none text-stone-800 text-xs"
    >
      {/* Top Brand & Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-stone-100">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-2xs">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-bold text-stone-900 text-sm tracking-tight hidden sm:inline">
              DocEditor<span className="text-blue-600 font-normal">Pro</span>
            </span>
          </div>

          <div className="h-4 w-px bg-stone-200 hidden sm:block" />

          {/* Editable Document Title */}
          <div className="flex items-center gap-2">
            {isEditingTitle ? (
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleTitleSubmit();
                  if (e.key === "Escape") {
                    setTempTitle(documentTitle);
                    setIsEditingTitle(false);
                  }
                }}
                autoFocus
                className="rounded-md border border-blue-500 bg-white px-2 py-0.5 text-xs font-semibold text-stone-900 focus:outline-hidden ring-1 ring-blue-500 min-w-[200px]"
              />
            ) : (
              <button
                onClick={() => setIsEditingTitle(true)}
                className="rounded-md px-2 py-0.5 text-xs font-semibold text-stone-800 hover:bg-stone-100 hover:text-blue-600 transition flex items-center gap-1.5 truncate max-w-xs sm:max-w-md"
                title="Klik untuk mengubah judul dokumen"
              >
                <span className="truncate">{documentTitle}</span>
                <span className="text-[10px] text-stone-400 font-normal hidden md:inline">(Ganti Judul)</span>
              </button>
            )}
            <span className="text-[11px] px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 font-medium border border-emerald-200/60 hidden lg:inline">
              Tersimpan Otomatis
            </span>
          </div>
        </div>

        {/* Right quick controls */}
        <div className="flex items-center gap-2">
          {/* AI quick trigger */}
          <button
            onClick={() => onOpenAIModal()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 font-medium hover:from-blue-100 hover:to-indigo-100 transition shadow-2xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span className="hidden sm:inline">Asisten AI</span>
          </button>

          {/* Print button */}
          <button
            onClick={onPrint}
            title="Cetak Dokumen (Ctrl+P)"
            className="p-1.5 rounded-md text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition"
          >
            <Printer className="h-4 w-4" />
          </button>

          {/* Zen mode toggle */}
          <button
            onClick={onToggleZenMode}
            title={isZenMode ? "Keluar Mode Zen" : "Mode Zen Bebas Distraksi"}
            className={`p-1.5 rounded-md transition ${
              isZenMode
                ? "bg-blue-600 text-white"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <Maximize className="h-4 w-4" />
          </button>

          {/* Switch to Mobile Editor */}
          {onSwitchToMobile && (
            <button
              onClick={onSwitchToMobile}
              title="Beralih ke Tampilan Editor Ponsel (Mobile)"
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-semibold transition text-xs active:scale-95 shrink-0"
            >
              <Smartphone className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span className="inline text-[11px]">Mode Ponsel</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Menu Ribbon */}
      <div className="flex items-center px-2 py-0.5 gap-0.5 overflow-x-auto relative">
        {/* BERKAS (FILE) */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("file")}
            className={`px-2.5 py-1 rounded-sm font-medium transition cursor-pointer ${
              activeMenu === "file"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "hover:bg-stone-100 text-stone-700"
            }`}
          >
            Berkas
          </button>

          {activeMenu === "file" && (
            <div className="absolute left-0 top-full mt-0.5 w-60 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in-50 duration-100">
              <button
                onClick={() => {
                  onNewDocument();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <FilePlus2 className="h-3.5 w-3.5 text-stone-500" />
                  Dokumen Kosong Baru
                </span>
              </button>

              <button
                onClick={() => {
                  onImportFile();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <FolderOpen className="h-3.5 w-3.5 text-stone-500" />
                  Buka / Impor Berkas...
                </span>
                <span className="text-[10px] text-stone-400">.md, .txt</span>
              </button>

              <button
                onClick={() => {
                  onSave();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <Save className="h-3.5 w-3.5 text-stone-500" />
                  Simpan Dokumen
                </span>
                <kbd className="text-[10px] text-stone-400">Ctrl+S</kbd>
              </button>

              <div className="my-1 border-t border-stone-100" />

              {/* Submenu: Ekspor */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("export")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Download className="h-3.5 w-3.5 text-stone-500" />
                    Ekspor Dokumen
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "export" && (
                  <div className="absolute left-full top-0 ml-0.5 w-52 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onExport("pdf");
                        closeMenu();
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <span>Cetak / Dokumen PDF (.pdf)</span>
                      <kbd className="text-[10px] text-stone-400">Ctrl+P</kbd>
                    </button>
                    <button
                      onClick={() => {
                        onExport("md");
                        closeMenu();
                      }}
                      className="w-full flex items-center px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <span>Format Markdown (.md)</span>
                    </button>
                    <button
                      onClick={() => {
                        onExport("html");
                        closeMenu();
                      }}
                      className="w-full flex items-center px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <span>Halaman Web (.html)</span>
                    </button>
                    <button
                      onClick={() => {
                        onExport("txt");
                        closeMenu();
                      }}
                      className="w-full flex items-center px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <span>Teks Murni (.txt)</span>
                    </button>
                    <button
                      onClick={() => {
                        onExport("json");
                        closeMenu();
                      }}
                      className="w-full flex items-center px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <span>Cadangan Data (.json)</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="my-1 border-t border-stone-100" />

              <button
                onClick={() => {
                  onOpenPageSetup();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="h-3.5 w-3.5 text-stone-500" />
                  Pengaturan Halaman...
                </span>
              </button>

              <button
                onClick={() => {
                  onPrint();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <Printer className="h-3.5 w-3.5 text-stone-500" />
                  Cetak Dokumen
                </span>
                <kbd className="text-[10px] text-stone-400">Ctrl+P</kbd>
              </button>
            </div>
          )}
        </div>

        {/* SUNTING (EDIT) */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("edit")}
            className={`px-2.5 py-1 rounded-sm font-medium transition cursor-pointer ${
              activeMenu === "edit"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "hover:bg-stone-100 text-stone-700"
            }`}
          >
            Sunting
          </button>

          {activeMenu === "edit" && (
            <div className="absolute left-0 top-full mt-0.5 w-56 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
              <button
                onClick={() => {
                  onUndo();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <Undo2 className="h-3.5 w-3.5 text-stone-500" />
                  Urungkan (Undo)
                </span>
                <kbd className="text-[10px] text-stone-400">Ctrl+Z</kbd>
              </button>

              <button
                onClick={() => {
                  onRedo();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <Redo2 className="h-3.5 w-3.5 text-stone-500" />
                  Ulangi (Redo)
                </span>
                <kbd className="text-[10px] text-stone-400">Ctrl+Y</kbd>
              </button>

              <div className="my-1 border-t border-stone-100" />

              <button
                onClick={() => {
                  document.execCommand("cut");
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <Scissors className="h-3.5 w-3.5 text-stone-500" />
                  Potong
                </span>
                <kbd className="text-[10px] text-stone-400">Ctrl+X</kbd>
              </button>

              <button
                onClick={() => {
                  document.execCommand("copy");
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <Copy className="h-3.5 w-3.5 text-stone-500" />
                  Salin
                </span>
                <kbd className="text-[10px] text-stone-400">Ctrl+C</kbd>
              </button>

              <button
                onClick={() => {
                  document.execCommand("selectAll");
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <CheckSquare className="h-3.5 w-3.5 text-stone-500" />
                  Pilih Semua
                </span>
                <kbd className="text-[10px] text-stone-400">Ctrl+A</kbd>
              </button>

              <div className="my-1 border-t border-stone-100" />

              <button
                onClick={() => {
                  onFindReplace();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <Search className="h-3.5 w-3.5 text-stone-500" />
                  Cari & Ganti...
                </span>
                <kbd className="text-[10px] text-stone-400">Ctrl+F</kbd>
              </button>

              <button
                onClick={() => {
                  onOpenStats();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <BarChart2 className="h-3.5 w-3.5 text-stone-500" />
                  Hitung Kata & Statistik
                </span>
              </button>

              <button
                onClick={() => {
                  onExecuteCommand("removeFormat");
                  closeMenu();
                }}
                className="w-full flex items-center px-3.5 py-1.5 hover:bg-stone-100 text-left text-red-600"
              >
                Hapus Format Teks
              </button>
            </div>
          )}
        </div>

        {/* TAMPILAN (VIEW) */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("view")}
            className={`px-2.5 py-1 rounded-sm font-medium transition cursor-pointer ${
              activeMenu === "view"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "hover:bg-stone-100 text-stone-700"
            }`}
          >
            Tampilan
          </button>

          {activeMenu === "view" && (
            <div className="absolute left-0 top-full mt-0.5 w-60 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
              {/* Submenu: Mode Dokumen */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("viewMode")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Eye className="h-3.5 w-3.5 text-stone-500" />
                    Mode Tata Letak
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "viewMode" && (
                  <div className="absolute left-full top-0 ml-0.5 w-56 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onChangeViewMode("page");
                        closeMenu();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left ${
                        viewMode === "page" ? "text-blue-600 font-semibold bg-blue-50/50" : ""
                      }`}
                    >
                      <span>Tampilan Halaman (A4 Page)</span>
                      {viewMode === "page" && "✓"}
                    </button>
                    <button
                      onClick={() => {
                        onChangeViewMode("continuous");
                        closeMenu();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left ${
                        viewMode === "continuous" ? "text-blue-600 font-semibold bg-blue-50/50" : ""
                      }`}
                    >
                      <span>Tampilan Kontinu (Web Canvas)</span>
                      {viewMode === "continuous" && "✓"}
                    </button>
                    <button
                      onClick={() => {
                        onChangeViewMode("markdown");
                        closeMenu();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left ${
                        viewMode === "markdown" ? "text-blue-600 font-semibold bg-blue-50/50" : ""
                      }`}
                    >
                      <span>Mode Markdown (Source)</span>
                      {viewMode === "markdown" && "✓"}
                    </button>
                    <button
                      onClick={() => {
                        onChangeViewMode("split");
                        closeMenu();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left ${
                        viewMode === "split" ? "text-blue-600 font-semibold bg-blue-50/50" : ""
                      }`}
                    >
                      <span>Tampilan Terpisah (Split View)</span>
                      {viewMode === "split" && "✓"}
                    </button>
                  </div>
                )}
              </div>

              {/* Submenu: Zoom */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("zoom")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span className="flex items-center gap-2">
                    <ZoomIn className="h-3.5 w-3.5 text-stone-500" />
                    Skala Tampilan ({zoom}%)
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "zoom" && (
                  <div className="absolute left-full top-0 ml-0.5 w-44 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    {[50, 75, 100, 125, 150, 200].map((z) => (
                      <button
                        key={z}
                        onClick={() => {
                          onChangeZoom(z);
                          closeMenu();
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left ${
                          zoom === z ? "text-blue-600 font-semibold bg-blue-50/50" : ""
                        }`}
                      >
                        <span>{z}%</span>
                        {zoom === z && "✓"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submenu: Tema Warna */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("theme")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Palette className="h-3.5 w-3.5 text-stone-500" />
                    Tema Tampilan
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "theme" && (
                  <div className="absolute left-full top-0 ml-0.5 w-48 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    {[
                      { id: "clean-light", name: "Putih Studio (Light)" },
                      { id: "sepia", name: "Sepia Hangat (Sepia)" },
                      { id: "obsidian", name: "Mode Gelap (Obsidian)" },
                      { id: "mint", name: "Emerald Lembut (Mint)" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onChangeTheme(t.id as EditorTheme);
                          closeMenu();
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left ${
                          theme === t.id ? "text-blue-600 font-semibold bg-blue-50/50" : ""
                        }`}
                      >
                        <span>{t.name}</span>
                        {theme === t.id && "✓"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="my-1 border-t border-stone-100" />

              <button
                onClick={() => {
                  onToggleRuler();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span>Garis Mistar (Ruler)</span>
                <span>{showRuler ? "✓" : ""}</span>
              </button>

              <button
                onClick={() => {
                  onToggleOutline();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span>Struktur Outline Dokumen</span>
                <span>{showOutline ? "✓" : ""}</span>
              </button>

              <button
                onClick={() => {
                  onToggleStatusBar();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span>Bilah Status Bawah</span>
                <span>{showStatusBar ? "✓" : ""}</span>
              </button>

              <div className="my-1 border-t border-stone-100" />

              <button
                onClick={() => {
                  onToggleZenMode();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <Maximize className="h-3.5 w-3.5 text-stone-500" />
                  Mode Zen Bebas Distraksi
                </span>
                <span>{isZenMode ? "✓" : ""}</span>
              </button>
            </div>
          )}
        </div>

        {/* SISIPKAN (INSERT) */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("insert")}
            className={`px-2.5 py-1 rounded-sm font-medium transition cursor-pointer ${
              activeMenu === "insert"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "hover:bg-stone-100 text-stone-700"
            }`}
          >
            Sisipkan
          </button>

          {activeMenu === "insert" && (
            <div className="absolute left-0 top-full mt-0.5 w-60 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
              {/* Submenu: Tabel */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("table")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span className="flex items-center gap-2">
                    <TableIcon className="h-3.5 w-3.5 text-stone-500" />
                    Tabel
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "table" && (
                  <div className="absolute left-full top-0 ml-0.5 w-52 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onQuickInsertTable(2, 2);
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Tabel 2 × 2
                    </button>
                    <button
                      onClick={() => {
                        onQuickInsertTable(3, 3);
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Tabel 3 × 3
                    </button>
                    <button
                      onClick={() => {
                        onQuickInsertTable(4, 4);
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Tabel 4 × 4
                    </button>
                    <div className="my-1 border-t border-stone-100" />
                    <button
                      onClick={() => {
                        onOpenTableModal();
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left font-semibold text-blue-600"
                    >
                      Konfigurasi Kustom...
                    </button>
                  </div>
                )}
              </div>

              {/* Submenu: Gambar */}
              <button
                onClick={() => {
                  onOpenImageModal();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <ImageIcon className="h-3.5 w-3.5 text-stone-500" />
                  Gambar...
                </span>
              </button>

              {/* Link */}
              <button
                onClick={() => {
                  onOpenLinkModal();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <Link2 className="h-3.5 w-3.5 text-stone-500" />
                  Tautan Web (Hyperlink)
                </span>
                <kbd className="text-[10px] text-stone-400">Ctrl+K</kbd>
              </button>

              {/* Horizontal rule */}
              <button
                onClick={() => {
                  onExecuteCommand("insertHorizontalRule");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <Minus className="h-3.5 w-3.5 text-stone-500" />
                Garis Pemisah Horizontal
              </button>

              <div className="my-1 border-t border-stone-100" />

              {/* Submenu: Callouts */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("callout")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-stone-500" />
                    Kotak Sorotan (Callout)
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "callout" && (
                  <div className="absolute left-full top-0 ml-0.5 w-48 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onInsertCallout("info");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-blue-50 text-left text-blue-700"
                    >
                      Informasi (Biru)
                    </button>
                    <button
                      onClick={() => {
                        onInsertCallout("warning");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-amber-50 text-left text-amber-700"
                    >
                      Peringatan (Kuning)
                    </button>
                    <button
                      onClick={() => {
                        onInsertCallout("success");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-emerald-50 text-left text-emerald-700"
                    >
                      Sukses (Hijau)
                    </button>
                    <button
                      onClick={() => {
                        onInsertCallout("note");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left text-stone-700"
                    >
                      Catatan Standar (Abu)
                    </button>
                  </div>
                )}
              </div>

              {/* Submenu: Code block */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("code")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5 text-stone-500" />
                    Blok Kode (Code Block)
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "code" && (
                  <div className="absolute left-full top-0 ml-0.5 w-44 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    {["TypeScript / JavaScript", "Python", "HTML / CSS", "SQL", "JSON", "Bash / Terminal"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          onInsertCodeBlock(lang);
                          closeMenu();
                        }}
                        className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="my-1 border-t border-stone-100" />

              <button
                onClick={() => {
                  onInsertChecklist();
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <CheckSquare className="h-3.5 w-3.5 text-stone-500" />
                Daftar Tugas (Checklist)
              </button>

              <button
                onClick={() => {
                  onOpenSpecialCharModal();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span>Karakter Khusus & Simbol...</span>
              </button>

              <button
                onClick={() => {
                  onInsertDateTime();
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <Calendar className="h-3.5 w-3.5 text-stone-500" />
                Tanggal & Waktu Sekarang
              </button>

              <button
                onClick={() => {
                  onInsertPageBreak();
                  closeMenu();
                }}
                className="w-full flex items-center px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                Pemisah Halaman (Page Break)
              </button>
            </div>
          )}
        </div>

        {/* FORMAT (FORMAT) */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("format")}
            className={`px-2.5 py-1 rounded-sm font-medium transition cursor-pointer ${
              activeMenu === "format"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "hover:bg-stone-100 text-stone-700"
            }`}
          >
            Format
          </button>

          {activeMenu === "format" && (
            <div className="absolute left-0 top-full mt-0.5 w-60 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
              {/* Submenu: Text Style */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("textStyle")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Bold className="h-3.5 w-3.5 text-stone-500" />
                    Gaya Teks
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "textStyle" && (
                  <div className="absolute left-full top-0 ml-0.5 w-52 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onExecuteCommand("bold");
                        closeMenu();
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left font-bold"
                    >
                      <span>Tebal (Bold)</span>
                      <kbd className="text-[10px] text-stone-400">Ctrl+B</kbd>
                    </button>
                    <button
                      onClick={() => {
                        onExecuteCommand("italic");
                        closeMenu();
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left italic"
                    >
                      <span>Miring (Italic)</span>
                      <kbd className="text-[10px] text-stone-400">Ctrl+I</kbd>
                    </button>
                    <button
                      onClick={() => {
                        onExecuteCommand("underline");
                        closeMenu();
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left underline"
                    >
                      <span>Garis Bawah</span>
                      <kbd className="text-[10px] text-stone-400">Ctrl+U</kbd>
                    </button>
                    <button
                      onClick={() => {
                        onExecuteCommand("strikeThrough");
                        closeMenu();
                      }}
                      className="w-full flex items-center px-3.5 py-1.5 hover:bg-stone-100 text-left line-through"
                    >
                      <span>Coret (Strikethrough)</span>
                    </button>
                    <button
                      onClick={() => {
                        onExecuteCommand("superscript");
                        closeMenu();
                      }}
                      className="w-full flex items-center px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <span>Teks Atas (Superscript)</span>
                    </button>
                    <button
                      onClick={() => {
                        onExecuteCommand("subscript");
                        closeMenu();
                      }}
                      className="w-full flex items-center px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <span>Teks Bawah (Subscript)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Submenu: Headings */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("headings")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span>Judul & Paragraf</span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "headings" && (
                  <div className="absolute left-full top-0 ml-0.5 w-48 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onSetHeading("P");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Paragraf Normal
                    </button>
                    <button
                      onClick={() => {
                        onSetHeading("H1");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left text-base font-bold"
                    >
                      Judul 1 (H1)
                    </button>
                    <button
                      onClick={() => {
                        onSetHeading("H2");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left text-sm font-semibold"
                    >
                      Judul 2 (H2)
                    </button>
                    <button
                      onClick={() => {
                        onSetHeading("H3");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left text-xs font-semibold"
                    >
                      Judul 3 (H3)
                    </button>
                    <button
                      onClick={() => {
                        onSetHeading("BLOCKQUOTE");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left italic text-stone-600"
                    >
                      Kutipan Blok (Quote)
                    </button>
                  </div>
                )}
              </div>

              {/* Submenu: Alignment */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("align")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span>Perataan Teks</span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "align" && (
                  <div className="absolute left-full top-0 ml-0.5 w-44 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onExecuteCommand("justifyLeft");
                        closeMenu();
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <AlignLeft className="h-3.5 w-3.5" />
                      Rata Kiri
                    </button>
                    <button
                      onClick={() => {
                        onExecuteCommand("justifyCenter");
                        closeMenu();
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <AlignCenter className="h-3.5 w-3.5" />
                      Rata Tengah
                    </button>
                    <button
                      onClick={() => {
                        onExecuteCommand("justifyRight");
                        closeMenu();
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <AlignRight className="h-3.5 w-3.5" />
                      Rata Kanan
                    </button>
                    <button
                      onClick={() => {
                        onExecuteCommand("justifyFull");
                        closeMenu();
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      <AlignJustify className="h-3.5 w-3.5" />
                      Rata Kanan-Kiri
                    </button>
                  </div>
                )}
              </div>

              {/* Submenu: Spacing */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("spacing")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span>Jarak Baris (Spacing)</span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "spacing" && (
                  <div className="absolute left-full top-0 ml-0.5 w-44 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onSetLineSpacing("1.0");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Tunggal (1.0)
                    </button>
                    <button
                      onClick={() => {
                        onSetLineSpacing("1.15");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      1.15
                    </button>
                    <button
                      onClick={() => {
                        onSetLineSpacing("1.5");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      1.5
                    </button>
                    <button
                      onClick={() => {
                        onSetLineSpacing("2.0");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Ganda (2.0)
                    </button>
                  </div>
                )}
              </div>

              <div className="my-1 border-t border-stone-100" />

              {/* Lists */}
              <button
                onClick={() => {
                  onExecuteCommand("insertUnorderedList");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <List className="h-3.5 w-3.5 text-stone-500" />
                Daftar Poin (Bullets)
              </button>
              <button
                onClick={() => {
                  onExecuteCommand("insertOrderedList");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <ListOrdered className="h-3.5 w-3.5 text-stone-500" />
                Daftar Angka (Numbered)
              </button>
              <button
                onClick={() => {
                  onExecuteCommand("indent");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <Indent className="h-3.5 w-3.5 text-stone-500" />
                Tambah Indentasi
              </button>
              <button
                onClick={() => {
                  onExecuteCommand("outdent");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <Outdent className="h-3.5 w-3.5 text-stone-500" />
                Kurangi Indentasi
              </button>
            </div>
          )}
        </div>

        {/* ALAT (TOOLS) */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("tools")}
            className={`px-2.5 py-1 rounded-sm font-medium transition cursor-pointer ${
              activeMenu === "tools"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "hover:bg-stone-100 text-stone-700"
            }`}
          >
            Alat
          </button>

          {activeMenu === "tools" && (
            <div className="absolute left-0 top-full mt-0.5 w-60 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
              {/* Submenu: Asisten AI */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("aiTools")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-blue-50 text-left cursor-pointer text-blue-700 font-medium">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    Asisten Cerdas AI
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-blue-400" />
                </div>

                {activeSubmenu === "aiTools" && (
                  <div className="absolute left-full top-0 ml-0.5 w-56 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onOpenAIModal("fix_grammar");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Perbaiki Ejaan & Tata Bahasa
                    </button>
                    <button
                      onClick={() => {
                        onOpenAIModal("summarize");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Ringkas Isi Dokumen
                    </button>
                    <button
                      onClick={() => {
                        onOpenAIModal("expand");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Kembangkan & Elaborasi
                    </button>
                    <button
                      onClick={() => {
                        onOpenAIModal("formal_tone");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Ubah ke Nada Formal
                    </button>
                    <button
                      onClick={() => {
                        onOpenAIModal("translate");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Terjemahkan Bahasa...
                    </button>
                  </div>
                )}
              </div>

              {/* Submenu: Case converter */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("cases")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span>Ubah Huruf (Kapitalisasi)</span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "cases" && (
                  <div className="absolute left-full top-0 ml-0.5 w-48 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onTransformCase("upper");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left font-semibold"
                    >
                      HURUF BESAR (UPPERCASE)
                    </button>
                    <button
                      onClick={() => {
                        onTransformCase("lower");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left lowercase"
                    >
                      huruf kecil (lowercase)
                    </button>
                    <button
                      onClick={() => {
                        onTransformCase("title");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Huruf Judul (Title Case)
                    </button>
                    <button
                      onClick={() => {
                        onTransformCase("sentence");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Huruf Kalimat (Sentence case)
                    </button>
                    <button
                      onClick={() => {
                        onTransformCase("slug");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left text-stone-600 font-mono text-[11px]"
                    >
                      format-slug-url
                    </button>
                  </div>
                )}
              </div>

              {/* Submenu: Pembersih teks */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("cleaners")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <div className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left cursor-pointer">
                  <span>Pembersih Teks</span>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>

                {activeSubmenu === "cleaners" && (
                  <div className="absolute left-full top-0 ml-0.5 w-52 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onCleanText("spaces");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Hapus Spasi Ganda
                    </button>
                    <button
                      onClick={() => {
                        onCleanText("lines");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Rapikan Baris Kosong Berlebih
                    </button>
                    <button
                      onClick={() => {
                        onCleanText("quotes");
                        closeMenu();
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-stone-100 text-left"
                    >
                      Standarisasi Tanda Petik
                    </button>
                  </div>
                )}
              </div>

              <div className="my-1 border-t border-stone-100" />

              <button
                onClick={() => {
                  onOpenStats();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <BarChart2 className="h-3.5 w-3.5 text-stone-500" />
                  Analisis Teks & Keterbacaan...
                </span>
              </button>
            </div>
          )}
        </div>

        {/* TABEL (TABLE OPERATIONS) */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("table")}
            className={`px-2.5 py-1 rounded-sm font-medium transition cursor-pointer ${
              activeMenu === "table"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "hover:bg-stone-100 text-stone-700"
            }`}
          >
            Tabel
          </button>

          {activeMenu === "table" && (
            <div className="absolute left-0 top-full mt-0.5 w-56 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
              <button
                onClick={() => {
                  onTableAction("addRowAbove");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <Plus className="h-3.5 w-3.5 text-stone-500" />
                Sisipkan Baris Di Atas
              </button>
              <button
                onClick={() => {
                  onTableAction("addRowBelow");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <Plus className="h-3.5 w-3.5 text-stone-500" />
                Sisipkan Baris Di Bawah
              </button>
              <button
                onClick={() => {
                  onTableAction("deleteRow");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus Baris
              </button>

              <div className="my-1 border-t border-stone-100" />

              <button
                onClick={() => {
                  onTableAction("addColLeft");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <Plus className="h-3.5 w-3.5 text-stone-500" />
                Sisipkan Kolom Di Kiri
              </button>
              <button
                onClick={() => {
                  onTableAction("addColRight");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <Plus className="h-3.5 w-3.5 text-stone-500" />
                Sisipkan Kolom Di Kanan
              </button>
              <button
                onClick={() => {
                  onTableAction("deleteCol");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus Kolom
              </button>

              <div className="my-1 border-t border-stone-100" />

              <button
                onClick={() => {
                  onTableAction("deleteTable");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left text-red-600 font-semibold"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus Seluruh Tabel
              </button>
            </div>
          )}
        </div>

        {/* BANTUAN (HELP) */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("help")}
            className={`px-2.5 py-1 rounded-sm font-medium transition cursor-pointer ${
              activeMenu === "help"
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "hover:bg-stone-100 text-stone-700"
            }`}
          >
            Bantuan
          </button>

          {activeMenu === "help" && (
            <div className="absolute left-0 top-full mt-0.5 w-56 rounded-lg bg-white shadow-xl border border-stone-200 py-1.5 z-50">
              <button
                onClick={() => {
                  onOpenShortcuts();
                  closeMenu();
                }}
                className="w-full flex items-center justify-between px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-3.5 w-3.5 text-stone-500" />
                  Pintasan Keyboard
                </span>
                <kbd className="text-[10px] text-stone-400">Ctrl+/</kbd>
              </button>

              <button
                onClick={() => {
                  onChangeViewMode("split");
                  closeMenu();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 hover:bg-stone-100 text-left"
              >
                <BookOpen className="h-3.5 w-3.5 text-stone-500" />
                Pratinjau Markdown
              </button>

              <div className="my-1 border-t border-stone-100" />

              <div className="px-3.5 py-2 text-[11px] text-stone-500 bg-stone-50 rounded-b-lg">
                <p className="font-semibold text-stone-800">DocEditor Pro v2.4</p>
                <p className="mt-0.5">Desktop-grade document editor dengan menu lengkap bertingkat.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
