/**
 * 앱에서 쓰는 Repository 구현체를 한곳에서 정한다.
 * 실제 데이터로 바꿀 때는 이 파일의 구현체만 교체한다.
 */

import { MockBibleRepository } from './mock/mock-bible-repository';
import type { BibleRepository } from './repositories/bible-repository';

export const bibleRepository: BibleRepository = new MockBibleRepository();

export type { BibleRepository };
