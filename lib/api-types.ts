export interface GitaChapter {
  chapter_number: number;
  verses_count: number;
  name: string;
  translation: string;
  transliteration: string;
  meaning: {
    en: string;
    hi: string;
  };
  summary: {
    en: string;
    hi: string;
  };
}

export interface GitaCommentaryAuthor {
  author: string;
  et?: string; // English translation
  ec?: string; // English commentary
  ht?: string; // Hindi translation
  hc?: string; // Hindi commentary
  sc?: string; // Sanskrit commentary
}

export interface GitaVerse {
  _id: string;
  chapter: number;
  verse: number;
  slok: string;
  transliteration: string;
  [key: string]: string | number | GitaCommentaryAuthor | undefined;
}
