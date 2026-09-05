import { useEffect } from "react";

export interface DesktopShortcutHandlers {
  onSave?: () => void;
  onPrint?: () => void;
  onFindReplace?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onZenModeToggle?: () => void;
}

/**
 * Feature hook for Desktop Keyboard Shortcuts (Ctrl/Cmd + S, P, F, Z, Y, etc.)
 */
export function useDesktopShortcuts(handlers: DesktopShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isModifier = isMac ? e.metaKey : e.ctrlKey;

      if (isModifier && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handlers.onSave?.();
      } else if (isModifier && e.key.toLowerCase() === "p") {
        e.preventDefault();
        handlers.onPrint?.();
      } else if (isModifier && e.key.toLowerCase() === "f") {
        e.preventDefault();
        handlers.onFindReplace?.();
      } else if (isModifier && e.key.toLowerCase() === "z" && !e.shiftKey) {
        // Undo is standard, allow custom handler or let browser handle
        if (handlers.onUndo) {
          e.preventDefault();
          handlers.onUndo();
        }
      } else if (
        (isModifier && e.key.toLowerCase() === "y") ||
        (isModifier && e.shiftKey && e.key.toLowerCase() === "z")
      ) {
        if (handlers.onRedo) {
          e.preventDefault();
          handlers.onRedo();
        }
      } else if (e.key === "F11") {
        e.preventDefault();
        handlers.onZenModeToggle?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
}
