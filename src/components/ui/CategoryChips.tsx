import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, FONTS, SPACING } from '../../constants/screenThemes';

export interface Category {
  id: string;
  label: string;
  emoji?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

interface CategoryChipsProps {
  categories: Category[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const CategoryChip: React.FC<{
  item: Category;
  isActive: boolean;
  onPress: () => void;
}> = ({ item, isActive, onPress }) => (
  <TouchableOpacity
    style={styles.chip}
    onPress={onPress}
    activeOpacity={0.75}
  >
    <View style={[styles.iconBox, isActive && styles.iconBoxActive]}>
      {item.iconName ? (
        <Ionicons
          name={item.iconName}
          size={20}
          color={isActive ? '#FFFFFF' : COLORS.textSecondary}
        />
      ) : (
        <Text style={styles.emoji}>{item.emoji}</Text>
      )}
    </View>
    <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
      {item.label}
    </Text>
  </TouchableOpacity>
);

const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedId,
  onSelect,
}) => {
  const [active, setActive] = useState(selectedId ?? categories[0]?.id);

  useEffect(() => {
    if (selectedId) {
      setActive(selectedId);
    }
  }, [selectedId]);

  const handleSelect = (id: string) => {
    setActive(id);
    onSelect?.(id);
  };

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
          <CategoryChip
            item={item}
            isActive={item.id === active}
            onPress={() => handleSelect(item.id)}
          />
        
      )}
    />
  );
};

export default CategoryChips;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: 4,
    paddingRight: SPACING.xxl,
  },
  separator: {
    width: 14,
  },
  chip: {
    alignItems: 'center',
    gap: 8,
    minWidth: 64,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.bgChip,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5,
  },
  iconBoxActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.borderAccent,
    shadowColor: COLORS.orange,
    shadowOpacity: 0.28,
    shadowRadius: 14,
  },
  emoji: {
    fontSize: 22,
  },
  chipLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: FONTS.medium,
  },
  chipLabelActive: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.semiBold,
  },
});
