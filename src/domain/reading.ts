/**
 * 사용자 기록과 통독 일정 도메인 타입.
 * 개인 기록(진행, 형광펜, 마지막 위치)과 공동체 일정(ReadingPlan, DailyReading)은 서로 참조하지 않는다.
 * "오늘 통독 완료" 같은 값은 저장하지 않고 일정 + 개인 기록으로 계산한다.
 */

import type { BookId } from './bible';
import type { IsoDateTimeString, KstDateString } from './date';

export type UserId = string;

export interface User {
  id: UserId;
  nickname: string;
  createdAt: IsoDateTimeString;
}

/** 완료한 장만 기록한다. 기록이 없으면 미완료. (userId, bookId, chapterNumber)가 고유 키. */
export interface ReadingProgress {
  userId: UserId;
  bookId: BookId;
  chapterNumber: number;
  completedAt: IsoDateTimeString;
}

export const HIGHLIGHT_COLORS = ['yellow', 'green', 'blue', 'pink'] as const;

/** 색상은 hex가 아닌 토큰으로 저장해 라이트/다크 모드에서 각각 매핑한다. */
export type HighlightColor = (typeof HIGHLIGHT_COLORS)[number];

/** 한 구절에 하나만 존재한다. (userId, bookId, chapterNumber, verseNumber)가 고유 키. */
export interface Highlight {
  id: string;
  userId: UserId;
  bookId: BookId;
  chapterNumber: number;
  verseNumber: number;
  color: HighlightColor;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
}

/** 한 책 안의 연속된 장 범위. 책을 넘어가는 범위는 두 개로 나눈다. */
export interface ReadingRange {
  bookId: BookId;
  startChapter: number;
  endChapter: number;
}

/**
 * 공동체 공통 통독 계획.
 * 일차는 사용자 개인 시작일(UserReadingPlan.startedOn)부터 세므로 계획 자체에는 달력 날짜가 없다.
 */
export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  totalDays: number;
}

export interface DailyReading {
  id: string;
  planId: string;
  /** 1부터 시작 */
  dayNumber: number;
  readingRanges: ReadingRange[];
}

export interface UserReadingPlan {
  userId: UserId;
  planId: string;
  /** 개인 시작일 (KST). 이 날이 1일차다. */
  startedOn: KstDateString;
}

export interface LastReadPosition {
  userId: UserId;
  bookId: BookId;
  chapterNumber: number;
  verseNumber: number;
  updatedAt: IsoDateTimeString;
}
