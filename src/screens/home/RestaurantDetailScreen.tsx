import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../../components/ui/Button';
import CardItem from '../../components/ui/CardItem';
import {
  featuredRestaurant,
  restaurantDetails,
} from '../../constants/mockData';
import { COLORS, FONTS } from '../../constants/screenThemes';
import { useCart } from '../../hooks/useCart';
import { HomeStackParamList } from '../../navigations/types';

const formatCopy = (value: string) =>
  value
    .replace(/Ã‚Â·/g, 'Â·')
    .replace(/Ã¢â‚¬â€/g, '—')
    .replace(/ÃƒÂ§/g, 'ç')
    .replace(/ÃƒÂ©/g, 'é')
    .replace(/ÃƒÂª/g, 'ê')
    .replace(/ÃƒÂ­/g, 'í')
    .replace(/ÃƒÂ±/g, 'ñ');

type RestaurantDetailProps = NativeStackScreenProps<
  HomeStackParamList,
  'RestaurantDetail'
>;

const RestaurantDetailScreen = ({
  navigation,
  route,
}: RestaurantDetailProps) => {
  const { addItem, itemCount, summary } = useCart();
  const { restaurantId, restaurantName, image, price, deliveryTime } =
    route.params;

  const normalizedRestaurantId = restaurantId.startsWith('r')
    ? restaurantId
    : `r${restaurantId}`;
  const detail =
    restaurantDetails[normalizedRestaurantId] ??
    restaurantDetails[restaurantId] ??
    {
      ...featuredRestaurant,
      id: normalizedRestaurantId,
      name: restaurantName ?? `Restaurant ${restaurantId}`,
    };

  const reviewMeta = `${detail.rating.toFixed(1)} (${detail.reviewCount})`;
  const cartSubtitle = `${itemCount} items  |  ${summary.subtotal}`;

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.shell}>
          <View style={styles.heroWrap}>
            <Image
              source={{ uri: image ?? detail.heroImage }}
              style={styles.heroImage}
            />
            <View style={styles.heroOverlay} />

            <View style={styles.topActions}>
              <View />

              <View style={styles.actionGroup}>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
                  <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.ratingPill}>
              <Ionicons name="star" size={12} color={COLORS.gold} />
              <Text style={styles.ratingText}>{reviewMeta}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <Text style={styles.title}>
              {formatCopy(restaurantName ?? detail.name)}
            </Text>
            <Text style={styles.cuisineLine}>{formatCopy(detail.cuisineLine)}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaPill}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={COLORS.textPrimary}
                />
                <Text style={styles.metaText}>
                  {formatCopy(detail.deliveryMeta)}
                </Text>
              </View>
              {price ? (
                <View style={styles.metaPill}>
                  <Ionicons
                    name="wallet-outline"
                    size={14}
                    color={COLORS.textPrimary}
                  />
                  <Text style={styles.metaText}>{price}</Text>
                </View>
              ) : null}
              {deliveryTime ? (
                <View style={styles.metaPill}>
                  <Ionicons
                    name="flash-outline"
                    size={14}
                    color={COLORS.textPrimary}
                  />
                  <Text style={styles.metaText}>{deliveryTime}</Text>
                </View>
              ) : null}
            </View>

            <Text style={styles.description}>{formatCopy(detail.description)}</Text>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended</Text>
              <Text style={styles.sectionMeta}>
                {detail.recommended.length} items
              </Text>
            </View>

            <View style={styles.cardList}>
              {detail.recommended.map((item) => (
                <CardItem
                  key={item.id}
                  item={{
                    id: item.id,
                    title: formatCopy(item.name),
                    subtitle: formatCopy(item.cuisine),
                    image: item.image,
                    price: item.price,
                    rating: item.rating,
                    meta: item.deliveryTime,
                  }}
                  showAddButton
                  onPress={() =>
                    addItem({
                      id: item.id,
                      title: formatCopy(item.name),
                      subtitle: formatCopy(detail.name),
                      image: item.image,
                      price: item.price,
                    })
                  }
                  onAddPress={() =>
                    addItem({
                      id: item.id,
                      title: formatCopy(item.name),
                      subtitle: formatCopy(detail.name),
                      image: item.image,
                      price: item.price,
                    })
                  }
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInner}>
          <Button
            title="View Cart"
            subtitle={cartSubtitle}
            leadingIconName="cart-outline"
            variant="primary"
            style={styles.footerButton}
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  content: {
    paddingBottom: 128,
  },
  shell: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  heroWrap: {
    height: 340,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.34)',
  },
  topActions: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7,9,15,0.46)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingPill: {
    position: 'absolute',
    right: 20,
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(7,9,15,0.82)',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: FONTS.bold,
  },
  body: {
    marginTop: -10,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: COLORS.bgPrimary,
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 32,
    fontWeight: FONTS.bold,
  },
  cuisineLine: {
    marginTop: 8,
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  metaRow: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  metaText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: FONTS.medium,
  },
  description: {
    marginTop: 16,
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  sectionHeader: {
    marginTop: 28,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: FONTS.bold,
  },
  sectionMeta: {
    color: COLORS.orangeSoft,
    fontSize: 13,
    fontWeight: FONTS.semiBold,
  },
  cardList: {
    gap: 12,
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
  footerButton: {
    minHeight: 64,
    borderRadius: 24,
  },
});
