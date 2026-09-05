import { useState, useEffect, useCallback, RefObject } from "react";
import { DocumentSnapshot } from "../../types";

export interface OutlineItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Feature hook for Desktop Outline extraction and Document Version History Snapshots
 */
export function useDesktopOutlineHistory(
  content: string,
  editorRef: RefObject<HTMLDivElement | null>
) {
  const [headings, setHeadings] = useState<OutlineItem[]>([]);
  const [snapshots, setSnapshots] = useState<DocumentSnapshot[]>([]);

  // Parse headings whenever content changes
  useEffect(() => {
    if (!content) {
      setHeadings([]);
      return;
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const elements = tempDiv.querySelectorAll("h1, h2, h3");
    const found: OutlineItem[] = [];

    elements.forEach((el, index) => {
      const tag = el.tagName.toLowerCase();
      const level = parseInt(tag.replace("h", ""), 10);
      const text = el.textContent?.trim() || `Bagian ${index + 1}`;
      found.push({
        id: `desktop-heading-${index}`,
        text,
        level,
      });
    });

    setHeadings(found);
  }, [content]);

  // Jump to heading in editor
  const jumpToHeading = useCallback(
    (text: string) => {
      if (!editorRef.current) return;
      const elements = editorRef.current.querySelectorAll("h1, h2, h3");
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent?.trim() === text) {
          elements[i].scrollIntoView({ behavior: "smooth", block: "center" });
          const el = elements[i] as HTMLElement;
          el.style.transition = "background-color 0.4s ease";
          el.style.backgroundColor = "rgba(59, 130, 246, 0.2)";
          setTimeout(() => {
            el.style.backgroundColor = "";
          }, 1200);
          break;
        }
      }
    },
    [editorRef]
  );

  // Take snapshot
  const takeSnapshot = useCallback((currentContent: string, name?: string) => {
    const now = new Date();
    const newSnapshot: DocumentSnapshot = {
      id: "snap-" + Date.now(),
      timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      name: name || `Versi ${now.toLocaleDateString("id-ID")}`,
      content: currentContent,
    };
    setSnapshots((prev) => [newSnapshot, ...prev].slice(0, 20)); // Keep max 20 snapshots
  }, []);

  // Restore snapshot
  const restoreSnapshot = useCallback(
    (snapshotContent: string, onContentInput?: () => void) => {
      if (editorRef.current) {
        editorRef.current.innerHTML = snapshotContent;
        if (onContentInput) {
          onContentInput();
        }
      }
    },
    [editorRef]
  );

  return {
    headings,
    jumpToHeading,
    snapshots,
    takeSnapshot,
    restoreSnapshot,
  };
}
