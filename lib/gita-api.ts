import { GitaChapter, GitaVerse } from './api-types';

const BASE_URL = 'https://vedicscriptures.github.io';

export async function getAllChapters(): Promise<GitaChapter[]> {
  const response = await fetch(`${BASE_URL}/chapters/`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chapters');
  }

  return response.json();
}

export async function getChapter(chapterNumber: number): Promise<GitaChapter> {
  const response = await fetch(`${BASE_URL}/chapter/${chapterNumber}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch chapter ${chapterNumber}`);
  }

  return response.json();
}

export async function getVerse(chapterNumber: number, verseNumber: number): Promise<GitaVerse> {
  const response = await fetch(`${BASE_URL}/slok/${chapterNumber}/${verseNumber}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch verse ${chapterNumber}.${verseNumber}`);
  }

  return response.json();
}
