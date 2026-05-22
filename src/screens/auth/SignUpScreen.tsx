import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiText, MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

import { darkTheme as t } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';
import { MockLoginForm, RootStackParamList } from '../../navigations/types';

export default function SignupScreen() {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const isCompact = width < 460;
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState<MockLoginForm>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
  });

  const handleLogin = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.address ||
      !form.password
    ) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Please fill all the fields');
      }
      return;
    }

    login({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      address: form.address,
      avatarUri: `https://i.pravatar.cc/160?u=${encodeURIComponent(form.email)}`,
    });

    if (Platform.OS === 'android') {
      ToastAndroid.show('Logged in successfully', ToastAndroid.SHORT);
    } else {
      Alert.alert('Success', 'Logged in successfully');
    }

    rootNavigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const anim = (delay: number) => ({
    from: { opacity: 0, translateY: 24 },
    animate: { opacity: 1, translateY: 0 },
    transition: {
      type: 'timing' as const,
      duration: 550,
      easing: Easing.out(Easing.exp),
      delay,
    },
  });

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: t.bg }]}>
      <View style={[styles.blob1, { backgroundColor: t.glow }]} />
      <View style={[styles.blob2, { backgroundColor: t.glow }]} />

      <KeyboardAvoidingView
        style={styles.keyboardRoot}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={40}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.shell}>
            <MotiView {...anim(0)} style={styles.logoWrap}>
              <Text style={[styles.logo, { color: t.text }]}>
                Bite <Text style={{ color: t.primary }}>&</Text> Chill
              </Text>
              <Text style={[styles.tagline, { color: t.muted }]}>
                Sign in to jump back into your next delivery
              </Text>
            </MotiView>

            <MotiView
              from={{ opacity: 0, translateY: 60 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 700,
                easing: Easing.out(Easing.cubic),
                delay: 150,
              }}
              style={[
                styles.card,
                { backgroundColor: t.surface, borderColor: t.border },
              ]}
            >
              <MotiText
                {...anim(200)}
                style={[styles.greeting, { color: t.text }]}
              >
                Welcome back
              </MotiText>
              <MotiText {...anim(250)} style={[styles.sub, { color: t.muted }]}>
                Enter your details to continue to the main app
              </MotiText>

              <MotiView
                {...anim(350)}
                style={[styles.nameRow, isCompact && styles.nameRowCompact]}
              >
                <View style={styles.flexField}>
                  <Text style={[styles.label, { color: t.muted }]}>
                    FIRST NAME
                  </Text>
                  <View
                    style={[
                      styles.inputWrap,
                      { backgroundColor: t.inputBg, borderColor: t.border },
                    ]}
                  >
                    <TextInput
                      style={[styles.input, { color: t.text }]}
                      placeholder="John"
                      placeholderTextColor={t.muted}
                      value={form.firstName}
                      onChangeText={(value) =>
                        setForm({ ...form, firstName: value })
                      }
                    />
                  </View>
                </View>

                <View style={styles.flexField}>
                  <Text style={[styles.label, { color: t.muted }]}>
                    LAST NAME
                  </Text>
                  <View
                    style={[
                      styles.inputWrap,
                      { backgroundColor: t.inputBg, borderColor: t.border },
                    ]}
                  >
                    <TextInput
                      style={[styles.input, { color: t.text }]}
                      placeholder="Doe"
                      placeholderTextColor={t.muted}
                      value={form.lastName}
                      onChangeText={(value) =>
                        setForm({ ...form, lastName: value })
                      }
                    />
                  </View>
                </View>
              </MotiView>

              <MotiView {...anim(400)}>
                <Text style={[styles.label, { color: t.muted }]}>EMAIL</Text>
                <View
                  style={[
                    styles.inputWrap,
                    { backgroundColor: t.inputBg, borderColor: t.border },
                  ]}
                >
                  <AntDesign
                    name="mail"
                    size={17}
                    color={t.muted}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: t.text }]}
                    placeholder="your@email.com"
                    placeholderTextColor={t.muted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={form.email}
                    onChangeText={(value) => setForm({ ...form, email: value })}
                  />
                </View>
              </MotiView>

              <MotiView {...anim(425)}>
                <Text style={[styles.label, { color: t.muted }]}>ADDRESS</Text>
                <View
                  style={[
                    styles.inputWrap,
                    { backgroundColor: t.inputBg, borderColor: t.border },
                  ]}
                >
                  <AntDesign
                    name="environment"
                    size={17}
                    color={t.muted}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: t.text }]}
                    placeholder="221B Baker Street"
                    placeholderTextColor={t.muted}
                    value={form.address}
                    onChangeText={(value) =>
                      setForm({ ...form, address: value })
                    }
                  />
                </View>
              </MotiView>

              <MotiView {...anim(475)}>
                <Text style={[styles.label, { color: t.muted }]}>PASSWORD</Text>
                <View
                  style={[
                    styles.inputWrap,
                    { backgroundColor: t.inputBg, borderColor: t.border },
                  ]}
                >
                  <AntDesign
                    name="lock"
                    size={17}
                    color={t.muted}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: t.text }]}
                    placeholder="Min. 8 characters"
                    placeholderTextColor={t.muted}
                    secureTextEntry={!showPass}
                    value={form.password}
                    onChangeText={(value) =>
                      setForm({ ...form, password: value })
                    }
                  />
                  <Pressable onPress={() => setShowPass(!showPass)}>
                    <AntDesign
                      name={showPass ? 'eye' : 'eye-invisible'}
                      size={18}
                      color={t.muted}
                    />
                  </Pressable>
                </View>
              </MotiView>

              <MotiView {...anim(525)}>
                <Pressable
                  style={[styles.cta, { backgroundColor: t.primary }]}
                  onPress={handleLogin}
                >
                  <Text style={styles.ctaText}>Login</Text>
                  <AntDesign name="arrow-right" size={20} color="#FFFFFF" />
                </Pressable>
              </MotiView>

              <MotiView {...anim(575)}>
                <Text style={[styles.terms, { color: t.muted }]}>
                  Your mock session stays signed in after the app reloads.
                </Text>
              </MotiView>
            </MotiView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  keyboardRoot: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  shell: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
  },
  blob1: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    top: -80,
    right: -80,
  },
  blob2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    bottom: 100,
    left: -60,
  },
  logoWrap: {
    paddingHorizontal: 28,
    paddingTop: 52,
    paddingBottom: 4,
  },
  logo: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 10,
  },
  nameRowCompact: {
    flexDirection: 'column',
  },
  flexField: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  cta: {
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 4,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  terms: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 18,
  },
});
