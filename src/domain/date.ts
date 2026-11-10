/**
 * 날짜는 모두 한국 표준시(KST, UTC+9) 기준의 `YYYY-MM-DD` 문자열로 다룬다.
 * KST는 서머타임이 없으므로 고정 오프셋으로 계산해 기기 시간대 설정과 Intl 지원 여부에 영향받지 않는다.
 */

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEKDAYS_KO = ['일', '월', '화', '수', '목', '금', '토'] as const;

/** KST 기준 날짜 문자열 `YYYY-MM-DD` */
export type KstDateString = string;

/** 서버·저장소에 남기는 시각 (ISO 8601, UTC) */
export type IsoDateTimeString = string;

/** 주어진 시각이 KST로 몇 월 며칠인지 */
export function toKstDateString(date: Date = new Date()): KstDateString {
  return new Date(date.getTime() + KST_OFFSET_MS).toISOString().slice(0, 10);
}

export function kstToday(now: Date = new Date()): KstDateString {
  return toKstDateString(now);
}

/** `YYYY-MM-DD` 형식이면서 실제로 존재하는 날짜인지 (예: 2026-02-30은 false) */
export function isKstDateString(value: string): value is KstDateString {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(`${value}T00:00:00Z`);
  return !Number.isNaN(time) && new Date(time).toISOString().slice(0, 10) === value;
}

function toEpochDay(date: KstDateString): number {
  if (!isKstDateString(date)) {
    throw new RangeError(`올바르지 않은 날짜입니다: ${date}`);
  }
  return Date.parse(`${date}T00:00:00Z`) / DAY_MS;
}

/** to - from 일수. 같은 날이면 0, 다음 날이면 1 */
export function diffKstDays(from: KstDateString, to: KstDateString): number {
  return toEpochDay(to) - toEpochDay(from);
}

export function addKstDays(date: KstDateString, days: number): KstDateString {
  return new Date((toEpochDay(date) + days) * DAY_MS).toISOString().slice(0, 10);
}

/**
 * 개인 시작일 기준 통독 일차. 시작일 당일이 1일차다.
 * 시작일 이전이면 null을 돌려준다 (아직 시작 전).
 */
export function getPlanDayNumber(startedOn: KstDateString, today: KstDateString): number | null {
  const diff = diffKstDays(startedOn, today);
  return diff < 0 ? null : diff + 1;
}

/** 예: 2026-11-10 → "11월 10일 화요일" */
export function formatKstDate(date: KstDateString): string {
  const utc = new Date(toEpochDay(date) * DAY_MS);
  return `${utc.getUTCMonth() + 1}월 ${utc.getUTCDate()}일 ${WEEKDAYS_KO[utc.getUTCDay()]}요일`;
}
