/**
 * Mobile-optimized insert feature utilities
 */

export function generateMobileTableHtml(rows = 3, cols = 3, hasHeader = true): string {
  let html = `<table class="doc-table w-full border-collapse my-3 text-xs" style="border: 1px solid #d1d5db;">`;
  if (hasHeader) {
    html += `<thead><tr style="background-color: #f3f4f6;">`;
    for (let c = 0; c < cols; c++) {
      html += `<th style="border: 1px solid #d1d5db; padding: 6px 8px; font-weight: 600; text-align: left;">Kolom ${c + 1}</th>`;
    }
    html += `</tr></thead>`;
  }
  html += `<tbody>`;
  const dataRows = hasHeader ? rows - 1 : rows;
  for (let r = 0; r < dataRows; r++) {
    html += `<tr>`;
    for (let c = 0; c < cols; c++) {
      html += `<td style="border: 1px solid #d1d5db; padding: 6px 8px;">Data ${r + 1},${c + 1}</td>`;
    }
    html += `</tr>`;
  }
  html += `</tbody></table><p><br></p>`;
  return html;
}

export function generateMobileCalloutHtml(type: "info" | "warning" | "success" | "note"): string {
  const styles = {
    info: {
      bg: "#eff6ff",
      border: "#3b82f6",
      icon: "ℹ️",
      label: "Catatan Penting",
      color: "#1e40af",
    },
    warning: {
      bg: "#fffbeb",
      border: "#f59e0b",
      icon: "⚠️",
      label: "Peringatan",
      color: "#92400e",
    },
    success: {
      bg: "#f0fdf4",
      border: "#22c55e",
      icon: "✅",
      label: "Informasi Berhasil",
      color: "#166534",
    },
    note: {
      bg: "#f8fafc",
      border: "#64748b",
      icon: "📌",
      label: "Catatan Tambahan",
      color: "#334155",
    },
  }[type];

  return `
    <div class="callout-box" style="background-color: ${styles.bg}; border-left: 4px solid ${styles.border}; padding: 10px 14px; margin: 12px 0; border-radius: 6px; color: ${styles.color}; font-size: 14px;">
      <div style="font-weight: 600; margin-bottom: 4px; display: flex; items-center; gap: 6px;">
        <span>${styles.icon}</span> <span>${styles.label}</span>
      </div>
      <div>Tuliskan detail informasi penting di sini...</div>
    </div>
    <p><br></p>
  `;
}

export function generateMobileCodeBlockHtml(lang = "javascript"): string {
  return `
    <pre class="code-block" style="background-color: #1e1e2e; color: #f8f8f2; padding: 12px 14px; border-radius: 8px; font-family: monospace; font-size: 13px; overflow-x: auto; margin: 12px 0;">
<code>// Bahasa: ${lang}
function contohMobile() {
  console.log("Kode program berhasil disisipkan.");
}</code>
    </pre>
    <p><br></p>
  `;
}

export function generateMobileChecklistHtml(): string {
  return `
    <div class="checklist-item" style="display: flex; align-items: center; gap: 8px; margin: 6px 0;">
      <input type="checkbox" style="width: 16px; height: 16px; accent-color: #2563eb;" />
      <span>Tugas baru yang harus diselesaikan</span>
    </div>
    <p><br></p>
  `;
}

export function generateMobileDateTimeString(): string {
  const now = new Date();
  return now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generateMobilePageBreakHtml(): string {
  return `
    <div class="page-break" style="page-break-after: always; border-bottom: 2px dashed #cbd5e1; margin: 20px 0; text-align: center; color: #94a3b8; font-size: 11px; user-select: none;">
      --- Batas Halaman (Page Break) ---
    </div>
    <p><br></p>
  `;
}
