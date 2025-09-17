import React from "react";
import { View, Text, Platform, SectionList } from "react-native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { headerStyle } from "../StylesComponent/HeadersStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadersComponent from "../Component/HomeHeadersComponents/HeadersComponent";
import SectionListContent from "../Component/HomeSectionList/SectionListContent";
import { useSharedContext } from "../Context/SharedContext";
import { useAnimatedStyle } from "react-native-reanimated";

type Props = {};

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const { globalScrollY } = useSharedContext();
  const scrollingUpAnim = useAnimatedStyle();
  return (
    <View style={headerStyle.homeContainer}>
      <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0 }}>
        <View style={headerStyle.homeHeader}>
          <HeadersComponent />
        </View>
        <View>
          <SectionListContent />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
