import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { MotiView } from 'moti';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AnimatedBackdrop from '../../components/ui/AnimatedBackdrop';
import AnimatedEntrance from '../../components/ui/AnimatedEntrance';
import { profileData } from '../../constants/mockData';
import { COLORS, FONTS } from '../../constants/screenThemes';
import { useAuth } from '../../hooks/useAuth';
import { ProfileDrawerParamList } from '../../navigations/types';

type ProfileScreenProps = DrawerScreenProps<
  ProfileDrawerParamList,
  'ProfileHome'
>;

const quickLinks: Array<{
  id: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  route: 'MyOrders' | 'Settings' | 'Help';
}> = [
  {
    id: 'orders',
    title: 'My Orders',
    iconName: 'receipt-outline',
    route: 'MyOrders',
  },
  {
    id: 'settings',
    title: 'Settings',
    iconName: 'settings-outline',
    route: 'Settings',
  },
  {
    id: 'help',
    title: 'Help',
    iconName: 'help-circle-outline',
    route: 'Help',
  },
];

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  const { user } = useAuth();
  const fullName =
    user && `${user.firstName} ${user.lastName}`.trim().length > 0
      ? `${user.firstName} ${user.lastName}`.trim()
      : profileData.name;
  const email = user?.email ?? profileData.email;
  const address = user?.address ?? 'Set a home delivery address';

  useEffect(() => {
    if (!route.params?.openDrawer) {
      return;
    }

    const timer = setTimeout(() => {
      navigation.openDrawer();
      navigation.setParams({ openDrawer: undefined });
    }, 0);

    return () => clearTimeout(timer);
  }, [navigation, route.params?.openDrawer]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgPrimary} />
      <AnimatedBackdrop variant="warm" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <AnimatedEntrance delay={40}>
          <View style={styles.topBar}>
            <Text style={styles.pageTitle}>Profile</Text>

            <TouchableOpacity
              style={styles.menuTrigger}
              activeOpacity={0.86}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="menu-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={120} scale={0.97}>
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
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
                <Ionicons name="person" size={36} color={COLORS.textPrimary} />
              </MotiView>

              <View style={styles.profileText}>
                <Text style={styles.name}>{fullName}</Text>
                <Text style={styles.email}>{email}</Text>
                <Text style={styles.address}>{address}</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              {profileData.stats.map((stat, index) => (
                <AnimatedEntrance
                  key={stat.id}
                  delay={180 + index * 55}
                  style={styles.statCard}
                  fromY={16}
                >
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </AnimatedEntrance>
              ))}
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={220} scale={0.98}>
          <View style={styles.menuCard}>
            {quickLinks.map((item, index) => (
              <AnimatedEntrance
                key={item.id}
                delay={260 + index * 55}
                fromY={16}
              >
                <TouchableOpacity
                  activeOpacity={0.86}
                  style={styles.menuRow}
                  onPress={() => navigation.navigate(item.route)}
                >
                  <View style={styles.menuIconWrap}>
                    <Ionicons
                      name={item.iconName}
                      size={18}
                      color={COLORS.textPrimary}
                    />
                  </View>
                  <Text style={styles.menuLabel}>{item.title}</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              </AnimatedEntrance>
            ))}
          </View>
        </AnimatedEntrance>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 140,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  pageTitle: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: FONTS.bold,
  },
  menuTrigger: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    borderRadius: 24,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: FONTS.bold,
  },
  email: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  address: {
    marginTop: 6,
    color: COLORS.textMuted,
    fontSize: 12,
  },
  statsRow: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: COLORS.bgElevated,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: FONTS.bold,
  },
  statLabel: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  menuCard: {
    marginTop: 22,
    borderRadius: 24,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 6,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: FONTS.semiBold,
    marginLeft: 12,
  },
});
