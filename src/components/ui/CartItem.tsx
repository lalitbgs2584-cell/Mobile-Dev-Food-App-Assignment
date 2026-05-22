import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CartLineItem } from '../../constants/mockData';
import { COLORS, FONTS } from '../../constants/screenThemes';

interface CartItemProps {
  item: CartLineItem;
  onDecrease?: () => void;
  onIncrease?: () => void;
  onRemove?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.details}>
        <View style={styles.topRow}>
          <View style={styles.titleWrap}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.8}
            onPress={onRemove}
          >
            <Ionicons name="close" size={14} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{item.price}</Text>

          <View style={styles.quantityWrap}>
            <TouchableOpacity
              style={styles.quantityButton}
              activeOpacity={0.8}
              onPress={onDecrease}
            >
              <Ionicons name="remove" size={14} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              activeOpacity={0.8}
              onPress={onIncrease}
            >
              <Ionicons name="add" size={14} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.bgCard,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    gap: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 18,
  },
  details: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleWrap: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: FONTS.semiBold,
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  price: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: FONTS.bold,
  },
  quantityWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.bgElevated,
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    minWidth: 18,
    textAlign: 'center',
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: FONTS.semiBold,
  },
});
