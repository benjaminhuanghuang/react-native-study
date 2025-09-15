import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { TabsStackParams } from "./TabsNavigation";
import TabNavigator from "./TabsNavigation";

export type RootStackParams = {
  TabsStack: NavigatorScreenParams<TabsStackParams>;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export type RootStackScreenProps<T extends keyof RootStackParams> =
  NativeStackScreenProps<RootStackParams, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="TabsStack"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
