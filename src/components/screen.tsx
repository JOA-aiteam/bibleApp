import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

interface ScreenProps {
  /** 탭 화면 상단 제목. 헤더가 있는 Stack 화면에서는 생략한다. */
  title?: string;
  children?: ReactNode;
}

/** 탭 화면 공통 틀: 상단 안전 영역 + 제목 + 본문 */
export function Screen({ title, children }: ScreenProps) {
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {title ? (
          <ThemedText type="subtitle" style={styles.title} accessibilityRole="header">
            {title}
          </ThemedText>
        ) : null}
        <View style={styles.content}>{children}</View>
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
  },
  title: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  content: {
    flex: 1,
  },
});
