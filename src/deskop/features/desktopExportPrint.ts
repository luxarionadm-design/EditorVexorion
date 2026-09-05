import { DocumentFile, PageSetup } from "../../types";
import { htmlToMarkdown } from "../../utils/editorUtils";

export type DesktopExportFormat = "pdf" | "md" | "html" | "txt" | "json";

/**
 * Feature utility for desktop file exports and printing
 */
export function handleDesktopExport(
  activeDoc: DocumentFile,
  format: DesktopExportFormat,
  pageSetup?: PageSetup
) {
  const filename = (activeDoc.title || "dokumen").replace(/[/\\?%*:|"<>]/g, "-");

  if (format === "pdf") {
    // Desktop print dialog trigger
    window.print();
    return;
  }

  let content = "";
  let mimeType = "text/plain";
  let extension = "txt";

  if (format === "md") {
    content = htmlToMarkdown(activeDoc.content);
    mimeType = "text/markdown";
    extension = "md";
  } else if (format === "html") {
    const isLandscape = pageSetup?.orientation === "landscape";
    content = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <title>${activeDoc.title}</title>
  <style>
    @page { size: ${isLandscape ? "A4 landscape" : "A4 portrait"}; margin: 25mm; }
    body { font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; max-width: 850px; margin: 2rem auto; padding: 0 1rem; color: #1e293b; }
    table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 14px; }
    th { background: #f8fafc; font-weight: 600; }
    blockquote { border-left: 4px solid #3b82f6; padding-left: 1rem; margin-left: 0; color: #475569; }
    pre { background: #1e1e2e; color: #f8f8f2; padding: 1rem; border-radius: 8px; overflow-x: auto; }
  </style>
</head>
<body>
  ${activeDoc.content}
</body>
</html>`;
    mimeType = "text/html";
    extension = "html";
  } else if (format === "json") {
    content = JSON.stringify(activeDoc, null, 2);
    mimeType = "application/json";
    extension = "json";
  } else {
    // txt
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = activeDoc.content;
    content = tempDiv.textContent || tempDiv.innerText || "";
    mimeType = "text/plain";
    extension = "txt";
  }

  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
