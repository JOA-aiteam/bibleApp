import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

/**
 * 로그인 화면 골격. 로그인 방식은 카카오, 이메일 두 가지다.
 * Supabase Auth 연결 전이라 버튼은 비활성 상태다.
 */
export default function LoginScreen() {
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.hero}>
          <ThemedText type="subtitle" accessibilityRole="header">
            JOY 성경 통독
          </ThemedText>
          <ThemedText themeColor="textSecondary">하루 3장씩, 성경 66권 1,189장을 함께 읽습니다</ThemedText>
        </View>

        <View style={styles.actions}>
          <Pressable disabled accessibilityState={{ disabled: true }} style={[styles.button, styles.kakao]}>
            <ThemedText style={styles.kakaoLabel}>카카오 로그인</ThemedText>
          </Pressable>
          <Pressable disabled accessibilityState={{ disabled: true }} style={[styles.button, styles.email]}>
            <ThemedText>이메일로 로그인</ThemedText>
          </Pressable>
          <ThemedText type="small" themeColor="textSecondary" style={styles.notice}>
            로그인 연결은 다음 작업에서 진행합니다.
          </ThemedText>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <ThemedText type="linkPrimary">돌아가기</ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  actions: {
    gap: Spacing.three - Spacing.one,
  },
  button: {
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakao: {
    backgroundColor: '#FEE500',
  },
  kakaoLabel: {
    color: 'rgba(0, 0, 0, 0.85)',
  },
  email: {
    borderWidth: 1,
    borderColor: '#E3E0D8',
  },
  notice: {
    textAlign: 'center',
  },
  back: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
});
