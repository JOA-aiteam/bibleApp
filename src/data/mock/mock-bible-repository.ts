/**
 * 더미 성경 Repository.
 * 실제 번역본 본문을 쓰지 않는다. 책·장 구조는 실제 값이고, 절 수와 본문은 테스트용으로 생성한다.
 */

import {
  isPositiveInteger,
  toVerseKey,
  type BibleBook,
  type BibleChapter,
  type BibleVerse,
  type BookId,
} from '../../domain/bible';
import { BIBLE_BOOKS } from '../bible-books';
import type { BibleRepository } from '../repositories/bible-repository';

const MIN_VERSES = 10;
const MAX_VERSES = 30;

/** 같은 장은 항상 같은 절 수가 나오도록 책·장으로 정해지는 값 (실제 절 수가 아님) */
export function getDummyVerseCount(bookId: BookId, chapterNumber: number): number {
  let hash = 0;
  for (const char of `${bookId}.${chapterNumber}`) {
    hash = (Math.imul(hash, 31) + char.charCodeAt(0)) >>> 0;
  }
  return MIN_VERSES + (hash % (MAX_VERSES - MIN_VERSES + 1));
}

export function getDummyVerseText(book: BibleBook, chapterNumber: number, verseNumber: number): string {
  return `테스트용 말씀 데이터입니다. ${book.name} ${chapterNumber}장 ${verseNumber}절입니다.`;
}

export class MockBibleRepository implements BibleRepository {
  readonly isDummy = true;

  private readonly booksById = new Map(BIBLE_BOOKS.map((book) => [book.id, book]));

  async getBooks(): Promise<BibleBook[]> {
    return [...BIBLE_BOOKS];
  }

  async getBook(bookId: BookId): Promise<BibleBook | null> {
    return this.booksById.get(bookId) ?? null;
  }

  async getChapter(bookId: BookId, chapterNumber: number): Promise<BibleChapter | null> {
    const book = this.booksById.get(bookId);
    if (!book || !isPositiveInteger(chapterNumber) || chapterNumber > book.totalChapters) {
      return null;
    }
    const verseCount = getDummyVerseCount(bookId, chapterNumber);
    const verses: BibleVerse[] = Array.from({ length: verseCount }, (_, index) =>
      this.createVerse(book, chapterNumber, index + 1)
    );
    return { bookId, chapterNumber, verses };
  }

  async getVerse(bookId: BookId, chapterNumber: number, verseNumber: number): Promise<BibleVerse | null> {
    const book = this.booksById.get(bookId);
    if (
      !book ||
      !isPositiveInteger(chapterNumber) ||
      chapterNumber > book.totalChapters ||
      !isPositiveInteger(verseNumber) ||
      verseNumber > getDummyVerseCount(bookId, chapterNumber)
    ) {
      return null;
    }
    return this.createVerse(book, chapterNumber, verseNumber);
  }

  private createVerse(book: BibleBook, chapterNumber: number, verseNumber: number): BibleVerse {
    return {
      id: toVerseKey(book.id, chapterNumber, verseNumber),
      bookId: book.id,
      chapterNumber,
      verseNumber,
      text: getDummyVerseText(book, chapterNumber, verseNumber),
    };
  }
}
