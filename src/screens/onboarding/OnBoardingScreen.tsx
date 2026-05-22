import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/ui/Button';
import { onboardingContent } from '../../constants/mockData';
import { useAuth } from '../../hooks/useAuth';
import { RootStackParamList } from '../../navigations/types';

const OnBoardingScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { completeOnboarding, isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    completeOnboarding();
    navigation.replace(isAuthenticated ? 'Home' : 'Auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#040507" />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <MotiView
          style={styles.indicatorRow}
          from={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 500,
            easing: Easing.out(Easing.cubic),
          }}
        >
          {[0, 1, 2].map((item) => (
            <View
              key={item}
              style={[
                styles.indicator,
                item === onboardingContent.progress - 1 &&
                  styles.indicatorActive,
              ]}
            />
          ))}
        </MotiView>

        <MotiView
          style={styles.heroWrap}
          from={{ opacity: 0, translateY: 36, scale: 0.96 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{
            type: 'timing',
            duration: 850,
            easing: Easing.out(Easing.cubic),
            delay: 120,
          }}
        >
          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{
              type: 'timing',
              duration: 7200,
              loop: true,
              repeatReverse: true,
            }}
            style={styles.heroMotion}
          >
            <Image
              source={require('../../../assets/onboarding.png')}
              style={styles.heroImage}
            />
          </MotiView>
        </MotiView>

        <View pointerEvents="none" style={styles.bottomFade} />

        <MotiView
          style={styles.copyCard}
          from={{ opacity: 0, translateY: 34 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 650,
            easing: Easing.out(Easing.cubic),
            delay: 260,
          }}
        >
          <View style={styles.chipRow}>
            {['Fast delivery', 'Live tracking', 'Saved orders'].map(
              (label, index) => (
                <MotiView
                  key={label}
                  from={{ opacity: 0, translateY: 12, scale: 0.94 }}
                  animate={{ opacity: 1, translateY: 0, scale: 1 }}
                  transition={{
                    type: 'timing',
                    duration: 480,
                    delay: 420 + index * 90,
                    easing: Easing.out(Easing.exp),
                  }}
                >
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{label}</Text>
                  </View>
                </MotiView>
              )
            )}
          </View>

          <Text style={styles.headline}>
            Your cravings, tracking, and checkout in one smooth flow.
          </Text>
          <Text style={styles.copy}>
            Browse restaurants, search quickly, and keep your placed orders saved
            after reload.
          </Text>
        </MotiView>

        <MotiView
          style={styles.buttonWrapper}
          from={{ opacity: 0, translateY: 28 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 550,
            easing: Easing.out(Easing.exp),
            delay: 420,
          }}
        >
          <Button
            onPress={handleGetStarted}
            title={onboardingContent.buttonLabel}
            variant="primary"
            style={styles.button}
          />
        </MotiView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040507',
  },
  indicatorRow: {
    position: 'absolute',
    top: 18,
    alignSelf: 'center',
    zIndex: 5,
    flexDirection: 'row',
    gap: 8,
  },
  indicator: {
    width: 18,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  indicatorActive: {
    width: 28,
    backgroundColor: '#FF6A00',
  },
  heroWrap: {
    flex: 1,
  },
  heroMotion: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomFade: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 240,
    backgroundColor: 'rgba(4,5,7,0.22)',
  },
  copyCard: {
    position: 'absolute',
    right: 24,
    bottom: 120,
    left: 24,
    zIndex: 4,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  chip: {
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  copy: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 360,
  },
  buttonWrapper: {
    position: 'absolute',
    right: 24,
    bottom: 28,
    left: 24,
  },
  button: {
    minHeight: 62,
    borderRadius: 24,
  },
});
