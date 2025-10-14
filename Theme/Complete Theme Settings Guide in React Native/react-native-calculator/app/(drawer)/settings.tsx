import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/utils/Colors";
import SettingsButton from "@/Components/SettingsButton";
import { Stack } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";

const Settings = () => {
  const { currentTheme, toggleTheme, useSystemTheme, isSystemTheme } =
    useContext(ThemeContext);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerTitleStyle: {
            color: currentTheme === "light" ? "black" : "white",
          },
          headerStyle: {
            backgroundColor: currentTheme === "light" ? "white" : "black",
          },
          headerRight: () => (
            <Switch
              value={currentTheme === "dark"}
              onValueChange={() => {
                toggleTheme(currentTheme === "light" ? "dark" : "light");
              }}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Theme Switch</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text>Dark Mode</Text>
          <Switch
            value={currentTheme === "dark"}
            onValueChange={() => {
              toggleTheme(currentTheme === "light" ? "dark" : "light");
            }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Theme Settings</Text>
        <SettingsButton
          title="Light"
          icon="lightbulb-on"
          onPress={() => {
            toggleTheme("light");
          }}
          isActive={currentTheme === "light" && !isSystemTheme}
        />
        <SettingsButton
          title="Dark"
          icon="weather-night"
          onPress={() => {
            toggleTheme("dark");
          }}
          isActive={currentTheme === "dark" && !isSystemTheme}
        />
        <SettingsButton
          title="System"
          icon="theme-light-dark"
          onPress={useSystemTheme}
          isActive={isSystemTheme}
        />
      </View>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.gray,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});
