import { RefObject } from "react";
import { transformTextCase, cleanDocumentText } from "../../utils/editorUtils";

export type TextCaseType = "upper" | "lower" | "title" | "sentence" | "slug";
export type TextCleanType = "spaces" | "lines" | "quotes";

/**
 * Feature utility for Desktop Text transformations (Casing, Cleaning)
 */
export function applyDesktopCaseTransform(
  type: TextCaseType,
  editorRef: RefObject<HTMLDivElement | null>,
  onContentInput?: () => void
) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const selectedText = selection.toString();
  if (selectedText) {
    const transformed = transformTextCase(selectedText, type);
    document.execCommand("insertText", false, transformed);
  } else if (editorRef.current) {
    const fullText = editorRef.current.innerText;
    editorRef.current.innerText = transformTextCase(fullText, type);
  }

  if (onContentInput) {
    onContentInput();
  }
}

/**
 * Feature utility for Desktop document cleanup (removing extra spaces, lines, quote normalization)
 */
export function applyDesktopTextClean(
  action: TextCleanType,
  editorRef: RefObject<HTMLDivElement | null>,
  onContentInput?: () => void
) {
  if (!editorRef.current) return;

  const html = editorRef.current.innerHTML;
  const cleaned = cleanDocumentText(html, action);
  editorRef.current.innerHTML = cleaned;

  if (onContentInput) {
    onContentInput();
  }
}
