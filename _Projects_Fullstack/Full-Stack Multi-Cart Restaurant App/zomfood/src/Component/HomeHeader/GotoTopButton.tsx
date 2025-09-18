import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { gotoTopStyles } from "../../StylesComponent/CardStyle";

interface GotoTopButtonProps {
  onPress: () => void;
}
const GotoTopButton = ({ onPress }: GotoTopButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={gotoTopStyles.container}>
      <Ionicons name="arrow-up-circle-outline" size={12} color="#FFF" />
      <Text style={gotoTopStyles.backToTop}>Back to Top</Text>
    </TouchableOpacity>
  );
};

export default GotoTopButton;
