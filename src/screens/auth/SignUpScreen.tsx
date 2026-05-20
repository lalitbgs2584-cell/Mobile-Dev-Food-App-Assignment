import React, { useState } from 'react'
import {
    KeyboardAvoidingView, Pressable, ScrollView,
    StyleSheet, Text, TextInput, View, Platform,
    ToastAndroid, Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MotiView, MotiText } from 'moti'
import { Easing } from 'react-native-reanimated'
import AntDesign from '@expo/vector-icons/AntDesign'
import { darkTheme as t } from '../../constants/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function SignupScreen({ navigation }: any) {
    const [showPass, setShowPass] = useState(false)
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })

    const handleSignup = async () => {
        if (!form.firstName || !form.lastName || !form.email || !form.password) {
            if (Platform.OS === 'android') {
                ToastAndroid.show(
                    "Please fill all the fields",
                    ToastAndroid.SHORT
                );
            } else {
                Alert.alert("Error", "Please fill all the fields");
            }
            return;
        }
        try {
            await AsyncStorage.setItem(
                'user',
                JSON.stringify(form)
            );
            if (Platform.OS === 'android') {
                ToastAndroid.show(
                    "User registered successfully",
                    ToastAndroid.SHORT
                );
                navigation.navigate("Home")
            } else {
                Alert.alert("Success", "User registered successfully");
                navigation.navigate("Home")
            }
        } catch (error) {
            console.log(error);
        }
        console.log(form)
    }

    const anim = (delay: number) => ({
        from: { opacity: 0, translateY: 24 },
        animate: { opacity: 1, translateY: 0 },
        transition: { type: 'timing' as const, duration: 550, easing: Easing.out(Easing.exp), delay },
    })

    return (
        <SafeAreaView style={[s.root, { backgroundColor: t.bg }]}>

            <View style={[s.blob1, { backgroundColor: t.glow }]} />
            <View style={[s.blob2, { backgroundColor: t.glow }]} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={40}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >

                    <MotiView {...anim(0)} style={s.logoWrap}>
                        <Text style={[s.logo, { color: t.text }]}>
                            Bite <Text style={{ color: t.primary }}>&</Text> Chill
                        </Text>
                        <Text style={[s.tagline, { color: t.muted }]}>Your food, your vibe</Text>
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, translateY: 60 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 700, easing: Easing.out(Easing.cubic), delay: 150 }}
                        style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}
                    >
                        <MotiText {...anim(200)} style={[s.greeting, { color: t.text }]}>Create account</MotiText>
                        <MotiText {...anim(250)} style={[s.sub, { color: t.muted }]}>Join the vibe today</MotiText>


                        {/* Name row */}
                        <MotiView {...anim(350)} style={{ flexDirection: 'row', gap: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[s.label, { color: t.muted }]}>FIRST NAME</Text>
                                <View style={[s.inputWrap, { backgroundColor: t.inputBg, borderColor: t.border }]}>
                                    <TextInput
                                        style={[s.input, { color: t.text }]}
                                        placeholder="John"
                                        placeholderTextColor={t.muted}
                                        value={form.firstName}
                                        onChangeText={v => setForm({ ...form, firstName: v })}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[s.label, { color: t.muted }]}>LAST NAME</Text>
                                <View style={[s.inputWrap, { backgroundColor: t.inputBg, borderColor: t.border }]}>
                                    <TextInput
                                        style={[s.input, { color: t.text }]}
                                        placeholder="Doe"
                                        placeholderTextColor={t.muted}
                                        value={form.lastName}
                                        onChangeText={v => setForm({ ...form, lastName: v })}
                                    />
                                </View>
                            </View>
                        </MotiView>

                        {/* Email */}
                        <MotiView {...anim(400)}>
                            <Text style={[s.label, { color: t.muted }]}>EMAIL</Text>
                            <View style={[s.inputWrap, { backgroundColor: t.inputBg, borderColor: t.border }]}>
                                <AntDesign name="mail" size={17} color={t.muted} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={[s.input, { color: t.text }]}
                                    placeholder="your@email.com"
                                    placeholderTextColor={t.muted}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={form.email}
                                    onChangeText={v => setForm({ ...form, email: v })}
                                />
                            </View>
                        </MotiView>

                        {/* Password */}
                        <MotiView {...anim(450)}>
                            <Text style={[s.label, { color: t.muted }]}>PASSWORD</Text>
                            <View style={[s.inputWrap, { backgroundColor: t.inputBg, borderColor: t.border }]}>
                                <AntDesign name="lock" size={17} color={t.muted} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={[s.input, { color: t.text }]}
                                    placeholder="Min. 8 characters"
                                    placeholderTextColor={t.muted}
                                    secureTextEntry={!showPass}
                                    value={form.password}
                                    onChangeText={v => setForm({ ...form, password: v })}
                                />
                                <Pressable onPress={() => setShowPass(!showPass)}>
                                    <AntDesign name={showPass ? 'eye' : 'eye-invisible'} size={18} color={t.muted} />
                                </Pressable>
                            </View>
                        </MotiView>

                        {/* CTA */}
                        <MotiView {...anim(500)}>
                            <Pressable
                                style={[s.cta, { backgroundColor: t.primary }]}
                                onPress={handleSignup}
                            >
                                <Text style={s.ctaText}>Create Account</Text>
                                <AntDesign name="arrow-right" size={20} color="#fff" />
                            </Pressable>
                        </MotiView>

                        <MotiView {...anim(550)}>
                            <Text style={[s.terms, { color: t.muted }]}>
                                By signing up you agree to our{' '}
                                <Text style={{ color: t.primary }}>Terms</Text> and{' '}
                                <Text style={{ color: t.primary }}>Privacy Policy</Text>
                            </Text>
                        </MotiView>

                    </MotiView>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    root: { flex: 1 },
    blob1: {
        position: 'absolute', width: 260, height: 260,
        borderRadius: 130, top: -80, right: -80,
    },
    blob2: {
        position: 'absolute', width: 180, height: 180,
        borderRadius: 90, bottom: 100, left: -60,
    },
    logoWrap: { paddingHorizontal: 28, paddingTop: 52, paddingBottom: 4 },
    logo: { fontSize: 30, fontWeight: '900', letterSpacing: -0.5 },
    tagline: { fontSize: 13, marginTop: 4 },
    card: {
        marginHorizontal: 16, marginTop: 20, borderRadius: 28,
        padding: 24, borderWidth: 1,
    },
    greeting: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
    sub: { fontSize: 13, marginBottom: 24 },
    tabRow: {
        flexDirection: 'row', borderRadius: 16,
        padding: 4, marginBottom: 28,
    },
    tab: {
        flex: 1, height: 40, borderRadius: 13,
        alignItems: 'center', justifyContent: 'center',
    },
    tabText: { fontSize: 14, fontWeight: '700' },
    label: {
        fontSize: 11, fontWeight: '600',
        letterSpacing: 0.8, marginBottom: 8,
    },
    inputWrap: {
        flexDirection: 'row', alignItems: 'center',
        borderRadius: 14, borderWidth: 1,
        paddingHorizontal: 16, height: 50, marginBottom: 16,
    },
    input: { flex: 1, fontSize: 14 },
    forgot: { fontSize: 12, fontWeight: '600', textAlign: 'right', marginTop: -8, marginBottom: 20 },
    cta: {
        height: 52, borderRadius: 16,
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', gap: 10, marginTop: 4,
    },
    ctaText: { fontSize: 16, fontWeight: '800', color: '#fff' },
    divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 20 },
    line: { flex: 1, height: 1 },
    divText: { fontSize: 12 },
    socialRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    socialBtn: {
        flex: 1, height: 46, borderRadius: 14, borderWidth: 1,
        alignItems: 'center', justifyContent: 'center',
    },
    footer: { fontSize: 13, textAlign: 'center', marginTop: 4 },
    terms: { fontSize: 11, textAlign: 'center', marginTop: 14, lineHeight: 18 },
})