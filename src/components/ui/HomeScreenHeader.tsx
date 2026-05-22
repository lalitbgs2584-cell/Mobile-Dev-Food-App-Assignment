import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants/screenThemes';

interface HomeHeaderProps {
  userName: string;
  address: string;
  avatarUri?: string;
  onAvatarPress?: () => void;
  onAddressPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName,
  address,
  avatarUri,
  onAvatarPress,
  onAddressPress,
}) => {
  const initials = userName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.8}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addressBlock}
          onPress={onAddressPress}
          activeOpacity={0.7}
        >
          <Text style={styles.deliverLabel}>Deliver to</Text>
          <View style={styles.addressRow}>
            <Text style={styles.addressText} numberOfLines={1}>
              {address}
            </Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color={COLORS.textPrimary}
              style={styles.chevron}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: COLORS.bgPrimary,
    paddingHorizontal: 22,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
  },
  avatarFallback: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.orange,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarText: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.bold,
    fontSize: 16,
  },
  addressBlock: {
    flex: 1,
  },
  deliverLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: FONTS.medium,
    letterSpacing: 0.3,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  addressText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: FONTS.bold,
    maxWidth: '90%',
  },
  chevron: {
    marginLeft: 4,
  },
});
