/**
 * 성경 구조 도메인 타입.
 * 본문 데이터의 출처(더미, 실제 번역본, API)와 무관하게 UI와 서비스가 공유하는 형태다.
 */

/** 구약(old) / 신약(new) */
export type Testament = 'old' | 'new';

/**
 * 책 식별자. USFM 3글자 코드를 쓴다 (예: GEN, EXO, MAT, 1CO).
 * URL 경로(`/read/GEN/1`)와 구절 키(`GEN.1.1`)에 그대로 들어간다.
 */
export type BookId = string;

export interface BibleBook {
  id: BookId;
  /** 한국어 책 이름 (예: 창세기) */
  name: string;
  testament: Testament;
  /** 1(창세기) ~ 66(요한계시록) */
  order: number;
  totalChapters: number;
}

/** 구절 키: `${bookId}.${chapter}.${verse}` (예: GEN.1.1) */
export type VerseKey = `${BookId}.${number}.${number}`;

export interface BibleVerse {
  id: VerseKey;
  bookId: BookId;
  chapterNumber: number;
  verseNumber: number;
  text: string;
}

export interface BibleChapter {
  bookId: BookId;
  chapterNumber: number;
  verses: BibleVerse[];
}

export interface VerseLocation {
  bookId: BookId;
  chapterNumber: number;
  verseNumber: number;
}

export function toVerseKey(bookId: BookId, chapterNumber: number, verseNumber: number): VerseKey {
  return `${bookId}.${chapterNumber}.${verseNumber}`;
}

/** 형식이 맞지 않으면 null. 책·장·절이 실제로 존재하는지는 Repository가 판단한다. */
export function parseVerseKey(key: string): VerseLocation | null {
  const match = /^([1-3]?[A-Z]{2,3})\.([1-9]\d*)\.([1-9]\d*)$/.exec(key);
  if (!match) return null;
  return {
    bookId: match[1],
    chapterNumber: Number(match[2]),
    verseNumber: Number(match[3]),
  };
}

export function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}
