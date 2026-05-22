import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS, SPACING } from '../../constants/screenThemes';

export interface Restaurant {
  id: string;
  name: string;
  imageSource: ImageSourcePropType;
  rating: number;
  deliveryTime: string;
  priceHint?: string;
  tags?: string[];
  isNew?: boolean;
}

interface RestaurantCardProps {
  item: Restaurant;
  onPress?: (id: string) => void;
  cardWidth?: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  item,
  onPress,
  cardWidth = 160,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => onPress?.(item.id)}
      activeOpacity={0.85}
    >
      <View style={styles.imageWrap}>
        <Image source={item.imageSource} style={styles.image} resizeMode="cover" />

        {item.isNew ? (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        ) : null}

        <View style={styles.ratingPill}>
          <Ionicons name="star" size={12} color={COLORS.gold} />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={12} color={COLORS.textMuted} />
          <Text style={styles.metaText}>{item.deliveryTime}</Text>
        </View>

        {item.priceHint ? (
          <Text style={styles.priceHint}>{item.priceHint}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },
  imageWrap: {
    width: '100%',
    height: 118,
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: FONTS.bold,
    letterSpacing: 0.5,
  },
  ratingPill: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(7, 9, 15, 0.82)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  ratingText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: FONTS.bold,
  },
  info: {
    paddingTop: 12,
    gap: 6,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: FONTS.semiBold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: FONTS.medium,
  },
  priceHint: {
    color: COLORS.orangeSoft,
    fontSize: 12,
    fontWeight: FONTS.semiBold,
  },
});
