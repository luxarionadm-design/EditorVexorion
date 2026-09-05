import { RefObject } from "react";

export type TableActionType =
  | "addRowAbove"
  | "addRowBelow"
  | "deleteRow"
  | "addColLeft"
  | "addColRight"
  | "deleteCol"
  | "deleteTable";

/**
 * Feature utility to perform robust table row/column operations in the active WYSIWYG selection
 */
export function executeDesktopTableAction(
  action: TableActionType,
  editorRef: RefObject<HTMLDivElement | null>,
  onContentInput?: () => void
) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  let cell = range.commonAncestorContainer as HTMLElement | null;

  // Traverse up to find closest TD or TH
  while (cell && cell !== editorRef.current && cell.tagName !== "TD" && cell.tagName !== "TH") {
    cell = cell.parentElement;
  }

  if (!cell || (cell.tagName !== "TD" && cell.tagName !== "TH")) {
    return;
  }

  const row = cell.parentElement as HTMLTableRowElement | null;
  if (!row) return;

  const tbody = row.parentElement as HTMLTableSectionElement | null;
  const table = tbody?.parentElement as HTMLTableElement | null;
  if (!table) return;

  const colIndex = Array.from(row.children).indexOf(cell);
  const rowIndex = Array.from(tbody.children).indexOf(row);

  switch (action) {
    case "addRowAbove": {
      const newRow = row.cloneNode(true) as HTMLTableRowElement;
      Array.from(newRow.children).forEach((td) => {
        (td as HTMLElement).innerHTML = "<br>";
      });
      tbody.insertBefore(newRow, row);
      break;
    }
    case "addRowBelow": {
      const newRow = row.cloneNode(true) as HTMLTableRowElement;
      Array.from(newRow.children).forEach((td) => {
        (td as HTMLElement).innerHTML = "<br>";
      });
      if (row.nextSibling) {
        tbody.insertBefore(newRow, row.nextSibling);
      } else {
        tbody.appendChild(newRow);
      }
      break;
    }
    case "deleteRow": {
      if (tbody.children.length <= 1) {
        table.remove();
      } else {
        row.remove();
      }
      break;
    }
    case "addColLeft": {
      Array.from(table.rows).forEach((r) => {
        const isHeader = r.children[colIndex]?.tagName === "TH";
        const newCell = document.createElement(isHeader ? "th" : "td");
        newCell.innerHTML = "<br>";
        newCell.style.border = "1px solid #cbd5e1";
        newCell.style.padding = "8px 12px";
        r.insertBefore(newCell, r.children[colIndex]);
      });
      break;
    }
    case "addColRight": {
      Array.from(table.rows).forEach((r) => {
        const isHeader = r.children[colIndex]?.tagName === "TH";
        const newCell = document.createElement(isHeader ? "th" : "td");
        newCell.innerHTML = "<br>";
        newCell.style.border = "1px solid #cbd5e1";
        newCell.style.padding = "8px 12px";
        const target = r.children[colIndex];
        if (target && target.nextSibling) {
          r.insertBefore(newCell, target.nextSibling);
        } else {
          r.appendChild(newCell);
        }
      });
      break;
    }
    case "deleteCol": {
      if (row.children.length <= 1) {
        table.remove();
      } else {
        Array.from(table.rows).forEach((r) => {
          if (r.children[colIndex]) {
            r.children[colIndex].remove();
          }
        });
      }
      break;
    }
    case "deleteTable": {
      table.remove();
      break;
    }
  }

  if (onContentInput) {
    onContentInput();
  }
}
