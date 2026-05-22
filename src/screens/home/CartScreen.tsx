import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AnimatedBackdrop from '../../components/ui/AnimatedBackdrop';
import AnimatedEntrance from '../../components/ui/AnimatedEntrance';
import Button from '../../components/ui/Button';
import CardItem from '../../components/ui/CardItem';
import CartItem from '../../components/ui/CartItem';
import { cartData } from '../../constants/mockData';
import { COLORS, FONTS } from '../../constants/screenThemes';
import { useCart } from '../../hooks/useCart';
import { useOrders } from '../../hooks/useOrders';
import { HomeStackParamList } from '../../navigations/types';

type CartScreenProps = NativeStackScreenProps<HomeStackParamList, 'Cart'>;

const CartScreen = ({ navigation }: CartScreenProps) => {
  const {
    items,
    isEmpty,
    summary,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCart();
  const { placeOrder } = useOrders();

  const handleCheckout = () => {
    const order = placeOrder({
      items,
      summary,
    });

    clearCart();
    navigation.replace('OrderSuccess', {
      orderId: order.id,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />
      <AnimatedBackdrop variant="celebration" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <AnimatedEntrance delay={40}>
          <Text style={styles.title}>Your Cart</Text>
        </AnimatedEntrance>

        <View style={styles.cartList}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <AnimatedEntrance
                key={item.id}
                delay={100 + index * 50}
                fromY={16}
              >
                <CartItem
                  item={item}
                  onDecrease={() => decrementItem(item.id)}
                  onIncrease={() => incrementItem(item.id)}
                  onRemove={() => removeItem(item.id)}
                />
              </AnimatedEntrance>
            ))
          ) : (
            <AnimatedEntrance delay={120} scale={0.97}>
              <View style={styles.emptyState}>
                <Ionicons
                  name="bag-handle-outline"
                  size={28}
                  color={COLORS.textMuted}
                />
                <Text style={styles.emptyTitle}>Your cart is empty</Text>
                <Text style={styles.emptyCopy}>
                  Add a dish from Restaurant Detail to light up the Orders badge.
                </Text>
                <Button
                  title="Go Back"
                  variant="ghost"
                  trailingIconName={undefined}
                  onPress={navigation.goBack}
                  style={styles.emptyButton}
                />
              </View>
            </AnimatedEntrance>
          )}
        </View>

        <AnimatedEntrance delay={180}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>You might also like</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.suggestionRow}
            >
              {cartData.suggestions.map((item, index) => (
                <AnimatedEntrance
                  key={item.id}
                  delay={220 + index * 55}
                  fromX={18}
                  fromY={14}
                >
                  <CardItem
                    item={item}
                    variant="compact"
                    showAddButton
                    onPress={() =>
                      addItem({
                        id: item.id,
                        title: item.title,
                        subtitle: item.subtitle ?? 'Suggested for you',
                        image: item.image,
                        price: item.price ?? '$0.00',
                      })
                    }
                    onAddPress={() =>
                      addItem({
                        id: item.id,
                        title: item.title,
                        subtitle: item.subtitle ?? 'Suggested for you',
                        image: item.image,
                        price: item.price ?? '$0.00',
                      })
                    }
                  />
                </AnimatedEntrance>
              ))}
            </ScrollView>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={240}>
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{summary.subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>{summary.deliveryFee}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{summary.total}</Text>
            </View>

            <View
              style={[styles.savingsBanner, isEmpty && styles.savingsBannerMuted]}
            >
              <Ionicons name="shield-checkmark" size={15} color="#90F2BE" />
              <Text style={styles.savingsText}>
                {isEmpty
                  ? 'Place an order to unlock the confirmation screen and saved order tracking.'
                  : cartData.summary.savingsMessage}
              </Text>
            </View>
          </View>
        </AnimatedEntrance>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInner}>
          <AnimatedEntrance delay={180}>
            <Button
              title={isEmpty ? 'Keep Browsing' : 'Proceed to Checkout'}
              variant="primary"
              style={styles.checkoutButton}
              onPress={isEmpty ? navigation.goBack : handleCheckout}
            />
          </AnimatedEntrance>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

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
    paddingBottom: 128,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: FONTS.bold,
  },
  cartList: {
    marginTop: 18,
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  emptyTitle: {
    marginTop: 14,
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: FONTS.bold,
  },
  emptyCopy: {
    marginTop: 8,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: 18,
    width: '100%',
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: FONTS.bold,
    marginBottom: 14,
  },
  suggestionRow: {
    gap: 12,
    paddingRight: 18,
  },
  summarySection: {
    marginTop: 28,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  summaryValue: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: FONTS.semiBold,
  },
  totalRow: {
    marginTop: 6,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: FONTS.bold,
  },
  totalValue: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: FONTS.bold,
  },
  savingsBanner: {
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(51,209,122,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(51,209,122,0.24)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  savingsBannerMuted: {
    opacity: 0.78,
  },
  savingsText: {
    color: '#90F2BE',
    fontSize: 12,
    fontWeight: FONTS.medium,
  },
  footer: {
    position: 'absolute',
    right: 0,
    bottom: 24,
    left: 0,
    alignItems: 'center',
  },
  footerInner: {
    width: '100%',
    maxWidth: 760,
    paddingHorizontal: 20,
  },
  checkoutButton: {
    minHeight: 62,
    borderRadius: 24,
  },
});
