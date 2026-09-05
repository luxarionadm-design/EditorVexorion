import { DocumentFile } from "../../types";
import { htmlToMarkdown } from "../../utils/editorUtils";

/**
 * Mobile-friendly export handler
 */
export function handleMobileExport(
  activeDoc: DocumentFile,
  format: "pdf" | "markdown" | "html" | "txt" | "json"
) {
  const filename = (activeDoc.title || "dokumen").replace(/[/\\?%*:|"<>]/g, "-");

  if (format === "pdf") {
    window.print();
    return;
  }

  let fileContent = "";
  let mimeType = "text/plain";
  let extension = "txt";

  if (format === "markdown") {
    fileContent = htmlToMarkdown(activeDoc.content);
    mimeType = "text/markdown";
    extension = "md";
  } else if (format === "html") {
    fileContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${activeDoc.title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 768px; margin: 2rem auto; padding: 0 1rem; color: #1e293b; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 12px; }
    th { background: #f1f5f9; }
    img { max-width: 100%; height: auto; border-radius: 6px; }
    pre { background: #1e1e2e; color: #f8f8f2; padding: 12px; border-radius: 8px; overflow-x: auto; }
  </style>
</head>
<body>
  ${activeDoc.content}
</body>
</html>`;
    mimeType = "text/html";
    extension = "html";
  } else if (format === "json") {
    fileContent = JSON.stringify(activeDoc, null, 2);
    mimeType = "application/json";
    extension = "json";
  } else {
    // txt
    const temp = document.createElement("div");
    temp.innerHTML = activeDoc.content;
    fileContent = temp.textContent || temp.innerText || "";
    mimeType = "text/plain";
    extension = "txt";
  }

  const blob = new Blob([fileContent], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
