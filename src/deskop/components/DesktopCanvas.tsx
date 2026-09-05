import React from "react";
import { DocumentFile, ViewMode, EditorTheme, PageSetup } from "../../types";
import { htmlToMarkdown, markdownToHtml } from "../../utils/editorUtils";
import { Ruler } from "../../components/Ruler";

interface DesktopCanvasProps {
  activeDoc: DocumentFile;
  activeDocId: string;
  editorRef: React.RefObject<HTMLDivElement | null>;
  onContentInput: () => void;
  viewMode: ViewMode;
  theme: EditorTheme;
  zoom: number;
  showRuler: boolean;
  isZenMode: boolean;
  pageSetup: PageSetup;
  setDocuments: React.Dispatch<React.SetStateAction<DocumentFile[]>>;
  updateStats: (content: string) => void;
}

export const DesktopCanvas: React.FC<DesktopCanvasProps> = ({
  activeDoc,
  activeDocId,
  editorRef,
  onContentInput,
  viewMode,
  theme,
  zoom,
  showRuler,
  isZenMode,
  pageSetup,
  setDocuments,
  updateStats,
}) => {
  const canvasBackgroundClasses = {
    obsidian: "bg-[#09090b] text-stone-100",
    sepia: "bg-[#f4efe4] text-[#3d2f1f]",
    mint: "bg-[#eaf4ef] text-[#12382a]",
    "clean-light": "bg-[#e2e8f0]/60 text-stone-900",
  }[theme];

  return (
    <main
      className={`flex-1 overflow-y-auto flex flex-col items-center p-4 sm:p-8 transition-colors duration-200 relative ${canvasBackgroundClasses}`}
    >
      {/* Document Ruler */}
      {showRuler && viewMode === "page" && !isZenMode && (
        <div
          className="mb-4 shadow-xs rounded-sm overflow-hidden"
          style={{
            width: pageSetup.orientation === "landscape" ? "1056px" : "816px",
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          <Ruler width={pageSetup.orientation === "landscape" ? 1056 : 816} />
        </div>
      )}

      {/* VIEW MODE: SPLIT VIEW */}
      {viewMode === "split" ? (
        <div className="w-full max-w-7xl h-full grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
          {/* Rich Visual Editor Pane */}
          <div className="flex flex-col bg-white rounded-xl shadow-lg border border-stone-300/80 overflow-hidden">
            <div className="bg-stone-100 px-4 py-2 border-b border-stone-200 text-xs font-semibold text-stone-700 flex justify-between items-center">
              <span>Pratinjau Visual (WYSIWYG)</span>
              <span className="text-[10px] text-stone-400">Dapat diedit langsung</span>
            </div>
            <div
              id="editor-canvas-container"
              ref={editorRef}
              contentEditable
              onInput={onContentInput}
              className="editor-content flex-1 p-6 overflow-y-auto outline-hidden focus:ring-0 leading-relaxed font-sans"
              style={{ minHeight: "500px" }}
            />
          </div>

          {/* Raw Markdown Source Pane */}
          <div className="flex flex-col bg-stone-900 rounded-xl shadow-lg border border-stone-800 overflow-hidden">
            <div className="bg-stone-800 px-4 py-2 border-b border-stone-700 text-xs font-semibold text-stone-300 flex justify-between items-center">
              <span>Kode Sumber Markdown (.md)</span>
              <span className="text-[10px] text-stone-500">Sinkron Otomatis</span>
            </div>
            <textarea
              readOnly
              value={htmlToMarkdown(activeDoc.content)}
              className="flex-1 p-6 bg-stone-900 text-stone-200 font-mono text-xs leading-relaxed outline-hidden resize-none overflow-y-auto"
            />
          </div>
        </div>
      ) : viewMode === "markdown" ? (
        /* VIEW MODE: RAW MARKDOWN EDITOR ONLY */
        <div className="w-full max-w-4xl bg-stone-900 rounded-xl shadow-2xl border border-stone-800 overflow-hidden flex flex-col">
          <div className="bg-stone-800 px-4 py-2 border-b border-stone-700 text-xs font-semibold text-stone-300">
            Mode Editor Markdown
          </div>
          <textarea
            value={htmlToMarkdown(activeDoc.content)}
            onChange={(e) => {
              const newHtml = markdownToHtml(e.target.value);
              setDocuments((prev) =>
                prev.map((d) => (d.id === activeDocId ? { ...d, content: newHtml } : d))
              );
              if (editorRef.current) {
                editorRef.current.innerHTML = newHtml;
              }
              updateStats(newHtml);
            }}
            className="w-full h-[700px] p-8 bg-stone-900 text-stone-100 font-mono text-sm leading-relaxed outline-hidden resize-none"
            placeholder="# Ketikkan format markdown di sini..."
          />
        </div>
      ) : (
        /* VIEW MODE: PAGE (A4 SHEET) OR CONTINUOUS CANVAS */
        <div className="w-full flex-1 flex justify-center overflow-x-auto py-2">
          <div
            className="transition-transform duration-100 shrink-0"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            <div
              id="editor-canvas-container"
              ref={editorRef}
              contentEditable
              onInput={onContentInput}
              spellCheck={true}
              className={`editor-content rounded-sm shadow-xl border focus:outline-hidden transition-all duration-200 ${
                viewMode === "page"
                  ? pageSetup.orientation === "landscape"
                    ? "w-[1056px] min-h-[816px] p-16 my-4"
                    : "w-[816px] min-h-[1056px] p-16 my-4"
                  : "w-[900px] max-w-[95vw] min-h-[800px] p-8 sm:p-12 my-2 rounded-xl"
              } ${
                theme === "obsidian"
                  ? "bg-[#18181b] border-stone-700 text-stone-100 shadow-stone-950"
                  : theme === "sepia"
                  ? "bg-[#fcf9f2] border-[#e2d7c0] text-[#3d2f1f] shadow-stone-400/30"
                  : theme === "mint"
                  ? "bg-[#f7fbf9] border-[#cfe2d8] text-[#12382a] shadow-emerald-950/10"
                  : "bg-white border-stone-300/80 text-stone-900 shadow-stone-400/20"
              }`}
              style={{
                paddingTop: `${(pageSetup.margins?.top ?? 25) * 1.5}px`,
                paddingBottom: `${(pageSetup.margins?.bottom ?? 25) * 1.5}px`,
                paddingLeft: `${(pageSetup.margins?.left ?? 25) * 1.5}px`,
                paddingRight: `${(pageSetup.margins?.right ?? 25) * 1.5}px`,
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
};
