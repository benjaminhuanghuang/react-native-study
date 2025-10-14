import Calculator from "@/Components/Calculator";
import { ThemeContext } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { useContext } from "react";
import { Switch, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {/* out of app UI */}
      <StatusBar style={currentTheme === "light" ? "dark" : "light"} />
      <Stack.Screen
        options={{
          title: "Calculator",
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
      <Calculator />
    </>
  );
}
