import React from 'react';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS } from '../constants/screenThemes';
import { useCart } from '../hooks/useCart';
import OrdersScreen from '../screens/orders/OrdersScreen';
import ProfileDrawerNavigator from './ProfileDrawerNavigator';
import SearchScreen from '../screens/search/SearchScreen';
import HomeStackNavigator from './HomeStackNavigator';
import { HomeTabParamList } from './types';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HIDDEN_TAB_ROUTES = new Set(['RestaurantDetail', 'Cart', 'OrderSuccess']);

const shouldHideDashboardTabBar = (
  route: RouteProp<HomeTabParamList, 'HomeTab'>
) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeMain';
  return HIDDEN_TAB_ROUTES.has(routeName);
};

const getTabIcon = (
  routeName: keyof HomeTabParamList,
  focused: boolean
): keyof typeof Ionicons.glyphMap => {
  switch (routeName) {
    case 'HomeTab':
      return focused ? 'home' : 'home-outline';
    case 'SearchTab':
      return focused ? 'search' : 'search-outline';
    case 'OrdersTab':
      return focused ? 'receipt' : 'receipt-outline';
    case 'ProfileTab':
      return focused ? 'person' : 'person-outline';
  }

  return 'ellipse-outline';
};

export default function HomeScreenTabNavigator() {
  const { hasHydrated, itemCount } = useCart();
  const ordersBadge = !hasHydrated
    ? undefined
    : itemCount > 0
      ? itemCount > 9
        ? '9+'
        : itemCount
      : undefined;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.orange,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarIconStyle: styles.tabIcon,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={getTabIcon(route.name as keyof HomeTabParamList, focused)}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={({ route }) => ({
          title: 'Home',
          tabBarStyle: shouldHideDashboardTabBar(route)
            ? styles.hiddenTabBar
            : styles.tabBar,
        })}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersScreen}
        options={{
          title: 'Orders',
          tabBarBadge: ordersBadge,
          tabBarBadgeStyle: styles.ordersBadge,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileDrawerNavigator}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.OS === 'ios' ? 18 : 12,
    height: 74,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#0C1018',
    paddingTop: 10,
    paddingBottom: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 10,
  },
  tabItem: {
    paddingVertical: 2,
  },
  tabIcon: {
    marginTop: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  ordersBadge: {
    backgroundColor: COLORS.orange,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  hiddenTabBar: {
    display: 'none',
  },
});
