import React from "react";
import { View, Text, Alert } from "react-native";
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
          <Link href="/" replace>
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
      <Tabs.Screen
        name="action"
        options={{
          //  Don't show the action.tsx under tabs folder
          // href: null,
          tabBarLabel: "Action",
          tabBarIcon: ({ size, color }) => (
            <Ionicons
              name="add-circle-outline"
              size={size}
              color={color}
            ></Ionicons>
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            // Navigate to the action screen
            // You can use the router.push() method to navigate to the action screen
            // router.push("/action");
            Alert.alert("Action", "This is the action screen");
          },
        })}
      />
    </Tabs>
  );
};

export default Layout;
