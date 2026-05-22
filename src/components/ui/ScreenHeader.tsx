import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, FONTS, SPACING } from '../../constants/screenThemes';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: 14,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: FONTS.bold,
  },
  action: {
    color: COLORS.pink,
    fontSize: 13,
    fontWeight: FONTS.semiBold,
  },
});
