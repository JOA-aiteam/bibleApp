import { Link } from 'expo-router';
import { ActivityIndicator, Pressable, SectionList, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { BibleBook } from '@/domain/bible';
import { useBibleBooks } from '@/features/bible/use-bible';

export default function BibleScreen() {
  const books = useBibleBooks();

  if (books.status === 'loading') {
    return (
      <Screen title="성경">
        <ActivityIndicator style={styles.center} />
      </Screen>
    );
  }

  if (books.status === 'error') {
    return (
      <Screen title="성경">
        <ThemedText style={styles.message}>성경 목록을 불러오지 못했습니다. 앱을 다시 열어 주세요.</ThemedText>
      </Screen>
    );
  }

  const sections = [
    { title: '구약', data: books.data.filter((book) => book.testament === 'old') },
    { title: '신약', data: books.data.filter((book) => book.testament === 'new') },
  ];

  return (
    <Screen title="성경">
      <SectionList
        sections={sections}
        keyExtractor={(book) => book.id}
        contentInsetAdjustmentBehavior="automatic"
        renderSectionHeader={({ section }) => (
          <ThemedView style={styles.sectionHeader}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              {section.title} {section.data.length}권
            </ThemedText>
          </ThemedView>
        )}
        renderItem={({ item }) => <BookRow book={item} />}
      />
    </Screen>
  );
}

function BookRow({ book }: { book: BibleBook }) {
  return (
    <Link
      href={{ pathname: '/read/[bookId]/[chapter]', params: { bookId: book.id, chapter: '1' } }}
      asChild>
      <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <ThemedText>{book.name}</ThemedText>
        <View style={styles.spacer} />
        <ThemedText type="small" themeColor="textSecondary">
          {book.totalChapters}장
        </ThemedText>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  center: {
    marginTop: Spacing.five,
  },
  message: {
    paddingHorizontal: Spacing.four,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.one,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: Spacing.four,
  },
  pressed: {
    opacity: 0.6,
  },
  spacer: {
    flex: 1,
  },
});
