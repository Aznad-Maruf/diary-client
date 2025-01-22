export interface DiaryEntry {
    id?: string;
    title?: string;
    content: string;
    tags?: string[];
    date?: string;
    deleted?: boolean;
  }