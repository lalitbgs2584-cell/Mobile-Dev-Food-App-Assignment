import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/navigation/CustomDrawerContent';
import { COLORS } from '../constants/screenThemes';
import OrdersScreen from '../screens/orders/OrdersScreen';
import HelpScreen from '../screens/profile/HelpScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import { ProfileDrawerParamList } from './types';

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

export default function ProfileDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="ProfileHome"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: COLORS.bgPrimary,
          width: 300,
        },
        sceneStyle: {
          backgroundColor: COLORS.bgPrimary,
        },
      }}
    >
      <Drawer.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="MyOrders"
        component={OrdersScreen}
        options={{ title: 'My Orders' }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  );
}
