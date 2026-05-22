import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useMemo, useState } from 'react';
import { MotiView } from 'moti';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AnimatedBackdrop from '../../components/ui/AnimatedBackdrop';
import AnimatedEntrance from '../../components/ui/AnimatedEntrance';
import CardItem from '../../components/ui/CardItem';
import { currentOrderData } from '../../constants/mockData';
import { COLORS, FONTS } from '../../constants/screenThemes';
import { useOrders } from '../../hooks/useOrders';

const mapPins = [
  { top: 26, left: 28, color: '#9BFF5A' },
  { top: 40, right: 58, color: '#FFD54A' },
  { top: 72, left: 120, color: '#FF7A45' },
  { bottom: 34, left: 48, color: '#57E389' },
  { bottom: 26, right: 70, color: '#FF66C8' },
];

const formatLabel = (count: number, singular: string, plural: string) =>
  count === 1 ? `${count} ${singular}` : `${count} ${plural}`;

const formatPlacedAt = (value: string) => {
  const timestamp = new Date(value).getTime();
  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) {
    return 'Just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours} hr ago`;
  }

  return new Date(value).toLocaleDateString();
};

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');
  const { hasHydrated, currentOrder, pastOrders } = useOrders();

  const currentOrderRestaurant = currentOrder?.restaurantName ?? 'No active order';
  const hasCurrentOrder = Boolean(currentOrder);
  const steps = currentOrder?.steps ?? currentOrderData.steps;

  const recentOrders = useMemo(
    () =>
      pastOrders.map((order) => ({
        id: order.id,
        title: order.restaurantName,
        subtitle: `${formatLabel(order.itemCount, 'item', 'items')}  |  ${formatPlacedAt(order.placedAt)}`,
        image: order.image,
        meta: order.total,
        trailingText: 'Delivered',
      })),
    [pastOrders]
  );

  if (!hasHydrated) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.loadingState}>
          <ActivityIndicator size="large" color={COLORS.orange} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />
      <AnimatedBackdrop variant="cool" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <AnimatedEntrance delay={40}>
          <Text style={styles.title}>My Orders</Text>
        </AnimatedEntrance>

        <AnimatedEntrance delay={110}>
          <View style={styles.segmentedControl}>
            <Pressable
              style={[
                styles.segment,
                activeTab === 'current' && styles.segmentActive,
              ]}
              onPress={() => setActiveTab('current')}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'current' && styles.segmentActiveText,
                ]}
              >
                Current
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.segment,
                activeTab === 'past' && styles.segmentActive,
              ]}
              onPress={() => setActiveTab('past')}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'past' && styles.segmentActiveText,
                ]}
              >
                Past
              </Text>
            </Pressable>
          </View>
        </AnimatedEntrance>

        {activeTab === 'current' ? (
          <>
            <AnimatedEntrance delay={180} scale={0.97}>
              <View style={styles.orderCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Current Order</Text>
                  <MotiView
                    from={{ opacity: 0.82, scale: 0.98 }}
                    animate={{
                      opacity: hasCurrentOrder ? 1 : 0.82,
                      scale: hasCurrentOrder ? 1.05 : 1,
                    }}
                    transition={{
                      type: 'timing',
                      duration: 1100,
                      loop: hasCurrentOrder,
                      repeatReverse: true,
                    }}
                    style={styles.liveBadge}
                  >
                    <Text style={styles.liveBadgeText}>
                      {hasCurrentOrder ? 'Live' : 'No active order'}
                    </Text>
                  </MotiView>
                </View>

                <Text style={styles.restaurantName}>{currentOrderRestaurant}</Text>
                <Text style={styles.orderId}>
                  {hasCurrentOrder && currentOrder
                    ? `${currentOrder.id}  |  ${formatPlacedAt(currentOrder.placedAt)}`
                    : 'Place a checkout to see your live order status here.'}
                </Text>

                <View style={styles.detailRow}>
                  <View>
                    <Text style={styles.label}>Estimated Delivery</Text>
                    <Text style={styles.value}>{currentOrder?.eta ?? '--'}</Text>
                  </View>
                  <Text
                    style={[
                      styles.statusText,
                      !hasCurrentOrder && styles.statusTextMuted,
                    ]}
                  >
                    {currentOrder?.statusText ?? 'Waiting for checkout'}
                  </Text>
                </View>

                <View style={styles.summaryGrid}>
                  <View style={styles.summaryPill}>
                    <Text style={styles.summaryPillLabel}>Items</Text>
                    <Text style={styles.summaryPillValue}>
                      {currentOrder?.itemCount ?? 0}
                    </Text>
                  </View>
                  <View style={styles.summaryPill}>
                    <Text style={styles.summaryPillLabel}>Subtotal</Text>
                    <Text style={styles.summaryPillValue}>
                      {currentOrder?.subtotal ?? '$0.00'}
                    </Text>
                  </View>
                  <View style={styles.summaryPill}>
                    <Text style={styles.summaryPillLabel}>Delivery</Text>
                    <Text style={styles.summaryPillValue}>
                      {currentOrder?.deliveryFee ?? '$0.00'}
                    </Text>
                  </View>
                  <View style={styles.summaryPill}>
                    <Text style={styles.summaryPillLabel}>Total</Text>
                    <Text style={styles.summaryPillValue}>
                      {currentOrder?.total ?? '$0.00'}
                    </Text>
                  </View>
                </View>

                <View style={styles.progressRow}>
                  {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <View style={styles.progressItem}>
                        <MotiView
                          from={{ scale: 0.9, opacity: 0.8 }}
                          animate={{
                            scale:
                              hasCurrentOrder && step.state === 'active' ? 1.12 : 1,
                            opacity:
                              hasCurrentOrder && step.state !== 'pending' ? 1 : 0.82,
                          }}
                          transition={{
                            type: 'timing',
                            duration: 950,
                            loop: hasCurrentOrder && step.state === 'active',
                            repeatReverse: true,
                          }}
                          style={[
                            styles.progressDot,
                            hasCurrentOrder &&
                              step.state === 'done' &&
                              styles.progressDotDone,
                            hasCurrentOrder &&
                              step.state === 'active' &&
                              styles.progressDotActive,
                          ]}
                        />
                        <Text
                          style={[
                            styles.progressLabel,
                            hasCurrentOrder &&
                              step.state !== 'pending' &&
                              styles.progressLabelActive,
                          ]}
                        >
                          {step.label}
                        </Text>
                      </View>
                      {index < steps.length - 1 ? (
                        <View
                          style={[
                            styles.progressLine,
                            hasCurrentOrder &&
                              steps[index + 1].state !== 'pending' &&
                              styles.progressLineDone,
                          ]}
                        />
                      ) : null}
                    </React.Fragment>
                  ))}
                </View>

                <View style={styles.mapCard}>
                  <View style={styles.mapGrid} />
                  <View style={styles.routeLineOne} />
                  <View style={styles.routeLineTwo} />
                  <View style={styles.routeLineThree} />

                  {mapPins.map((pin, index) => (
                    <MotiView
                      key={index}
                      from={{ scale: 0.82, opacity: 0.72 }}
                      animate={{ scale: 1.08, opacity: 1 }}
                      transition={{
                        type: 'timing',
                        duration: 1200,
                        delay: index * 140,
                        loop: true,
                        repeatReverse: true,
                      }}
                      style={[
                        styles.pin,
                        pin,
                        {
                          backgroundColor: pin.color,
                        },
                      ]}
                    />
                  ))}

                  <MotiView
                    from={{ translateX: 0, translateY: 0, scale: 1 }}
                    animate={{
                      translateX: hasCurrentOrder ? 18 : 0,
                      translateY: hasCurrentOrder ? -10 : 0,
                      scale: hasCurrentOrder ? 1.06 : 1,
                    }}
                    transition={{
                      type: 'timing',
                      duration: 1800,
                      loop: hasCurrentOrder,
                      repeatReverse: true,
                    }}
                    style={[
                      styles.scooterBadge,
                      !hasCurrentOrder && styles.scooterBadgeMuted,
                    ]}
                  >
                    <Ionicons name="bicycle" size={16} color="#FFFFFF" />
                  </MotiView>
                </View>

                <View style={styles.riderCard}>
                  <View style={styles.riderAvatar}>
                    <Ionicons name="person" size={18} color="#FFFFFF" />
                  </View>

                  <View style={styles.riderInfo}>
                    <Text style={styles.riderRole}>
                      {!hasCurrentOrder
                        ? 'Delivery partner appears after checkout'
                        : currentOrder?.rider.role}
                    </Text>
                    <Text style={styles.riderName}>
                      {!hasCurrentOrder
                        ? 'Waiting for assignment'
                        : currentOrder?.rider.name}
                    </Text>
                    <View style={styles.riderRatingRow}>
                      <Ionicons name="star" size={12} color={COLORS.gold} />
                      <Text style={styles.riderRating}>
                        {hasCurrentOrder ? currentOrder?.rider.rating : '--'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.riderActions}>
                    <View style={styles.riderAction}>
                      <Ionicons name="call" size={15} color="#FFFFFF" />
                    </View>
                    <View style={styles.riderAction}>
                      <Ionicons name="chatbubble" size={15} color="#FFFFFF" />
                    </View>
                  </View>
                </View>
              </View>
            </AnimatedEntrance>

            <AnimatedEntrance delay={250}>
              <View style={styles.pastSection}>
                <Text style={styles.pastTitle}>Items in this Order</Text>
                <View style={styles.pastList}>
                  {currentOrder ? (
                    currentOrder.items.map((item, index) => (
                      <AnimatedEntrance
                        key={item.id}
                        delay={290 + index * 45}
                        fromY={14}
                      >
                        <CardItem
                          item={{
                            id: item.id,
                            title: item.title,
                            subtitle: item.subtitle,
                            image: item.image,
                            price: item.price,
                            meta: formatLabel(item.quantity, 'piece', 'pieces'),
                            trailingText: `x${item.quantity}`,
                          }}
                        />
                      </AnimatedEntrance>
                    ))
                  ) : (
                    <View style={styles.emptyOrderCard}>
                      <Ionicons
                        name="bag-handle-outline"
                        size={24}
                        color={COLORS.textMuted}
                      />
                      <Text style={styles.emptyOrderTitle}>No current items yet</Text>
                      <Text style={styles.emptyOrderCopy}>
                        Complete checkout once and your placed order will stay here,
                        even after the app reloads.
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </AnimatedEntrance>
          </>
        ) : (
          <AnimatedEntrance delay={180}>
            <View style={styles.pastSection}>
              <Text style={styles.pastTitle}>Recent Orders</Text>
              <View style={styles.pastList}>
                {recentOrders.length > 0 ? (
                  recentOrders.map((item, index) => (
                    <AnimatedEntrance
                      key={item.id}
                      delay={220 + index * 45}
                      fromY={14}
                    >
                      <CardItem item={item} />
                    </AnimatedEntrance>
                  ))
                ) : (
                  <View style={styles.emptyOrderCard}>
                    <Ionicons
                      name="receipt-outline"
                      size={24}
                      color={COLORS.textMuted}
                    />
                    <Text style={styles.emptyOrderTitle}>No past orders yet</Text>
                    <Text style={styles.emptyOrderCopy}>
                      Previous completed orders will be saved here automatically.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </AnimatedEntrance>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen;

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
  loadingState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: FONTS.bold,
  },
  segmentedControl: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: COLORS.bgCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 5,
  },
  segment: {
    flex: 1,
    minHeight: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: COLORS.orange,
  },
  segmentText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: FONTS.medium,
  },
  segmentActiveText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: FONTS.bold,
  },
  orderCard: {
    marginTop: 18,
    backgroundColor: COLORS.bgCard,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  liveBadge: {
    borderRadius: 999,
    backgroundColor: 'rgba(255, 106, 0, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 106, 0, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  liveBadgeText: {
    color: COLORS.orangeSoft,
    fontSize: 11,
    fontWeight: FONTS.semiBold,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: FONTS.semiBold,
  },
  restaurantName: {
    marginTop: 16,
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: FONTS.bold,
  },
  orderId: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  detailRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: FONTS.semiBold,
  },
  statusText: {
    color: COLORS.green,
    fontSize: 14,
    fontWeight: FONTS.bold,
  },
  statusTextMuted: {
    color: COLORS.textMuted,
  },
  summaryGrid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  summaryPill: {
    minWidth: 140,
    flexGrow: 1,
    borderRadius: 18,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  summaryPillLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 6,
  },
  summaryPillValue: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: FONTS.semiBold,
  },
  progressRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  progressItem: {
    alignItems: 'center',
    width: 58,
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  progressDotDone: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  progressDotActive: {
    backgroundColor: COLORS.pink,
    borderColor: COLORS.pink,
  },
  progressLabel: {
    marginTop: 8,
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
  progressLabelActive: {
    color: COLORS.textPrimary,
  },
  progressLine: {
    flex: 1,
    height: 2,
    marginTop: 7,
    backgroundColor: COLORS.border,
  },
  progressLineDone: {
    backgroundColor: COLORS.green,
  },
  mapCard: {
    marginTop: 22,
    height: 196,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#171C28',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1B2230',
    opacity: 0.95,
  },
  routeLineOne: {
    position: 'absolute',
    left: 38,
    bottom: 42,
    width: 86,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2A66FF',
    transform: [{ rotate: '-28deg' }],
  },
  routeLineTwo: {
    position: 'absolute',
    left: 102,
    top: 82,
    width: 74,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2A66FF',
    transform: [{ rotate: '20deg' }],
  },
  routeLineThree: {
    position: 'absolute',
    right: 44,
    top: 54,
    width: 78,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2A66FF',
    transform: [{ rotate: '-42deg' }],
  },
  pin: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  scooterBadge: {
    position: 'absolute',
    top: 74,
    right: 86,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scooterBadgeMuted: {
    opacity: 0.45,
  },
  riderCard: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgElevated,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  riderAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  riderRole: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: FONTS.semiBold,
  },
  riderName: {
    marginTop: 3,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  riderRatingRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  riderRating: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: FONTS.semiBold,
  },
  riderActions: {
    flexDirection: 'row',
    gap: 10,
  },
  riderAction: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1E9D62',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pastSection: {
    marginTop: 28,
  },
  pastTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: FONTS.bold,
    marginBottom: 14,
  },
  pastList: {
    gap: 12,
  },
  emptyOrderCard: {
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  emptyOrderTitle: {
    marginTop: 12,
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: FONTS.bold,
  },
  emptyOrderCopy: {
    marginTop: 8,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});
