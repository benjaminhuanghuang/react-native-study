import { View, Text, Pressable } from "react-native";
import React from "react";
import { Icons } from "./Icons";
import { Colors } from "../../StylesComponent/Constant";

interface TabsCardProps {
  routeName: string;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

const TabCard = ({
  routeName,
  label,
  isFocused,
  onPress,
  onLongPress,
}: TabsCardProps) => {
  return (
    <Pressable
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginTop: 3,
        paddingTop: 10,
        backgroundColor: "#fff",
      }}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {Icons[routeName]({ color: isFocused ? Colors.red : "gray" })}
      <Text
        style={{
          color: isFocused ? Colors.green : "gray",
          marginBottom: 8,
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TabCard;
