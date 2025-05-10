import { ActivityIndicator, Text, View } from "react-native";

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> Auth clerk study... </Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default StartPage;
