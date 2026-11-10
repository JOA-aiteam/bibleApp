import { StyleSheet } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export default function RecordsScreen() {
  return (
    <Screen title="내 기록">
      <ThemedText themeColor="textSecondary" style={styles.text}>
        형광펜 모아보기는 다음 작업에서 연결합니다.
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: Spacing.four,
  },
});
