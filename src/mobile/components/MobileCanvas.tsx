import React from "react";

interface MobileCanvasProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  onContentInput: () => void;
  canvasClass?: string;
  cardClass?: string;
}

export const MobileCanvas: React.FC<MobileCanvasProps> = ({
  editorRef,
  onContentInput,
  canvasClass = "bg-white text-stone-900",
  cardClass = "bg-stone-50 border-stone-200",
}) => {
  return (
    <main className="flex-1 overflow-y-auto px-4 py-6 relative">
      <div className="max-w-2xl mx-auto">
        <div
          id="editor-canvas-container"
          ref={editorRef}
          contentEditable
          onInput={onContentInput}
          spellCheck={false}
          className={`editor-content min-h-[calc(100vh-170px)] p-4 sm:p-6 rounded-xl border shadow-xs outline-hidden focus:ring-0 leading-relaxed font-sans text-base transition-colors ${canvasClass} ${cardClass}`}
          style={{
            minHeight: "calc(100vh - 180px)",
            paddingBottom: "80px", // space for bottom sticky accessory bar
          }}
        />
      </div>
    </main>
  );
};
