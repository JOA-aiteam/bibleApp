import type { BibleBook, BibleChapter, BibleVerse, BookId } from '../../domain/bible';

/**
 * 성경 데이터 접근 인터페이스.
 * 지금은 MockBibleRepository(더미 본문)를 쓰고, 실제 번역본이나 API를 연결할 때 이 인터페이스의 구현체만 바꾼다.
 * 없는 책·장·절을 요청하면 예외 대신 null을 돌려준다.
 */
export interface BibleRepository {
  /** 본문이 테스트용 더미 데이터인지. UI와 공유 이미지의 "테스트 데이터" 표시에 쓴다. */
  readonly isDummy: boolean;

  /** 66권, 성경 순서대로 */
  getBooks(): Promise<BibleBook[]>;

  getBook(bookId: BookId): Promise<BibleBook | null>;

  getChapter(bookId: BookId, chapterNumber: number): Promise<BibleChapter | null>;

  getVerse(bookId: BookId, chapterNumber: number, verseNumber: number): Promise<BibleVerse | null>;
}
