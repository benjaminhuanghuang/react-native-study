import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import colors from "@/shared/Colors";

const CreateAgentBanner = () => {
  const router = useRouter();

  const handleCreatePress = () => {
    router.push("/create-agent");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/agent-group.png")}
        style={styles.image}
        resizeMode="content"
      />

      <View style={styles.textButtonContainer}>
        <Text style={styles.titleText}>Create Your Own Agent</Text>

        <TouchableOpacity style={styles.button} onPress={handleCreatePress}>
          <Text style={styles.buttonText}>Create Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginTop: 15,
  },
  image: {
    width: 200,
    height: 120,
  },
  textButtonContainer: {
    width: 180,
    paddingLeft: 10,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.WHITE,
    marginBottom: 5,
  },
  button: {
    backgroundColor: colors.WHITE,
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.PRIMARY,
    textAlign: "center",
    fontSize: 18,
  },
});

export default CreateAgentBanner;
