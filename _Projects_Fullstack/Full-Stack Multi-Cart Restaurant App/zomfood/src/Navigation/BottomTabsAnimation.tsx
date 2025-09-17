import { View, Text } from "react-native";
import React from "react";
import { SharedContextProvider } from "../Context/SharedContext";
import TabNavigator from "./TabsNavigation";

type Props = {};

const BottomTabsAnimation = (props: Props) => {
  return (
    <SharedContextProvider>
      <TabNavigator />
    </SharedContextProvider>
  );
};

export default BottomTabsAnimation;
