import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants/screenThemes';

const helpItems = [
  {
    id: 'h1',
    question: 'How do I open the drawer?',
    answer: 'Tap the menu icon on the Profile screen or swipe from the edge.',
  },
  {
    id: 'h2',
    question: 'How is auth persisted?',
    answer:
      'Mock user data is stored locally so the app restores the correct stack on reload.',
  },
  {
    id: 'h3',
    question: 'What does the Orders badge mean?',
    answer:
      'It mirrors the current cart quantity and disappears when checkout clears the cart.',
  },
];

export default function HelpScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="help-buoy-outline" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Help</Text>
          <Text style={styles.copy}>
            This screen exists inside the Profile drawer to demonstrate nested
            drawer routes and smooth movement between account tools.
          </Text>
        </View>

        <View style={styles.list}>
          {helpItems.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>{item.answer}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 140,
  },
  hero: {
    borderRadius: 28,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 18,
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: FONTS.bold,
  },
  copy: {
    marginTop: 10,
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  list: {
    marginTop: 22,
    gap: 12,
  },
  card: {
    borderRadius: 22,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  question: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: FONTS.semiBold,
  },
  answer: {
    marginTop: 8,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});
