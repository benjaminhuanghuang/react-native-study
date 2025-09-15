import React from "react";
import { View, Text, Platform } from "react-native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { headerStyle } from "../StylesComponent/HeadersStyle";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  return (
    <View style={headerStyle.homeContainer}>
      <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0 }}>
        <View style={headerStyle.homeHeader}>
          <Text style={headerStyle.headerTitle}>HomeScreen</Text>
        </View>
        {/* Rest of your screen content */}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
