import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/splash/SplashScreen";
import RootNavigator from "./src/navigations/RootNavigator";
import { useSplashScreen } from "./src/store/splashStore";

const App = () => {
  const isReady = useSplashScreen(
    (state) => state.isReady
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      useSplashScreen.setState({
        isReady: false
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isReady) {
    return (
      <SafeAreaProvider>
        <SplashScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;