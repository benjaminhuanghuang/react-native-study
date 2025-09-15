import React from "react";
import { View, Text } from "react-native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";

type Props = {};

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  return (
    <View style={hea}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
