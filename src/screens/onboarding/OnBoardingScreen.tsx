import { KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context'
import { MotiView, MotiImage } from 'moti'
import { Easing } from 'react-native-reanimated'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

const OnBoardingScreen = () => {
    const navigation = useNavigation<any>()
    const handleGetStarted = async () => {
        const user = await AsyncStorage.getItem("user");
        if (user) {
            navigation.replace("Home")
        } else {
            navigation.replace("Auth")
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>

                {/* Title animates down from above */}
                <MotiView
                    style={styles.textContainer}
                    from={{ opacity: 0, translateY: -60 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: 'timing',
                        duration: 700,
                        easing: Easing.out(Easing.exp),
                        delay: 100,
                    }}
                >
                    <Text style={styles.title}>
                        Bite <Text style={styles.accent}>&</Text> Chill
                    </Text>
                </MotiView>

                {/* Image slides up from below (behind the button) */}
                <MotiImage
                    source={require("../../../assets/onboarding.png")}
                    style={styles.image}
                    from={{ opacity: 0, translateY: 120 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: 'timing',
                        duration: 900,
                        easing: Easing.out(Easing.cubic),
                        delay: 200,
                    }}
                />

                {/* Button fades + slides up last */}
                <MotiView
                    style={styles.buttonWrapper}
                    from={{ opacity: 0, translateY: 40 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: 'timing',
                        duration: 600,
                        easing: Easing.out(Easing.exp),
                        delay: 700,
                    }}
                >
                    <Pressable
                        style={styles.button}
                        onPress={handleGetStarted}
                    >
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonText}>Get Started</Text>
                            <AntDesign name="arrow-right" size={24} color="white" />
                        </View>
                    </Pressable>
                </MotiView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    buttonWrapper: {
        position: "absolute",
        bottom: 20,
        width: "80%",
        alignSelf: "center",
    },
    button: {
        height: 50,
        backgroundColor: "#ff6a00",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    textContainer: {
        position: "absolute",
        top: 60,
        left: 20,
        right: 20,
        zIndex: 10,
        elevation: 10,
        justifyContent: "center",
        alignItems: "center",
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
    buttonContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        paddingHorizontal: 20,
    },
})