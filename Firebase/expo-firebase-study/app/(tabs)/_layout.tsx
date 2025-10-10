import { Tabs } from "expo-router";
import React from "react";
import { HomeIcon, Globe } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="DB"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Upload"
        options={{
          tabBarIcon: ({ color, size }) => <Globe color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
