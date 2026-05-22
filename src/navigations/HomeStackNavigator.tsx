import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomHeader from '../components/navigation/CustomHeader';
import { COLORS } from '../constants/screenThemes';
import CartScreen from '../screens/home/CartScreen';
import HomeScreen from '../screens/home/HomeScreen';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import RestaurantDetailScreen from '../screens/home/RestaurantDetailScreen';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: COLORS.bgPrimary },
        header: (props) => <CustomHeader {...props} />,
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={({ route }) => ({
          title: route.params.restaurantName ?? 'Restaurant Detail',
          headerBackTitle: 'Home',
          headerStyle: { backgroundColor: '#11151D' },
        })}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          headerBackTitle: 'Restaurant',
          headerStyle: { backgroundColor: '#11151D' },
          animation: 'fade_from_bottom',
        }}
      />

      <Stack.Screen
        name="OrderSuccess"
        component={OrderDetailScreen}
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}
