import React, { useState, useEffect, useRef, useCallback } from "react";
import { DeskopEditor } from "./deskop/DeskopEditor";
import { MobileEditor } from "./mobile/MobileEditor";

// Modals
import { StatisticsModal } from "./components/modals/StatisticsModal";
import { TableModal } from "./components/modals/TableModal";
import { ImageModal } from "./components/modals/ImageModal";
import { LinkModal } from "./components/modals/LinkModal";
import { ShortcutsModal } from "./components/modals/ShortcutsModal";
import { PageSetupModal } from "./components/modals/PageSetupModal";
import { SpecialCharModal } from "./components/modals/SpecialCharModal";
import { AIAssistantModal } from "./components/modals/AIAssistantModal";

import { initialDocuments } from "./data/sampleDocuments";
import { DocumentFile, ViewMode, EditorTheme, PageSetup, DocumentStats, DeviceMode } from "./types";
import { isMobileDevice, getDeviceInfo, listenDeviceChange } from "./utils/AutoDetect.js";
import {
  calculateDocumentStats,
  htmlToMarkdown,
  markdownToHtml,
  exportToFile,
  transformCase,
  cleanTextSpacing,
} from "./utils/editorUtils";

export function App() {
  // --- STATE: DEVICE MODE (MOBILE VS PC) ---
  const [deviceMode, setDeviceMode] = useState<DeviceMode>(() => {
    try {
      const saved = localStorage.getItem("doceditor_device_mode");
      if (saved === "mobile" || saved === "pc") return saved as DeviceMode;
    } catch (e) {
      console.error(e);
    }
    // Auto-detect based on AutoDetect.js
    return isMobileDevice() ? "mobile" : "pc";
  });

  // Switch device mode and remember preference
  const handleSwitchDeviceMode = (mode: DeviceMode) => {
    setDeviceMode(mode);
    try {
      localStorage.setItem("doceditor_device_mode", mode);
    } catch (e) {
      console.error(e);
    }
  };

  // Auto-adapt on window resize / orientation change using AutoDetect.js
  useEffect(() => {
    const unsubscribe = listenDeviceChange((info) => {
      try {
        const saved = localStorage.getItem("doceditor_device_mode");
        // Only auto-switch if user hasn't explicitly set preference or if viewport drastically shifted
        if (!saved) {
          setDeviceMode(info.deviceMode);
        }
      } catch (e) {
        console.error(e);
      }
    });
    return unsubscribe;
  }, []);

  // --- STATE: DOCUMENTS ---
  const [documents, setDocuments] = useState<DocumentFile[]>(() => {
    try {
      const saved = localStorage.getItem("doceditor_pro_docs");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialDocuments;
  });

  const [activeDocId, setActiveDocId] = useState<string>(() => {
    return documents[0]?.id || "doc-1";
  });

  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];

  // --- STATE: VIEW & THEME ---
  const [viewMode, setViewMode] = useState<ViewMode>("page");
  const [theme, setTheme] = useState<EditorTheme>("clean-light");
  const [zoom, setZoom] = useState<number>(100);
  const [showRuler, setShowRuler] = useState<boolean>(true);
  const [showOutline, setShowOutline] = useState<boolean>(true);
  const [showStatusBar, setShowStatusBar] = useState<boolean>(true);
  const [isZenMode, setIsZenMode] = useState<boolean>(false);

  const [pageSetup, setPageSetup] = useState<PageSetup>({
    paperSize: "A4",
    orientation: "portrait",
    margins: { top: 25, bottom: 25, left: 25, right: 25 },
    showPageNumbers: true,
  });

  // --- STATE: MODALS & OVERLAYS ---
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isPageSetupOpen, setIsPageSetupOpen] = useState(false);
  const [isSpecialCharOpen, setIsSpecialCharOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiAction, setAIAction] = useState<string>("fix_grammar");
  const [isFindReplaceOpen, setIsFindReplaceOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // --- REFS ---
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- DERIVED METRICS ---
  const [stats, setStats] = useState<DocumentStats>({
    wordCount: 0,
    charCount: 0,
    charNoSpaces: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    readingTimeMinutes: 0,
    speakingTimeMinutes: 0,
    fleschGrade: "Tingkat Menengah",
  });

  // Calculate stats when content updates
  const updateStats = useCallback((content: string) => {
    const calculated = calculateDocumentStats(content);
    setStats(calculated);
  }, []);

  // Update content of active document
  const handleContentInput = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    updateStats(html);

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeDocId
          ? {
              ...doc,
              content: html,
              wordCount: calculateDocumentStats(html).words,
              updatedAt: new Date().toISOString(),
            }
          : doc
      )
    );
  }, [activeDocId, updateStats]);

  // Sync editor innerHTML when active document changes or switching mobile/pc mode
  useEffect(() => {
    if (editorRef.current && activeDoc) {
      if (editorRef.current.innerHTML !== activeDoc.content) {
        editorRef.current.innerHTML = activeDoc.content;
      }
      updateStats(activeDoc.content);
    }
  }, [activeDocId, activeDoc, deviceMode, updateStats]);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("doceditor_pro_docs", JSON.stringify(documents));
    } catch (e) {
      console.error(e);
    }
  }, [documents]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S / Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
      // Ctrl+P / Cmd+P
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        window.print();
      }
      // Ctrl+F / Cmd+F
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setIsFindReplaceOpen((prev) => !prev);
      }
      // Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsLinkModalOpen(true);
      }
      // Ctrl+/
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setIsShortcutsOpen(true);
      }
      // Esc
      if (e.key === "Escape") {
        setIsFindReplaceOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- ACTIONS ---

  const handleSave = () => {
    try {
      localStorage.setItem("doceditor_pro_docs", JSON.stringify(documents));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRenameTitle = (newTitle: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeDocId ? { ...doc, title: newTitle } : doc
      )
    );
  };

  const handleNewDocument = (template?: string) => {
    let title = "Dokumen Baru Tanpa Judul";
    let content = "<h1>Dokumen Baru</h1><p>Mulai menulis ide dan catatan profesional Anda di sini...</p>";

    if (template === "research") {
      title = "Catatan Riset Baru";
      content = "<h1>Catatan Riset & Metodologi</h1><p>Tuliskan hipotesis dan tinjauan pustaka di sini.</p>";
    }

    const newDoc: DocumentFile = {
      id: `doc-${Date.now()}`,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wordCount: 15,
    };

    setDocuments((prev) => [...prev, newDoc]);
    setActiveDocId(newDoc.id);
  };

  const handleCloseDocument = (id: string) => {
    if (documents.length <= 1) return;
    const filtered = documents.filter((d) => d.id !== id);
    setDocuments(filtered);
    if (activeDocId === id) {
      setActiveDocId(filtered[0].id);
    }
  };

  const handleDeleteDocument = (id: string) => {
    handleCloseDocument(id);
  };

  const handleTogglePinDocument = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, pinned: !d.pinned } : d))
    );
  };

  // Import File (.md, .txt, .html, .json)
  const handleTriggerImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileImported = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) return;

      let content = result;
      let title = file.name.replace(/\.[^/.]+$/, "");

      if (file.name.endsWith(".json")) {
        try {
          const parsed = JSON.parse(result);
          if (parsed.content) content = parsed.content;
          if (parsed.title) title = parsed.title;
        } catch (err) {
          console.error(err);
        }
      } else if (file.name.endsWith(".md")) {
        content = markdownToHtml(result);
      } else if (file.name.endsWith(".txt")) {
        content = `<p>${result.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>")}</p>`;
      }

      const importedDoc: DocumentFile = {
        id: `doc-${Date.now()}`,
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        wordCount: calculateDocumentStats(content).words,
      };

      setDocuments((prev) => [...prev, importedDoc]);
      setActiveDocId(importedDoc.id);
    };

    reader.readAsText(file);
  };

  // Export File
  const handleExport = (format: "pdf" | "md" | "html" | "txt" | "json") => {
    if (!activeDoc) return;

    if (format === "pdf") {
      window.print();
      return;
    }

    if (format === "md") {
      const md = htmlToMarkdown(activeDoc.content);
      exportToFile(md, `${activeDoc.title}.md`, "text/markdown;charset=utf-8;");
      return;
    }

    if (format === "html") {
      const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${activeDoc.title}</title>
  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1e293b; }
    h1, h2, h3 { color: #0f172a; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 12px; }
    th { background: #f8fafc; font-weight: bold; }
    blockquote { border-left: 4px solid #3b82f6; padding-left: 16px; color: #475569; font-style: italic; }
    pre { background: #0f172a; color: #f8fafc; padding: 16px; border-radius: 8px; overflow-x: auto; }
  </style>
</head>
<body>
  ${activeDoc.content}
</body>
</html>`;
      exportToFile(fullHtml, `${activeDoc.title}.html`, "text/html;charset=utf-8;");
      return;
    }

    if (format === "txt") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = activeDoc.content;
      const plainText = tempDiv.innerText || tempDiv.textContent || "";
      exportToFile(plainText, `${activeDoc.title}.txt`, "text/plain;charset=utf-8;");
      return;
    }

    if (format === "json") {
      exportToFile(JSON.stringify(activeDoc, null, 2), `${activeDoc.title}.json`, "application/json;charset=utf-8;");
      return;
    }
  };

  // --- EDITOR COMMANDS ---

  const executeCommand = (cmd: string, val: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(cmd, false, val);
    handleContentInput();
  };

  const handleSetHeading = (tag: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    if (tag === "P") {
      document.execCommand("formatBlock", false, "<p>");
    } else if (tag === "BLOCKQUOTE") {
      document.execCommand("formatBlock", false, "<blockquote>");
    } else {
      document.execCommand("formatBlock", false, `<${tag.toLowerCase()}>`);
    }
    handleContentInput();
  };

  const handleSetLineSpacing = (spacing: string) => {
    if (!editorRef.current) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    let node: Node | null = selection.anchorNode;
    while (node && node !== editorRef.current && node.nodeType !== Node.ELEMENT_NODE) {
      node = node.parentNode;
    }

    if (node && node !== editorRef.current) {
      (node as HTMLElement).style.lineHeight = spacing;
      handleContentInput();
    }
  };

  const handleSetTextColor = (color: string) => {
    executeCommand("foreColor", color);
  };

  const handleSetHighlightColor = (color: string) => {
    executeCommand("hiliteColor", color);
  };

  // Inserters
  const handleInsertTable = (rows: number, cols: number, hasHeader: boolean = true) => {
    let tableHtml = '<table class="editor-table">';
    if (hasHeader) {
      tableHtml += "<thead><tr>";
      for (let c = 0; c < cols; c++) {
        tableHtml += `<th>Kolom ${c + 1}</th>`;
      }
      tableHtml += "</tr></thead>";
    }
    tableHtml += "<tbody>";
    const bodyRows = hasHeader ? rows - 1 : rows;
    for (let r = 0; r < Math.max(1, bodyRows); r++) {
      tableHtml += "<tr>";
      for (let c = 0; c < cols; c++) {
        tableHtml += "<td>Data</td>";
      }
      tableHtml += "</tr>";
    }
    tableHtml += "</tbody></table><p><br/></p>";

    executeCommand("insertHTML", tableHtml);
  };

  const handleInsertImage = (data: { url: string; alt?: string; caption?: string; width?: string }) => {
    const imgHtml = `
      <figure class="my-4 text-center">
        <img src="${data.url}" alt="${data.alt || 'Gambar'}" style="max-width: ${data.width || '100%'}; height: auto; border-radius: 8px; margin: 0 auto; display: inline-block;" />
        ${data.caption ? `<figcaption class="text-xs text-stone-500 mt-1 italic">${data.caption}</figcaption>` : ""}
      </figure>
      <p><br/></p>
    `;
    executeCommand("insertHTML", imgHtml);
  };

  const handleInsertLink = (data: { text: string; url: string; openNewTab?: boolean }) => {
    const target = data.openNewTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    const linkHtml = `<a href="${data.url}"${target} class="text-blue-600 underline font-medium hover:text-blue-800">${data.text || data.url}</a>`;
    executeCommand("insertHTML", linkHtml);
  };

  const handleInsertCallout = (type: "info" | "warning" | "success" | "note") => {
    const typeClasses = {
      info: "callout-info",
      warning: "callout-warning",
      success: "callout-success",
      note: "callout-note",
    }[type];

    const typeIcons = {
      info: "ℹ️",
      warning: "⚠️",
      success: "✅",
      note: "📝",
    }[type];

    const calloutHtml = `
      <div class="editor-callout ${typeClasses}">
        <span class="callout-icon">${typeIcons}</span>
        <div class="callout-body">
          <p><strong>Catatan Penting:</strong> Tambahkan penjelasan atau instruksi penting Anda di sini.</p>
        </div>
      </div>
      <p><br/></p>
    `;
    executeCommand("insertHTML", calloutHtml);
  };

  const handleInsertCodeBlock = (lang: string) => {
    const codeHtml = `
      <pre class="editor-code-block" data-language="${lang}"><code>// Kode ${lang}
function example() {
  console.log("Halo dari ${lang}!");
}</code></pre>
      <p><br/></p>
    `;
    executeCommand("insertHTML", codeHtml);
  };

  const handleInsertSpecialChar = (char: string) => {
    executeCommand("insertText", char);
  };

  const handleInsertChecklist = () => {
    const checklistHtml = `
      <ul class="editor-checklist">
        <li><input type="checkbox" /> Tugas yang harus diselesaikan</li>
        <li><input type="checkbox" /> Langkah tindak lanjut berikutnya</li>
      </ul>
      <p><br/></p>
    `;
    executeCommand("insertHTML", checklistHtml);
  };

  const handleInsertDateTime = () => {
    const now = new Date();
    const formatted = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    executeCommand("insertText", formatted);
  };

  const handleInsertPageBreak = () => {
    const pbHtml = '<div class="page-break" style="page-break-after: always; border-top: 1px dashed #94a3b8; margin: 24px 0; padding-top: 4px; text-align: right; font-size: 10px; color: #94a3b8;">[ Pemisah Halaman ]</div><p><br/></p>';
    executeCommand("insertHTML", pbHtml);
  };

  // Text tools
  const handleTransformCase = (type: "upper" | "lower" | "title" | "sentence" | "slug") => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    const selectedText = selection.toString();
    const transformed = transformCase(selectedText, type);
    executeCommand("insertText", transformed);
  };

  const handleCleanText = (action: "spaces" | "lines" | "quotes") => {
    if (!editorRef.current) return;
    let html = editorRef.current.innerHTML;

    if (action === "spaces") {
      html = cleanTextSpacing(html);
    } else if (action === "lines") {
      html = html.replace(/(<p><br\/?><\/p>\s*){2,}/gi, "<p><br/></p>");
    } else if (action === "quotes") {
      html = html.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    }

    editorRef.current.innerHTML = html;
    handleContentInput();
  };

  // Table operations
  const handleTableAction = (action: "addRowAbove" | "addRowBelow" | "deleteRow" | "addColLeft" | "addColRight" | "deleteCol" | "deleteTable") => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    let cell = selection.anchorNode as HTMLElement | null;
    while (cell && cell.tagName !== "TD" && cell.tagName !== "TH") {
      cell = cell.parentElement;
    }
    if (!cell) {
      alert("Silakan letakkan kursor di dalam sel tabel terlebih dahulu.");
      return;
    }

    const row = cell.parentElement as HTMLTableRowElement;
    const table = row.parentElement?.parentElement as HTMLTableElement || row.parentElement as HTMLTableElement;
    if (!table) return;

    const cellIndex = (cell as HTMLTableCellElement).cellIndex;
    const rowIndex = row.rowIndex;

    if (action === "addRowAbove") {
      const newRow = table.insertRow(rowIndex);
      for (let i = 0; i < row.cells.length; i++) {
        const newCell = newRow.insertCell(i);
        newCell.innerHTML = "Baris baru";
      }
    } else if (action === "addRowBelow") {
      const newRow = table.insertRow(rowIndex + 1);
      for (let i = 0; i < row.cells.length; i++) {
        const newCell = newRow.insertCell(i);
        newCell.innerHTML = "Baris baru";
      }
    } else if (action === "deleteRow") {
      table.deleteRow(rowIndex);
    } else if (action === "addColLeft") {
      Array.from(table.rows).forEach((r) => {
        const newCell = r.insertCell(cellIndex);
        newCell.innerHTML = "Kolom baru";
      });
    } else if (action === "addColRight") {
      Array.from(table.rows).forEach((r) => {
        const newCell = r.insertCell(cellIndex + 1);
        newCell.innerHTML = "Kolom baru";
      });
    } else if (action === "deleteCol") {
      Array.from(table.rows).forEach((r) => {
        if (r.cells[cellIndex]) {
          r.deleteCell(cellIndex);
        }
      });
    } else if (action === "deleteTable") {
      table.remove();
    }

    handleContentInput();
  };

  // AI Assistant trigger
  const handleOpenAIModal = (action: string = "fix_grammar") => {
    setAIAction(action);
    setIsAIOpen(true);
  };

  const handleApplyAIResult = (newText: string) => {
    executeCommand("insertText", newText);
  };

  // Theme Styles
  const themeClasses = {
    "clean-light": "bg-white text-stone-900",
    "sepia": "bg-[#fbf7ee] text-[#433422]",
    "obsidian": "bg-[#18181b] text-[#f4f4f5]",
    "mint": "bg-[#f2f9f6] text-[#133e2f]",
  }[theme];

  const canvasBackgroundClasses = {
    "clean-light": "bg-stone-200/70",
    "sepia": "bg-[#e8decb]",
    "obsidian": "bg-[#09090b]",
    "mint": "bg-[#d8ece4]",
  }[theme];

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${themeClasses}`}>
      {/* Hidden File Input for Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImported}
        accept=".txt,.md,.html,.json"
        className="hidden"
      />

      {/* Floating Save Notification Toast */}
      {saveToast && (
        <div className="fixed bottom-12 right-6 z-50 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <span>✓ Dokumen berhasil disimpan!</span>
        </div>
      )}

      {/* CONDITIONAL SEPARATION: MOBILE EDITOR VS PC DESKTOP EDITOR */}
      {deviceMode === "mobile" ? (
        <MobileEditor
          activeDoc={activeDoc}
          documents={documents}
          activeDocId={activeDocId}
          onSelectDoc={setActiveDocId}
          onNewDoc={handleNewDocument}
          onDeleteDoc={handleDeleteDocument}
          onRenameDoc={handleRenameTitle}
          onTogglePinDoc={handleTogglePinDocument}
          editorRef={editorRef}
          onContentInput={handleContentInput}
          executeCommand={executeCommand}
          stats={stats}
          theme={theme}
          onChangeTheme={setTheme}
          onSwitchToPC={() => handleSwitchDeviceMode("pc")}
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenAIModal={handleOpenAIModal}
          onOpenFindReplace={() => setIsFindReplaceOpen(true)}
          onExport={(fmt) => handleExport(fmt === "markdown" ? "md" : fmt)}
          onImportFile={handleTriggerImport}
          onInsertTable={handleInsertTable}
          onOpenImageModal={() => setIsImageModalOpen(true)}
          onOpenLinkModal={() => setIsLinkModalOpen(true)}
          onInsertCallout={handleInsertCallout}
          onInsertCodeBlock={handleInsertCodeBlock}
          onInsertChecklist={handleInsertChecklist}
          onInsertDateTime={handleInsertDateTime}
          onInsertPageBreak={handleInsertPageBreak}
          onSetHeading={handleSetHeading}
          onSetTextColor={handleSetTextColor}
          onSetHighlightColor={handleSetHighlightColor}
          onSetLineSpacing={handleSetLineSpacing}
        />
      ) : (
        <DeskopEditor
          activeDoc={activeDoc}
          documents={documents}
          activeDocId={activeDocId}
          onSelectDoc={setActiveDocId}
          onNewDoc={handleNewDocument}
          onCloseDoc={handleCloseDocument}
          onDeleteDoc={handleDeleteDocument}
          onRenameDoc={handleRenameTitle}
          onTogglePinDoc={handleTogglePinDocument}
          editorRef={editorRef}
          onContentInput={handleContentInput}
          executeCommand={executeCommand}
          stats={stats}
          theme={theme}
          onChangeTheme={setTheme}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
          zoom={zoom}
          onChangeZoom={setZoom}
          showRuler={showRuler}
          onToggleRuler={() => setShowRuler((prev) => !prev)}
          showOutline={showOutline}
          onToggleOutline={() => setShowOutline((prev) => !prev)}
          showStatusBar={showStatusBar}
          onToggleStatusBar={() => setShowStatusBar((prev) => !prev)}
          isZenMode={isZenMode}
          onToggleZenMode={() => setIsZenMode((prev) => !prev)}
          pageSetup={pageSetup}
          onOpenPageSetup={() => setIsPageSetupOpen(true)}
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenTableModal={() => setIsTableModalOpen(true)}
          onOpenImageModal={() => setIsImageModalOpen(true)}
          onOpenLinkModal={() => setIsLinkModalOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          onOpenSpecialChar={() => setIsSpecialCharOpen(true)}
          onOpenAIModal={handleOpenAIModal}
          isFindReplaceOpen={isFindReplaceOpen}
          onCloseFindReplace={() => setIsFindReplaceOpen(false)}
          onToggleFindReplace={() => setIsFindReplaceOpen((prev) => !prev)}
          onSave={handleSave}
          onImportFile={handleTriggerImport}
          onExport={handleExport}
          onInsertTable={handleInsertTable}
          onInsertCallout={handleInsertCallout}
          onInsertCodeBlock={handleInsertCodeBlock}
          onInsertChecklist={handleInsertChecklist}
          onInsertDateTime={handleInsertDateTime}
          onInsertPageBreak={handleInsertPageBreak}
          onSetHeading={handleSetHeading}
          onSetLineSpacing={handleSetLineSpacing}
          onSetTextColor={handleSetTextColor}
          onSetHighlightColor={handleSetHighlightColor}
          onTransformCase={handleTransformCase}
          onCleanText={handleCleanText}
          onTableAction={handleTableAction}
          onSwitchToMobile={() => handleSwitchDeviceMode("mobile")}
          setDocuments={setDocuments}
          updateStats={updateStats}
        />
      )}

      {/* --- MODALS --- */}
      <StatisticsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
      />

      <TableModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        onInsertTable={handleInsertTable}
      />

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onInsertImage={handleInsertImage}
      />

      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onInsertLink={handleInsertLink}
        initialText={window.getSelection()?.toString() || ""}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <PageSetupModal
        isOpen={isPageSetupOpen}
        onClose={() => setIsPageSetupOpen(false)}
        pageSetup={pageSetup}
        onSave={setPageSetup}
      />

      <SpecialCharModal
        isOpen={isSpecialCharOpen}
        onClose={() => setIsSpecialCharOpen(false)}
        onInsertChar={handleInsertSpecialChar}
      />

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        selectedText={window.getSelection()?.toString() || activeDoc.content.replace(/<[^>]+>/g, " ").slice(0, 1000)}
        onApplyResult={handleApplyAIResult}
        initialAction={aiAction}
      />
    </div>
  );
}

export default App;
