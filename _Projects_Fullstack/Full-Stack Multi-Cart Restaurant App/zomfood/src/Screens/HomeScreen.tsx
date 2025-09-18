import React from "react";
import { View, Platform, Animated } from "react-native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { headerStyle } from "../StylesComponent/HeadersStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadersComponent from "../Component/HomeHeader/HeadersComponent";
import SectionListContent from "../Component/HomeSectionList/SectionListContent";
import { useSharedContext } from "../Context/SharedContext";
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const { globalScrollY } = useSharedContext();
  const scrollingUpAnim = useAnimatedStyle(() => {
    const transY = interpolate(
      globalScrollY.value,
      [0, 50],
      [0, -50],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY: transY }],
    };
  });
  return (
    <View style={headerStyle.homeContainer}>
      <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0 }}>
        <Animated.View style={[scrollingUpAnim]}>
          <View style={headerStyle.homeHeader}>
            <HeadersComponent />
          </View>
        </Animated.View>
        <Animated.View style={[scrollingUpAnim]}>
          <SectionListContent />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
