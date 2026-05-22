import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS, FONTS, SPACING } from '../../constants/screenThemes';

interface PromoBannerProps {
  tag?: string;
  headline: string;
  subtext: string;
  couponCode: string;
  imageSource: ImageSourcePropType;
  onPress?: () => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  tag = 'Flat',
  headline,
  subtext,
  couponCode,
  imageSource,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.ambientGlow} />

      <View style={styles.left}>
        <Text style={styles.tag}>{tag}</Text>
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.subtext}>{subtext}</Text>

        <View style={styles.couponPill}>
          <Text style={styles.couponText}>USE CODE: {couponCode}</Text>
        </View>
      </View>

      <View style={styles.imageWrap}>
        <View style={styles.imageHalo} />
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );
};

export default PromoBanner;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.xl,
    borderRadius: 28,
    backgroundColor: '#14100C',
    borderWidth: 1,
    borderColor: 'rgba(255, 106, 0, 0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 150,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 20,
  },
  ambientGlow: {
    position: 'absolute',
    top: -30,
    right: 8,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: COLORS.orangeGlow,
  },
  left: {
    flex: 1,
    paddingRight: 8,
    zIndex: 1,
  },
  tag: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: FONTS.medium,
    marginBottom: 2,
  },
  headline: {
    color: COLORS.orange,
    fontSize: 32,
    fontWeight: FONTS.black,
    lineHeight: 36,
    letterSpacing: -0.8,
  },
  subtext: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: FONTS.regular,
    marginTop: 4,
    marginBottom: 12,
  },
  couponPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 106, 0, 0.14)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 145, 64, 0.36)',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  couponText: {
    color: '#FFD4B0',
    fontSize: 11,
    fontWeight: FONTS.bold,
    letterSpacing: 0.5,
  },
  imageWrap: {
    width: 130,
    height: 130,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHalo: {
    position: 'absolute',
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  image: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
});
