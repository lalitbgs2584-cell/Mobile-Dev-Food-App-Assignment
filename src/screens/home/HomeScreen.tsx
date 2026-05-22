import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AnimatedBackdrop from '../../components/ui/AnimatedBackdrop';
import AnimatedEntrance from '../../components/ui/AnimatedEntrance';
import CategoryChips from '../../components/ui/CategoryChips';
import HomeHeader from '../../components/ui/HomeScreenHeader';
import PromoBanner from '../../components/ui/PromoBanner';
import RestaurantCard from '../../components/ui/RestaurantCard';
import SectionHeader from '../../components/ui/ScreenHeader';
import SearchBar from '../../components/ui/SearchBar';
import TopPickCard from '../../components/ui/TopPicCard';
import {
  buildCartItemFromFood,
  getRestaurantDetailParamsForFood,
  buildRestaurantDetailParams,
  matchesCategory,
} from '../../utils/catalog';
import {
  homeCategories,
  homeHeaderData,
  homePopularRestaurants,
  promoBannerData,
  topPicksData,
} from '../../constants/mockData';
import { COLORS, SPACING } from '../../constants/screenThemes';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { HomeStackParamList } from '../../navigations/types';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const { user } = useAuth();
  const { addItem } = useCart();
  const userName =
    user && `${user.firstName} ${user.lastName}`.trim().length > 0
      ? `${user.firstName} ${user.lastName}`.trim()
      : homeHeaderData.userName;
  const address = user?.address ?? homeHeaderData.address;

  const filteredRestaurants = useMemo(
    () =>
      homePopularRestaurants.filter((restaurant) =>
        matchesCategory(selectedCategoryId, [
          restaurant.name,
          restaurant.cuisine,
          restaurant.deliveryTime,
        ])
      ),
    [selectedCategoryId]
  );

  const filteredTopPicks = useMemo(
    () =>
      topPicksData.filter((pick) =>
        matchesCategory(selectedCategoryId, [
          pick.name,
          pick.restaurant,
          pick.cuisine,
          pick.description,
        ])
      ),
    [selectedCategoryId]
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />
      <AnimatedBackdrop variant="warm" />

      <View style={styles.shell}>
        <AnimatedEntrance delay={40}>
          <HomeHeader
            userName={userName}
            address={address}
            avatarUri={user?.avatarUri ?? homeHeaderData.avatarUri}
            onAvatarPress={() =>
              navigation.getParent()?.navigate('ProfileTab', {
                screen: 'ProfileHome',
                params: { openDrawer: true },
              })
            }
          />
        </AnimatedEntrance>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AnimatedEntrance delay={110}>
            <SearchBar
              placeholder="Search for food or restaurants..."
              editable={false}
              onPress={() => navigation.getParent()?.navigate('SearchTab')}
            />
          </AnimatedEntrance>

          <View style={styles.sectionGap} />

          <AnimatedEntrance delay={170}>
            <CategoryChips
              categories={homeCategories}
              selectedId={selectedCategoryId}
              onSelect={setSelectedCategoryId}
            />
          </AnimatedEntrance>

          <View style={styles.sectionGapLarge} />

          <AnimatedEntrance delay={230} scale={0.96}>
            <PromoBanner
              tag={promoBannerData.tag}
              headline={promoBannerData.headline}
              subtext={promoBannerData.subtext}
              couponCode={promoBannerData.couponCode}
              imageSource={{ uri: promoBannerData.image }}
            />
          </AnimatedEntrance>

          <View style={styles.sectionGapLarge} />

          <AnimatedEntrance delay={290}>
            <SectionHeader
              title={
                selectedCategoryId === 'all'
                  ? 'Popular Restaurants'
                  : 'Matching Restaurants'
              }
            />
          </AnimatedEntrance>

          <FlatList
            data={filteredRestaurants}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
            ItemSeparatorComponent={() => <View style={styles.cardSpacer} />}
            renderItem={({ item, index }) => (
              <AnimatedEntrance delay={340 + index * 70} fromX={20} fromY={16}>
                <RestaurantCard
                  item={{
                    id: item.id,
                    name: item.name,
                    imageSource: { uri: item.image },
                    rating: item.rating,
                    deliveryTime: item.deliveryTime,
                    priceHint: item.priceHint,
                    isNew: item.isNew,
                  }}
                  cardWidth={176}
                  onPress={() =>
                    navigation.navigate(
                      'RestaurantDetail',
                      buildRestaurantDetailParams(item)
                    )
                  }
                />
              </AnimatedEntrance>
            )}
          />

          <View style={styles.sectionGapLarge} />

          <AnimatedEntrance delay={390}>
            <SectionHeader
              title={
                selectedCategoryId === 'all'
                  ? 'Top Picks for You'
                  : 'Category Picks'
              }
            />
          </AnimatedEntrance>

          {filteredTopPicks.map((pick, index) => (
            <AnimatedEntrance
              key={pick.id}
              delay={450 + index * 80}
              fromY={18}
              scale={0.97}
            >
              <TopPickCard
                item={{
                  id: pick.id,
                  name: pick.name,
                  restaurant: pick.restaurant,
                  imageSource: { uri: pick.image },
                  rating: pick.rating,
                  price: pick.price,
                  originalPrice: pick.originalPrice,
                  tag: pick.tag,
                }}
                onPress={() =>
                  navigation.navigate(
                    'RestaurantDetail',
                    getRestaurantDetailParamsForFood(pick)
                  )
                }
                onAddPress={() => addItem(buildCartItemFromFood(pick))}
              />
            </AnimatedEntrance>
          ))}

          {filteredRestaurants.length === 0 && filteredTopPicks.length === 0 ? (
            <View style={styles.emptyState} />
          ) : null}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  shell: {
    flex: 1,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.sm,
    paddingBottom: 148,
  },
  hList: {
    paddingHorizontal: SPACING.xl,
  },
  cardSpacer: {
    width: 14,
  },
  sectionGap: {
    height: 18,
  },
  sectionGapLarge: {
    height: 24,
  },
  bottomSpacer: {
    height: 12,
  },
  emptyState: {
    height: 8,
  },
});
