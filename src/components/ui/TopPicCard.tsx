import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS, SPACING } from '../../constants/screenThemes';

export interface TopPick {
  id: string;
  name: string;
  restaurant: string;
  imageSource: ImageSourcePropType;
  rating: number;
  price: string;
  originalPrice?: string;
  tag?: string;
}

interface TopPickCardProps {
  item: TopPick;
  onPress?: (id: string) => void;
  onAddPress?: (id: string) => void;
}

const TopPickCard: React.FC<TopPickCardProps> = ({
  item,
  onPress,
  onAddPress,
}) => {
  const handleAddPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onAddPress?.(item.id);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(item.id)}
      activeOpacity={0.85}
    >
      <View style={styles.imageWrap}>
        <Image source={item.imageSource} style={styles.image} resizeMode="cover" />
        {item.tag ? (
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.info}>
        <View style={styles.topRow}>
          <View style={styles.textBlock}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.restaurant} numberOfLines={1}>
              {item.restaurant}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.7}
            onPress={handleAddPress}
            disabled={!onAddPress}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={11} color={COLORS.gold} />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{item.price}</Text>
            {item.originalPrice ? (
              <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TopPickCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.bgCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    marginBottom: 14,
    padding: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  imageWrap: {
    width: 92,
    height: 92,
    position: 'relative',
    flexShrink: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: FONTS.bold,
  },
  info: {
    flex: 1,
    paddingLeft: 14,
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: FONTS.semiBold,
  },
  restaurant: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    shadowColor: COLORS.orange,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: COLORS.bgElevated,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ratingText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: FONTS.semiBold,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  price: {
    color: COLORS.orange,
    fontSize: 16,
    fontWeight: FONTS.bold,
  },
  originalPrice: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
});
