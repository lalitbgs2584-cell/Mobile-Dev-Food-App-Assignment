import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants/screenThemes';

const resolveBackgroundColor = (backgroundColor: unknown) => {
  if (Array.isArray(backgroundColor)) {
    const firstObject = backgroundColor.find(
      (item) => item && typeof item === 'object' && 'backgroundColor' in item
    );

    if (
      firstObject &&
      typeof firstObject === 'object' &&
      'backgroundColor' in firstObject &&
      typeof firstObject.backgroundColor === 'string'
    ) {
      return firstObject.backgroundColor;
    }
  }

  if (
    backgroundColor &&
    typeof backgroundColor === 'object' &&
    'backgroundColor' in backgroundColor &&
    typeof backgroundColor.backgroundColor === 'string'
  ) {
    return backgroundColor.backgroundColor;
  }

  return COLORS.bgCard;
};

export default function CustomHeader({
  navigation,
  options,
  route,
  back,
}: NativeStackHeaderProps) {
  const title =
    typeof options.title === 'string' && options.title.length > 0
      ? options.title
      : route.name;
  const backLabel =
    typeof options.headerBackTitle === 'string'
      ? options.headerBackTitle
      : back?.title ?? 'Back';
  const backgroundColor = resolveBackgroundColor(options.headerStyle);

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor }}>
      <View style={[styles.header, { backgroundColor }]}>
        {back ? (
          <Pressable
            onPress={navigation.goBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={COLORS.textPrimary}
            />
            <Text style={styles.backLabel}>{backLabel}</Text>
          </Pressable>
        ) : (
          <View style={styles.sidePlaceholder} />
        )}

        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <View style={styles.sidePlaceholder} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    minWidth: 92,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  backLabel: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: FONTS.semiBold,
  },
  title: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: FONTS.bold,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  sidePlaceholder: {
    minWidth: 92,
  },
});
