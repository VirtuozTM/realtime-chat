import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import React from "react";
import { SessionProvider } from "@/context/AuthContext";
import * as SystemUI from "expo-system-ui";
import { colors } from "@/constants/theme";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync(colors.black);

export default function RootLayout() {
  const [loaded] = useFonts({
    LeckerliOne: require("../assets/fonts/LeckerliOne-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(auth)/login" />
      </Stack>
      <StatusBar style="light" />
    </SessionProvider>
  );
}
