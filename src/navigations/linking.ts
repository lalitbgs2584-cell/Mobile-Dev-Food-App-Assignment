import { LinkingOptions } from '@react-navigation/native';

import { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['foodapp://'],
  config: {
    screens: {
      Onboarding: 'onboarding',
      Auth: {
        screens: {
          Login: 'login',
        },
      },
      Home: {
        screens: {
          HomeTab: {
            screens: {
              HomeMain: '',
              RestaurantDetail: 'restaurant/:restaurantId',
              Cart: 'cart',
              OrderSuccess: 'order-success/:orderId',
            },
          },
          SearchTab: 'search',
          OrdersTab: 'orders',
          ProfileTab: {
            screens: {
              ProfileHome: 'profile',
              MyOrders: 'profile/orders',
              Settings: 'profile/settings',
              Help: 'profile/help',
            },
          },
        },
      },
    },
  },
};
