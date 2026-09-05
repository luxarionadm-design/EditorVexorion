import { useState, useEffect, useCallback, RefObject } from "react";

export interface MobileHeadingItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Feature hook to parse headings from content and handle smooth scrolling to sections on mobile
 */
export function useMobileOutline(
  content: string,
  editorRef: RefObject<HTMLDivElement | null>,
  onCloseDrawer?: () => void
) {
  const [outlineHeadings, setOutlineHeadings] = useState<MobileHeadingItem[]>([]);

  useEffect(() => {
    if (!content) {
      setOutlineHeadings([]);
      return;
    }
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const elements = tempDiv.querySelectorAll("h1, h2, h3");
    const found: MobileHeadingItem[] = [];

    elements.forEach((el, index) => {
      const tag = el.tagName.toLowerCase();
      const level = parseInt(tag.replace("h", ""), 10);
      const text = el.textContent?.trim() || `Bagian ${index + 1}`;
      found.push({
        id: `mobile-heading-${index}`,
        text,
        level,
      });
    });

    setOutlineHeadings(found);
  }, [content]);

  const jumpToHeading = useCallback(
    (text: string) => {
      if (onCloseDrawer) {
        onCloseDrawer();
      }
      if (!editorRef.current) return;
      const elements = editorRef.current.querySelectorAll("h1, h2, h3");
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent?.trim() === text) {
          elements[i].scrollIntoView({ behavior: "smooth", block: "center" });
          const el = elements[i] as HTMLElement;
          el.style.transition = "background-color 0.4s ease";
          el.style.backgroundColor = "rgba(59, 130, 246, 0.25)";
          setTimeout(() => {
            el.style.backgroundColor = "";
          }, 1200);
          break;
        }
      }
    },
    [editorRef, onCloseDrawer]
  );

  return {
    outlineHeadings,
    jumpToHeading,
  };
}
