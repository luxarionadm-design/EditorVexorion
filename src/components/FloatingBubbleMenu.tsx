import React, { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link2,
  Highlighter,
  Sparkles,
} from "lucide-react";

interface Props {
  editorRef: React.RefObject<HTMLDivElement | null>;
  onExecuteCommand: (cmd: string, val?: string) => void;
  onOpenLinkModal: () => void;
  onOpenAIModal: () => void;
}

export const FloatingBubbleMenu: React.FC<Props> = ({
  editorRef,
  onExecuteCommand,
  onOpenLinkModal,
  onOpenAIModal,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setVisible(false);
        return;
      }

      // Check if selection is within editor
      if (editorRef.current && editorRef.current.contains(selection.anchorNode)) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Calculate position above selection
        const top = rect.top - 46;
        const left = rect.left + rect.width / 2;

        setPosition({
          top: Math.max(10, top),
          left: Math.max(120, left),
        });
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [editorRef]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateX(-50%)",
      }}
      className="z-40 flex items-center gap-0.5 rounded-lg bg-stone-900 px-1.5 py-1 text-white shadow-xl border border-stone-700 animate-in fade-in zoom-in-95 duration-100"
    >
      <button
        onClick={() => onExecuteCommand("bold")}
        title="Tebal"
        className="p-1 rounded-md hover:bg-stone-800 text-stone-300 hover:text-white transition"
      >
        <Bold className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => onExecuteCommand("italic")}
        title="Miring"
        className="p-1 rounded-md hover:bg-stone-800 text-stone-300 hover:text-white transition"
      >
        <Italic className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => onExecuteCommand("underline")}
        title="Garis Bawah"
        className="p-1 rounded-md hover:bg-stone-800 text-stone-300 hover:text-white transition"
      >
        <Underline className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => onExecuteCommand("strikeThrough")}
        title="Coret"
        className="p-1 rounded-md hover:bg-stone-800 text-stone-300 hover:text-white transition"
      >
        <Strikethrough className="h-3.5 w-3.5" />
      </button>

      <div className="h-3 w-px bg-stone-700 mx-0.5" />

      <button
        onClick={onOpenLinkModal}
        title="Tautan"
        className="p-1 rounded-md hover:bg-stone-800 text-stone-300 hover:text-white transition"
      >
        <Link2 className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => onExecuteCommand("hiliteColor", "#fef08a")}
        title="Sorot Kuning"
        className="p-1 rounded-md hover:bg-stone-800 text-amber-400 hover:text-amber-300 transition"
      >
        <Highlighter className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => onExecuteCommand("insertHTML", `<code>${window.getSelection()?.toString() || ""}</code>`)}
        title="Kode Sebaris"
        className="p-1 rounded-md hover:bg-stone-800 text-stone-300 hover:text-white transition"
      >
        <Code className="h-3.5 w-3.5" />
      </button>

      <div className="h-3 w-px bg-stone-700 mx-0.5" />

      {/* AI polish */}
      <button
        onClick={onOpenAIModal}
        className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition"
        title="Sempurnakan dengan AI"
      >
        <Sparkles className="h-3 w-3" />
        <span>AI Polish</span>
      </button>
    </div>
  );
};
