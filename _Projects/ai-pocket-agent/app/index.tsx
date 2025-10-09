import {
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import Colors from "./shared/Colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS === "android" ? 40 : 30,
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/images/login.png")}
        style={{
          width: Dimensions.get("screen").width * 0.85,
          height: 280,
          resizeMode: "contain",
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
            color: Colors.PRIMARY,
          }}
        >
          Welcome to AI Pocket Agent
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: Colors.GRAY,
          }}
        >
          Your Ultimate AI Personal Agent Try it Today, Completely Free!
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 12,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
