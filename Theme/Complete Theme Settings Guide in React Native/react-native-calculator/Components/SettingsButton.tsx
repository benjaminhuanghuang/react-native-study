import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/utils/Colors";

type SettingsButtonProps = {
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  onPress?: () => void;
  isActive?: boolean;
};

function SettingsButton({
  title,
  icon,
  onPress,
  isActive,
}: SettingsButtonProps) {
  return (
    <TouchableOpacity style={styles.settingButton} onPress={onPress}>
      <View style={styles.titleWrapper}>
        <MaterialCommunityIcons name={icon} size={20} color={Colors.black} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <MaterialCommunityIcons
        name={isActive ? "check-circle" : "checkbox-blank-circle-outline"}
        size={20}
        color={isActive ? Colors.btnRight : Colors.black}
      />
    </TouchableOpacity>
  );
}

export default SettingsButton;

const styles = StyleSheet.create({
  settingButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
});
