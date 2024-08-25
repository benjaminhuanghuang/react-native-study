import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";

import beachImage from "@/assets/meditation-images/beach.webp";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import AppGradient from "@/components/AppGradient";

export default function App() {
    return (
        <View className="flex-1">
            <ImageBackground
                source={beachImage}
                resizeMode="cover"
                className="flex-1"
                style={{ width: '100%', height: '100%' }}
            >
                <AppGradient
                    // Background Linear Gradient
                    colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
                    <SafeAreaView className="flex flex-1 px-1 justify-between">
                        <View>
                            <Text className="text-center text-white font-bold text-4xl">
                                Simple Meditation
                            </Text>
                            <Text className="text-center text-white font-regular text-2xl mt-3">
                                Simplifying Meditation for Everyone
                            </Text>
                        </View>
                        <View>
                            <CustomButton
                                onPress={() => console.log("Button Pressed")}
                                title="Get Started"
                                containerStyles="mt-10">
                            </CustomButton>
                        </View>

                        <StatusBar style="light" />
                    </SafeAreaView>

                </AppGradient>
            </ImageBackground>
        </View>
    )
}

