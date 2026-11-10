import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { DummyBadge } from '@/components/dummy-badge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { bibleRepository } from '@/data';
import type { BibleVerse } from '@/domain/bible';
import { useBibleChapter } from '@/features/bible/use-bible';

export default function ReadScreen() {
  const params = useLocalSearchParams<{ bookId: string; chapter: string }>();
  const bookId = typeof params.bookId === 'string' ? params.bookId : '';
  const chapterNumber = Number(params.chapter);
  const state = useBibleChapter(bookId, chapterNumber);

  if (state.status === 'loading') {
    return (
      <ThemedView style={styles.root}>
        <ActivityIndicator style={styles.center} />
      </ThemedView>
    );
  }

  if (state.status === 'error' || state.data === null) {
    return (
      <ThemedView style={styles.root}>
        <Stack.Screen options={{ title: '' }} />
        <View style={styles.message}>
          <ThemedText type="smallBold">
            {state.status === 'error' ? '본문을 불러오지 못했습니다.' : '찾을 수 없는 본문입니다.'}
          </ThemedText>
          <Link href="/bible" style={styles.link}>
            <ThemedText type="linkPrimary">성경 목록으로 이동</ThemedText>
          </Link>
        </View>
      </ThemedView>
    );
  }

  const { book, chapter } = state.data;

  return (
    <ThemedView style={styles.root}>
      <Stack.Screen options={{ title: `${book.name} ${chapter.chapterNumber}장` }} />
      <FlatList
        data={chapter.verses}
        keyExtractor={(verse) => verse.id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.list}
        ListHeaderComponent={bibleRepository.isDummy ? <DummyBadge /> : undefined}
        ListHeaderComponentStyle={styles.header}
        renderItem={({ item }) => <VerseRow verse={item} />}
      />
    </ThemedView>
  );
}

function VerseRow({ verse }: { verse: BibleVerse }) {
  return (
    <View style={styles.verse}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.verseNumber}>
        {verse.verseNumber}
      </ThemedText>
      <ThemedText style={styles.verseText}>{verse.text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  center: {
    marginTop: Spacing.five,
  },
  message: {
    padding: Spacing.four,
    gap: Spacing.two,
  },
  link: {
    paddingVertical: Spacing.two,
  },
  list: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
  },
  header: {
    paddingVertical: Spacing.three,
  },
  verse: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  verseNumber: {
    minWidth: 20,
    textAlign: 'right',
  },
  verseText: {
    flex: 1,
    fontSize: 18,
    lineHeight: 31,
  },
});
