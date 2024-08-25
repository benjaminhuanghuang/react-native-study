import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";

// this will prevent the flash screen from auto hiding until loading all the assets is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    
    return (
       <Slot/>
    );
}