import { View, Text } from "react-native";
import React from "react";
import { lineBreakerStyle } from "../StylesComponent/CardStyle";

type LineBreakerTextProps = {
  text: string;
};

const LineBreakerText = ({ text }: LineBreakerTextProps) => {
  return (
    <View style={lineBreakerStyle.lineBreakerContainer}>
      <View style={lineBreakerStyle.lineX} />
      <Text style={lineBreakerStyle.lineBreakerTxt}>{text}</Text>
      <View style={lineBreakerStyle.lineX} />
    </View>
  );
};

export default LineBreakerText;
