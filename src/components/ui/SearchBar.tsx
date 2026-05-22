import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { COLORS, FONTS, SPACING } from '../../constants/screenThemes';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  editable?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder = 'Search for food or restaurants...',
  onChangeText,
  onPress,
  editable = true,
}) => {
  const content = (
    <>
      <View style={styles.searchIconWrap}>
        <Feather name="search" size={16} color={COLORS.textSecondary} />
      </View>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        editable={editable}
        pointerEvents={editable ? 'auto' : 'none'}
        returnKeyType="search"
      />

      {value ? (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onChangeText?.('')}
          activeOpacity={0.8}
        >
          <Feather name="x" size={16} color={COLORS.textSecondary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.actionButton}>
          <Feather name="sliders" size={16} color={COLORS.orange} />
        </View>
      )}
    </>
  );

  if (!editable) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.85}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgInput,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.xl,
    paddingHorizontal: 12,
    height: 58,
    gap: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  searchIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: FONTS.regular,
    paddingVertical: 0,
  },
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
