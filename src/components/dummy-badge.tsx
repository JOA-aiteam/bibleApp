import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

/** 본문이 실제 성경 번역본이 아니라 테스트 데이터임을 알리는 표시 */
export function DummyBadge({ label = '테스트 데이터 · 실제 성경 본문이 아닙니다' }: { label?: string }) {
  return (
    <View style={styles.badge}>
      <ThemedText type="smallBold" style={styles.text}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FCEFE0',
    borderRadius: 999,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  text: {
    color: '#A2530E',
    fontSize: 12,
    lineHeight: 16,
  },
});
