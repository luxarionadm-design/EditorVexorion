import React from "react";
import { DocumentFile, EditorTheme, DocumentStats } from "../types";
import { MobileHeader } from "./components/MobileHeader";
import { MobileCanvas } from "./components/MobileCanvas";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { MobileFormatSheet } from "./components/MobileFormatSheet";
import { MobileInsertSheet } from "./components/MobileInsertSheet";
import { MobileOptionsSheet } from "./components/MobileOptionsSheet";
import { MobileNavDrawer } from "./components/MobileNavDrawer";
import {
  useMobileOutline,
  useMobileSheets,
  useMobileTheme,
  handleMobileExport,
} from "./features";

export interface MobileEditorProps {
  activeDoc: DocumentFile;
  documents: DocumentFile[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onNewDoc: (template?: string) => void;
  onDeleteDoc: (id: string) => void;
  onRenameDoc: (newTitle: string) => void;
  onTogglePinDoc: (id: string) => void;
  editorRef: React.RefObject<HTMLDivElement | null>;
  onContentInput: () => void;
  executeCommand: (command: string, value?: string) => void;
  stats: DocumentStats;
  theme: EditorTheme;
  onChangeTheme: (theme: EditorTheme) => void;
  onSwitchToPC: () => void;
  onOpenStats: () => void;
  onOpenAIModal: (action?: string) => void;
  onOpenFindReplace: () => void;
  onExport: (format: "pdf" | "markdown" | "html" | "txt" | "json") => void;
  onImportFile: () => void;
  onInsertTable: (rows: number, cols: number, hasHeader?: boolean) => void;
  onOpenImageModal: () => void;
  onOpenLinkModal: () => void;
  onInsertCallout: (type: "info" | "warning" | "success" | "note") => void;
  onInsertCodeBlock: (lang: string) => void;
  onInsertChecklist: () => void;
  onInsertDateTime: () => void;
  onInsertPageBreak: () => void;
  onSetHeading: (tag: string) => void;
  onSetTextColor: (color: string) => void;
  onSetHighlightColor: (color: string) => void;
  onSetLineSpacing: (spacing: string) => void;
}

export function MobileEditor({
  activeDoc,
  documents,
  activeDocId,
  onSelectDoc,
  onNewDoc,
  onDeleteDoc,
  onRenameDoc,
  onTogglePinDoc,
  editorRef,
  onContentInput,
  executeCommand,
  stats,
  theme,
  onChangeTheme,
  onSwitchToPC,
  onOpenStats,
  onOpenAIModal,
  onOpenFindReplace,
  onExport,
  onImportFile,
  onInsertTable,
  onOpenImageModal,
  onOpenLinkModal,
  onInsertCallout,
  onInsertCodeBlock,
  onInsertChecklist,
  onInsertDateTime,
  onInsertPageBreak,
  onSetHeading,
  onSetTextColor,
  onSetHighlightColor,
  onSetLineSpacing,
}: MobileEditorProps) {
  // 1. Modular Mobile Features: Sheets & Drawer State
  const {
    isNavDrawerOpen,
    isFormatSheetOpen,
    isInsertSheetOpen,
    isOptionsSheetOpen,
    closeAllSheets,
    openNavDrawer,
    openOptionsSheet,
    toggleFormatSheet,
    toggleInsertSheet,
    setIsNavDrawerOpen,
    setIsFormatSheetOpen,
    setIsInsertSheetOpen,
    setIsOptionsSheetOpen,
  } = useMobileSheets();

  // 2. Modular Mobile Features: Outline & Section Jump
  const { outlineHeadings, jumpToHeading } = useMobileOutline(
    activeDoc.content,
    editorRef,
    () => setIsNavDrawerOpen(false)
  );

  // 3. Modular Mobile Features: Adaptive Theme
  const currentTheme = useMobileTheme(theme);

  // Handle export (using props or modular mobile export helper)
  const handleExportDoc = (format: "pdf" | "markdown" | "html" | "txt" | "json") => {
    if (onExport) {
      onExport(format);
    } else {
      handleMobileExport(activeDoc, format);
    }
  };

  return (
    <div className={`flex flex-col h-screen w-full overflow-hidden ${currentTheme.wrapper}`}>
      {/* 1. TOP MOBILE HEADER */}
      <MobileHeader
        title={activeDoc.title}
        onRenameTitle={onRenameDoc}
        onOpenNavDrawer={openNavDrawer}
        onOpenOptionsSheet={openOptionsSheet}
        onExecuteUndo={() => executeCommand("undo")}
        onExecuteRedo={() => executeCommand("redo")}
        onOpenAIModal={onOpenAIModal}
        onSwitchToPC={onSwitchToPC}
        headerThemeClass={currentTheme.header}
      />

      {/* 2. WRITING SURFACE CANVAS */}
      <MobileCanvas
        editorRef={editorRef}
        onContentInput={onContentInput}
        canvasClass={currentTheme.canvas}
        cardClass={currentTheme.card}
      />

      {/* 3. BOTTOM STICKY ACCESSORY BAR */}
      <MobileBottomBar
        isFormatSheetOpen={isFormatSheetOpen}
        onToggleFormatSheet={toggleFormatSheet}
        isInsertSheetOpen={isInsertSheetOpen}
        onToggleInsertSheet={toggleInsertSheet}
        onExecuteCommand={executeCommand}
        onInsertChecklist={onInsertChecklist}
        bottomBarClass={currentTheme.bottomBar}
      />

      {/* 4. FORMAT SHEET */}
      <MobileFormatSheet
        isOpen={isFormatSheetOpen}
        onClose={() => setIsFormatSheetOpen(false)}
        onSetHeading={onSetHeading}
        onExecuteCommand={executeCommand}
        onSetTextColor={onSetTextColor}
        onSetHighlightColor={onSetHighlightColor}
        onSetLineSpacing={onSetLineSpacing}
        sheetThemeClass={currentTheme.sheet}
      />

      {/* 5. INSERT SHEET */}
      <MobileInsertSheet
        isOpen={isInsertSheetOpen}
        onClose={() => setIsInsertSheetOpen(false)}
        onInsertTable={onInsertTable}
        onOpenImageModal={onOpenImageModal}
        onOpenLinkModal={onOpenLinkModal}
        onInsertCallout={onInsertCallout}
        onInsertCodeBlock={onInsertCodeBlock}
        onInsertDateTime={onInsertDateTime}
        onInsertPageBreak={onInsertPageBreak}
        onExecuteCommand={executeCommand}
        sheetThemeClass={currentTheme.sheet}
      />

      {/* 6. OPTIONS & EXPORT SHEET */}
      <MobileOptionsSheet
        isOpen={isOptionsSheetOpen}
        onClose={() => setIsOptionsSheetOpen(false)}
        stats={stats}
        theme={theme}
        onChangeTheme={onChangeTheme}
        onOpenFindReplace={onOpenFindReplace}
        onOpenStats={onOpenStats}
        onSwitchToPC={onSwitchToPC}
        onExport={handleExportDoc}
        sheetThemeClass={currentTheme.sheet}
      />

      {/* 7. SLIDE-OVER NAVIGATION DRAWER */}
      <MobileNavDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        documents={documents}
        activeDocId={activeDocId}
        onSelectDoc={onSelectDoc}
        onNewDoc={() => onNewDoc()}
        onImportFile={onImportFile}
        onDeleteDoc={onDeleteDoc}
        onTogglePinDoc={onTogglePinDoc}
        outlineHeadings={outlineHeadings}
        onJumpToHeading={jumpToHeading}
        stats={stats}
        onSwitchToPC={onSwitchToPC}
        drawerThemeClass={currentTheme.sheet}
      />
    </div>
  );
}
