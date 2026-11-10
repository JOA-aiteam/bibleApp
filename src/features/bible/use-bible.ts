import { useEffect, useState } from 'react';

import { bibleRepository } from '@/data';
import type { BibleBook, BibleChapter, BookId } from '@/domain/bible';

export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'ready'; data: T }
  | { status: 'error'; error: Error };

function useLoad<T>(load: () => Promise<T>, deps: readonly unknown[]): LoadState<T> {
  const [state, setState] = useState<LoadState<T>>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    load().then(
      (data) => {
        if (!cancelled) setState({ status: 'ready', data });
      },
      (error: unknown) => {
        if (!cancelled) {
          setState({ status: 'error', error: error instanceof Error ? error : new Error(String(error)) });
        }
      }
    );
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 호출부가 deps를 명시한다
  }, deps);

  return state;
}

export function useBibleBooks(): LoadState<BibleBook[]> {
  return useLoad(() => bibleRepository.getBooks(), []);
}

export interface ChapterWithBook {
  book: BibleBook;
  chapter: BibleChapter;
}

/** 없는 책이나 장이면 data가 null */
export function useBibleChapter(bookId: BookId, chapterNumber: number): LoadState<ChapterWithBook | null> {
  return useLoad(async () => {
    const [book, chapter] = await Promise.all([
      bibleRepository.getBook(bookId),
      bibleRepository.getChapter(bookId, chapterNumber),
    ]);
    return book && chapter ? { book, chapter } : null;
  }, [bookId, chapterNumber]);
}
