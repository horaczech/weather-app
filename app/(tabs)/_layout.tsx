import React, { useEffect } from "react";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {}, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarIcon: ({ color }) => (
            <Feather name="star" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
