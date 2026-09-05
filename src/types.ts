export type ViewMode = 'page' | 'continuous' | 'markdown' | 'split';

export type DeviceMode = 'pc' | 'mobile';

export type EditorTheme = 'clean-light' | 'sepia' | 'obsidian' | 'mint';

export interface PageSetup {
  paperSize: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margin?: 'normal' | 'narrow' | 'wide';
  margins?: { top: number; bottom: number; left: number; right: number };
  showPageNumbers?: boolean;
}

export interface DocumentSnapshot {
  id: string;
  timestamp: string;
  name: string;
  content: string;
}

export interface DocumentFile {
  id: string;
  title: string;
  content: string; // HTML content for visual editor
  markdown?: string; // Markdown alternative/synced
  createdAt?: string;
  updatedAt?: string;
  lastModified?: number;
  wordCount?: number;
  characterCount?: number;
  pinned?: boolean;
}

export interface DocumentStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  fleschScore: number;
  fleschGrade: string;
}

export interface FindReplaceState {
  isOpen: boolean;
  findText: string;
  replaceText: string;
  matchCase: boolean;
  currentIndex: number;
  totalMatches: number;
}
