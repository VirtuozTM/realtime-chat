import { Stack } from "expo-router";
import "react-native-reanimated";
import { Text, View } from "react-native";
import { colors } from "@/constants/theme";
import { useSession } from "@/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Redirect } from "expo-router";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar style="dark" />
        <Text>EN COURS DE CHARGEMENT</Text>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="search" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
