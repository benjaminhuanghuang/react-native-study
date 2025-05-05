import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Page = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://galaxies.dev/img/logos/logo--blue.png" }}
        style={styles.image}
      />
      <Link href="/home" asChild>
        <TouchableOpacity>
          <Text style={{ color: "#fff" }}>Login</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/register" asChild>
        <TouchableOpacity>
          <Text style={{ color: "#fff" }}>Register</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/privacy" asChild>
        <TouchableOpacity>
          <Text style={{ color: "#fff" }}>Privacy</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});
export default Page;
