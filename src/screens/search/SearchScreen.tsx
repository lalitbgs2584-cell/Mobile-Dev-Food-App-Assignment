import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import AnimatedBackdrop from '../../components/ui/AnimatedBackdrop';
import AnimatedEntrance from '../../components/ui/AnimatedEntrance';
import CardItem from '../../components/ui/CardItem';
import SearchBar from '../../components/ui/SearchBar';
import {
  foodData,
  homePopularRestaurants,
  popularRestaurants,
  popularSearchTerms,
  topPicksData,
} from '../../constants/mockData';
import { COLORS, FONTS } from '../../constants/screenThemes';
import { useCart } from '../../hooks/useCart';
import { HomeTabParamList } from '../../navigations/types';
import {
  buildCartItemFromFood,
  buildRestaurantDetailParams,
  getRestaurantDetailParamsForFood,
  matchesFoodQuery,
  matchesRestaurantQuery,
  matchesSearchText,
} from '../../utils/catalog';

type SearchScreenProps = BottomTabScreenProps<HomeTabParamList, 'SearchTab'>;

const SearchScreen = ({ navigation }: SearchScreenProps) => {
  const [query, setQuery] = useState('');
  const { addItem } = useCart();
  const hasSearchQuery = query.trim().length > 0;

  const filteredTerms = useMemo(() => {
    if (!hasSearchQuery) {
      return popularSearchTerms;
    }

    return popularSearchTerms.filter((term) => matchesSearchText(term, query));
  }, [hasSearchQuery, query]);

  const filteredDishes = useMemo(() => {
    const source = hasSearchQuery ? foodData : topPicksData;
    const results = hasSearchQuery
      ? source.filter((dish) => matchesFoodQuery(dish, query))
      : source;

    return results.slice(0, hasSearchQuery ? 12 : 8);
  }, [hasSearchQuery, query]);

  const filteredRestaurants = useMemo(() => {
    const source = hasSearchQuery ? popularRestaurants : homePopularRestaurants;
    const results = hasSearchQuery
      ? source.filter((restaurant) => matchesRestaurantQuery(restaurant, query))
      : source;

    return results.slice(0, 10);
  }, [hasSearchQuery, query]);

  const hasAnyResults =
    filteredTerms.length > 0 ||
    filteredDishes.length > 0 ||
    filteredRestaurants.length > 0;

  const openRestaurant = (restaurantId: string) => {
    const restaurant = filteredRestaurants.find((item) => item.id === restaurantId);

    if (!restaurant) {
      return;
    }

    navigation.navigate('HomeTab', {
      screen: 'RestaurantDetail',
      params: buildRestaurantDetailParams(restaurant),
    });
  };

  const openDishRestaurant = (dishId: string) => {
    const dish = filteredDishes.find((item) => item.id === dishId);

    if (!dish) {
      return;
    }

    navigation.navigate('HomeTab', {
      screen: 'RestaurantDetail',
      params: getRestaurantDetailParamsForFood(dish),
    });
  };

  const addDishToCart = (dishId: string) => {
    const dish = filteredDishes.find((item) => item.id === dishId);

    if (!dish) {
      return;
    }

    addItem(buildCartItemFromFood(dish));
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />
      <AnimatedBackdrop variant="cool" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <AnimatedEntrance delay={40}>
          <Text style={styles.title}>Search</Text>
        </AnimatedEntrance>

        <AnimatedEntrance delay={110}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search for food, restaurants..."
          />
        </AnimatedEntrance>

        <AnimatedEntrance delay={180}>
          <View style={styles.section}>
            <Text style={styles.sectionTitleStandalone}>
              {hasSearchQuery ? 'Suggested Searches' : 'Popular Searches'}
            </Text>
            <View style={styles.tagWrap}>
              {filteredTerms.map((term, index) => (
                <AnimatedEntrance
                  key={term}
                  delay={220 + index * 35}
                  fromY={12}
                  scale={0.95}
                >
                  <TouchableOpacity
                    style={[
                      styles.tag,
                      matchesSearchText(term, query) &&
                        hasSearchQuery &&
                        styles.tagActive,
                    ]}
                    activeOpacity={0.85}
                    onPress={() => setQuery(term)}
                  >
                    <Text style={styles.tagText}>{term}</Text>
                  </TouchableOpacity>
                </AnimatedEntrance>
              ))}
            </View>
          </View>
        </AnimatedEntrance>

        {!hasAnyResults ? (
          <AnimatedEntrance delay={280} scale={0.96}>
            <View style={styles.emptyState}>
              <Ionicons
                name="search-outline"
                size={28}
                color={COLORS.textMuted}
              />
              <Text style={styles.emptyTitle}>No matches found</Text>
              <Text style={styles.emptyCopy}>
                Try another dish, restaurant, or cuisine keyword.
              </Text>
            </View>
          </AnimatedEntrance>
        ) : (
          <>
            <AnimatedEntrance delay={280}>
              <View style={styles.section}>
                <Text style={styles.sectionTitleStandalone}>
                  {hasSearchQuery ? 'Matching Dishes' : 'Recommended Dishes'}
                </Text>
                {hasSearchQuery ? (
                  <View style={[styles.recommendedRow, styles.recommendedColumn]}>
                    {filteredDishes.map((item, index) => (
                      <AnimatedEntrance
                        key={item.id}
                        delay={320 + index * 45}
                        fromY={14}
                      >
                        <CardItem
                          item={{
                            id: item.id,
                            title: item.name,
                            subtitle: item.restaurant,
                            image: item.image,
                            rating: item.rating,
                            price: item.price,
                            meta: item.deliveryTime,
                            tag: item.tag,
                          }}
                          variant="row"
                          showAddButton
                          onPress={openDishRestaurant}
                          onAddPress={addDishToCart}
                        />
                      </AnimatedEntrance>
                    ))}
                  </View>
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.recommendedRow}
                  >
                    {filteredDishes.map((item, index) => (
                      <AnimatedEntrance
                        key={item.id}
                        delay={320 + index * 55}
                        fromX={18}
                        fromY={14}
                      >
                        <CardItem
                          item={{
                            id: item.id,
                            title: item.name,
                            subtitle: item.restaurant,
                            image: item.image,
                            rating: item.rating,
                            price: item.price,
                            meta: item.deliveryTime,
                            tag: item.tag,
                          }}
                          variant="compact"
                          showAddButton
                          onPress={openDishRestaurant}
                          onAddPress={addDishToCart}
                        />
                      </AnimatedEntrance>
                    ))}
                  </ScrollView>
                )}
              </View>
            </AnimatedEntrance>

            <AnimatedEntrance delay={360}>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    {hasSearchQuery ? 'Matching Restaurants' : 'Nearby Restaurants'}
                  </Text>
                  <View style={styles.filterButton}>
                    <Ionicons
                      name="options-outline"
                      size={16}
                      color={COLORS.textPrimary}
                    />
                  </View>
                </View>

                <View style={styles.cardList}>
                  {filteredRestaurants.map((item, index) => (
                    <AnimatedEntrance
                      key={item.id}
                      delay={400 + index * 45}
                      fromY={16}
                    >
                      <CardItem
                        item={{
                          id: item.id,
                          title: item.name,
                          subtitle: item.cuisine,
                          image: item.image,
                          rating: item.rating,
                          meta: item.deliveryTime,
                          trailingText: item.priceHint.replace('From ', ''),
                        }}
                        onPress={openRestaurant}
                      />
                    </AnimatedEntrance>
                  ))}
                </View>
              </View>
            </AnimatedEntrance>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingTop: 12,
    paddingBottom: 140,
  },
  title: {
    paddingHorizontal: 20,
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: FONTS.bold,
    marginBottom: 18,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: FONTS.bold,
  },
  sectionTitleStandalone: {
    paddingHorizontal: 20,
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: FONTS.bold,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 14,
  },
  recommendedRow: {
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingRight: 28,
  },
  recommendedColumn: {
    flexDirection: 'column',
    paddingRight: 20,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagActive: {
    backgroundColor: 'rgba(255, 106, 0, 0.16)',
    borderColor: 'rgba(255, 106, 0, 0.28)',
  },
  tagText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: FONTS.medium,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  emptyState: {
    marginTop: 28,
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 20,
    paddingVertical: 28,
    alignItems: 'center',
  },
  emptyTitle: {
    marginTop: 12,
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
});
