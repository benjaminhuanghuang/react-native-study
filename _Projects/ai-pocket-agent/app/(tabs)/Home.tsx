import React, { useEffect } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/shared/Colors";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          AI Pocket Agent
        </Text>
      ),
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 15,
            display: "flex",
            flexDirection: "row",
            gap: 6,
            backgroundColor: Colors.PRIMARY,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Image
            source={require("../../assets/images/diamond.png")}
            style={{ width: 20, height: 20, marginLeft: 10 }}
          />
          <Text>Pro</Text>
        </TouchableOpacity>
      ),
    });
  }, []);
}
