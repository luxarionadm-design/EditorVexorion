import { DocumentStats } from "../types";

export function calculateDocumentStats(html: string): DocumentStats {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      fleschScore: 100,
      fleschGrade: "Sangat Mudah",
    };
  }

  const wordsArray = trimmed.split(/\s+/).filter(Boolean);
  const words = wordsArray.length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, "").length;

  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1;
  const paragraphs = trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length || 1;

  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
  const speakingTimeMinutes = Math.max(1, Math.ceil(words / 130));

  // Heuristic Flesch Reading Ease score
  const avgWordsPerSentence = words / sentences;
  const avgSyllablesPerWord = charactersNoSpaces / (words * 3.5 || 1);
  const score = Math.max(
    0,
    Math.min(100, Math.round(206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord))
  );

  let fleschGrade = "Standar";
  if (score >= 80) fleschGrade = "Sangat Mudah";
  else if (score >= 65) fleschGrade = "Mudah Dipahami";
  else if (score >= 50) fleschGrade = "Standar Menengah";
  else if (score >= 30) fleschGrade = "Kompleks / Akademik";
  else fleschGrade = "Sangat Teknis";

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
    fleschScore: score,
    fleschGrade,
  };
}

export function transformTextCase(
  text: string,
  type: "upper" | "lower" | "title" | "sentence" | "slug"
): string {
  switch (type) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      );
    case "sentence":
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    case "slug":
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    default:
      return text;
  }
}

export function cleanDocumentText(text: string, action: "spaces" | "lines" | "quotes"): string {
  switch (action) {
    case "spaces":
      return text.replace(/[ \t]{2,}/g, " ");
    case "lines":
      return text.replace(/\n{3,}/g, "\n\n");
    case "quotes":
      return text
        .replace(/[""]/g, '"')
        .replace(/['']/g, "'");
    default:
      return text;
  }
}

export function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Convert HTML to simple clean Markdown
export function htmlToMarkdown(html: string): string {
  const container = document.createElement("div");
  container.innerHTML = html;

  // Process Headings
  for (let i = 1; i <= 6; i++) {
    const headings = container.querySelectorAll(`h${i}`);
    headings.forEach((h) => {
      const prefix = "#".repeat(i) + " ";
      h.textContent = `\n${prefix}${h.textContent}\n\n`;
    });
  }

  // Process Blockquotes
  container.querySelectorAll("blockquote").forEach((bq) => {
    bq.textContent = `\n> ${bq.textContent?.trim()}\n\n`;
  });

  // Process Pre/Code
  container.querySelectorAll("pre").forEach((p) => {
    p.textContent = `\n\`\`\`\n${p.textContent?.trim()}\n\`\`\`\n\n`;
  });

  // Process Lists
  container.querySelectorAll("ul > li").forEach((li) => {
    li.textContent = `• ${li.textContent?.trim()}\n`;
  });
  container.querySelectorAll("ol > li").forEach((li, idx) => {
    li.textContent = `${idx + 1}. ${li.textContent?.trim()}\n`;
  });

  // Process Paragraphs
  container.querySelectorAll("p").forEach((p) => {
    p.textContent = `${p.textContent}\n\n`;
  });

  return (container.textContent || "").trim();
}

// Convert Markdown to clean HTML
export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  let html = markdown
    // Headings
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // Bold & Italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    // Code blocks
    .replace(/```([\s\S]*?)```/gim, '<pre class="editor-code-block"><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/gim, "<code>$1</code>")
    // Blockquote
    .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
    // Unordered lists
    .replace(/^\s*[\-\*]\s+(.*$)/gim, "<li>$1</li>")
    // Horizontal Rule
    .replace(/^(?:---|\*\*\*|___)$/gim, "<hr/>");

  // Wrap lists
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Paragraphs
  const paragraphs = html
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<hr")
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");

  return paragraphs || `<p>${html}</p>`;
}

// Aliases for convenience
export const exportToFile = downloadFile;
export const transformCase = transformTextCase;
export const cleanTextSpacing = (text: string) => cleanDocumentText(text, "spaces");

