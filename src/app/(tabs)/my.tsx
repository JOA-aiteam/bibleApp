import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export default function MyScreen() {
  return (
    <Screen title="내 정보">
      <View style={styles.container}>
        <ThemedText themeColor="textSecondary">프로필과 설정은 다음 작업에서 연결합니다.</ThemedText>
        <Link href="/login" style={styles.link}>
          <ThemedText type="linkPrimary">로그인 화면 보기</ThemedText>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  link: {
    paddingVertical: Spacing.two,
  },
});
