import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Defs, RadialGradient, LinearGradient, Stop,
  Filter, FeGaussianBlur, FeMerge, FeMergeNode,
  ClipPath, Rect, Circle, Ellipse, Path, Polygon,
  Line, G, Marker,
} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedG = Animated.createAnimatedComponent(G);

const { width } = Dimensions.get('window');
const SIZE = Math.min(width, 400);
const SCALE = SIZE / 680;

export default function DeliveryScooter({ size = SIZE }) {
  const s = size / 680;
  
  const rotation = useSharedValue(0);
  const riderTranslation = useSharedValue(0);

  useEffect(() => {
    // Continuously spin the wheels
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 800,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Subtle rider bobbing
    riderTranslation.value = withRepeat(
      withTiming(2.5, {
        duration: 350,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const rearWheelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: 268 },
        { translateY: 510 },
        { rotate: `${rotation.value}deg` },
        { translateX: -268 },
        { translateY: -510 },
      ],
    };
  });

  const frontWheelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: 472 },
        { translateY: 510 },
        { rotate: `${rotation.value}deg` },
        { translateX: -472 },
        { translateY: -510 },
      ],
    };
  });

  const riderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: riderTranslation.value },
      ],
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 680 680">
        <Defs>
          <RadialGradient id="bgGlow" cx="50%" cy="58%" r="45%">
            <Stop offset="0%" stopColor="#1a0a00" stopOpacity="1" />
            <Stop offset="100%" stopColor="#0a0a0f" stopOpacity="1" />
          </RadialGradient>
          <RadialGradient id="wheelGrad" cx="35%" cy="30%" r="65%">
            <Stop offset="0%" stopColor="#3a3a3a" />
            <Stop offset="100%" stopColor="#111" />
          </RadialGradient>
          <RadialGradient id="bodyGrad" cx="30%" cy="25%" r="70%">
            <Stop offset="0%" stopColor="#2a2a3a" />
            <Stop offset="100%" stopColor="#111118" />
          </RadialGradient>
          <RadialGradient id="boxGrad" cx="25%" cy="20%" r="70%">
            <Stop offset="0%" stopColor="#1e1e28" />
            <Stop offset="100%" stopColor="#0d0d14" />
          </RadialGradient>
          <RadialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#ff6a00" stopOpacity="0.18" />
            <Stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
          </RadialGradient>
          <LinearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#ff6a00" stopOpacity="0" />
            <Stop offset="40%" stopColor="#ff6a00" stopOpacity="0.15" />
            <Stop offset="80%" stopColor="#ff8c00" stopOpacity="0.55" />
            <Stop offset="100%" stopColor="#ffaa00" stopOpacity="0.85" />
          </LinearGradient>
          <LinearGradient id="trailGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#ff6a00" stopOpacity="0" />
            <Stop offset="50%" stopColor="#ff6a00" stopOpacity="0.08" />
            <Stop offset="100%" stopColor="#ff8c00" stopOpacity="0.3" />
          </LinearGradient>
          <LinearGradient id="boxTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#252535" />
            <Stop offset="100%" stopColor="#141420" />
          </LinearGradient>
          <LinearGradient id="bodyTopHL" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.09" />
            <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Background (Removed for clean movement over page background) */}
        


        {/* Floor glow */}
        <Ellipse cx="370" cy="548" rx="170" ry="22" fill="url(#floorGlow)" />
        <Ellipse cx="370" cy="550" rx="100" ry="10" fill="#ff6a00" opacity="0.07" />

        {/* === LIGHT TRAIL === */}
        <Polygon points="80,510 80,525 440,518 440,505" fill="url(#trailGrad)" />
        <Polygon points="100,498 100,505 440,502 440,496" fill="url(#trailGrad2)" />
        <Polygon points="90,522 90,530 440,526 440,521" fill="url(#trailGrad2)" />
        <Line x1="80" y1="488" x2="390" y2="488" stroke="#ff7a00" strokeWidth="1" opacity="0.18" />
        <Line x1="110" y1="484" x2="380" y2="484" stroke="#ff7a00" strokeWidth="0.7" opacity="0.1" />
        <Line x1="80" y1="534" x2="400" y2="534" stroke="#ff7a00" strokeWidth="1" opacity="0.14" />
        <Line x1="120" y1="538" x2="390" y2="538" stroke="#ff7a00" strokeWidth="0.6" opacity="0.09" />

        {/* === REAR WHEEL === */}
        <AnimatedG style={rearWheelStyle}>
          <Circle cx="268" cy="510" r="62" fill="#111" stroke="#222" strokeWidth="2" />
          <Circle cx="268" cy="510" r="62" fill="url(#wheelGrad)" />
          <Circle cx="268" cy="510" r="58" fill="none" stroke="#1e1e1e" strokeWidth="3" />
          <Circle cx="268" cy="510" r="52" fill="#0d0d0d" />
          <Circle cx="268" cy="510" r="36" fill="none" stroke="#2a2a2a" strokeWidth="2" />
          <Circle cx="268" cy="510" r="18" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
          <Line x1="268" y1="474" x2="268" y2="546" stroke="#252525" strokeWidth="1.5" />
          <Line x1="232" y1="510" x2="304" y2="510" stroke="#252525" strokeWidth="1.5" />
          <Line x1="243" y1="485" x2="293" y2="535" stroke="#252525" strokeWidth="1.5" />
          <Line x1="293" y1="485" x2="243" y2="535" stroke="#252525" strokeWidth="1.5" />
          <Circle cx="268" cy="510" r="8" fill="#222" stroke="#3a3a3a" strokeWidth="1" />
          <Circle cx="268" cy="510" r="36" fill="none" stroke="#ff6a00" strokeWidth="0.8" opacity="0.35" />
        </AnimatedG>

        {/* === FRONT WHEEL === */}
        <AnimatedG style={frontWheelStyle}>
          <Circle cx="472" cy="510" r="56" fill="#111" />
          <Circle cx="472" cy="510" r="56" fill="url(#wheelGrad)" />
          <Circle cx="472" cy="510" r="52" fill="none" stroke="#1e1e1e" strokeWidth="3" />
          <Circle cx="472" cy="510" r="46" fill="#0d0d0d" />
          <Circle cx="472" cy="510" r="32" fill="none" stroke="#2a2a2a" strokeWidth="2" />
          <Circle cx="472" cy="510" r="15" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
          <Line x1="472" y1="478" x2="472" y2="542" stroke="#252525" strokeWidth="1.5" />
          <Line x1="440" y1="510" x2="504" y2="510" stroke="#252525" strokeWidth="1.5" />
          <Line x1="449" y1="487" x2="495" y2="533" stroke="#252525" strokeWidth="1.5" />
          <Line x1="495" y1="487" x2="449" y2="533" stroke="#252525" strokeWidth="1.5" />
          <Circle cx="472" cy="510" r="7" fill="#222" stroke="#3a3a3a" strokeWidth="1" />
          <Circle cx="472" cy="510" r="32" fill="none" stroke="#ff6a00" strokeWidth="0.8" opacity="0.35" />
        </AnimatedG>

        {/* === SCOOTER BODY === */}
        <Path
          d="M240,450 C240,440 248,430 260,428 L420,422 C432,420 445,424 450,432 L472,455 L472,475 L240,478 Z"
          fill="url(#bodyGrad)" stroke="#1e1e2a" strokeWidth="1.5"
        />
        <Path
          d="M252,440 C252,435 258,430 266,429 L412,423 C420,421 430,424 434,430 L448,446 L252,448 Z"
          fill="url(#bodyTopHL)"
        />
        <Path d="M272,476 L440,472 L450,488 L266,490 Z" fill="#141420" stroke="#1a1a28" strokeWidth="1" />
        <Path d="M264,432 L416,426 L422,430 L268,436 Z" fill="#ff6a00" opacity="0.7" />

        {/* Front fork */}
        <Path
          d="M448,440 L468,440 L490,462 L490,475 L468,475 L448,456 Z"
          fill="#131320" stroke="#1e1e2e" strokeWidth="1"
        />
        <Path d="M459,440 L478,462" stroke="#ff6a00" strokeWidth="1" opacity="0.5" />

        {/* Rear panel */}
        <Path d="M238,450 L242,478 L260,490 L260,466 Z" fill="#111118" stroke="#1a1a24" strokeWidth="1" />

        {/* Engine body */}
        <Path
          d="M295,430 C295,420 310,414 340,414 C370,414 390,420 395,428 L395,458 L295,462 Z"
          fill="url(#bodyGrad)" stroke="#1a1a28" strokeWidth="1"
        />
        <Ellipse cx="345" cy="436" rx="42" ry="12" fill="#ffffff" opacity="0.03" />

        {/* Seat */}
        <Path
          d="M295,425 C295,418 310,413 340,413 C370,413 390,418 395,425 C395,430 380,435 340,436 C300,437 295,430 295,425 Z"
          fill="#1a1a28" stroke="#252535" strokeWidth="1"
        />
        <Path
          d="M308,420 C308,416 318,413 340,413 C362,413 374,416 376,420 C370,424 360,426 340,427 C320,428 310,424 308,420 Z"
          fill="#ffffff" opacity="0.04"
        />

        {/* Handlebar stem */}
        <Rect x="435" y="398" width="12" height="48" rx="4" fill="#131320" stroke="#1e1e2e" strokeWidth="1" />
        <Rect x="415" y="398" width="52" height="8" rx="4" fill="#1a1a28" stroke="#252535" strokeWidth="1" />
        <Rect x="415" y="399" width="12" height="6" rx="3" fill="#ff6a00" opacity="0.8" />
        <Rect x="455" y="399" width="12" height="6" rx="3" fill="#ff6a00" opacity="0.8" />

        {/* Headlight */}
        <Ellipse cx="490" cy="440" rx="16" ry="11" fill="#131320" stroke="#1e1e2e" strokeWidth="1" />
        <Ellipse cx="490" cy="440" rx="10" ry="7" fill="#ffaa00" opacity="0.85" />
        <Ellipse cx="490" cy="440" rx="6" ry="4" fill="#ffffff" opacity="0.9" />
        <Polygon points="500,436 500,444 560,450 560,430" fill="#ffaa00" opacity="0.06" />

        {/* Taillight */}
        <Ellipse cx="238" cy="456" rx="7" ry="5" fill="#ff3300" opacity="0.9" />
        <Ellipse cx="238" cy="456" rx="4" ry="3" fill="#ff6644" opacity="1" />

        {/* === DELIVERY BOX === */}
        <Ellipse cx="338" cy="420" rx="85" ry="8" fill="#000" opacity="0.3" />

        {/* Box back face */}
        <Path d="M262,298 L262,420 L278,430 L278,308 Z" fill="#0a0a12" stroke="#111" strokeWidth="1" />
        {/* Box bottom */}
        <Path d="M262,420 L278,430 L420,430 L404,420 Z" fill="#111118" stroke="#111" strokeWidth="1" />
        {/* Box front face */}
        <Rect x="262" y="298" width="142" height="122" rx="4" fill="url(#boxGrad)" stroke="#1a1a28" strokeWidth="1.5" />
        {/* Box top lid */}
        <Path d="M262,298 L278,288 L420,288 L404,298 Z" fill="url(#boxTopGrad)" stroke="#1e1e2e" strokeWidth="1.5" />
        {/* Box right face */}
        <Path d="M404,298 L420,288 L420,410 L404,420 Z" fill="#0e0e1a" stroke="#111" strokeWidth="1.5" />

        {/* Box logo panel */}
        <Rect x="278" y="320" width="110" height="62" rx="3" fill="#0a0a10" stroke="#ff6a00" strokeWidth="1" opacity="0.9" />
        <Circle cx="333" cy="351" r="20" fill="#ff6a00" opacity="0.12" />
        <Circle cx="333" cy="351" r="14" fill="none" stroke="#ff6a00" strokeWidth="1.5" opacity="0.7" />
        <Polygon points="322,351 335,342 335,347 344,347 344,355 335,355 335,360" fill="#ff6a00" opacity="0.85" />

        {/* Box stripes */}
        <Rect x="262" y="390" width="142" height="8" fill="#ff6a00" opacity="0.6" />
        <Rect x="262" y="298" width="142" height="5" fill="#ff6a00" opacity="0.4" />

        {/* Box lid handle */}
        <Rect x="315" y="282" width="36" height="8" rx="4" fill="#1e1e2e" stroke="#2a2a3e" strokeWidth="1" />
        <Rect x="325" y="283" width="16" height="6" rx="3" fill="#ff6a00" opacity="0.5" />

        {/* Box rivets */}
        <Circle cx="270" cy="306" r="2.5" fill="#222230" />
        <Circle cx="270" cy="414" r="2.5" fill="#222230" />
        <Circle cx="396" cy="306" r="2.5" fill="#222230" />
        <Circle cx="396" cy="414" r="2.5" fill="#222230" />

        {/* Box rack mounts */}
        <Rect x="296" y="418" width="12" height="16" rx="2" fill="#111118" stroke="#1a1a24" strokeWidth="1" />
        <Rect x="358" y="418" width="12" height="16" rx="2" fill="#111118" stroke="#1a1a24" strokeWidth="1" />
        <Rect x="290" y="416" width="86" height="6" rx="2" fill="#131320" stroke="#1a1a28" strokeWidth="1" />

        {/* === RIDER === */}
        <AnimatedG style={riderStyle}>
          {/* Helmet */}
          <Ellipse cx="395" cy="355" rx="26" ry="22" fill="#2d2d3a" stroke="#444458" strokeWidth="1.5" />
          <Path
            d="M371,358 C371,345 382,336 395,336 C408,336 419,345 419,358 L419,362 C419,362 414,368 395,368 C376,368 371,362 371,362 Z"
            fill="#3b3b4d" stroke="#52526b" strokeWidth="1"
          />
          {/* Visor */}
          <Path
            d="M374,360 C374,356 382,351 395,351 C408,351 416,356 416,360 L416,363 C416,366 408,368 395,368 C382,368 374,366 374,363 Z"
            fill="#162e49" stroke="#254d78" strokeWidth="1" opacity="0.95"
          />
          <Path
            d="M378,358 C378,356 384,353 393,353 L410,359 C406,363 399,365 395,365 C386,365 379,362 378,358 Z"
            fill="#ff8c00" opacity="0.25"
          />
          {/* Helmet stripe */}
          <Path
            d="M373,356 C376,350 385,344 395,344 C405,344 414,350 417,356"
            stroke="#ff6a00" strokeWidth="2.5" fill="none" opacity="0.95"
          />
          {/* Torso */}
          <Path
            d="M370,368 C366,375 362,388 364,398 L368,420 L426,420 L428,398 C430,388 426,375 422,368 Z"
            fill="#222230" stroke="#353549" strokeWidth="1.5"
          />
          {/* Jacket stripes */}
          <Path d="M370,380 L366,396 L372,398 L374,384 Z" fill="#ff6a00" opacity="0.9" />
          <Path d="M422,380 L426,396 L420,398 L418,384 Z" fill="#ff6a00" opacity="0.9" />
          {/* Arms */}
          <Path
            d="M422,375 C428,378 436,385 440,398 L435,400 C430,390 424,383 418,380 Z"
            fill="#222230" stroke="#353549" strokeWidth="1"
          />
          <Path
            d="M370,375 C365,378 360,385 357,398 L362,400 C366,390 370,383 374,380 Z"
            fill="#222230" stroke="#353549" strokeWidth="1"
          />
        </AnimatedG>

        {/* === AMBIENT PARTICLES === */}
        <Circle cx="155" cy="500" r="2" fill="#ff6a00" opacity="0.4" />
        <Circle cx="130" cy="510" r="1.5" fill="#ff8c00" opacity="0.3" />
        <Circle cx="170" cy="520" r="1" fill="#ff6a00" opacity="0.2" />
        <Circle cx="108" cy="495" r="1.5" fill="#ff6a00" opacity="0.25" />
        <Circle cx="195" cy="490" r="1" fill="#ffaa00" opacity="0.2" />
        <Circle cx="580" cy="160" r="1.5" fill="#ffffff" opacity="0.15" />
        <Circle cx="610" cy="220" r="1" fill="#ffffff" opacity="0.1" />
        <Circle cx="92" cy="180" r="1" fill="#ffffff" opacity="0.12" />
        <Circle cx="560" cy="300" r="1" fill="#ffffff" opacity="0.1" />

        {/* Bottom depth fade */}
        <Rect x="0" y="560" width="680" height="120" fill="#0a0a0f" opacity="0.45" />

        {/* Underside ambient glow */}
        <Ellipse cx="370" cy="500" rx="200" ry="30" fill="#ff6a00" opacity="0.04" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});