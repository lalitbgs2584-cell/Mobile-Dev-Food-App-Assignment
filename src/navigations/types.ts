import { NavigatorScreenParams } from '@react-navigation/native';

import { AuthUser } from '../store/authStore';

export type HomeStackParamList = {
  HomeMain: undefined;
  RestaurantDetail: {
    restaurantId: string;
    restaurantName?: string;
    price?: string;
    image?: string;
    rating?: number;
    deliveryTime?: string;
    isNew?: boolean;
  };
  Cart: undefined;
  OrderSuccess: {
    orderId: string;
  };
};

export type ProfileDrawerParamList = {
  ProfileHome: {
    openDrawer?: boolean;
  } | undefined;
  MyOrders: undefined;
  Settings: undefined;
  Help: undefined;
};

export type HomeTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList> | undefined;
  SearchTab: undefined;
  OrdersTab: undefined;
  ProfileTab: NavigatorScreenParams<ProfileDrawerParamList> | undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Home: NavigatorScreenParams<HomeTabParamList> | undefined;
};

export type MockLoginForm = AuthUser & {
  password: string;
};
