import React from "react";
import { View, Text } from "react-native";
import { Link, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: "#fff",
        headerRight: () => (
          <Link href="/">
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "My Homefeed",
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color}></Ionicons>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "My Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons
              name="person-circle-outline"
              size={size}
              color={color}
            ></Ionicons>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
