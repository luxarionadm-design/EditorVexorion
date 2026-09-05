import { useState, useCallback } from "react";

export type MobileActiveSheet = "none" | "nav" | "format" | "insert" | "options";

/**
 * Feature hook to manage mutually-exclusive sheets and navigation drawer states on mobile
 */
export function useMobileSheets() {
  const [activeSheet, setActiveSheet] = useState<MobileActiveSheet>("none");

  const isNavDrawerOpen = activeSheet === "nav";
  const isFormatSheetOpen = activeSheet === "format";
  const isInsertSheetOpen = activeSheet === "insert";
  const isOptionsSheetOpen = activeSheet === "options";

  const closeAllSheets = useCallback(() => {
    setActiveSheet("none");
  }, []);

  const openNavDrawer = useCallback(() => {
    setActiveSheet("nav");
  }, []);

  const openOptionsSheet = useCallback(() => {
    setActiveSheet("options");
  }, []);

  const toggleFormatSheet = useCallback(() => {
    setActiveSheet((prev) => (prev === "format" ? "none" : "format"));
  }, []);

  const toggleInsertSheet = useCallback(() => {
    setActiveSheet((prev) => (prev === "insert" ? "none" : "insert"));
  }, []);

  return {
    activeSheet,
    isNavDrawerOpen,
    isFormatSheetOpen,
    isInsertSheetOpen,
    isOptionsSheetOpen,
    closeAllSheets,
    openNavDrawer,
    openOptionsSheet,
    toggleFormatSheet,
    toggleInsertSheet,
    setIsNavDrawerOpen: (open: boolean) => setActiveSheet(open ? "nav" : "none"),
    setIsFormatSheetOpen: (open: boolean) => setActiveSheet(open ? "format" : "none"),
    setIsInsertSheetOpen: (open: boolean) => setActiveSheet(open ? "insert" : "none"),
    setIsOptionsSheetOpen: (open: boolean) => setActiveSheet(open ? "options" : "none"),
  };
}
