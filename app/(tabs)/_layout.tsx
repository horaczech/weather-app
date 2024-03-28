import React from "react";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import SearchButton from "@/app/Header/SearchButton";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerRight: SearchButton,
        headerStyle: {
          height: insets.top + (Platform.OS === "ios" ? 40 : 55),
        },
        headerRightContainerStyle: {
          paddingRight: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={focused ? "star-fill" : "star"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
