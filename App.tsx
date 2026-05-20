import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from './src/screens/splash/SplashScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaProvider>
      <SplashScreen />
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})