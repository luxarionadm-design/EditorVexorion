import React from "react";
import { DesktopMenuBar } from "./components/DesktopMenuBar";
import { DesktopToolbar } from "./components/DesktopToolbar";
import { DesktopDocumentTabs } from "./components/DesktopDocumentTabs";
import { DesktopOutline } from "./components/DesktopOutline";
import { DesktopStatusBar } from "./components/DesktopStatusBar";
import { DesktopCanvas } from "./components/DesktopCanvas";
import { DesktopFloatingMenu } from "./components/DesktopFloatingMenu";
import { DesktopFindReplace } from "./components/DesktopFindReplace";
import { DocumentFile, ViewMode, EditorTheme, PageSetup, DocumentStats } from "../types";
import {
  useDesktopShortcuts,
  handleDesktopExport,
  applyDesktopCaseTransform,
  applyDesktopTextClean,
  executeDesktopTableAction,
} from "./features";

export interface DeskopEditorProps {
  activeDoc: DocumentFile;
  documents: DocumentFile[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onNewDoc: (template?: string) => void;
  onCloseDoc: (id: string) => void;
  onDeleteDoc: (id: string) => void;
  onRenameDoc: (newTitle: string) => void;
  onTogglePinDoc: (id: string) => void;
  editorRef: React.RefObject<HTMLDivElement | null>;
  onContentInput: () => void;
  executeCommand: (command: string, value?: string) => void;
  stats: DocumentStats;
  theme: EditorTheme;
  onChangeTheme: (theme: EditorTheme) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
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
  pageSetup: PageSetup;
  onOpenPageSetup: () => void;
  onOpenStats: () => void;
  onOpenTableModal: () => void;
  onOpenImageModal: () => void;
  onOpenLinkModal: () => void;
  onOpenShortcuts: () => void;
  onOpenSpecialChar: () => void;
  onOpenAIModal: (action?: string) => void;
  isFindReplaceOpen: boolean;
  onCloseFindReplace: () => void;
  onToggleFindReplace: () => void;
  onSave: () => void;
  onImportFile: () => void;
  onExport: (format: "pdf" | "md" | "html" | "txt" | "json") => void;
  onInsertTable: (rows: number, cols: number, hasHeader?: boolean) => void;
  onInsertCallout: (type: "info" | "warning" | "success" | "note") => void;
  onInsertCodeBlock: (lang: string) => void;
  onInsertChecklist: () => void;
  onInsertDateTime: () => void;
  onInsertPageBreak: () => void;
  onSetHeading: (tag: string) => void;
  onSetLineSpacing: (spacing: string) => void;
  onSetTextColor: (color: string) => void;
  onSetHighlightColor: (color: string) => void;
  onTransformCase: (type: "upper" | "lower" | "title" | "sentence" | "slug") => void;
  onCleanText: (action: "spaces" | "lines" | "quotes") => void;
  onTableAction: (action: "addRowAbove" | "addRowBelow" | "deleteRow" | "addColLeft" | "addColRight" | "deleteCol" | "deleteTable") => void;
  onSwitchToMobile: () => void;
  setDocuments: React.Dispatch<React.SetStateAction<DocumentFile[]>>;
  updateStats: (content: string) => void;
}

export function DeskopEditor({
  activeDoc,
  documents,
  activeDocId,
  onSelectDoc,
  onNewDoc,
  onCloseDoc,
  onDeleteDoc,
  onRenameDoc,
  onTogglePinDoc,
  editorRef,
  onContentInput,
  executeCommand,
  stats,
  theme,
  onChangeTheme,
  viewMode,
  onChangeViewMode,
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
  pageSetup,
  onOpenPageSetup,
  onOpenStats,
  onOpenTableModal,
  onOpenImageModal,
  onOpenLinkModal,
  onOpenShortcuts,
  onOpenSpecialChar,
  onOpenAIModal,
  isFindReplaceOpen,
  onCloseFindReplace,
  onToggleFindReplace,
  onSave,
  onImportFile,
  onExport,
  onInsertTable,
  onInsertCallout,
  onInsertCodeBlock,
  onInsertChecklist,
  onInsertDateTime,
  onInsertPageBreak,
  onSetHeading,
  onSetLineSpacing,
  onSetTextColor,
  onSetHighlightColor,
  onTransformCase,
  onCleanText,
  onTableAction,
  onSwitchToMobile,
  setDocuments,
  updateStats,
}: DeskopEditorProps) {
  // 1. Modular Desktop Shortcuts Hook
  useDesktopShortcuts({
    onSave,
    onPrint: () => window.print(),
    onFindReplace: onToggleFindReplace,
    onUndo: () => executeCommand("undo"),
    onRedo: () => executeCommand("redo"),
    onZenModeToggle: onToggleZenMode,
  });

  // Handle export delegation
  const handleExport = (format: "pdf" | "md" | "html" | "txt" | "json") => {
    if (onExport) {
      onExport(format);
    } else {
      handleDesktopExport(activeDoc, format, pageSetup);
    }
  };

  // Handle case transform delegation
  const handleTransformCase = (type: "upper" | "lower" | "title" | "sentence" | "slug") => {
    if (onTransformCase) {
      onTransformCase(type);
    } else {
      applyDesktopCaseTransform(type, editorRef, onContentInput);
    }
  };

  // Handle text clean delegation
  const handleCleanText = (action: "spaces" | "lines" | "quotes") => {
    if (onCleanText) {
      onCleanText(action);
    } else {
      applyDesktopTextClean(action, editorRef, onContentInput);
    }
  };

  // Handle table actions delegation
  const handleTableAction = (
    action: "addRowAbove" | "addRowBelow" | "deleteRow" | "addColLeft" | "addColRight" | "deleteCol" | "deleteTable"
  ) => {
    if (onTableAction) {
      onTableAction(action);
    } else {
      executeDesktopTableAction(action, editorRef, onContentInput);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white select-none">
      {/* 1. TOP DESKTOP MENU BAR WITH CASCADING SUBMENUS */}
      {!isZenMode && (
        <DesktopMenuBar
          documentTitle={activeDoc.title}
          onRenameTitle={onRenameDoc}
          onNewDocument={onNewDoc}
          onImportFile={onImportFile}
          onSave={onSave}
          onExport={handleExport}
          onOpenPageSetup={onOpenPageSetup}
          onPrint={() => window.print()}
          // Edit
          onUndo={() => executeCommand("undo")}
          onRedo={() => executeCommand("redo")}
          onExecuteCommand={executeCommand}
          onFindReplace={onToggleFindReplace}
          onOpenStats={onOpenStats}
          // View
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
          theme={theme}
          onChangeTheme={onChangeTheme}
          zoom={zoom}
          onChangeZoom={onChangeZoom}
          showRuler={showRuler}
          onToggleRuler={onToggleRuler}
          showOutline={showOutline}
          onToggleOutline={onToggleOutline}
          showStatusBar={showStatusBar}
          onToggleStatusBar={onToggleStatusBar}
          isZenMode={isZenMode}
          onToggleZenMode={onToggleZenMode}
          // Insert
          onOpenTableModal={onOpenTableModal}
          onQuickInsertTable={(rows, cols) => onInsertTable(rows, cols, true)}
          onOpenImageModal={onOpenImageModal}
          onOpenLinkModal={onOpenLinkModal}
          onInsertCallout={onInsertCallout}
          onInsertCodeBlock={onInsertCodeBlock}
          onOpenSpecialCharModal={onOpenSpecialChar}
          onInsertChecklist={onInsertChecklist}
          onInsertDateTime={onInsertDateTime}
          onInsertPageBreak={onInsertPageBreak}
          // Format
          onSetHeading={onSetHeading}
          onSetLineSpacing={onSetLineSpacing}
          onSetTextColor={onSetTextColor}
          onSetHighlightColor={onSetHighlightColor}
          // Tools
          onOpenAIModal={onOpenAIModal}
          onTransformCase={handleTransformCase}
          onCleanText={handleCleanText}
          // Table
          onTableAction={handleTableAction}
          // Help
          onOpenShortcuts={onOpenShortcuts}
          onSwitchToMobile={onSwitchToMobile}
        />
      )}

      {/* 2. QUICK ACTION RIBBON TOOLBAR */}
      {!isZenMode && (
        <DesktopToolbar
          onUndo={() => executeCommand("undo")}
          onRedo={() => executeCommand("redo")}
          onPrint={() => window.print()}
          onExecuteCommand={executeCommand}
          onSetHeading={onSetHeading}
          onSetLineSpacing={onSetLineSpacing}
          onSetTextColor={onSetTextColor}
          onSetHighlightColor={onSetHighlightColor}
          onOpenTableModal={onOpenTableModal}
          onOpenImageModal={onOpenImageModal}
          onOpenLinkModal={onOpenLinkModal}
          onInsertCallout={onInsertCallout}
          onInsertCodeBlock={onInsertCodeBlock}
          onInsertChecklist={onInsertChecklist}
          onToggleFindReplace={onToggleFindReplace}
          onOpenAIModal={onOpenAIModal}
        />
      )}

      {/* 3. OPEN DOCUMENTS TAB STRIP */}
      {!isZenMode && (
        <DesktopDocumentTabs
          documents={documents}
          activeDocId={activeDocId}
          onSelectDoc={onSelectDoc}
          onNewDoc={() => onNewDoc()}
          onCloseDoc={onCloseDoc}
          onTogglePinDoc={onTogglePinDoc}
          wordCount={stats.words}
        />
      )}

      {/* 4. MAIN DESKTOP WORKSPACE (SIDEBAR + STAGE CANVAS) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Outline Sidebar */}
        {!isZenMode && showOutline && (
          <DesktopOutline
            isOpen={showOutline}
            onToggle={() => onToggleOutline()}
            onClose={() => onToggleOutline()}
            editorContent={activeDoc.content}
            documents={documents}
            activeDocId={activeDocId}
            onSelectDoc={onSelectDoc}
            onNewDoc={() => onNewDoc()}
            onDeleteDoc={onDeleteDoc}
            onRestoreSnapshot={(content) => {
              if (editorRef.current) {
                editorRef.current.innerHTML = content;
                onContentInput();
              }
            }}
          />
        )}

        {/* Find & Replace Bar */}
        <DesktopFindReplace
          isOpen={isFindReplaceOpen}
          onClose={onCloseFindReplace}
          editorRef={editorRef}
          onContentChange={onContentInput}
        />

        {/* Floating Contextual Bubble Menu */}
        <DesktopFloatingMenu
          editorRef={editorRef}
          onExecuteCommand={executeCommand}
          onOpenLinkModal={onOpenLinkModal}
          onOpenAIModal={onOpenAIModal}
        />

        {/* Stage Canvas Area */}
        <DesktopCanvas
          activeDoc={activeDoc}
          activeDocId={activeDocId}
          editorRef={editorRef}
          onContentInput={onContentInput}
          viewMode={viewMode}
          theme={theme}
          zoom={zoom}
          showRuler={showRuler}
          isZenMode={isZenMode}
          pageSetup={pageSetup}
          setDocuments={setDocuments}
          updateStats={updateStats}
        />
      </div>

      {/* 5. BOTTOM STATUS BAR */}
      {!isZenMode && showStatusBar && (
        <DesktopStatusBar
          words={stats.words}
          characters={stats.characters}
          readingTimeMinutes={stats.readingTimeMinutes}
          fleschGrade={stats.fleschGrade}
          zoom={zoom}
          onChangeZoom={onChangeZoom}
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
          pageSetup={pageSetup}
          onOpenPageSetup={onOpenPageSetup}
          onOpenStats={onOpenStats}
        />
      )}
    </div>
  );
}

// Also export alias DesktopEditor for convenience
export const DesktopEditor = DeskopEditor;
