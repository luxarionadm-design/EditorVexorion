import { useMemo } from "react";
import { EditorTheme } from "../../types";

export interface MobileThemeClasses {
  wrapper: string;
  header: string;
  canvas: string;
  bottomBar: string;
  sheet: string;
  card: string;
}

/**
 * Feature hook to get tailored mobile theme classes
 */
export function useMobileTheme(theme: EditorTheme): MobileThemeClasses {
  return useMemo(() => {
    switch (theme) {
      case "obsidian":
        return {
          wrapper: "bg-[#09090b] text-stone-100",
          header: "bg-[#18181b] border-stone-800 text-stone-100",
          canvas: "bg-[#121214] text-stone-100",
          bottomBar: "bg-[#18181b]/95 border-stone-800 text-stone-100",
          sheet: "bg-[#18181b] border-stone-800 text-stone-100",
          card: "bg-[#27272a] border-stone-700",
        };
      case "sepia":
        return {
          wrapper: "bg-[#f4efe4] text-[#3d2f1f]",
          header: "bg-[#ebe4d3] border-[#ded4bf] text-[#3d2f1f]",
          canvas: "bg-[#fcf9f2] text-[#3d2f1f]",
          bottomBar: "bg-[#ebe4d3]/95 border-[#ded4bf] text-[#3d2f1f]",
          sheet: "bg-[#ebe4d3] border-[#ded4bf] text-[#3d2f1f]",
          card: "bg-[#f4efe4] border-[#ded4bf]",
        };
      case "mint":
        return {
          wrapper: "bg-[#eaf4ef] text-[#12382a]",
          header: "bg-[#d8ebe1] border-[#c0decb] text-[#12382a]",
          canvas: "bg-[#f7fbf9] text-[#12382a]",
          bottomBar: "bg-[#d8ebe1]/95 border-[#c0decb] text-[#12382a]",
          sheet: "bg-[#d8ebe1] border-[#c0decb] text-[#12382a]",
          card: "bg-[#eaf4ef] border-[#c0decb]",
        };
      default:
        return {
          wrapper: "bg-stone-50 text-stone-900",
          header: "bg-white border-stone-200 text-stone-900",
          canvas: "bg-white text-stone-900",
          bottomBar: "bg-white/95 border-stone-200 text-stone-900",
          sheet: "bg-white border-stone-200 text-stone-900",
          card: "bg-stone-50 border-stone-200",
        };
    }
  }, [theme]);
}
