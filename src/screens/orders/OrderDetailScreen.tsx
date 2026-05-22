import Ionicons from '@expo/vector-icons/Ionicons';
import { MotiText, MotiView } from 'moti';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/ui/Button';
import { orderSuccessData } from '../../constants/mockData';
import { COLORS, FONTS } from '../../constants/screenThemes';
import { useOrders } from '../../hooks/useOrders';
import { HomeStackParamList } from '../../navigations/types';

const confettiDots = [
  { top: 50, left: 30, color: '#FF8A1F', delay: 0 },
  { top: 82, right: 42, color: '#57E389', delay: 120 },
  { top: 28, right: 100, color: '#FF66C8', delay: 220 },
  { top: 116, left: 82, color: '#5B8CFF', delay: 320 },
  { top: 136, right: 72, color: '#FFD84D', delay: 420 },
  { top: 10, left: 120, color: '#A855F7', delay: 520 },
];

type OrderDetailScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'OrderSuccess'
>;

const OrderDetailScreen = ({
  navigation,
  route,
}: OrderDetailScreenProps) => {
  const { currentOrder, pastOrders } = useOrders();
  const order =
    currentOrder?.id === route.params.orderId
      ? currentOrder
      : pastOrders.find((item) => item.id === route.params.orderId) ?? null;

  const handleTrackOrder = () => {
    navigation.popToTop();
    navigation.getParent()?.navigate('OrdersTab');
  };

  const handleBackToHome = () => {
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

      <View style={styles.content}>
        <View style={styles.celebrationWrap}>
          {confettiDots.map((dot, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0.2, scale: 0.6, translateY: 0 }}
              animate={{ opacity: 1, scale: 1.1, translateY: -8 }}
              transition={{
                type: 'timing',
                duration: 1100,
                delay: dot.delay,
                loop: true,
                repeatReverse: true,
              }}
              style={[
                styles.confettiDot,
                dot,
                {
                  backgroundColor: dot.color,
                },
              ]}
            />
          ))}

          <MotiView
            from={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 120 }}
            style={styles.successRing}
          >
            <MotiView
              from={{ opacity: 0, scale: 0.3, rotate: '-25deg' }}
              animate={{ opacity: 1, scale: 1, rotate: '0deg' }}
              transition={{
                type: 'spring',
                damping: 12,
                stiffness: 160,
                delay: 240,
              }}
              style={styles.successCore}
            >
              <Ionicons name="checkmark" size={62} color="#FFFFFF" />
            </MotiView>
          </MotiView>
        </View>

        <MotiText
          from={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 450, delay: 220 }}
          style={styles.title}
        >
          {orderSuccessData.title}
        </MotiText>

        <Text style={styles.message}>{orderSuccessData.message}</Text>

        <View style={styles.orderIdCard}>
          <Text style={styles.orderIdLabel}>Order ID:</Text>
          <Text style={styles.orderIdValue}>
            {order?.id ?? orderSuccessData.orderId}
          </Text>
        </View>

        <View style={styles.buttonStack}>
          <Button
            title="Track Order"
            variant="success"
            onPress={handleTrackOrder}
          />
          <Button
            title="Back to Home"
            variant="ghost"
            trailingIconName={undefined}
            onPress={handleBackToHome}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    paddingHorizontal: 28,
  },
  celebrationWrap: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confettiDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  successRing: {
    width: 154,
    height: 154,
    borderRadius: 77,
    backgroundColor: 'rgba(51,209,122,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(51,209,122,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCore: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 10,
  },
  title: {
    marginTop: 18,
    color: COLORS.textPrimary,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: FONTS.bold,
    textAlign: 'center',
  },
  message: {
    marginTop: 14,
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 280,
  },
  orderIdCard: {
    marginTop: 24,
    borderRadius: 18,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    gap: 6,
  },
  orderIdLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  orderIdValue: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: FONTS.bold,
  },
  buttonStack: {
    marginTop: 30,
    width: '100%',
    gap: 14,
  },
});
