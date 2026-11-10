import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { formatKstDate, kstToday } from '@/domain/date';

export default function HomeScreen() {
  const today = kstToday();

  return (
    <Screen>
      <View style={styles.container}>
        <ThemedText type="small" themeColor="textSecondary">
          {formatKstDate(today)}
        </ThemedText>
        <ThemedText type="subtitle" accessibilityRole="header">
          오늘 읽을 말씀
        </ThemedText>
        <ThemedText themeColor="textSecondary">통독 일정과 진행률은 다음 작업에서 연결합니다.</ThemedText>
        <Link
          href={{ pathname: '/read/[bookId]/[chapter]', params: { bookId: 'GEN', chapter: '1' } }}
          style={styles.link}>
          <ThemedText type="linkPrimary">창세기 1장 읽기</ThemedText>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    gap: Spacing.two,
  },
  link: {
    paddingVertical: Spacing.two,
  },
});
