import { View } from "react-native";
import React from "react";
import FrequentFood from "./FrequentFood";
import LineBreakerText from "../LineBreakerText";

type Props = {};

const FrequentFoodSection = (props: Props) => {
  return (
    <View>
      <LineBreakerText text="Serving the Best Food" />
      <FrequentFood />
      <LineBreakerText text="Explore restaurant" />
    </View>
  );
};

export default FrequentFoodSection;
