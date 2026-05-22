import Ionicons from '@expo/vector-icons/Ionicons';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';

import AnimatedEntrance from '../ui/AnimatedEntrance';
import { profileData } from '../../constants/mockData';
import { COLORS, FONTS } from '../../constants/screenThemes';
import { ProfileDrawerParamList } from '../../navigations/types';
import { useAuth } from '../../hooks/useAuth';

const drawerItems: Array<{
  label: string;
  route: keyof ProfileDrawerParamList;
  iconName: keyof typeof Ionicons.glyphMap;
}> = [
  {
    label: 'My Orders',
    route: 'MyOrders',
    iconName: 'receipt-outline',
  },
  {
    label: 'Settings',
    route: 'Settings',
    iconName: 'settings-outline',
  },
  {
    label: 'Help',
    route: 'Help',
    iconName: 'help-circle-outline',
  },
];

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const { logout, user } = useAuth();
  const fullName =
    user && `${user.firstName} ${user.lastName}`.trim().length > 0
      ? `${user.firstName} ${user.lastName}`.trim()
      : profileData.name;

  const handleLogout = () => {
    logout();
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <AnimatedEntrance delay={40} scale={0.97}>
        <View style={styles.header}>
          <MotiView
            from={{ scale: 0.96, opacity: 0.9 }}
            animate={{ scale: 1.04, opacity: 1 }}
            transition={{
              type: 'timing',
              duration: 1800,
              loop: true,
              repeatReverse: true,
            }}
            style={styles.avatar}
          >
            <Ionicons name="person" size={28} color={COLORS.textPrimary} />
          </MotiView>
          <Text style={styles.name}>{fullName}</Text>
        </View>
      </AnimatedEntrance>

      <View style={styles.menu}>
        {drawerItems.map((item, index) => (
          <AnimatedEntrance key={item.route} delay={110 + index * 55} fromY={16}>
            <DrawerItem
              label={item.label}
              onPress={() => props.navigation.navigate(item.route)}
              labelStyle={styles.label}
              style={styles.item}
              icon={({ color, size }) => (
                <Ionicons name={item.iconName} size={size} color={color} />
              )}
              activeTintColor={COLORS.orange}
              inactiveTintColor={COLORS.textPrimary}
              activeBackgroundColor="rgba(255, 106, 0, 0.12)"
            />
          </AnimatedEntrance>
        ))}

        <AnimatedEntrance delay={280} fromY={16}>
          <DrawerItem
            label="Logout"
            onPress={handleLogout}
            labelStyle={[styles.label, styles.logoutLabel]}
            style={[styles.item, styles.logoutItem]}
            icon={({ size }) => (
              <Ionicons
                name="log-out-outline"
                size={size}
                color={COLORS.danger}
              />
            )}
            inactiveTintColor={COLORS.danger}
            activeTintColor={COLORS.danger}
            activeBackgroundColor="rgba(255, 92, 122, 0.12)"
          />
        </AnimatedEntrance>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.bgPrimary,
    paddingTop: 0,
  },
  header: {
    margin: 16,
    borderRadius: 20,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    marginBottom: 12,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: FONTS.bold,
  },
  menu: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  item: {
    borderRadius: 18,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: FONTS.semiBold,
  },
  logoutItem: {
    marginTop: 14,
  },
  logoutLabel: {
    color: COLORS.danger,
  },
});
