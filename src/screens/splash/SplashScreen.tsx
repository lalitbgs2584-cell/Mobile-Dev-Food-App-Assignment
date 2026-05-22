import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import DeliveryScooter from './DeliveryScooter';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Background glow behind the scooter */}
      <MotiView
        from={{ opacity: 0.08, scale: 0.72 }}
        animate={{ opacity: 0.22, scale: 1.08 }}
        transition={{
          type: 'timing',
          duration: 2600,
          delay: 200,
          loop: true,
          repeatReverse: true,
        }}
        style={styles.ambientGlow}
      />
      <MotiView
        from={{ opacity: 0.04, scale: 0.82, translateY: 18 }}
        animate={{ opacity: 0.16, scale: 1.02, translateY: -8 }}
        transition={{
          type: 'timing',
          duration: 3200,
          delay: 320,
          loop: true,
          repeatReverse: true,
        }}
        style={styles.secondaryGlow}
      />

      <View style={styles.contentContainer}>
        {/* Animated Scooter Wrapper */}
        <MotiView
          from={{
            translateX: -width - 150,
            rotate: '-6deg',
          }}
          animate={{
            translateX: 0,
            rotate: '0deg',
          }}
          transition={{
            type: 'timing',
            duration: 2200, // Glides in slower and more soothingly
            delay: 500,    // Starts slightly late for anticipation
            easing: Easing.bezier(0.16, 1, 0.3, 1), // Premium ease-out cubic
          }}
          style={styles.scooterWrapper}
        >
          {/* Subtle vertical hover/riding animation */}
          <MotiView
            from={{ translateY: -3 }}
            animate={{ translateY: 3 }}
            transition={{
              type: 'timing',
              duration: 500,
              loop: true,
            }}
          >
            <DeliveryScooter size={300} />
          </MotiView>
        </MotiView>

        {/* Delayed App Name & Tagline Reveal */}
        <MotiView
          from={{
            opacity: 0,
            translateY: 30,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
            scale: 1,
          }}
          transition={{
            type: 'spring',
            damping: 18,
            stiffness: 80,
            delay: 2400, // Syncs with the finish of the scooter glide
          }}
          style={styles.textContainer}
        >
          <Text style={styles.title}>
            Bite <Text style={styles.accent}>&</Text> Chill
            <Text style={styles.dot}>.</Text>
          </Text>

          <Text style={styles.subtitle}>
            Craving? We're on the way!
          </Text>

          {/* Loader dots */}
          <View style={styles.loader}>
            {[0, 1, 2].map((index) => (
              <MotiView
                key={index}
                style={styles.dotElement}
                from={{ opacity: 0.3, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.3 }}
                transition={{
                  type: 'timing',
                  duration: 600,
                  delay: 2400 + (index * 200), // Syncs with loader text
                  loop: true,
                }}
              />
            ))}
          </View>
        </MotiView>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121218', // Soothing deep dark gray, not pitch black
    justifyContent: 'center',
    alignItems: 'center',
  },

  ambientGlow: {
    position: 'absolute',
    width: 380,
    height: 380,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 106, 0, 0.12)', // Slightly richer glow
    top: '25%',
  },
  secondaryGlow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 102, 200, 0.08)',
    bottom: '24%',
    left: '8%',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  scooterWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 320,
  },

  textContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: -0.5,
  },

  accent: {
    color: '#FF6A00',
  },

  dot: {
    color: '#FF6A00',
  },

  subtitle: {
    marginTop: 8,
    color: '#8E8E93',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  loader: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 8,
  },

  dotElement: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6A00',
    shadowColor: '#FF6A00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
});
