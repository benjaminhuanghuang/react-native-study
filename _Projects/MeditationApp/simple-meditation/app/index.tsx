import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";

import beachImage from "@/assets/meditation-images/beach.webp";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    return (
        <View className="flex-1">
            <ImageBackground
                source={beachImage}
                resizeMode="cover"
                className="flex-1"
                style={{ width: '100%', height: '100%' }}
            >
                <LinearGradient className="flex-1" colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
                    <SafeAreaView>
                        <Text className="text-center text-white font-bold text-4xl">
                            Simple Meditation
                        </Text>
                        <Text className="text-center text-white font-regular text-2xl mt-3">
                            Simplifying Meditation for Everyone
                        </Text>
                    </SafeAreaView>

                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

