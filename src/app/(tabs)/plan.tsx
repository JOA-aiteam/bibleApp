import { StyleSheet } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { TOTAL_CHAPTER_COUNT } from '@/data/bible-books';

export default function PlanScreen() {
  return (
    <Screen title="통독표">
      <ThemedText themeColor="textSecondary" style={styles.text}>
        성경 66권 {TOTAL_CHAPTER_COUNT.toLocaleString('ko-KR')}장의 읽음 표시는 다음 작업에서 연결합니다.
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: Spacing.four,
  },
});
