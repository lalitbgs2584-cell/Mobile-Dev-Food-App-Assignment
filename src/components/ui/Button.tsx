import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { COLORS, FONTS } from '../../constants/screenThemes';

type Variant = 'primary' | 'success' | 'ghost' | 'sunset';

interface ButtonProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  variant?: Variant;
  leadingIconName?: keyof typeof Ionicons.glyphMap;
  trailingIconName?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const variantStyles: Record<
  Variant,
  {
    backgroundColor: string;
    borderColor: string;
    titleColor: string;
    subtitleColor: string;
    shadowColor: string;
  }
> = {
  primary: {
    backgroundColor: COLORS.orange,
    borderColor: 'rgba(255,255,255,0.12)',
    titleColor: '#FFFFFF',
    subtitleColor: 'rgba(255,255,255,0.76)',
    shadowColor: COLORS.orange,
  },
  success: {
    backgroundColor: COLORS.green,
    borderColor: 'rgba(255,255,255,0.08)',
    titleColor: '#03160E',
    subtitleColor: 'rgba(3,22,14,0.72)',
    shadowColor: COLORS.green,
  },
  ghost: {
    backgroundColor: COLORS.bgCard,
    borderColor: COLORS.border,
    titleColor: COLORS.textPrimary,
    subtitleColor: COLORS.textSecondary,
    shadowColor: COLORS.shadow,
  },
  sunset: {
    backgroundColor: '#F8576C',
    borderColor: 'rgba(255,255,255,0.08)',
    titleColor: '#FFFFFF',
    subtitleColor: 'rgba(255,255,255,0.76)',
    shadowColor: '#F8576C',
  },
};

const Button: React.FC<ButtonProps> = ({
  title,
  subtitle,
  onPress,
  variant = 'primary',
  leadingIconName,
  trailingIconName = 'arrow-forward',
  style,
  titleStyle,
}) => {
  const palette = variantStyles[variant];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor,
          shadowColor: palette.shadowColor,
          opacity: pressed ? 0.96 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
        style,
      ]}
    >
      <View style={styles.leftContent}>
        {leadingIconName ? (
          <View style={styles.leadingIconWrap}>
            <Ionicons name={leadingIconName} size={18} color={palette.titleColor} />
          </View>
        ) : null}

        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: palette.titleColor }, titleStyle]}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: palette.subtitleColor }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {trailingIconName ? (
        <View style={styles.trailingIconWrap}>
          <Ionicons name={trailingIconName} size={18} color={palette.titleColor} />
        </View>
      ) : null}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    minHeight: 58,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  textWrap: {
    flexShrink: 1,
  },
  leadingIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailingIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: FONTS.bold,
    flexShrink: 1,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: FONTS.medium,
  },
});
