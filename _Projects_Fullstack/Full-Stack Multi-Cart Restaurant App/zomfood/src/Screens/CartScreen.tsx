import React from "react";
import { View, Text } from "react-native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";

const CartScreen = ({ navigation, route }: TabsStackScreenProps<"Cart">) => {
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  );
};

export default CartScreen;
