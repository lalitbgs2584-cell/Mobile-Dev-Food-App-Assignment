import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoardingScreen from '../screens/onboarding/OnBoardingScreen'
import AuthNavigator from './AuthNavigator'
import HomeScreen from '../screens/home/HomeScreen'
import SignupScreen from '../screens/auth/SignUpScreen'

const Stack = createNativeStackNavigator<any>()

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
