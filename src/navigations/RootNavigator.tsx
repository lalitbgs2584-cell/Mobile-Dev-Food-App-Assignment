import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { useAuth } from '../hooks/useAuth';
import { RootStackParamList } from './types';
import OnBoardingScreen from '../screens/onboarding/OnBoardingScreen';
import SplashScreen from '../screens/splash/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [showSplash, setShowSplash] = useState(true);
  const { hasHydrated, isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3200);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash || !hasHydrated) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      key={`${isAuthenticated}`}
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Home"
        component={AppNavigator}
        options={{ animation: 'fade_from_bottom' }}
      />
    </Stack.Navigator>
  );
}
