import {
  FoodData,
  RestaurantData,
  popularRestaurants,
} from '../constants/mockData';
import { HomeStackParamList } from '../navigations/types';

const normalizeText = (value: string) => value.trim().toLowerCase();

const categoryKeywordMap: Record<string, string[]> = {
  all: [],
  pizza: ['pizza', 'italian'],
  burger: ['burger', 'burgers', 'smash'],
  sushi: ['sushi', 'japanese', 'ramen', 'gyoza'],
  dessert: ['dessert', 'cake', 'sweet', 'pastry', 'ice cream', 'tiramisu'],
  biryani: ['biryani', 'indian', 'kebab', 'curry', 'naan'],
  chinese: ['chinese', 'dim sum', 'wok', 'fried rice'],
  beverages: ['drink', 'drinks', 'juice', 'smoothie', 'beverage', 'cafe'],
};

export const matchesSearchText = (value: string, query: string) =>
  normalizeText(value).includes(normalizeText(query));

export const matchesFoodQuery = (food: FoodData, query: string) =>
  [food.name, food.restaurant, food.cuisine, food.description].some((value) =>
    matchesSearchText(value, query)
  );

export const matchesRestaurantQuery = (
  restaurant: RestaurantData,
  query: string
) =>
  [restaurant.name, restaurant.cuisine, restaurant.deliveryTime].some((value) =>
    matchesSearchText(value, query)
  );

export const buildRestaurantDetailParams = (
  restaurant: RestaurantData
): HomeStackParamList['RestaurantDetail'] => ({
  restaurantId: restaurant.id,
  restaurantName: restaurant.name,
  price: restaurant.priceHint,
  image: restaurant.image,
  rating: restaurant.rating,
  deliveryTime: restaurant.deliveryTime,
  isNew: restaurant.isNew,
});

export const getRestaurantForFood = (food: FoodData) =>
  popularRestaurants.find(
    (restaurant) => normalizeText(restaurant.name) === normalizeText(food.restaurant)
  );

export const getRestaurantDetailParamsForFood = (
  food: FoodData
): HomeStackParamList['RestaurantDetail'] => {
  const restaurant = getRestaurantForFood(food);

  if (restaurant) {
    return buildRestaurantDetailParams(restaurant);
  }

  return {
    restaurantId: food.id,
    restaurantName: food.restaurant,
    price: food.price,
    image: food.image,
    rating: food.rating,
    deliveryTime: food.deliveryTime,
  };
};

export const buildCartItemFromFood = (food: FoodData) => ({
  id: food.id,
  title: food.name,
  subtitle: food.restaurant,
  image: food.image,
  price: food.price,
});

export const matchesCategory = (categoryId: string, values: string[]) => {
  if (categoryId === 'all') {
    return true;
  }

  const haystack = values.map(normalizeText).join(' ');
  const keywords = categoryKeywordMap[categoryId] ?? [categoryId];

  return keywords.some((keyword) => haystack.includes(normalizeText(keyword)));
};
