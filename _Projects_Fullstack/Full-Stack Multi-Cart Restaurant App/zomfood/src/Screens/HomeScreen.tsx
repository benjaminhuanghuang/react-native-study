import React from "react";
import { View, Text, Platform, SectionList } from "react-native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { headerStyle } from "../StylesComponent/HeadersStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadersComponent from "../Component/HomeHeadersComponents/HeadersComponent";
import SectionListContent from "../Component/HomeSectionList/SectionListContent";

type Props = {};

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
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
