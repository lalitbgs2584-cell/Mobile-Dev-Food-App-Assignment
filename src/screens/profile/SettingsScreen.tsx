import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants/screenThemes';

const settingsRows = [
  {
    id: 's1',
    title: 'Push Notifications',
    value: 'Enabled',
    iconName: 'notifications-outline',
  },
  {
    id: 's2',
    title: 'Saved Address',
    value: '1 location',
    iconName: 'location-outline',
  },
  {
    id: 's3',
    title: 'Payment Methods',
    value: '2 cards',
    iconName: 'card-outline',
  },
];

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.eyebrow}>Drawer Screen</Text>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.copy}>
          A lightweight destination inside the Profile drawer for demonstrating
          nested drawer navigation.
        </Text>

        <View style={styles.list}>
          {settingsRows.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.iconWrap}>
                <Ionicons
                  name={item.iconName as keyof typeof Ionicons.glyphMap}
                  size={18}
                  color={COLORS.textPrimary}
                />
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMeta}>{item.value}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.textMuted}
              />
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
  eyebrow: {
    color: COLORS.orangeSoft,
    fontSize: 12,
    fontWeight: FONTS.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 6,
    color: COLORS.textPrimary,
    fontSize: 30,
    fontWeight: FONTS.bold,
  },
  copy: {
    marginTop: 12,
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 420,
  },
  list: {
    marginTop: 24,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 14,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: FONTS.semiBold,
  },
  cardMeta: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
});
