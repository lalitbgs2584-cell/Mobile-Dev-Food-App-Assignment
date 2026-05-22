import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';

import { COLORS } from '../../constants/screenThemes';

type AnimatedBackdropVariant = 'warm' | 'cool' | 'celebration';

type AnimatedBackdropProps = {
  variant?: AnimatedBackdropVariant;
};

const palettes: Record<
  AnimatedBackdropVariant,
  { primary: string; secondary: string; accent: string }
> = {
  warm: {
    primary: COLORS.orangeGlow,
    secondary: 'rgba(255, 102, 200, 0.12)',
    accent: 'rgba(255, 255, 255, 0.04)',
  },
  cool: {
    primary: 'rgba(42, 102, 255, 0.16)',
    secondary: 'rgba(26, 213, 152, 0.12)',
    accent: 'rgba(255, 201, 85, 0.08)',
  },
  celebration: {
    primary: 'rgba(255, 201, 85, 0.14)',
    secondary: 'rgba(255, 106, 0, 0.14)',
    accent: 'rgba(255, 102, 200, 0.1)',
  },
};

export default function AnimatedBackdrop({
  variant = 'warm',
}: AnimatedBackdropProps) {
  const palette = palettes[variant];

  return (
    <View pointerEvents="none" style={styles.container}>
      <MotiView
        from={{
          opacity: 0.1,
          scale: 0.9,
          translateX: -18,
          translateY: -14,
        }}
        animate={{
          opacity: 0.24,
          scale: 1.12,
          translateX: 24,
          translateY: 18,
        }}
        transition={{
          type: 'timing',
          duration: 5200,
          loop: true,
          repeatReverse: true,
        }}
        style={[styles.orb, styles.topOrb, { backgroundColor: palette.primary }]}
      />

      <MotiView
        from={{
          opacity: 0.08,
          scale: 0.92,
          translateX: 12,
          translateY: 16,
        }}
        animate={{
          opacity: 0.18,
          scale: 1.08,
          translateX: -18,
          translateY: -14,
        }}
        transition={{
          type: 'timing',
          duration: 6000,
          delay: 220,
          loop: true,
          repeatReverse: true,
        }}
        style={[styles.orb, styles.middleOrb, { backgroundColor: palette.secondary }]}
      />

      <MotiView
        from={{
          opacity: 0.06,
          scale: 0.88,
          translateX: 0,
          translateY: 0,
        }}
        animate={{
          opacity: 0.14,
          scale: 1.04,
          translateX: 16,
          translateY: -10,
        }}
        transition={{
          type: 'timing',
          duration: 6800,
          delay: 360,
          loop: true,
          repeatReverse: true,
        }}
        style={[styles.orb, styles.bottomOrb, { backgroundColor: palette.accent }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  topOrb: {
    top: -110,
    right: -36,
    width: 260,
    height: 260,
  },
  middleOrb: {
    top: 200,
    left: -112,
    width: 240,
    height: 240,
  },
  bottomOrb: {
    right: 34,
    bottom: 140,
    width: 180,
    height: 180,
  },
});
