import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

type AnimatedEntranceProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  fromY?: number;
  fromX?: number;
  scale?: number;
  style?: StyleProp<ViewStyle>;
};

export default function AnimatedEntrance({
  children,
  delay = 0,
  duration = 650,
  fromY = 22,
  fromX = 0,
  scale = 0.98,
  style,
}: AnimatedEntranceProps) {
  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: fromY,
        translateX: fromX,
        scale,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        translateX: 0,
        scale: 1,
      }}
      transition={{
        type: 'timing',
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
      }}
      style={style}
    >
      {children}
    </MotiView>
  );
}
