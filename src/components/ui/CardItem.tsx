import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS, FONTS } from '../../constants/screenThemes';

export interface CardItemData {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  rating?: number;
  meta?: string;
  price?: string;
  trailingText?: string;
  tag?: string;
  isNew?: boolean,
  deliveryTime?: string;

}

interface CardItemProps {
  item: CardItemData;
  variant?: 'row' | 'compact';
  showAddButton?: boolean;
  onPress?: (id: string) => void;
  onAddPress?: (id: string) => void;
}

const CardItem: React.FC<CardItemProps> = ({
  item,
  variant = 'row',
  showAddButton = false,
  onPress,
  onAddPress,
}) => {
  const handleAddPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onAddPress?.(item.id);
  };

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        activeOpacity={0.86}
        style={styles.compactCard}
        onPress={() => onPress?.(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.compactImage} />
        <View style={styles.compactBody}>
          <Text numberOfLines={1} style={styles.compactTitle}>
            {item.title}
          </Text>
          {item.subtitle ? (
            <Text numberOfLines={1} style={styles.compactSubtitle}>
              {item.subtitle}
            </Text>
          ) : null}
          {item.price ? <Text style={styles.compactPrice}>{item.price}</Text> : null}
        </View>
        {showAddButton ? (
          <TouchableOpacity
            style={styles.compactAddButton}
            activeOpacity={0.8}
            onPress={handleAddPress}
            disabled={!onAddPress}
          >
            <Ionicons name="add" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      style={styles.rowCard}
      onPress={() => onPress?.(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.rowImage} />

      <View style={styles.rowBody}>
        <View style={styles.rowTop}>
          <View style={styles.rowTextBlock}>
            <Text numberOfLines={1} style={styles.rowTitle}>
              {item.title}
            </Text>
            {item.subtitle || item.deliveryTime ? (
              <Text numberOfLines={1} style={styles.rowSubtitle}>
                {item.subtitle ?? item.deliveryTime}
              </Text>
            ) : null}
          </View>

          {showAddButton ? (
            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.8}
              onPress={handleAddPress}
              disabled={!onAddPress}
            >
              <Ionicons name="add" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          ) : item.trailingText ? (
            <Text style={styles.trailingText}>{item.trailingText}</Text>
          ) : null}
        </View>

        <View style={styles.rowBottom}>
          <View style={styles.metaGroup}>
            {item.rating ? (
              <View style={styles.ratingWrap}>
                <Ionicons name="star" size={11} color={COLORS.gold} />
                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
              </View>
            ) : null}
            {item.meta ? <Text style={styles.metaText}>{item.meta}</Text> : null}
          </View>

          {item.price ? <Text style={styles.rowPrice}>{item.price}</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.bgCard,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
  },
  rowImage: {
    width: 74,
    height: 74,
    borderRadius: 18,
  },
  rowBody: {
    flex: 1,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowTextBlock: {
    flex: 1,
  },
  rowTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: FONTS.semiBold,
  },
  rowSubtitle: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailingText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: FONTS.semiBold,
  },
  rowBottom: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  metaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: FONTS.semiBold,
  },
  metaText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: FONTS.medium,
  },
  rowPrice: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: FONTS.bold,
  },
  compactCard: {
    width: 126,
    backgroundColor: COLORS.bgCard,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
  },
  compactImage: {
    width: '100%',
    height: 88,
    borderRadius: 16,
  },
  compactBody: {
    paddingTop: 10,
    paddingHorizontal: 4,
  },
  compactTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: FONTS.semiBold,
  },
  compactSubtitle: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  compactPrice: {
    marginTop: 6,
    color: COLORS.orangeSoft,
    fontSize: 12,
    fontWeight: FONTS.semiBold,
  },
  compactAddButton: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
