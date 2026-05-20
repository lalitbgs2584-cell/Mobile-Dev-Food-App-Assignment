import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import SignupScreen from './SignUpScreen'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator, View } from 'react-native'

const Stack = createNativeStackNavigator()

export default function AuthLayout() {
    const navigation = useNavigation<any>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await AsyncStorage.getItem("user")
                if (user) {
                    console.log("User found:", user)
                    navigation.replace("Home")
                }
            } catch (error) {
                console.error("Error checking user session:", error)
            } finally {
                setLoading(false)
            }
        }
        checkUser()
    }, [navigation])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121218' }}>
                <ActivityIndicator size="large" color="#ff6a00" />
            </View>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}