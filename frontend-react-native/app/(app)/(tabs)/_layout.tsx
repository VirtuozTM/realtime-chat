import React from "react";
import { Tabs } from "expo-router";
import CustomTabs from "@/components/CustomTabs";
import { colors } from "@/constants/theme";

const TabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomTabs {...props} />}
      screenOptions={{
        headerShown: true,
        tabBarHideOnKeyboard: true,
        headerTintColor: "white",
        headerStyle: { backgroundColor: "black" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Discussions",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: "Notifications",
          title: "Notifications",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "black" },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profil",
          title: "Profile",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.neutral800 },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
