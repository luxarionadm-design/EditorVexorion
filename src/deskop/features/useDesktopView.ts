import { useState, useCallback, useMemo } from "react";
import { ViewMode, EditorTheme } from "../../types";

export interface UseDesktopViewOptions {
  initialViewMode?: ViewMode;
  initialZoom?: number;
  initialShowRuler?: boolean;
  initialShowOutline?: boolean;
  initialShowStatusBar?: boolean;
  initialIsZenMode?: boolean;
}

/**
 * Feature hook for desktop canvas view modes, zoom levels, and layout visibility toggles
 */
export function useDesktopView(options: UseDesktopViewOptions = {}) {
  const [viewMode, setViewMode] = useState<ViewMode>(options.initialViewMode ?? "page");
  const [zoom, setZoom] = useState<number>(options.initialZoom ?? 100);
  const [showRuler, setShowRuler] = useState<boolean>(options.initialShowRuler ?? true);
  const [showOutline, setShowOutline] = useState<boolean>(options.initialShowOutline ?? true);
  const [showStatusBar, setShowStatusBar] = useState<boolean>(options.initialShowStatusBar ?? true);
  const [isZenMode, setIsZenMode] = useState<boolean>(options.initialIsZenMode ?? false);

  const toggleRuler = useCallback(() => setShowRuler((prev) => !prev), []);
  const toggleOutline = useCallback(() => setShowOutline((prev) => !prev), []);
  const toggleStatusBar = useCallback(() => setShowStatusBar((prev) => !prev), []);
  const toggleZenMode = useCallback(() => setIsZenMode((prev) => !prev), []);

  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(200, prev + 10));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => Math.max(50, prev - 10));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(100);
  }, []);

  const getCanvasBackgroundClass = useCallback((theme: EditorTheme): string => {
    switch (theme) {
      case "obsidian":
        return "bg-[#09090b] text-stone-100";
      case "sepia":
        return "bg-[#f4efe4] text-[#3d2f1f]";
      case "mint":
        return "bg-[#eaf4ef] text-[#12382a]";
      default:
        return "bg-[#e2e8f0]/60 text-stone-900";
    }
  }, []);

  const getCanvasPaperClass = useCallback((theme: EditorTheme, mode: ViewMode): string => {
    const basePadding =
      mode === "page" ? "w-[816px] min-h-[1056px] p-16 my-4" : "w-[900px] min-h-[800px] p-12 my-2 rounded-xl";

    switch (theme) {
      case "obsidian":
        return `${basePadding} bg-[#18181b] border-stone-700 text-stone-100 shadow-stone-950`;
      case "sepia":
        return `${basePadding} bg-[#fcf9f2] border-[#e2d7c0] text-[#3d2f1f] shadow-stone-400/30`;
      case "mint":
        return `${basePadding} bg-[#f7fbf9] border-[#cfe2d8] text-[#12382a] shadow-emerald-950/10`;
      default:
        return `${basePadding} bg-white border-stone-300/80 text-stone-900 shadow-stone-400/20`;
    }
  }, []);

  return {
    viewMode,
    setViewMode,
    zoom,
    setZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    showRuler,
    setShowRuler,
    toggleRuler,
    showOutline,
    setShowOutline,
    toggleOutline,
    showStatusBar,
    setShowStatusBar,
    toggleStatusBar,
    isZenMode,
    setIsZenMode,
    toggleZenMode,
    getCanvasBackgroundClass,
    getCanvasPaperClass,
  };
}
